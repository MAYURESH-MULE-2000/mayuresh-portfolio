/**
 * audio.js
 * Audio selection, playback and export routing.
 *
 * Tracks are loaded from /assets/audio/audioN.mp3 when those files exist.
 * When they do not (the repo ships without binary audio) the engine
 * synthesises the track with the Web Audio API, so every option still plays
 * real, exportable sound out of the box.
 */

import { pickRandom } from './utils.js';
import { ASSET_BASE } from './assets.js';

export const AUDIO_TRACKS = [
  { id: 'audio1', label: 'Audio 1', name: 'Dhol Bhangra', emoji: '🥁', file: 'audio1.mp3', synth: 'bhangra' },
  { id: 'audio2', label: 'Audio 2', name: 'Romantic Flute', emoji: '🎶', file: 'audio2.mp3', synth: 'romantic' },
  { id: 'audio3', label: 'Audio 3', name: 'Dramatic Twist', emoji: '🎬', file: 'audio3.mp3', synth: 'dramatic' },
  { id: 'audio4', label: 'Audio 4', name: 'Comedy Bounce', emoji: '🤡', file: 'audio4.mp3', synth: 'comedy' },
  { id: 'audio5', label: 'Audio 5', name: 'Shehnai Wedding', emoji: '💐', file: 'audio5.mp3', synth: 'wedding' },
];

export const AUDIO_MAP = Object.fromEntries(AUDIO_TRACKS.map((t) => [t.id, t]));

/** Resolve the "random" option into a concrete track id. */
export function resolveTrackId(selection) {
  if (selection === 'random' || !AUDIO_MAP[selection]) return pickRandom(AUDIO_TRACKS).id;
  return selection;
}

/* ------------------------------------------------------------------ *
 * Tiny synth helpers (used only for the fallback tracks)
 * ------------------------------------------------------------------ */

function envGain(ctx, start, dur, peak, attack = 0.01, release = 0.12) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), start + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, start + Math.max(dur, attack + release));
  return g;
}

function tone(ctx, out, { type = 'sine', freq, start, dur, gain = 0.2, detune = 0, vibrato = 0, glideTo = null }) {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, start + dur);
  osc.detune.value = detune;
  const g = envGain(ctx, start, dur, gain);
  osc.connect(g).connect(out);
  if (vibrato) {
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 5.5;
    lfoGain.gain.value = vibrato;
    lfo.connect(lfoGain).connect(osc.frequency);
    lfo.start(start); lfo.stop(start + dur + 0.1);
  }
  osc.start(start);
  osc.stop(start + dur + 0.1);
}

function noiseBuffer(ctx, seconds = 1) {
  const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function noiseHit(ctx, out, noise, { start, dur = 0.12, gain = 0.25, freq = 2000, type = 'highpass' }) {
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  const g = envGain(ctx, start, dur, gain, 0.005);
  src.connect(filter).connect(g).connect(out);
  src.start(start);
  src.stop(start + dur + 0.05);
}

function kick(ctx, out, start, gain = 0.9) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, start);
  osc.frequency.exponentialRampToValueAtTime(45, start + 0.16);
  const g = envGain(ctx, start, 0.24, gain, 0.005);
  osc.connect(g).connect(out);
  osc.start(start);
  osc.stop(start + 0.3);
}

const SCALES = {
  // Raga-flavoured minor scales keep the desi mood without needing samples.
  bhairavi: [261.63, 277.18, 311.13, 349.23, 392.0, 415.3, 466.16, 523.25],
  major: [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25],
  minor: [220.0, 246.94, 261.63, 293.66, 329.63, 349.23, 392.0, 440.0],
};

