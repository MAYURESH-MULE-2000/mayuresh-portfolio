/**
 * exporter.js
 * Real video export: canvas.captureStream() + the audio graph -> MediaRecorder.
 *
 * The render loop is driven by elapsed wall-clock time (not by frame counting),
 * so the recorded file stays in sync with the audio even if a frame is dropped.
 *
 * Format: the best container the browser can actually record is used. Chrome and
 * Firefox record WebM (VP9/VP8 + Opus); Safari 17+ records MP4/H.264 natively and
 * is picked automatically when available. No transcoding is faked here - if you
 * want guaranteed MP4 everywhere, plug FFmpeg.wasm into `postProcess` below.
 */

/** Candidate containers, best first. */
const MIME_CANDIDATES = [
  'video/mp4;codecs=avc1.42E01E,mp4a.40.2', // Safari 17+
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp8,opus',
  'video/webm;codecs=h264,opus',
  'video/webm',
  'video/mp4',
];

export function isExportSupported() {
  return typeof MediaRecorder !== 'undefined'
    && typeof HTMLCanvasElement.prototype.captureStream === 'function';
}

export function getSupportedMimeType() {
  if (typeof MediaRecorder === 'undefined') return null;
  return MIME_CANDIDATES.find((type) => {
    try { return MediaRecorder.isTypeSupported(type); } catch { return false; }
  }) || null;
}

export const extensionFor = (mimeType) => (mimeType && mimeType.includes('mp4') ? 'mp4' : 'webm');

export class VideoExporter {
  constructor(renderer, audioEngine) {
    this.renderer = renderer;
    this.audioEngine = audioEngine;
    this.recording = false;
    this.cancelled = false;
  }

  /**
   * Record the whole video in real time.
   * @returns {Promise<{blob:Blob, mimeType:string, extension:string, duration:number}>}
   */
  async export({ fps = 30, trackId = null, onProgress = () => {} } = {}) {
    if (!isExportSupported()) {
      throw new Error('This browser cannot record video (MediaRecorder or captureStream is missing). Try Chrome, Edge or Firefox.');
    }
    if (this.recording) throw new Error('An export is already running.');

    const mimeType = getSupportedMimeType();
    if (!mimeType) throw new Error('No supported recording format was found in this browser.');

    const duration = this.renderer.duration;
    if (!duration) throw new Error('Nothing to export yet - create the video first.');

    const canvasStream = this.renderer.canvas.captureStream(fps);
    const tracks = [...canvasStream.getVideoTracks()];

    // Attach audio when a track is available - export stays silent otherwise.
    if (trackId && this.audioEngine?.supported) {
      const audioStream = this.audioEngine.getExportStream();
      if (audioStream) tracks.push(...audioStream.getAudioTracks());
    }

    const stream = new MediaStream(tracks);
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 8000000,
      audioBitsPerSecond: 128000,
    });

    const chunks = [];
    recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };

    this.recording = true;
    this.cancelled = false;
    this.recorder = recorder;

    const finished = new Promise((resolve, reject) => {
      recorder.onerror = (e) => reject(e.error || new Error('Recording failed.'));
      recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
    });

    recorder.start(200);
    if (trackId) await this.audioEngine.play(trackId, 0);

    const startedAt = performance.now();
    await new Promise((resolve) => {
      const tick = () => {
        const elapsed = (performance.now() - startedAt) / 1000;
        if (this.cancelled) return resolve();
        this.renderer.renderFrame(Math.min(elapsed, duration));
        onProgress(Math.min(elapsed / duration, 1));
        if (elapsed >= duration) return resolve();
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    // Give the recorder a beat to flush the final frames.
    await new Promise((r) => setTimeout(r, 220));
    if (recorder.state !== 'inactive') recorder.stop();
    this.audioEngine?.stop();
    canvasStream.getTracks().forEach((t) => t.stop());

    const blob = await finished;
    this.recording = false;
    this.recorder = null;

    const processed = await this.postProcess(blob, mimeType);
    return {
      blob: processed.blob,
      mimeType: processed.mimeType,
      extension: extensionFor(processed.mimeType),
      duration,
    };
  }

  /**
   * Upgrade hook. V1 returns the recorded blob untouched.
   * V2 can transcode WebM -> MP4 here (e.g. with FFmpeg.wasm) without touching
   * any other part of the app.
   */
  async postProcess(blob, mimeType) {
    return { blob, mimeType };
  }

  cancel() {
    this.cancelled = true;
    if (this.recorder && this.recorder.state !== 'inactive') this.recorder.stop();
    this.audioEngine?.stop();
    this.recording = false;
  }
}

/** joke-video-akash-rani.webm */
export function buildFileName(project, extension) {
  const names = project.people
    .filter((p) => p.src)
    .map((p) => (p.name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'))
    .filter(Boolean)
    .slice(0, 2)
    .join('-');
  return `joke-video${names ? `-${names}` : ''}.${extension}`;
}
