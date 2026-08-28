/**
 * templates.js
 * The template engine.
 *
 * A template is a complete recipe for a video: background, palette, where the
 * people stand, which props come for free, how the text behaves, how the camera
 * moves and how scenes are cut. Adding a new template is a matter of appending
 * one object to TEMPLATES - nothing else in the app needs to change.
 */

import { createCanvas, createRng, roundRect, starPath } from './utils.js';

/* ------------------------------------------------------------------ *
 * Character layouts (x / y are fractions of the frame, y = feet line)
 * ------------------------------------------------------------------ */
export const CHARACTER_LAYOUTS = {
  solo: [{ x: 0.5, y: 0.74, scale: 1.0 }],
  couple: [
    { x: 0.32, y: 0.74, scale: 0.92 },
    { x: 0.68, y: 0.74, scale: 0.92 },
  ],
  sideBySide: [
    { x: 0.25, y: 0.75, scale: 0.86 },
    { x: 0.75, y: 0.75, scale: 0.86 },
  ],
  center: [
    { x: 0.4, y: 0.74, scale: 0.9 },
    { x: 0.6, y: 0.74, scale: 0.9 },
  ],
  trio: [
    { x: 0.2, y: 0.76, scale: 0.72 },
    { x: 0.5, y: 0.73, scale: 0.82 },
    { x: 0.8, y: 0.76, scale: 0.72 },
  ],
  quad: [
    { x: 0.18, y: 0.7, scale: 0.6 },
    { x: 0.42, y: 0.76, scale: 0.68 },
    { x: 0.62, y: 0.7, scale: 0.6 },
    { x: 0.85, y: 0.76, scale: 0.68 },
  ],
};

/**
 * Pick the layout that suits the number of people. The template only expresses
 * a preference for two people; 1/3/4 always fall back to the matching layout.
 */
export function resolveLayout(templateOrName, peopleCount, override = null) {
  const preferred = override
    || (typeof templateOrName === 'string' ? templateOrName : templateOrName?.characterLayout)
    || 'couple';
  if (peopleCount <= 1) return CHARACTER_LAYOUTS.solo;
  if (peopleCount === 2) return CHARACTER_LAYOUTS[preferred] || CHARACTER_LAYOUTS.couple;
  if (peopleCount === 3) return CHARACTER_LAYOUTS.trio;
  return CHARACTER_LAYOUTS.quad;
}

/* ------------------------------------------------------------------ *
 * Procedural background painters (fallback when no JPG is supplied)
 * ------------------------------------------------------------------ */

function skyGradient(ctx, w, h, stops, height = 0.68) {
  const g = ctx.createLinearGradient(0, 0, 0, h * height);
  stops.forEach(([pos, color]) => g.addColorStop(pos, color));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function hills(ctx, w, h, baseY, color, amp = 0.06, offset = 0) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * baseY);
  for (let x = 0; x <= w; x += 20) {
    const y = h * baseY - Math.sin((x / w) * Math.PI * 2 + offset) * h * amp;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
}

function groundBand(ctx, w, h, fromY, stops) {
  const g = ctx.createLinearGradient(0, h * fromY, 0, h);
  stops.forEach(([pos, color]) => g.addColorStop(pos, color));
  ctx.fillStyle = g;
  ctx.fillRect(0, h * fromY, w, h * (1 - fromY));
}

function scatterDots(ctx, w, h, rng, count, area, color, rMin, rMax) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const x = rng.range(0, w);
    const y = rng.range(area[0] * h, area[1] * h);
    ctx.beginPath();
    ctx.arc(x, y, rng.range(rMin, rMax), 0, Math.PI * 2);
    ctx.fill();
  }
}

