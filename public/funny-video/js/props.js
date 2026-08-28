/**
 * props.js
 * The decorative prop library.
 *
 * Every prop knows three things:
 *   1. how it is presented in the UI (label + emoji),
 *   2. where its optional PNG lives on disk (assets/props/<file>),
 *   3. how to paint itself procedurally when that PNG is missing.
 *
 * The procedural painter is what makes the app work with zero binary assets:
 * drop a real transparent PNG in /assets/props and it is used instead.
 */

import { createCanvas, heartPath, starPath, roundRect, createRng } from './utils.js';

/* ------------------------------------------------------------------ *
 * Painters - each draws a sprite into a w x h transparent canvas.
 * ------------------------------------------------------------------ */

function paintGrass(ctx, w, h, rng) {
  const blades = 26;
  for (let i = 0; i < blades; i++) {
    const x = (i / blades) * w + rng.range(-6, 6);
    const bh = rng.range(h * 0.45, h);
    const lean = rng.range(-18, 18);
    const g = ctx.createLinearGradient(x, h, x, h - bh);
    g.addColorStop(0, '#166534');
    g.addColorStop(1, rng.chance(0.25) ? '#a3e635' : '#4ade80');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x - 5, h);
    ctx.quadraticCurveTo(x + lean * 0.4, h - bh * 0.6, x + lean, h - bh);
    ctx.quadraticCurveTo(x + lean * 0.5, h - bh * 0.5, x + 5, h);
    ctx.closePath();
    ctx.fill();
  }
}

