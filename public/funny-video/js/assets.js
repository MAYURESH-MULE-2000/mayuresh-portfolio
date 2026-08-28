/**
 * assets.js
 * Asset loader with a graceful fallback system.
 *
 * The app never requires a single binary file to run, but every generated
 * visual and sound can be replaced by dropping your own file into
 * /funny-video/assets/. Naming is forgiving on purpose:
 *
 *   props/flowers.png              -> replaces the generated flowers
 *   props/flowers.webp             -> same (png, webp, jpg, jpeg all work)
 *   props/flowers-2.png, -3.png    -> extra variants, mixed in automatically
 *   backgrounds/garden.jpg         -> replaces the painted Romantic Garden
 *   audio/audio1.mp3               -> replaces the synthesised track 1
 *   audio/tracks.json              -> renames the five tracks in the UI
 *
 * Nothing else has to change: scanAssets() reports exactly what was found.
 */

import { loadImage, createCanvas } from './utils.js';
import { PROP_LIBRARY, PROP_MAP, createPropSprite } from './props.js';
import { createBackgroundCanvas, getTemplate, TEMPLATES } from './templates.js';

/** Absolute base URL of /funny-video/assets - independent of where it is served. */
export const ASSET_BASE = new URL('../assets/', import.meta.url).href;

/** Extensions tried for each kind of asset, in order of preference. */
export const IMAGE_EXTENSIONS = ['png', 'webp', 'jpg', 'jpeg'];
export const BACKGROUND_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
export const AUDIO_EXTENSIONS = ['mp3', 'm4a', 'ogg', 'wav'];

/** Number of extra numbered variants looked for once a base file exists. */
const MAX_PROP_VARIANTS = 3;

const cache = new Map();
const missing = new Set();
const found = new Map(); // logical id -> the URL that was actually used

/** Assets that were looked for but not supplied (shown in the UI as a hint). */
export const missingAssets = () => [...missing];

/** Custom files that were found, keyed by "props/grass", "audio/audio1", ... */
export const foundAssets = () => new Map(found);

/** Strip the extension from a configured file name. */
const baseName = (file, fallback) => (file ? file.replace(/\.[^.]+$/, '') : fallback);

/** Return the first URL in the list that loads as an image, or null. */
async function firstImage(urls) {
  for (const url of urls) {
    const img = await loadImage(url);
    if (img) return { img, url };
  }
  return null;
}