function paintGarden(ctx, w, h, rng) {
  skyGradient(ctx, w, h, [[0, '#ffd6e8'], [0.45, '#ffe9c7'], [1, '#cdeac0']]);
  // sun
  const sun = ctx.createRadialGradient(w * 0.76, h * 0.16, 10, w * 0.76, h * 0.16, h * 0.16);
  sun.addColorStop(0, 'rgba(255,247,205,0.95)');
  sun.addColorStop(1, 'rgba(255,247,205,0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h * 0.5);
  hills(ctx, w, h, 0.6, '#86efac', 0.05, 1.2);
  hills(ctx, w, h, 0.66, '#4ade80', 0.04, 2.6);
  groundBand(ctx, w, h, 0.72, [[0, '#22c55e'], [1, '#15803d']]);
  scatterDots(ctx, w, h, rng, 90, [0.72, 1], 'rgba(255,255,255,0.35)', 3, 9);
  scatterDots(ctx, w, h, rng, 40, [0.74, 1], 'rgba(251,113,133,0.55)', 4, 10);
}

function paintNightGarden(ctx, w, h, rng) {
  skyGradient(ctx, w, h, [[0, '#0b1026'], [0.5, '#1e1b4b'], [1, '#312e81']]);
  scatterDots(ctx, w, h, rng, 160, [0, 0.7], 'rgba(255,255,255,0.85)', 1.5, 4);
  const moon = ctx.createRadialGradient(w * 0.24, h * 0.16, 8, w * 0.24, h * 0.16, h * 0.13);
  moon.addColorStop(0, 'rgba(254,249,195,0.95)');
  moon.addColorStop(0.25, 'rgba(254,249,195,0.55)');
  moon.addColorStop(1, 'rgba(254,249,195,0)');
  ctx.fillStyle = moon;
  ctx.fillRect(0, 0, w, h * 0.45);
  hills(ctx, w, h, 0.64, '#14532d', 0.05, 0.6);
  groundBand(ctx, w, h, 0.72, [[0, '#166534'], [1, '#052e16']]);
  scatterDots(ctx, w, h, rng, 50, [0.7, 0.95], 'rgba(253,224,71,0.65)', 2, 5); // fireflies
}

function paintWedding(ctx, w, h, rng) {
  skyGradient(ctx, w, h, [[0, '#7f1d1d'], [0.5, '#b91c1c'], [1, '#f59e0b']]);
  // drape folds
  for (let i = 0; i < 10; i++) {
    const x = (i / 10) * w;
    ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
    ctx.fillRect(x, 0, w / 10, h * 0.62);
  }
  // golden arch
  ctx.strokeStyle = 'rgba(253,224,71,0.9)';
  ctx.lineWidth = 26;
  ctx.beginPath();
  ctx.arc(w / 2, h * 0.62, w * 0.42, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 8;
  ctx.stroke();
  groundBand(ctx, w, h, 0.7, [[0, '#fbbf24'], [1, '#b45309']]);
  scatterDots(ctx, w, h, rng, 60, [0.7, 1], 'rgba(255,255,255,0.25)', 4, 12);
}

function paintVillage(ctx, w, h, rng) {
  skyGradient(ctx, w, h, [[0, '#7dd3fc'], [0.55, '#bae6fd'], [1, '#fde68a']]);
  hills(ctx, w, h, 0.55, '#a3e635', 0.05, 0.4);
  // huts
  for (let i = 0; i < 3; i++) {
    const x = w * (0.16 + i * 0.32) + rng.range(-30, 30);
    const bw = w * 0.2, bh = h * 0.09;
    const y = h * 0.66;
    ctx.fillStyle = '#d6a066';
    ctx.fillRect(x - bw / 2, y - bh, bw, bh);
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.moveTo(x - bw * 0.62, y - bh);
    ctx.lineTo(x, y - bh * 2);
    ctx.lineTo(x + bw * 0.62, y - bh);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x - bw * 0.1, y - bh * 0.6, bw * 0.2, bh * 0.6);
  }
  groundBand(ctx, w, h, 0.7, [[0, '#65a30d'], [1, '#3f6212']]);
  scatterDots(ctx, w, h, rng, 70, [0.72, 1], 'rgba(250,204,21,0.4)', 3, 8);
}

function paintRoad(ctx, w, h) {
  skyGradient(ctx, w, h, [[0, '#fca5a5'], [0.4, '#fdba74'], [1, '#fed7aa']]);
  hills(ctx, w, h, 0.58, '#a16207', 0.04, 1.8);
  groundBand(ctx, w, h, 0.62, [[0, '#84cc16'], [1, '#4d7c0f']]);
  // perspective road
  ctx.fillStyle = '#3f3f46';
  ctx.beginPath();
  ctx.moveTo(w * 0.42, h * 0.62);
  ctx.lineTo(w * 0.58, h * 0.62);
  ctx.lineTo(w * 1.25, h);
  ctx.lineTo(w * -0.25, h);
  ctx.closePath();
  ctx.fill();
  // dashes
  ctx.fillStyle = '#fef08a';
  let y = h * 0.64, size = h * 0.008;
  while (y < h) {
    const scale = (y - h * 0.62) / (h * 0.38);
    ctx.fillRect(w / 2 - size * (1 + scale * 6) / 2, y, size * (1 + scale * 6), size * (2 + scale * 10));
    y += h * 0.03 * (1 + scale * 2.4);
    size = h * 0.008;
  }
}

function paintPark(ctx, w, h, rng) {
  skyGradient(ctx, w, h, [[0, '#60a5fa'], [0.5, '#bfdbfe'], [1, '#dcfce7']]);
  for (let i = 0; i < 6; i++) {
    const x = (i / 5) * w;
    const r = h * rng.range(0.05, 0.08);
    ctx.fillStyle = '#166534';
    ctx.fillRect(x - 8, h * 0.6, 16, h * 0.08);
    ctx.fillStyle = i % 2 ? '#16a34a' : '#22c55e';
    ctx.beginPath();
    ctx.arc(x, h * 0.58, r, 0, Math.PI * 2);
    ctx.fill();
  }
  groundBand(ctx, w, h, 0.68, [[0, '#4ade80'], [1, '#166534']]);
  // winding path
  ctx.fillStyle = 'rgba(214,211,209,0.85)';
  ctx.beginPath();
  ctx.moveTo(w * 0.44, h * 0.68);
  ctx.quadraticCurveTo(w * 0.3, h * 0.85, w * 0.12, h);
  ctx.lineTo(w * 0.72, h);
  ctx.quadraticCurveTo(w * 0.62, h * 0.82, w * 0.56, h * 0.68);
  ctx.closePath();
  ctx.fill();
}

function paintClassroom(ctx, w, h) {
  skyGradient(ctx, w, h, [[0, '#fef3c7'], [1, '#fde68a']], 1);
  // board
  ctx.fillStyle = '#14532d';
  roundRect(ctx, w * 0.08, h * 0.18, w * 0.84, h * 0.3, 24);
  ctx.fill();
  ctx.strokeStyle = '#a16207';
  ctx.lineWidth = 22;
  roundRect(ctx, w * 0.08, h * 0.18, w * 0.84, h * 0.3, 24);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.75)';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  [[0.16, 0.28, 0.5], [0.16, 0.34, 0.66], [0.16, 0.4, 0.4]].forEach(([x1, y, x2]) => {
    ctx.beginPath();
    ctx.moveTo(w * x1, h * y);
    ctx.lineTo(w * x2, h * y);
    ctx.stroke();
  });
  groundBand(ctx, w, h, 0.66, [[0, '#d6a066'], [1, '#92400e']]);
  // desk row
  ctx.fillStyle = '#a16207';
  for (let i = 0; i < 3; i++) {
    roundRect(ctx, w * (0.05 + i * 0.33), h * 0.86, w * 0.28, h * 0.06, 12);
    ctx.fill();
  }
}