function paintFlowers(ctx, w, h, rng) {
  const palette = ['#f43f5e', '#fb7185', '#f59e0b', '#a855f7', '#ec4899', '#fde047'];
  const stems = 3;
  for (let s = 0; s < stems; s++) {
    const x = w * (0.2 + s * 0.3) + rng.range(-8, 8);
    const top = h * rng.range(0.18, 0.4);
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = w * 0.035;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, h);
    ctx.quadraticCurveTo(x + rng.range(-20, 20), h * 0.6, x, top);
    ctx.stroke();

    // leaf
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(x + 14, h * 0.62, w * 0.09, w * 0.04, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // petals
    const color = rng.pick(palette);
    const petals = 6;
    const r = w * 0.11;
    for (let p = 0; p < petals; p++) {
      const a = (p / petals) * Math.PI * 2;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(x + Math.cos(a) * r, top + Math.sin(a) * r, r * 0.85, r * 0.6, a, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(x, top, r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
}

function paintLamp(ctx, w, h) {
  const cx = w / 2;
  // hanging cord
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = w * 0.05;
  ctx.beginPath();
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, h * 0.22);
  ctx.stroke();

  // glow
  const glow = ctx.createRadialGradient(cx, h * 0.58, 2, cx, h * 0.58, w * 0.85);
  glow.addColorStop(0, 'rgba(253, 224, 71, 0.85)');
  glow.addColorStop(1, 'rgba(253, 224, 71, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // lantern body
  const g = ctx.createLinearGradient(cx - w * 0.3, 0, cx + w * 0.3, 0);
  g.addColorStop(0, '#b91c1c');
  g.addColorStop(0.5, '#f97316');
  g.addColorStop(1, '#b91c1c');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(cx, h * 0.24);
  ctx.bezierCurveTo(cx + w * 0.42, h * 0.34, cx + w * 0.42, h * 0.76, cx, h * 0.88);
  ctx.bezierCurveTo(cx - w * 0.42, h * 0.76, cx - w * 0.42, h * 0.34, cx, h * 0.24);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fde047';
  roundRect(ctx, cx - w * 0.3, h * 0.46, w * 0.6, h * 0.1, h * 0.05);
  ctx.fill();

  // tassel
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = w * 0.035;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * w * 0.05, h * 0.86);
    ctx.lineTo(cx + i * w * 0.08, h);
    ctx.stroke();
  }
}

function paintHeart(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#fb7185');
  g.addColorStop(1, '#e11d48');
  ctx.fillStyle = g;
  heartPath(ctx, w / 2, h / 2, Math.min(w, h) * 0.92);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.beginPath();
  ctx.ellipse(w * 0.36, h * 0.36, w * 0.1, h * 0.06, -0.6, 0, Math.PI * 2);
  ctx.fill();
}

function paintStar(ctx, w, h) {
  const g = ctx.createRadialGradient(w / 2, h / 2, 1, w / 2, h / 2, w / 2);
  g.addColorStop(0, '#fff7cc');
  g.addColorStop(0.6, '#fde047');
  g.addColorStop(1, '#f59e0b');
  ctx.fillStyle = g;
  starPath(ctx, w / 2, h / 2, 5, w * 0.48, w * 0.2);
  ctx.fill();
}

function paintBalloon(ctx, w, h, rng) {
  const color = rng.pick(['#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#f59e0b', '#ec4899']);
  ctx.strokeStyle = 'rgba(255,255,255,0.75)';
  ctx.lineWidth = Math.max(2, w * 0.02);
  ctx.beginPath();
  ctx.moveTo(w / 2, h * 0.66);
  ctx.quadraticCurveTo(w * 0.66, h * 0.82, w / 2, h);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(w / 2, h * 0.36, w * 0.36, h * 0.34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w / 2 - w * 0.06, h * 0.68);
  ctx.lineTo(w / 2 + w * 0.06, h * 0.68);
  ctx.lineTo(w / 2, h * 0.74);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.beginPath();
  ctx.ellipse(w * 0.38, h * 0.24, w * 0.08, h * 0.07, -0.5, 0, Math.PI * 2);
  ctx.fill();
}

function paintTree(ctx, w, h, rng) {
  ctx.fillStyle = '#7c3f1d';
  roundRect(ctx, w / 2 - w * 0.06, h * 0.55, w * 0.12, h * 0.45, w * 0.03);
  ctx.fill();
  const blobs = [
    [0.5, 0.32, 0.34], [0.32, 0.45, 0.24], [0.68, 0.45, 0.24], [0.5, 0.52, 0.28],
  ];
  blobs.forEach(([bx, by, br], i) => {
    const g = ctx.createRadialGradient(w * bx, h * by, 2, w * bx, h * by, w * br);
    g.addColorStop(0, i % 2 ? '#4ade80' : '#22c55e');
    g.addColorStop(1, '#15803d');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(w * bx, h * by, w * br, 0, Math.PI * 2);
    ctx.fill();
  });
  // a couple of mangoes for flavour
  ctx.fillStyle = '#fbbf24';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(w * rng.range(0.3, 0.7), h * rng.range(0.35, 0.55), w * 0.035, 0, Math.PI * 2);
    ctx.fill();
  }
}

function paintBike(ctx, w, h) {
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = w * 0.035;
  const r = h * 0.28;
  const y = h * 0.68;
  [w * 0.24, w * 0.76].forEach((cx) => {
    ctx.beginPath();
    ctx.arc(cx, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.save();
    ctx.strokeStyle = 'rgba(148,163,184,0.9)';
    ctx.lineWidth = w * 0.012;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, y);
      ctx.lineTo(cx + Math.cos(a) * r, y + Math.sin(a) * r);
      ctx.stroke();
    }
    ctx.restore();
  });
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = w * 0.04;
  ctx.beginPath();
  ctx.moveTo(w * 0.24, y);
  ctx.lineTo(w * 0.45, h * 0.36);
  ctx.lineTo(w * 0.68, h * 0.38);
  ctx.lineTo(w * 0.76, y);
  ctx.moveTo(w * 0.45, h * 0.36);
  ctx.lineTo(w * 0.52, y);
  ctx.lineTo(w * 0.76, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.66, h * 0.36);
  ctx.lineTo(w * 0.82, h * 0.28);
  ctx.stroke();
}