/** True when the URL responds with a real (non-HTML) file. */
async function fileExists(url) {
  try {
    const res = await fetch(url, { method: 'GET', cache: 'no-store' });
    if (!res.ok) return false;
    const type = res.headers.get('content-type') || '';
    if (type.includes('text/html')) return false; // dev-server SPA fallback
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ *
 * Props
 * ------------------------------------------------------------------ */

/**
 * Look for user supplied art for one prop:
 *   flowers.png / .webp / .jpg   (base file)
 *   flowers-2.png, flowers-3.png (optional extra variants)
 * Returns an array of images - empty when nothing was supplied.
 */
async function loadPropFiles(prop) {
  const key = `propfiles:${prop.id}`;
  if (cache.has(key)) return cache.get(key);

  const base = baseName(prop.file, prop.id);
  const images = [];
  const primary = await firstImage(IMAGE_EXTENSIONS.map((e) => `${ASSET_BASE}props/${base}.${e}`));

  if (primary) {
    images.push(primary.img);
    found.set(`props/${prop.id}`, primary.url);
    // Only hunt for numbered variants when the base file exists, so a project
    // without custom art never fires extra requests.
    for (let n = 2; n <= MAX_PROP_VARIANTS; n++) {
      const extra = await firstImage(IMAGE_EXTENSIONS.map((e) => `${ASSET_BASE}props/${base}-${n}.${e}`));
      if (!extra) break;
      images.push(extra.img);
      found.set(`props/${prop.id}-${n}`, extra.url);
    }
  } else {
    missing.add(`assets/props/${base}.png`);
  }

  cache.set(key, images);
  return images;
}

/**
 * Sprite for one prop instance.
 * @returns {Promise<CanvasImageSource>} always resolves - never rejects.
 */
export async function getPropSprite(propId, variant = 0) {
  const prop = PROP_MAP[propId];
  if (!prop) return null;
  const key = `prop:${propId}:${variant}`;
  if (cache.has(key)) return cache.get(key);

  const files = await loadPropFiles(prop);
  const sprite = files.length
    ? files[variant % files.length]
    : createPropSprite(prop, variant);
  cache.set(key, sprite);
  return sprite;
}

/* ------------------------------------------------------------------ *
 * Backgrounds
 * ------------------------------------------------------------------ */

/**
 * Background image for a template. Custom backgrounds come straight from the
 * user's upload; everything else prefers a file on disk and falls back to paint.
 */
export async function getBackground(templateId, { width, height, seed = 7, customSrc = null } = {}) {
  const template = getTemplate(templateId);

  if (template.custom && customSrc) {
    const key = `bg:custom:${customSrc.slice(-24)}:${width}x${height}`;
    if (cache.has(key)) return cache.get(key);
    const img = await loadImage(customSrc);
    const cover = img ? coverToCanvas(img, width, height) : createBackgroundCanvas(template, width, height, seed);
    cache.set(key, cover);
    return cover;
  }

  const key = `bg:${templateId}:${width}x${height}:${seed}`;
  if (cache.has(key)) return cache.get(key);

  let result = null;
  if (template.backgroundFile) {
    const base = baseName(template.backgroundFile, template.id);
    const hit = await firstImage(BACKGROUND_EXTENSIONS.map((e) => `${ASSET_BASE}backgrounds/${base}.${e}`));
    if (hit) {
      result = coverToCanvas(hit.img, width, height);
      found.set(`backgrounds/${template.id}`, hit.url);
    } else {
      missing.add(`assets/backgrounds/${template.backgroundFile}`);
    }
  }
  if (!result) result = createBackgroundCanvas(template, width, height, seed);
  cache.set(key, result);
  return result;
}

/** Scale an image to cover the frame, centred (object-fit: cover). */
export function coverToCanvas(img, width, height) {
  const { canvas, ctx } = createCanvas(width, height);
  const scale = Math.max(width / img.width, height / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
  return canvas;
}

/** Decode all uploaded people photos once and keep them in memory. */
export async function loadPeopleImages(people) {
  const images = await Promise.all(people.map((p) => loadImage(p.src)));
  return people.map((person, i) => ({ person, image: images[i] })).filter((entry) => entry.image);
}

/* ------------------------------------------------------------------ *
 * Audio
 * ------------------------------------------------------------------ */

/** First existing audio file for a track id, or null when none was supplied. */
export async function resolveAudioUrl(trackId, configuredFile) {
  const key = `audiourl:${trackId}`;
  if (cache.has(key)) return cache.get(key);
  const base = baseName(configuredFile, trackId);
  let hit = null;
  for (const ext of AUDIO_EXTENSIONS) {
    const url = `${ASSET_BASE}audio/${base}.${ext}`;
    if (await fileExists(url)) { hit = url; break; }
  }
  if (hit) found.set(`audio/${trackId}`, hit);
  else missing.add(`assets/audio/${base}.mp3`);
  cache.set(key, hit);
  return hit;
}

/**
 * Optional /assets/audio/tracks.json, used to label your own tracks:
 *   { "audio1": { "name": "Dhol Intro" }, "audio2": { "name": "Sad Violin" } }
 */
export async function loadAudioManifest() {
  const key = 'audiomanifest';
  if (cache.has(key)) return cache.get(key);
  let manifest = {};
  try {
    const res = await fetch(`${ASSET_BASE}audio/tracks.json`, { cache: 'no-store' });
    if (res.ok && !(res.headers.get('content-type') || '').includes('text/html')) {
      const data = await res.json();
      if (data && typeof data === 'object') manifest = data;
    }
  } catch {
    manifest = {}; // no manifest supplied - built-in names are used
  }
  cache.set(key, manifest);
  return manifest;
}

/* ------------------------------------------------------------------ *
 * Project preloading + asset report
 * ------------------------------------------------------------------ */

/** Warm the cache for one project so the first preview frame is never empty. */
export async function preloadProject(project) {
  const jobs = [getBackground(project.template, {
    width: project.width,
    height: project.height,
    seed: project.seed,
    customSrc: project.customBackground,
  })];
  project.props.forEach((id) => {
    for (let v = 0; v < 3; v++) jobs.push(getPropSprite(id, v));
  });
  await Promise.all(jobs);
}

/**
 * Probe every replaceable asset and report what is yours and what is generated.
 * Used by the "Check my assets" button so prefilling is verifiable.
 * @returns {Promise<{props:Array, backgrounds:Array, audio:Array, summary:object}>}
 */
export async function scanAssets(audioTracks = []) {
  const props = [];
  for (const prop of PROP_LIBRARY) {
    const files = await loadPropFiles(prop);
    props.push({
      id: prop.id,
      label: prop.label,
      expected: `${baseName(prop.file, prop.id)}.png`,
      custom: files.length > 0,
      variants: files.length,
    });
  }

  const backgrounds = [];
  for (const template of TEMPLATES) {
    if (!template.backgroundFile) continue;
    const base = baseName(template.backgroundFile, template.id);
    const hit = await firstImage(BACKGROUND_EXTENSIONS.map((e) => `${ASSET_BASE}backgrounds/${base}.${e}`));
    if (hit) found.set(`backgrounds/${template.id}`, hit.url);
    backgrounds.push({
      id: template.id,
      label: template.label,
      expected: template.backgroundFile,
      custom: !!hit,
    });
  }

  const audio = [];
  const manifest = await loadAudioManifest();
  for (const track of audioTracks) {
    const url = await resolveAudioUrl(track.id, track.file);
    audio.push({
      id: track.id,
      label: track.label,
      expected: track.file,
      custom: !!url,
      name: manifest[track.id]?.name || track.name,
    });
  }

  const count = (list) => list.filter((i) => i.custom).length;
  return {
    props,
    backgrounds,
    audio,
    summary: {
      props: `${count(props)}/${props.length}`,
      backgrounds: `${count(backgrounds)}/${backgrounds.length}`,
      audio: `${count(audio)}/${audio.length}`,
      total: count(props) + count(backgrounds) + count(audio),
    },
  };
}

/** Drop every cached bitmap so newly added files are picked up without a reload. */
export function clearAssetCache() {
  cache.clear();
  missing.clear();
  found.clear();
}
