/**
 * assets.js
 * Asset loader with a graceful fallback system.
 *
 * The app never requires a single binary file to run: if
 * /assets/props/<file>.png or /assets/backgrounds/<file>.jpg is missing, the
 * matching procedural painter is used instead. Drop real artwork into those
 * folders and it is picked up automatically on the next reload.
 */

import { loadImage, createCanvas } from './utils.js';
import { PROP_MAP, createPropSprite } from './props.js';
import { createBackgroundCanvas, getTemplate } from './templates.js';

/** Absolute base URL of /funny-video/assets - independent of where it is served. */
export const ASSET_BASE = new URL('../assets/', import.meta.url).href;

const cache = new Map();
const missing = new Set();

/** Assets that were requested but not found on disk (shown in the UI as a hint). */
export const missingAssets = () => [...missing];

/**
 * Sprite for one prop instance.
 * @returns {Promise<CanvasImageSource>} always resolves - never rejects.
 */
export async function getPropSprite(propId, variant = 0) {
  const prop = PROP_MAP[propId];
  if (!prop) return null;
  const key = `prop:${propId}:${variant}`;
  if (cache.has(key)) return cache.get(key);

  const fileKey = `propfile:${propId}`;
  let real = cache.get(fileKey);
  if (real === undefined) {
    real = prop.file ? await loadImage(`${ASSET_BASE}props/${prop.file}`) : null;
    cache.set(fileKey, real);
    if (!real && prop.file) missing.add(`assets/props/${prop.file}`);
  }

  const sprite = real || createPropSprite(prop, variant);
  cache.set(key, sprite);
  return sprite;
}

/**
 * Background image for a template. Custom backgrounds come straight from the
 * user's upload; everything else prefers a JPG on disk and falls back to paint.
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
    const img = await loadImage(`${ASSET_BASE}backgrounds/${template.backgroundFile}`);
    if (img) result = coverToCanvas(img, width, height);
    else missing.add(`assets/backgrounds/${template.backgroundFile}`);
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

export function clearAssetCache() {
  cache.clear();
}