function paintCar(ctx, w, h) {
  const body = ctx.createLinearGradient(0, h * 0.3, 0, h * 0.8);
  body.addColorStop(0, '#38bdf8');
  body.addColorStop(1, '#0284c7');
  ctx.fillStyle = body;
  roundRect(ctx, w * 0.06, h * 0.44, w * 0.88, h * 0.3, h * 0.12);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w * 0.26, h * 0.46);
  ctx.quadraticCurveTo(w * 0.42, h * 0.16, w * 0.66, h * 0.2);
  ctx.quadraticCurveTo(w * 0.76, h * 0.24, w * 0.8, h * 0.46);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.moveTo(w * 0.32, h * 0.44);
  ctx.quadraticCurveTo(w * 0.44, h * 0.24, w * 0.62, h * 0.26);
  ctx.lineTo(w * 0.7, h * 0.44);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(w * 0.92, h * 0.56, w * 0.035, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#111827';
  [[0.28, 0.76], [0.74, 0.76]].forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(w * cx, h * cy, h * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#9ca3af';
    ctx.beginPath();
    ctx.arc(w * cx, h * cy, h * 0.07, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111827';
  });
}

function paintMoon(ctx, w, h) {
  const glow = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w / 2);
  glow.addColorStop(0, 'rgba(254, 249, 195, 0.55)');
  glow.addColorStop(1, 'rgba(254, 249, 195, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#fef9c3';
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, w * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(w * 0.62, h * 0.42, w * 0.26, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

function paintCloud(ctx, w, h) {
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  const puffs = [[0.3, 0.6, 0.22], [0.48, 0.46, 0.28], [0.68, 0.6, 0.2], [0.55, 0.68, 0.22]];
  puffs.forEach(([cx, cy, r]) => {
    ctx.beginPath();
    ctx.arc(w * cx, h * cy, w * r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillRect(w * 0.28, h * 0.6, w * 0.44, h * 0.22);
}

function paintWedding(ctx, w, h, rng) {
  // marigold torana (hanging garland strand)
  ctx.strokeStyle = '#65a30d';
  ctx.lineWidth = h * 0.03;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.12);
  ctx.quadraticCurveTo(w / 2, h * 0.5, w, h * 0.12);
  ctx.stroke();
  const count = 14;
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const x = t * w;
    const y = (1 - t) * (h * 0.12) + t * (h * 0.12) + Math.sin(Math.PI * t) * h * 0.32;
    const r = h * rng.range(0.06, 0.1);
    const g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, i % 2 ? '#fde047' : '#fb923c');
    g.addColorStop(1, i % 2 ? '#f59e0b' : '#ea580c');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    if (i % 3 === 0) {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(x, y + r * 1.8, r * 0.3, r * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function paintConfetti(ctx, w, h, rng) {
  const colors = ['#f43f5e', '#facc15', '#22d3ee', '#a855f7', '#4ade80', '#fb923c'];
  for (let i = 0; i < 12; i++) {
    ctx.save();
    ctx.translate(rng.range(0, w), rng.range(0, h));
    ctx.rotate(rng.range(0, Math.PI));
    ctx.fillStyle = rng.pick(colors);
    ctx.fillRect(-w * 0.05, -w * 0.02, w * 0.1, w * 0.04);
    ctx.restore();
  }
}

function paintSparkle(ctx, w, h) {
  const g = ctx.createRadialGradient(w / 2, h / 2, 1, w / 2, h / 2, w / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#ffffff';
  starPath(ctx, w / 2, h / 2, 4, w * 0.48, w * 0.08);
  ctx.fill();
}

/* ------------------------------------------------------------------ *
 * Library definition
 * ------------------------------------------------------------------ *
 * placement decides how the layout engine spreads the prop across the
 * 1080x1920 frame; layer decides the painting order.
 */
export const PROP_LIBRARY = [
  {
    id: 'grass', label: 'Grass', emoji: '🌿', file: 'grass.png',
    layer: 55, placement: 'groundRow', count: [7, 10], scale: [0.9, 1.3],
    anim: 'sway', size: [260, 200], paint: paintGrass,
  },
  {
    id: 'flowers', label: 'Flowers', emoji: '🌹', file: 'flowers.png',
    layer: 52, placement: 'groundScatter', count: [5, 8], scale: [0.75, 1.15],
    anim: 'sway', size: [260, 300], paint: paintFlowers,
  },
  {
    id: 'lamps', label: 'Lamps', emoji: '🏮', file: 'lamp.png',
    layer: 22, placement: 'hangTop', count: [3, 5], scale: [0.85, 1.2],
    anim: 'swing', size: [220, 380], paint: paintLamp,
  },
  {
    id: 'hearts', label: 'Hearts', emoji: '❤️', file: 'heart.png',
    layer: 70, placement: 'float', count: [5, 8], scale: [0.45, 0.95],
    anim: 'rise', size: [200, 200], paint: paintHeart,
  },
  {
    id: 'stars', label: 'Stars', emoji: '⭐', file: 'star.png',
    layer: 18, placement: 'skyScatter', count: [8, 14], scale: [0.35, 0.8],
    anim: 'twinkle', size: [160, 160], paint: paintStar,
  },
  {
    id: 'balloons', label: 'Balloons', emoji: '🎈', file: 'balloons.png',
    layer: 26, placement: 'float', count: [4, 7], scale: [0.8, 1.3],
    anim: 'rise', size: [220, 340], paint: paintBalloon,
  },
  {
    id: 'trees', label: 'Trees', emoji: '🌳', file: 'tree.png',
    layer: 20, placement: 'sideAnchor', count: [2, 3], scale: [1.1, 1.6],
    anim: 'sway', size: [420, 560], paint: paintTree,
  },
  {
    id: 'bike', label: 'Bike', emoji: '🚲', file: 'bike.png',
    layer: 40, placement: 'groundSingle', count: [1, 1], scale: [1, 1.2],
    anim: 'drive', size: [420, 300], paint: paintBike,
  },
  {
    id: 'car', label: 'Car', emoji: '🚗', file: 'car.png',
    layer: 38, placement: 'groundSingle', count: [1, 1], scale: [1.1, 1.4],
    anim: 'drive', size: [480, 280], paint: paintCar,
  },
  {
    id: 'moon', label: 'Moon', emoji: '🌙', file: 'moon.png',
    layer: 12, placement: 'skyCorner', count: [1, 1], scale: [1, 1.3],
    anim: 'bob', size: [420, 420], paint: paintMoon,
  },
  {
    id: 'clouds', label: 'Clouds', emoji: '☁️', file: 'cloud.png',
    layer: 14, placement: 'skyDrift', count: [3, 5], scale: [0.9, 1.6],
    anim: 'drift', size: [420, 260], paint: paintCloud,
  },
  {
    id: 'wedding', label: 'Wedding Decor', emoji: '💒', file: 'wedding.png',
    layer: 24, placement: 'topBanner', count: [1, 2], scale: [1, 1],
    anim: 'swing', size: [1080, 320], paint: paintWedding,
  },
  {
    id: 'confetti', label: 'Confetti', emoji: '🎊', file: 'confetti.png',
    layer: 84, placement: 'ambientParticles', count: [1, 1], scale: [1, 1],
    anim: 'none', size: [300, 300], paint: paintConfetti,
    particles: 'confetti',
  },
  {
    id: 'sparkles', label: 'Sparkles', emoji: '✨', file: 'sparkle.png',
    layer: 82, placement: 'ambientParticles', count: [1, 1], scale: [1, 1],
    anim: 'none', size: [200, 200], paint: paintSparkle,
    particles: 'sparkles',
  },
];

export const PROP_MAP = Object.fromEntries(PROP_LIBRARY.map((p) => [p.id, p]));

export const getProp = (id) => PROP_MAP[id] || null;

/** Ids of props that only feed the particle system (nothing is laid out). */
export const isParticleProp = (id) => !!PROP_MAP[id]?.particles;

/**
 * Build the fallback sprite for a prop. Deterministic per (prop, variant)
 * so repeated renders are pixel identical.
 */
export function createPropSprite(prop, variant = 0) {
  const [w, h] = prop.size;
  const { canvas, ctx } = createCanvas(w, h);
  const rng = createRng(1000 + variant * 97 + prop.id.length * 13);
  prop.paint(ctx, w, h, rng);
  return canvas;
}