function paintBedroom(ctx, w, h) {
  skyGradient(ctx, w, h, [[0, '#c7d2fe'], [1, '#e9d5ff']], 1);
  // wall pattern
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  for (let y = 0; y < h * 0.66; y += 90) {
    for (let x = (y / 90) % 2 ? 45 : 0; x < w; x += 90) {
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // window
  ctx.fillStyle = '#0ea5e9';
  roundRect(ctx, w * 0.58, h * 0.14, w * 0.32, h * 0.26, 18);
  ctx.fill();
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 16;
  roundRect(ctx, w * 0.58, h * 0.14, w * 0.32, h * 0.26, 18);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.74, h * 0.14);
  ctx.lineTo(w * 0.74, h * 0.4);
  ctx.stroke();
  groundBand(ctx, w, h, 0.66, [[0, '#f5d0fe'], [1, '#a78bfa']]);
  // bed
  ctx.fillStyle = '#fb7185';
  roundRect(ctx, w * 0.06, h * 0.78, w * 0.88, h * 0.16, 30);
  ctx.fill();
  ctx.fillStyle = '#fecdd3';
  roundRect(ctx, w * 0.1, h * 0.74, w * 0.26, h * 0.08, 22);
  ctx.fill();
}

function paintFunnyColorful(ctx, w, h, rng) {
  const g = ctx.createRadialGradient(w / 2, h * 0.45, 40, w / 2, h * 0.45, h * 0.7);
  g.addColorStop(0, '#fde047');
  g.addColorStop(0.5, '#fb7185');
  g.addColorStop(1, '#7c3aed');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // sunburst rays
  ctx.save();
  ctx.translate(w / 2, h * 0.45);
  for (let i = 0; i < 24; i++) {
    ctx.rotate((Math.PI * 2) / 24);
    ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.05)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(h, -h * 0.06);
    ctx.lineTo(h, h * 0.06);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
  // polka dots + stars
  scatterDots(ctx, w, h, rng, 40, [0, 1], 'rgba(255,255,255,0.28)', 8, 26);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  for (let i = 0; i < 10; i++) {
    starPath(ctx, rng.range(0, w), rng.range(0, h), 5, rng.range(16, 40), rng.range(6, 16));
    ctx.fill();
  }
}

function paintCustomFallback(ctx, w, h) {
  skyGradient(ctx, w, h, [[0, '#0f172a'], [0.5, '#1e293b'], [1, '#334155']], 1);
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  for (let y = 0; y < h; y += 120) ctx.fillRect(0, y, w, 4);
}

/* ------------------------------------------------------------------ *
 * The templates
 * ------------------------------------------------------------------ */
export const TEMPLATES = [
  {
    id: 'romanticGarden', label: 'Romantic Garden', emoji: '🌸',
    backgroundFile: 'garden.jpg', paint: paintGarden,
    characterLayout: 'couple', groundY: 0.74,
    props: ['grass', 'flowers', 'lamps', 'hearts'],
    textStyle: 'dramatic', camera: 'slowZoom', transition: 'fade',
    palette: { text: '#fff1f2', stroke: '#be123c', accent: '#f43f5e', band: '#be123c' },
    particles: 'hearts',
  },
  {
    id: 'nightGarden', label: 'Night Garden', emoji: '🌙',
    backgroundFile: 'night-garden.jpg', paint: paintNightGarden,
    characterLayout: 'couple', groundY: 0.74,
    props: ['grass', 'lamps', 'stars', 'moon'],
    textStyle: 'fade', camera: 'push', transition: 'fade',
    palette: { text: '#fef9c3', stroke: '#1e1b4b', accent: '#a78bfa', band: '#312e81' },
    particles: 'sparkles',
  },
  {
    id: 'wedding', label: 'Wedding', emoji: '💒',
    backgroundFile: 'wedding.jpg', paint: paintWedding,
    characterLayout: 'center', groundY: 0.76,
    props: ['flowers', 'wedding', 'hearts', 'sparkles'],
    textStyle: 'zoom', camera: 'slowZoom', transition: 'flash',
    palette: { text: '#fff7ed', stroke: '#7f1d1d', accent: '#fbbf24', band: '#991b1b' },
    particles: 'confetti',
  },
  {
    id: 'village', label: 'Village', emoji: '🏡',
    backgroundFile: 'village.jpg', paint: paintVillage,
    characterLayout: 'sideBySide', groundY: 0.78,
    props: ['grass', 'trees', 'bike', 'clouds'],
    textStyle: 'bounce', camera: 'drift', transition: 'slide',
    palette: { text: '#fffbeb', stroke: '#3f6212', accent: '#84cc16', band: '#4d7c0f' },
    particles: 'sparkles',
  },
  {
    id: 'road', label: 'Road', emoji: '🛣️',
    backgroundFile: 'road.jpg', paint: paintRoad,
    characterLayout: 'sideBySide', groundY: 0.8,
    props: ['car', 'clouds', 'stars'],
    textStyle: 'slide', camera: 'push', transition: 'slide',
    palette: { text: '#fff7ed', stroke: '#7c2d12', accent: '#fb923c', band: '#9a3412' },
    particles: 'confetti',
  },
  {
    id: 'park', label: 'Park', emoji: '🌳',
    backgroundFile: 'park.jpg', paint: paintPark,
    characterLayout: 'couple', groundY: 0.76,
    props: ['grass', 'trees', 'balloons', 'flowers'],
    textStyle: 'bounce', camera: 'slowZoom', transition: 'fade',
    palette: { text: '#f0fdf4', stroke: '#14532d', accent: '#22c55e', band: '#166534' },
    particles: 'sparkles',
  },
  {
    id: 'classroom', label: 'Classroom', emoji: '🏫',
    backgroundFile: 'classroom.jpg', paint: paintClassroom,
    characterLayout: 'sideBySide', groundY: 0.82,
    props: ['stars', 'sparkles'],
    textStyle: 'typewriter', camera: 'still', transition: 'slide',
    palette: { text: '#fffbeb', stroke: '#14532d', accent: '#facc15', band: '#166534' },
    particles: 'confetti',
  },
  {
    id: 'bedroom', label: 'Bedroom', emoji: '🛏️',
    backgroundFile: 'bedroom.jpg', paint: paintBedroom,
    characterLayout: 'center', groundY: 0.78,
    props: ['hearts', 'lamps', 'sparkles'],
    textStyle: 'fade', camera: 'drift', transition: 'fade',
    palette: { text: '#faf5ff', stroke: '#4c1d95', accent: '#c084fc', band: '#6d28d9' },
    particles: 'hearts',
  },
  {
    id: 'funnyColorful', label: 'Funny Colorful', emoji: '🤪',
    backgroundFile: 'funny.jpg', paint: paintFunnyColorful,
    characterLayout: 'center', groundY: 0.74,
    props: ['balloons', 'confetti', 'stars', 'hearts'],
    textStyle: 'bounce', camera: 'zoomOut', transition: 'flash',
    palette: { text: '#ffffff', stroke: '#7c3aed', accent: '#facc15', band: '#7c3aed' },
    particles: 'confetti',
  },
  {
    id: 'custom', label: 'Custom Background', emoji: '🖼️',
    backgroundFile: null, paint: paintCustomFallback,
    characterLayout: 'couple', groundY: 0.75,
    props: ['sparkles', 'hearts'],
    textStyle: 'dramatic', camera: 'slowZoom', transition: 'fade',
    palette: { text: '#ffffff', stroke: '#0f172a', accent: '#2DD4BF', band: '#0f172a' },
    particles: 'sparkles',
    custom: true,
  },
];

export const TEMPLATE_MAP = Object.fromEntries(TEMPLATES.map((t) => [t.id, t]));

export const getTemplate = (id) => TEMPLATE_MAP[id] || TEMPLATE_MAP.romanticGarden;

/** Render the procedural background once and cache it per template + seed. */
const backgroundCache = new Map();
export function createBackgroundCanvas(template, width, height, seed = 7) {
  const key = `${template.id}:${width}x${height}:${seed}`;
  if (backgroundCache.has(key)) return backgroundCache.get(key);
  const { canvas, ctx } = createCanvas(width, height);
  template.paint(ctx, width, height, createRng(seed + template.id.length * 31));
  backgroundCache.set(key, canvas);
  return canvas;
}
