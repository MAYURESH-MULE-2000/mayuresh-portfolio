/**
 * animation.js
 * Every movement in the video is a pure function of time.
 *
 * That purity is what makes the exported file identical to the preview:
 * renderFrame(t) never depends on the previous frame.
 */

import { Ease, clamp, createRng, lerp, progress } from './utils.js';

/* ------------------------------------------------------------------ *
 * Camera
 * ------------------------------------------------------------------ */

/**
 * @returns {{zoom:number, dx:number, dy:number, rotate:number}} camera transform
 * expressed in frame fractions (dx/dy) around the centre of the canvas.
 */
export function cameraTransform(scene, localT) {
  const p = clamp(localT / scene.duration, 0, 1);
  const base = { zoom: 1, dx: 0, dy: 0, rotate: 0 };

  switch (scene.camera) {
    case 'slowZoom':
      base.zoom = lerp(1.02, 1.14, Ease.inOutQuad(p));
      break;
    case 'zoomOut':
      base.zoom = lerp(1.2, 1.0, Ease.outCubic(p));
      break;
    case 'push':
      base.zoom = lerp(1.0, 1.18, Ease.outCubic(p));
      base.dy = lerp(0.02, -0.01, p);
      break;
    case 'drift':
      base.zoom = 1.08;
      base.dx = Math.sin(p * Math.PI) * 0.035;
      base.dy = Math.cos(p * Math.PI * 0.8) * 0.012;
      break;
    case 'shakeZoom': {
      base.zoom = lerp(1.05, 1.22, Ease.outBack(clamp(p * 1.6, 0, 1)));
      const shake = Math.max(0, 1 - p * 1.9);
      base.dx = Math.sin(localT * 46) * 0.016 * shake;
      base.dy = Math.cos(localT * 39) * 0.014 * shake;
      base.rotate = Math.sin(localT * 33) * 0.012 * shake;
      break;
    }
    case 'still':
    default:
      base.zoom = 1.03;
  }
  return base;
}

/* ------------------------------------------------------------------ *
 * Scene transitions
 * ------------------------------------------------------------------ */

/** Opacity / flash overlay applied at the seams between scenes. */
export function transitionState(scene, localT) {
  const inDur = 0.5;
  const outDur = 0.45;
  const fadeIn = progress(localT, 0, inDur);
  const fadeOut = 1 - progress(localT, scene.duration - outDur, scene.duration);

  switch (scene.transition) {
    case 'flash':
      return { alpha: 1, flash: Math.max(0, 1 - localT / 0.35) * 0.75, slide: 0 };
    case 'slide':
      return { alpha: 1, flash: 0, slide: (1 - Ease.outCubic(fadeIn)) * 0.25 };
    case 'fade':
    default:
      return { alpha: Math.min(fadeIn, fadeOut < 0 ? 0 : 1), flash: 0, slide: 0 };
  }
}

/* ------------------------------------------------------------------ *
 * Text
 * ------------------------------------------------------------------ */

/**
 * @returns {{opacity:number, scale:number, dx:number, dy:number, rotate:number,
 *            reveal:number, shake:number}}
 * `reveal` is 0..1 and drives the typewriter effect.
 */
export function textState(style, localT, duration) {
  const inT = progress(localT, 0.15, 0.95);
  const outT = 1 - progress(localT, duration - 0.4, duration);
  const alpha = Math.min(inT, outT);
  const s = { opacity: alpha, scale: 1, dx: 0, dy: 0, rotate: 0, reveal: 1, shake: 0 };

  switch (style) {
    case 'fade':
      s.dy = (1 - Ease.outCubic(inT)) * 0.03;
      break;
    case 'zoom':
      s.scale = lerp(0.55, 1, Ease.outBack(inT));
      break;
    case 'typewriter':
      s.reveal = progress(localT, 0.2, Math.min(duration * 0.7, 2.2));
      s.opacity = outT;
      break;
    case 'bounce':
      s.dy = (1 - Ease.outBounce(inT)) * -0.12;
      s.scale = lerp(0.85, 1, Ease.outBack(inT));
      s.rotate = Math.sin(localT * 6) * 0.02 * (1 - inT * 0.6);
      break;
    case 'slide':
      s.dx = (1 - Ease.outCubic(inT)) * -0.6;
      break;
    case 'dramatic':
    default:
      s.scale = lerp(1.5, 1, Ease.outCubic(inT));
      s.opacity = alpha;
      s.shake = Math.max(0, 1 - progress(localT, 0.5, 1.1)) * 0.004;
      s.rotate = (1 - Ease.outCubic(inT)) * -0.05;
      break;
  }
  return s;
}

/* ------------------------------------------------------------------ *
 * Characters
 * ------------------------------------------------------------------ */

/**
 * Entrance + idle motion for one person.
 * @param index position of the person in the layout (drives the stagger)
 */