/** Compose one of the five fallback tracks into an AudioBuffer. */
async function synthesiseTrack(kind, sampleRate = 44100, duration = 18) {
  const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  if (!OfflineCtx) return null;
  const ctx = new OfflineCtx(2, Math.ceil(sampleRate * duration), sampleRate);
  const master = ctx.createGain();
  master.gain.value = 0.85;
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp).connect(ctx.destination);
  const noise = noiseBuffer(ctx, 1);

  if (kind === 'bhangra') {
    const beat = 60 / 100;
    for (let i = 0; i * beat < duration; i++) {
      const t = i * beat;
      kick(ctx, master, t, 0.9);
      if (i % 2 === 1) noiseHit(ctx, master, noise, { start: t, dur: 0.18, gain: 0.3, freq: 1800 });
      noiseHit(ctx, master, noise, { start: t + beat / 2, dur: 0.07, gain: 0.12, freq: 5000 });
      const scale = SCALES.bhairavi;
      tone(ctx, master, {
        type: 'square', freq: scale[(i * 3) % scale.length], start: t, dur: 0.22, gain: 0.09,
      });
      tone(ctx, master, {
        type: 'triangle', freq: scale[(i * 5) % scale.length] / 2, start: t + beat / 2, dur: 0.3, gain: 0.12,
      });
    }
  } else if (kind === 'romantic') {
    const scale = SCALES.major;
    for (let i = 0; i * 2 < duration; i++) {
      const t = i * 2;
      tone(ctx, master, { type: 'sine', freq: scale[0] / 2, start: t, dur: 2.2, gain: 0.14 });
      tone(ctx, master, { type: 'sine', freq: scale[4] / 2, start: t, dur: 2.2, gain: 0.1, detune: 6 });
    }
    const melody = [4, 5, 4, 2, 0, 2, 4, 7, 5, 4, 2, 0];
    melody.forEach((n, i) => {
      const t = i * 1.4 + 0.4;
      if (t < duration) {
        tone(ctx, master, {
          type: 'sine', freq: SCALES.major[n % 8] * (n >= 8 ? 2 : 1), start: t, dur: 1.1,
          gain: 0.22, vibrato: 6,
        });
      }
    });
  } else if (kind === 'dramatic') {
    tone(ctx, master, { type: 'sawtooth', freq: 55, start: 0, dur: duration, gain: 0.12 });
    for (let i = 0; i * 1.5 < duration; i++) {
      const t = i * 1.5;
      kick(ctx, master, t, 0.7);
      noiseHit(ctx, master, noise, { start: t, dur: 0.4, gain: 0.18, freq: 400, type: 'lowpass' });
      tone(ctx, master, { type: 'sawtooth', freq: 110, start: t, dur: 0.6, gain: 0.1, glideTo: 220 });
    }
    tone(ctx, master, { type: 'triangle', freq: 220, start: duration * 0.55, dur: 2.4, gain: 0.16, glideTo: 880 });
  } else if (kind === 'comedy') {
    const scale = SCALES.major;
    for (let i = 0; i * 0.32 < duration; i++) {
      const t = i * 0.32;
      tone(ctx, master, {
        type: 'triangle', freq: scale[i % scale.length] * (i % 4 === 0 ? 2 : 1), start: t, dur: 0.24, gain: 0.18,
      });
      if (i % 8 === 0) {
        tone(ctx, master, { type: 'sine', freq: 700, start: t, dur: 0.45, gain: 0.22, glideTo: 140 });
      }
      if (i % 2 === 0) noiseHit(ctx, master, noise, { start: t, dur: 0.05, gain: 0.1, freq: 6000 });
    }
  } else { // wedding / shehnai
    const scale = SCALES.bhairavi;
    const melody = [0, 1, 2, 3, 4, 3, 2, 1, 0, 2, 4, 5, 4, 2];
    melody.forEach((n, i) => {
      const t = i * 1.2;
      if (t < duration) {
        tone(ctx, master, {
          type: 'sawtooth', freq: scale[n], start: t, dur: 1.0, gain: 0.13, vibrato: 8,
        });
        tone(ctx, master, { type: 'sine', freq: scale[n] / 2, start: t, dur: 1.0, gain: 0.08 });
      }
    });
    const beat = 60 / 88;
    for (let i = 0; i * beat < duration; i++) {
      const t = i * beat;
      kick(ctx, master, t, 0.55);
      noiseHit(ctx, master, noise, { start: t + beat * 0.5, dur: 0.1, gain: 0.16, freq: 2600 });
    }
  }

  return ctx.startRendering();
}

/* ------------------------------------------------------------------ *
 * Engine
 * ------------------------------------------------------------------ */

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.buffers = new Map();
    this.source = null;
    this.exportDestination = null;
    this.currentTrackId = null;
    this.synthesised = new Set();
    this.failed = new Set();
  }

  /** Lazily create the AudioContext (browsers require a user gesture). */
  ensureContext() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.9;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  get supported() {
    return !!(window.AudioContext || window.webkitAudioContext);
  }

  /** True when the track had to be synthesised (no mp3 on disk). */
  isSynthesised(trackId) {
    return this.synthesised.has(trackId);
  }

  /** Load (or synthesise) a track. Never throws - returns null on failure. */
  async getBuffer(trackId) {
    if (this.buffers.has(trackId)) return this.buffers.get(trackId);
    const ctx = this.ensureContext();
    if (!ctx) return null;
    const track = AUDIO_MAP[trackId];
    if (!track) return null;

    let buffer = null;
    try {
      const res = await fetch(`${ASSET_BASE}audio/${track.file}`);
      if (res.ok) {
        const type = res.headers.get('content-type') || '';
        if (!type.includes('html')) {
          buffer = await ctx.decodeAudioData(await res.arrayBuffer());
        }
      }
    } catch {
      buffer = null; // missing file - fall through to the synth
    }

    if (!buffer) {
      try {
        buffer = await synthesiseTrack(track.synth, ctx.sampleRate);
        if (buffer) this.synthesised.add(trackId);
      } catch {
        buffer = null;
      }
    }

    if (!buffer) this.failed.add(trackId);
    this.buffers.set(trackId, buffer);
    return buffer;
  }

  /**
   * Start a track at `offset` seconds. The buffer loops so a short track still
   * covers the whole video; a long track is simply cut when playback stops.
   */
  async play(trackId, offset = 0) {
    const buffer = await this.getBuffer(trackId);
    if (!buffer) return false;
    this.stop();
    const ctx = this.ensureContext();
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.connect(this.master);
    if (this.exportDestination) src.connect(this.exportDestination);
    src.start(0, offset % buffer.duration);
    this.source = src;
    this.currentTrackId = trackId;
    return true;
  }

  stop() {
    if (this.source) {
      try { this.source.stop(); } catch { /* already stopped */ }
      this.source.disconnect();
      this.source = null;
    }
  }

  /** One-off sample used by the little Play button next to each track. */
  async preview(trackId, seconds = 6) {
    const ok = await this.play(trackId, 0);
    if (!ok) return false;
    clearTimeout(this._previewTimer);
    this._previewTimer = setTimeout(() => this.stop(), seconds * 1000);
    return true;
  }

  /** Audio track fed into MediaRecorder during export. */
  getExportStream() {
    const ctx = this.ensureContext();
    if (!ctx) return null;
    if (!this.exportDestination) this.exportDestination = ctx.createMediaStreamDestination();
    return this.exportDestination.stream;
  }

  setVolume(v) {
    if (this.master) this.master.gain.value = v;
  }
}

export const audioEngine = new AudioEngine();
