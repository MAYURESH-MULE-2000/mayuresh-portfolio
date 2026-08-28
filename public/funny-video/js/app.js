/**
 * app.js
 * Wires the DOM to the project state, the renderer, the audio engine and the
 * exporter. This file owns no drawing logic - it only orchestrates.
 *
 *   USER INPUT -> PROJECT JSON -> TEMPLATE ENGINE -> SCENE ENGINE -> CANVAS -> VIDEO
 */

import { store, TEXT_ANIMATIONS, CAMERA_MOVES, readyPeople } from './state.js';
import { initPeoplePanel } from './people.js';
import { PROP_LIBRARY } from './props.js';
import { TEMPLATES, getTemplate } from './templates.js';
import { AUDIO_TRACKS, audioEngine, resolveTrackId, AUDIO_MAP } from './audio.js';
import { Renderer } from './renderer.js';
import { VideoExporter, isExportSupported, buildFileName } from './exporter.js';
import { preloadProject, missingAssets } from './assets.js';
import {
  escapeHtml, formatTime, pickRandom, downloadBlob, readFileAsDataURL, clamp,
} from './utils.js';

const $ = (id) => document.getElementById(id);

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */
export function initApp() {
  const el = {
    people: $('jvm-people'),
    addPerson: $('jvm-add-person'),
    backgrounds: $('jvm-backgrounds'),
    customWrap: $('jvm-custom-bg-wrap'),
    customInput: $('jvm-custom-bg'),
    props: $('jvm-props'),
    opening: $('jvm-opening'),
    textAnim: $('jvm-text-anim'),
    camera: $('jvm-camera'),
    audio: $('jvm-audio'),
    create: $('jvm-create'),
    previewBtn: $('jvm-preview-btn'),
    randomize: $('jvm-randomize'),
    reset: $('jvm-reset'),
    exportBtn: $('jvm-export'),
    canvas: $('jvm-canvas'),
    stage: $('jvm-stage'),
    overlay: $('jvm-overlay'),
    playPause: $('jvm-playpause'),
    replay: $('jvm-replay'),
    seek: $('jvm-seek'),
    time: $('jvm-time'),
    duration: $('jvm-duration'),
    status: $('jvm-status'),
    notice: $('jvm-notice'),
    progress: $('jvm-progress'),
    progressBar: $('jvm-progress-bar'),
    progressLabel: $('jvm-progress-label'),
    sceneLabel: $('jvm-scene-label'),
  };

  const renderer = new Renderer(el.canvas);
  const exporter = new VideoExporter(renderer, audioEngine);

  const player = {
    playing: false,
    time: 0,
    raf: null,
    last: 0,
    trackId: null,
  };
  let building = false;
  let rebuildTimer = null;

  /* ---------------- status / errors ---------------- */
  let statusTimer = null;
  function say(message, kind = 'info', sticky = false) {
    el.status.textContent = message;
    el.status.dataset.kind = kind;
    el.status.classList.toggle('is-visible', !!message);
    clearTimeout(statusTimer);
    if (message && !sticky) statusTimer = setTimeout(() => el.status.classList.remove('is-visible'), 5200);
  }
  const fail = (message) => say(message, 'error');

  window.addEventListener('error', (e) => {
    if (e?.message) fail(`Something went wrong: ${e.message}`);
  });

  /* ---------------- controls: backgrounds ---------------- */
  function renderBackgrounds() {
    const project = store.get();
    el.backgrounds.innerHTML = TEMPLATES.map((t) => `
      <button type="button" class="jvm-card ${project.template === t.id ? 'is-active' : ''}"
              data-template="${t.id}" aria-pressed="${project.template === t.id}">
        <span class="jvm-card__emoji">${t.emoji}</span>
        <span class="jvm-card__label">${escapeHtml(t.label)}</span>
      </button>`).join('');
    el.customWrap.hidden = project.template !== 'custom';
  }

  el.backgrounds.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-template]');
    if (!btn) return;
    const template = getTemplate(btn.dataset.template);
    store.update({
      template: template.id,
      background: template.id,
      // adopt the template's props unless the user has hand picked some
      props: mergeProps(store.get().props, template.props),
    });
    renderBackgrounds();
    renderProps();
    scheduleRebuild();
  });

  /** Keep the user's picks, add the ones the new template needs. */
  function mergeProps(current, templateProps) {
    const set = new Set([...templateProps]);
    current.forEach((p) => set.add(p));
    return [...set].slice(0, 8);
  }

  el.customInput.addEventListener('change', async () => {
    const file = el.customInput.files?.[0];
    if (!file) return;
    if (!/image\/(png|jpeg|webp)/.test(file.type)) return fail('Background must be a PNG, JPG or WEBP image.');
    try {
      const dataUrl = await readFileAsDataURL(file);
      store.update({ customBackground: dataUrl });
      say('Custom background added.', 'ok');
      scheduleRebuild();
    } catch {
      fail('That background image could not be read.');
    }
  });

  /* ---------------- controls: props ---------------- */
  function renderProps() {
    const project = store.get();
    el.props.innerHTML = PROP_LIBRARY.map((p) => {
      const on = project.props.includes(p.id);
      return `
        <button type="button" class="jvm-card jvm-card--prop ${on ? 'is-active' : ''}"
                data-prop="${p.id}" aria-pressed="${on}">
          <span class="jvm-card__emoji">${p.emoji}</span>
          <span class="jvm-card__label">${escapeHtml(p.label)}</span>
        </button>`;
    }).join('');
  }

  el.props.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-prop]');
    if (!btn) return;
    const id = btn.dataset.prop;
    store.mutate((project) => {
      project.props = project.props.includes(id)
        ? project.props.filter((p) => p !== id)
        : [...project.props, id];
    });
    renderProps();
    scheduleRebuild();
  });

  /* ---------------- controls: text + camera ---------------- */
  function renderSelects() {
    const project = store.get();
    el.textAnim.innerHTML = TEXT_ANIMATIONS
      .map((a) => `<option value="${a}" ${project.textAnimation === a ? 'selected' : ''}>${a[0].toUpperCase()}${a.slice(1)}</option>`)
      .join('');
    el.camera.innerHTML = CAMERA_MOVES
      .map((c) => `<option value="${c}" ${project.camera === c ? 'selected' : ''}>${c.replace(/([A-Z])/g, ' $1').replace(/^./, (m) => m.toUpperCase())}</option>`)
      .join('');
    el.opening.value = project.openingLine;
  }

  el.opening.addEventListener('input', () => {
    store.update({ openingLine: el.opening.value });
    scheduleRebuild();
  });
  el.textAnim.addEventListener('change', () => {
    store.update({ textAnimation: el.textAnim.value });
    scheduleRebuild();
  });
  el.camera.addEventListener('change', () => {
    store.update({ camera: el.camera.value });
    scheduleRebuild();
  });

  /* ---------------- controls: audio ---------------- */
  function renderAudio() {
    const project = store.get();
    const options = [
      ...AUDIO_TRACKS.map((t) => ({
        id: t.id,
        title: t.label,
        subtitle: t.name,
        emoji: t.emoji,
        playable: true,
      })),
      { id: 'random', title: 'Random Audio', subtitle: 'Surprise me every time', emoji: '🎲', playable: false },
    ];
    el.audio.innerHTML = options.map((o) => {
      const on = project.audio === o.id;
      return `
        <div class="jvm-audio ${on ? 'is-active' : ''}">
          <button type="button" class="jvm-audio__pick" data-audio="${o.id}" aria-pressed="${on}">
            <span class="jvm-audio__emoji">${o.emoji}</span>
            <span class="jvm-audio__text">
              <strong>${escapeHtml(o.title)}</strong>
              <small>${escapeHtml(o.subtitle)}</small>
            </span>
          </button>
          ${o.playable ? `<button type="button" class="jvm-audio__play" data-preview="${o.id}" title="Play sample" aria-label="Play ${o.title} sample">▶</button>` : ''}
        </div>`;
    }).join('');
  }

  el.audio.addEventListener('click', async (e) => {
    const pick = e.target.closest('[data-audio]');
    if (pick) {
      store.update({ audio: pick.dataset.audio });
      renderAudio();
      return;
    }
    const preview = e.target.closest('[data-preview]');
    if (preview) {
      if (!audioEngine.supported) return fail('Your browser does not support the Web Audio API.');
      preview.classList.add('is-playing');
      const ok = await audioEngine.preview(preview.dataset.preview, 6);
      setTimeout(() => preview.classList.remove('is-playing'), 6000);
      if (!ok) fail('That audio track could not be loaded.');
      else if (audioEngine.isSynthesised(preview.dataset.preview)) {
        say('Playing the built-in generated track (drop your own MP3 in assets/audio to replace it).', 'info');
      }
    }
  });

  /* ---------------- build / preview ---------------- */
  function scheduleRebuild() {
    if (!store.get().generated) return;
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(() => build({ autoplay: false, keepTime: true }), 350);
  }

  async function build({ autoplay = true, keepTime = false } = {}) {
    const project = store.get();
    if (!readyPeople(project).length) {
      return fail('Upload at least one photo before creating the video.');
    }
    if (building) return;
    building = true;
    const wasTime = player.time;
    pause();
    el.create.disabled = true;
    el.create.dataset.busy = 'true';
    say('Composing your video...', 'info', true);

    try {
      const trackId = resolveTrackId(project.audio);
      store.update({ resolvedAudio: trackId, generated: true });
      player.trackId = trackId;

      await preloadProject(store.get());
      await renderer.build(store.get());
      // warm the audio buffer so playback starts instantly
      audioEngine.ensureContext();
      audioEngine.getBuffer(trackId).catch(() => {});

      player.time = keepTime ? clamp(wasTime, 0, renderer.duration) : 0;
      // Poster frame: at t=0 the opening is still fading in, so show a moment
      // later in the scene while playback still starts from zero.
      renderer.renderFrame(keepTime ? player.time : Math.min(1.1, renderer.duration));
      el.overlay.hidden = true;
      el.seek.max = String(renderer.duration.toFixed(2));
      el.seek.value = String(player.time);
      el.duration.textContent = formatTime(renderer.duration);
      el.time.textContent = formatTime(player.time);
      el.exportBtn.disabled = !isExportSupported();
      updateSceneLabel();

      const chosen = AUDIO_MAP[trackId];
      say(`Video ready - ${renderer.duration.toFixed(1)}s, track: ${chosen ? chosen.name : 'none'}.`, 'ok');
      if (autoplay) play();
    } catch (err) {
      console.error(err);
      fail(`Could not create the video: ${err.message || err}`);
    } finally {
      building = false;
      el.create.disabled = false;
      delete el.create.dataset.busy;
      showAssetNotice();
    }
  }

  function loop(ts) {
    if (!player.playing) return;
    const dt = (ts - player.last) / 1000;
    player.last = ts;
    player.time += dt;
    if (player.time >= renderer.duration) {
      player.time = renderer.duration;
      renderer.renderFrame(player.time);
      syncTransport();
      pause();
      return;
    }
    renderer.renderFrame(player.time);
    syncTransport();
    player.raf = requestAnimationFrame(loop);
  }

  function play() {
    if (!renderer.ready || player.playing) return;
    if (player.time >= renderer.duration - 0.05) player.time = 0;
    player.playing = true;
    player.last = performance.now();
    el.playPause.textContent = '⏸ Pause';
    el.playPause.setAttribute('aria-label', 'Pause preview');
    if (player.trackId) {
      audioEngine.play(player.trackId, player.time).catch(() => {
        say('Audio could not start - the video will play silently.', 'info');
      });
    }
    player.raf = requestAnimationFrame(loop);
  }

  function pause() {
    player.playing = false;
    cancelAnimationFrame(player.raf);
    audioEngine.stop();
    el.playPause.textContent = '▶ Play';
    el.playPause.setAttribute('aria-label', 'Play preview');
  }

  function seek(time) {
    if (!renderer.ready) return;
    player.time = clamp(time, 0, renderer.duration);
    renderer.renderFrame(player.time);
    syncTransport();
    if (player.playing && player.trackId) audioEngine.play(player.trackId, player.time);
  }

  function syncTransport() {
    el.seek.value = String(player.time);
    el.time.textContent = formatTime(player.time);
    updateSceneLabel();
  }

  function updateSceneLabel() {
    if (!renderer.script) return;
    const scene = renderer.script.scenes.find((s) => player.time >= s.start && player.time < s.end)
      || renderer.script.scenes[renderer.script.scenes.length - 1];
    const idx = renderer.script.scenes.indexOf(scene) + 1;
    el.sceneLabel.textContent = `Scene ${idx}/${renderer.script.scenes.length} · ${scene.kind}`;
  }

  el.playPause.addEventListener('click', () => (player.playing ? pause() : play()));
  el.replay.addEventListener('click', () => { seek(0); play(); });
  el.seek.addEventListener('input', () => seek(Number(el.seek.value)));
  el.create.addEventListener('click', () => build({ autoplay: true }));

  el.previewBtn.addEventListener('click', () => {
    if (!renderer.ready) return build({ autoplay: true });
    el.stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    seek(0);
    play();
  });

  /* ---------------- randomize / reset ---------------- */
  el.randomize.addEventListener('click', () => {
    const template = pickRandom(TEMPLATES.filter((t) => !t.custom));
    const extras = PROP_LIBRARY.map((p) => p.id).filter((id) => !template.props.includes(id));
    const bonus = extras.sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 2));
    store.update({
      template: template.id,
      background: template.id,
      props: [...new Set([...template.props, ...bonus])].slice(0, 7),
      textAnimation: pickRandom(TEXT_ANIMATIONS),
      camera: pickRandom(CAMERA_MOVES),
      characterLayout: pickRandom(['couple', 'sideBySide', 'center']),
      audio: pickRandom([...AUDIO_TRACKS.map((t) => t.id), 'random']),
      seed: Math.floor(Math.random() * 1e9),
    });
    renderBackgrounds();
    renderProps();
    renderSelects();
    renderAudio();
    say('Shuffled the look - people, names and your opening line are untouched.', 'ok');
    if (store.get().generated) build({ autoplay: false, keepTime: false });
  });

  el.reset.addEventListener('click', () => {
    pause();
    store.reset();
    peoplePanel.render();
    renderBackgrounds();
    renderProps();
    renderSelects();
    renderAudio();
    el.overlay.hidden = false;
    el.exportBtn.disabled = true;
    el.seek.value = '0';
    el.time.textContent = '0:00';
    el.duration.textContent = '0:00';
    el.sceneLabel.textContent = '';
    const ctx = el.canvas.getContext('2d');
    ctx.clearRect(0, 0, el.canvas.width, el.canvas.height);
    say('Everything reset.', 'ok');
  });

  /* ---------------- export ---------------- */
  el.exportBtn.addEventListener('click', async () => {
    if (!renderer.ready) return fail('Create the video first.');
    if (!isExportSupported()) {
      return fail('This browser cannot record video. Try Chrome, Edge or Firefox on desktop.');
    }
    pause();
    el.exportBtn.disabled = true;
    el.create.disabled = true;
    el.progress.hidden = false;
    el.progressBar.style.width = '0%';
    el.progressLabel.textContent = 'Recording 0%';
    say('Recording in real time - keep this tab visible until it finishes.', 'info', true);

    try {
      const result = await exporter.export({
        fps: 30,
        trackId: player.trackId,
        onProgress: (p) => {
          el.progressBar.style.width = `${Math.round(p * 100)}%`;
          el.progressLabel.textContent = `Recording ${Math.round(p * 100)}%`;
        },
      });
      const name = buildFileName(store.get(), result.extension);
      downloadBlob(result.blob, name);
      say(`Downloaded ${name} (${(result.blob.size / 1048576).toFixed(1)} MB).`, 'ok');
    } catch (err) {
      console.error(err);
      fail(err.message || 'Export failed.');
    } finally {
      el.progress.hidden = true;
      el.exportBtn.disabled = false;
      el.create.disabled = false;
      seek(0);
    }
  });

  /* ---------------- asset notice ---------------- */
  function showAssetNotice() {
    const missing = missingAssets();
    if (!missing.length) {
      el.notice.hidden = true;
      return;
    }
    el.notice.hidden = false;
    el.notice.innerHTML = `<strong>Using built-in artwork.</strong> Drop your own files into
      <code>public/funny-video/assets/</code> to replace them
      (${missing.length} optional file${missing.length > 1 ? 's' : ''} not found, e.g. <code>${escapeHtml(missing[0])}</code>).`;
  }

  /* ---------------- init ---------------- */
  store.restore();
  const peoplePanel = initPeoplePanel({
    container: el.people,
    addButton: el.addPerson,
    onError: fail,
  });
  renderBackgrounds();
  renderProps();
  renderSelects();
  renderAudio();
  el.exportBtn.disabled = true;

  if (!isExportSupported()) {
    say('Video export is not available in this browser - preview still works. Use Chrome, Edge or Firefox to download.', 'info', true);
  }

  // Pause playback when the tab is hidden so audio never runs in the background.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && player.playing && !exporter.recording) pause();
  });

  return { store, renderer, player, build };
}

function boot() {
  if (!document.getElementById('jvm-canvas')) return;
  // Exposed for debugging in the console: window.jokeVideoMaker.renderer etc.
  window.jokeVideoMaker = initApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