export function characterState(scene, localT, index, globalT) {
  const delay = index * 0.18;
  const t = Math.max(0, localT - delay);
  const state = { dx: 0, dy: 0, scale: 1, rotate: 0, opacity: 1 };

  // idle "breathing" - always on, keeps the collage alive
  const breathe = Math.sin(globalT * 1.9 + index * 1.3) * 0.012;
  const floatY = Math.sin(globalT * 1.4 + index * 0.9) * 0.006;
  const tilt = Math.sin(globalT * 1.1 + index * 2.1) * 0.018;

  if (scene.entrance === 'slide') {
    const p = Ease.outBack(progress(t, 0, 0.9));
    const fromLeft = index % 2 === 0;
    state.dx = (1 - p) * (fromLeft ? -0.55 : 0.55);
    state.opacity = progress(t, 0, 0.35);
    state.scale = lerp(0.85, 1, p);
  } else if (scene.entrance === 'settle') {
    state.opacity = 1;
    state.scale = 1;
  } else {
    state.opacity = progress(t, 0, 0.4);
  }

  if (scene.effects?.includes('characterBounce')) {
    const b = Math.abs(Math.sin(globalT * 3.4 + index * 1.7));
    state.dy -= b * 0.02;
    state.rotate += Math.sin(globalT * 3.4 + index) * 0.05;
  }

  if (scene.kind === 'punchline') {
    const pop = Ease.outElastic(progress(localT, 0, 0.8));
    state.scale *= lerp(0.9, 1.06, pop);
  }

  state.scale *= 1 + breathe;
  state.dy += floatY;
  state.rotate += tilt;
  return state;
}

/* ------------------------------------------------------------------ *
 * Props
 * ------------------------------------------------------------------ */

/** Idle motion applied to a laid out prop instance. */
export function propMotion(anim, globalT, phase = 0) {
  const m = { dx: 0, dy: 0, rotate: 0, scale: 1, alpha: 1 };
  switch (anim) {
    case 'sway':
      m.rotate = Math.sin(globalT * 1.6 + phase) * 0.05;
      break;
    case 'swing':
      m.rotate = Math.sin(globalT * 1.1 + phase) * 0.12;
      break;
    case 'bob':
      m.dy = Math.sin(globalT * 1.2 + phase) * 12;
      break;
    case 'drift':
      m.dx = Math.sin(globalT * 0.35 + phase) * 90;
      break;
    case 'twinkle':
      m.alpha = 0.45 + 0.55 * Math.abs(Math.sin(globalT * 2.2 + phase));
      m.scale = 0.9 + 0.15 * Math.sin(globalT * 2.6 + phase);
      break;
    case 'rise':
      m.dy = -((globalT * 60 + phase * 220) % 900);
      m.dx = Math.sin(globalT * 1.4 + phase) * 40;
      m.alpha = 0.35 + 0.65 * Math.abs(Math.sin(globalT * 0.6 + phase));
      break;
    case 'drive':
      m.dx = Math.sin(globalT * 0.5 + phase) * 150;
      m.dy = Math.abs(Math.sin(globalT * 6)) * -6;
      break;
    default:
      break;
  }
  return m;
}

/** Entrance progress for props (they pop in during the first scene). */
export function propEntrance(scene, localT, index) {
  if (scene.kind === 'opening') {
    return Ease.outCubic(progress(localT, 0.25 + index * 0.05, 1.4 + index * 0.05));
  }
  if (scene.effects?.includes('propsPop')) {
    return Ease.outBack(progress(localT, index * 0.04, 0.6 + index * 0.04));
  }
  return 1;
}

/* ------------------------------------------------------------------ *
 * Particles - analytic, so any frame can be computed on demand
 * ------------------------------------------------------------------ */

/**
 * Create a deterministic particle field.
 * @param {'confetti'|'hearts'|'sparkles'|'burst'} kind
 */
export function createParticleField(kind, seed, count = 60) {
  const rng = createRng(seed);
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      kind,
      x: rng(),
      y: rng(),
      size: rng.range(0.02, 0.06),
      speed: rng.range(0.15, 0.5),
      drift: rng.range(-0.25, 0.25),
      spin: rng.range(-4, 4),
      phase: rng.range(0, Math.PI * 2),
      angle: rng.range(0, Math.PI * 2),
      power: rng.range(0.35, 1.1),
      hue: rng.int(0, 5),
      delay: rng.range(0, 0.4),
    });
  }
  return particles;
}

/**
 * Position/opacity of a particle at time `t` seconds after the field started.
 * Coordinates are frame fractions.
 */
export function particleState(p, t) {
  const tt = Math.max(0, t - p.delay);
  switch (p.kind) {
    case 'confetti': {
      const y = (p.y + tt * p.speed) % 1.25 - 0.15;
      return {
        x: p.x + Math.sin(tt * 2 + p.phase) * 0.05,
        y,
        rotate: p.phase + tt * p.spin,
        scale: 1,
        alpha: clamp(1.1 - y, 0, 1),
      };
    }
    case 'hearts': {
      const y = 1.1 - ((p.y + tt * p.speed * 0.6) % 1.3);
      return {
        x: p.x + Math.sin(tt * 1.6 + p.phase) * 0.06,
        y,
        rotate: Math.sin(tt * 1.4 + p.phase) * 0.3,
        scale: 0.8 + Math.sin(tt * 2 + p.phase) * 0.15,
        alpha: clamp(Math.min(y * 2.2, (1.05 - y) * 2.4), 0, 1),
      };
    }
    case 'sparkles': {
      const tw = Math.abs(Math.sin(tt * 3 + p.phase));
      return { x: p.x, y: p.y, rotate: p.phase + tt * 0.6, scale: 0.6 + tw * 0.7, alpha: tw };
    }
    case 'burst':
    default: {
      const d = p.power * tt * 0.9;
      return {
        x: 0.5 + Math.cos(p.angle) * d * 0.9,
        y: 0.5 + Math.sin(p.angle) * d * 0.9 + tt * tt * 0.22,
        rotate: p.phase + tt * p.spin,
        scale: 1,
        alpha: clamp(1.4 - tt * 0.85, 0, 1),
      };
    }
  }
}
