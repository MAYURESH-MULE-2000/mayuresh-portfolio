/**
 * renderer.js
 * The canvas renderer.
 *
 * build(project) resolves the project JSON into a concrete composition
 * (background, prop instances, people bitmaps, particle fields) and
 * renderFrame(time) paints one frame of it. renderFrame is pure with respect
 * to time, so the preview loop and the export loop share the same code path.
 */

import { getBackground, getPropSprite, loadPeopleImages } from './assets.js';
import { getProp, isParticleProp } from './props.js';
import { getTemplate } from './templates.js';
import { generateVideoScript, sceneAt } from './scenes.js';
import { readyPeople } from './state.js';
import {
  cameraTransform, characterState, createParticleField, particleState,
  propEntrance, propMotion, textState, transitionState,
} from './animation.js';
import {
  clamp, createRng, hashString, progress, roundRect, wrapLines, rgba, Ease,
} from './utils.js';

const FONT_STACK = '"Baloo 2", "Plus Jakarta Sans", "Noto Sans Devanagari", system-ui, sans-serif';

/* ------------------------------------------------------------------ *
 * Layout engine - decides x / y / scale / rotation / layer per prop
 * ------------------------------------------------------------------ */

function placeProp(prop, rng, template, index, total) {
  const groundY = template.groundY ?? 0.75;
  const base = {
    id: prop.id,
    variant: rng.int(0, 2),
    anim: prop.anim,
    layer: prop.layer,
    phase: rng.range(0, Math.PI * 2),
    flip: rng.chance(0.5),
    rotation: 0,
    anchor: 'center',
    opacity: 1,
  };
  const spread = (i, n, from, to) => from + ((i + 0.5) / n) * (to - from);
  const scale = rng.range(prop.scale[0], prop.scale[1]);

  switch (prop.placement) {
    case 'groundRow':
      return { ...base, anchor: 'bottom', x: spread(index, total, 0.04, 0.96) + rng.range(-0.03, 0.03),
        y: groundY + 0.06 + (index % 3) * 0.06 + rng.range(0, 0.08), scale: scale * 1.1 };
    case 'groundScatter':
      return { ...base, anchor: 'bottom', x: rng.range(0.06, 0.94),
        y: rng.range(groundY + 0.04, 0.99), scale, rotation: rng.range(-0.08, 0.08) };
    case 'groundSingle':
      return { ...base, anchor: 'bottom', x: rng.chance(0.5) ? 0.22 : 0.78,
        y: groundY + rng.range(0.1, 0.18), scale: scale * 1.1 };
    case 'sideAnchor':
      return { ...base, anchor: 'bottom', x: index % 2 === 0 ? rng.range(0.04, 0.14) : rng.range(0.86, 0.96),
        y: groundY + rng.range(0.02, 0.1), scale: scale * 1.2 };
    case 'hangTop':
      return { ...base, anchor: 'top', x: spread(index, total, 0.08, 0.92),
        y: rng.range(-0.02, 0.06), scale };
    case 'topBanner':
      return { ...base, anchor: 'top', x: 0.5, y: 0.0, scale: 1, layer: prop.layer, wide: true };
    case 'skyScatter':
      return { ...base, x: rng.range(0.04, 0.96), y: rng.range(0.04, 0.46), scale };
    case 'skyCorner':
      return { ...base, x: rng.chance(0.5) ? 0.22 : 0.78, y: rng.range(0.1, 0.2), scale };
    case 'skyDrift':
      return { ...base, x: spread(index, total, 0.1, 0.9), y: rng.range(0.08, 0.34), scale };
    case 'float':
    default:
      return { ...base, x: rng.range(0.08, 0.92), y: rng.range(0.25, 0.92), scale,
        rotation: rng.range(-0.3, 0.3) };
  }
}

/** Turn the selected prop ids into concrete, deterministic instances. */
export function buildPropLayout(project, template) {
  const rng = createRng(hashString(`${project.seed}:${project.props.join('|')}:${project.template}`));
  const instances = [];
  project.props.forEach((propId) => {
    const prop = getProp(propId);
    if (!prop || isParticleProp(propId)) return;
    const count = rng.int(prop.count[0], prop.count[1]);
    for (let i = 0; i < count; i++) instances.push(placeProp(prop, rng, template, i, count));
  });
  return instances.sort((a, b) => a.layer - b.layer);
}

/* ------------------------------------------------------------------ *
 * Renderer
 * ------------------------------------------------------------------ */

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.script = null;
    this.ready = false;
  }

  get duration() {
    return this.script?.duration || 0;
  }

  /** Resolve the project into everything renderFrame needs. */
  async build(project) {
    this.ready = false;
    this.project = project;
    this.template = getTemplate(project.template);
    this.script = generateVideoScript(project);
    this.canvas.width = project.width;
    this.canvas.height = project.height;

    this.background = await getBackground(project.template, {
      width: project.width,
      height: project.height,
      seed: project.seed,
      customSrc: project.customBackground,
    });

    this.people = await loadPeopleImages(readyPeople(project));
    this.propInstances = buildPropLayout(project, this.template);

    // Preload every sprite that the layout and the particle systems need.
    const spriteKeys = new Set(this.propInstances.map((i) => `${i.id}:${i.variant}`));
    const particleProp = this.template.particles || 'confetti';
    ['confetti', 'sparkles', 'hearts', 'stars', particleProp].forEach((id) => {
      if (getProp(id)) spriteKeys.add(`${id}:0`);
    });
    this.sprites = new Map();
    await Promise.all([...spriteKeys].map(async (key) => {
      const [id, variant] = key.split(':');
      this.sprites.set(key, await getPropSprite(id, Number(variant)));
    }));

    // Particle fields: ambient (user selected) + the punchline burst.
    const seed = hashString(`${project.seed}:particles`);
    this.ambientFields = project.props
      .filter((id) => isParticleProp(id))
      .map((id, i) => ({ id, particles: createParticleField(getProp(id).particles, seed + i * 17, 46) }));
    this.burstField = createParticleField('burst', seed + 91, 70);
    this.burstSprite = `${particleProp}:0`;

    if (document.fonts?.ready) {
      try { await document.fonts.ready; } catch { /* font loading is best effort */ }
    }
    this.ready = true;
    return this.script;
  }

  /* ---------------------------------------------------------------- *
   * Frame painting
   * ---------------------------------------------------------------- */

  renderFrame(time) {
    if (!this.ready) return;
    const { ctx, canvas } = this;
    const W = canvas.width;
    const H = canvas.height;
    const t = clamp(time, 0, this.script.duration);
    const scene = sceneAt(this.script, t);
    const localT = t - scene.start;
    const cam = cameraTransform(scene, localT);
    const trans = transitionState(scene, localT);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#0b1020';
    ctx.fillRect(0, 0, W, H);

    // ---- world (background + props + people) under the camera transform
    ctx.save();
    ctx.translate(W / 2 + cam.dx * W, H / 2 + cam.dy * H);
    ctx.rotate(cam.rotate);
    ctx.scale(cam.zoom, cam.zoom);
    ctx.translate(-W / 2, -H / 2);

    const worldAlpha = scene.kind === 'opening' ? progress(localT, 0, 0.6) : 1;
    ctx.globalAlpha = worldAlpha;
    if (this.background) ctx.drawImage(this.background, 0, 0, W, H);
    ctx.globalAlpha = 1;

    const behind = this.propInstances.filter((p) => p.layer < 60);
    const front = this.propInstances.filter((p) => p.layer >= 60);

    behind.forEach((inst, i) => this.drawPropInstance(inst, i, scene, localT, t, W, H));
    this.drawPeople(scene, localT, t, W, H);
    front.forEach((inst, i) => this.drawPropInstance(inst, i + behind.length, scene, localT, t, W, H));
    ctx.restore();

    // ---- overlays that stay locked to the frame
    this.drawAmbientParticles(t, W, H);
    if (scene.kind === 'punchline') this.drawBurst(localT, W, H);
    this.drawText(scene, localT, W, H);
    this.drawVignette(W, H);

    if (trans.flash > 0) {
      ctx.fillStyle = `rgba(255,255,255,${trans.flash})`;
      ctx.fillRect(0, 0, W, H);
    }
    const seamFade = 1 - trans.alpha;
    if (seamFade > 0.001) {
      ctx.fillStyle = `rgba(0,0,0,${seamFade * 0.85})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  drawPropInstance(inst, index, scene, localT, globalT, W, H) {
    const sprite = this.sprites.get(`${inst.id}:${inst.variant}`);
    if (!sprite) return;
    const { ctx } = this;
    const prop = getProp(inst.id);
    const entrance = propEntrance(scene, localT, index);
    if (entrance <= 0.001) return;
    const motion = propMotion(inst.anim, globalT, inst.phase);

    const baseW = inst.wide ? W : (prop.size[0] / 1080) * W * inst.scale;
    const baseH = inst.wide
      ? (prop.size[1] / prop.size[0]) * W
      : (prop.size[1] / 1080) * W * inst.scale;

    const x = inst.x * W + motion.dx;
    let y = inst.y * H + motion.dy;
    if (inst.anchor === 'bottom') y -= baseH / 2;
    if (inst.anchor === 'top') y += baseH / 2;

    ctx.save();
    ctx.globalAlpha = clamp(entrance * motion.alpha * inst.opacity, 0, 1);
    ctx.translate(x, y);
    ctx.rotate(inst.rotation + motion.rotate);
    const s = entrance * motion.scale;
    ctx.scale((inst.flip ? -1 : 1) * s, s);
    ctx.drawImage(sprite, -baseW / 2, -baseH / 2, baseW, baseH);
    ctx.restore();
  }

  drawPeople(scene, localT, globalT, W, H) {
    if (!scene.showPeople || !this.people.length) return;
    const { ctx } = this;
    const layout = this.script.layout;

    this.people.forEach((entry, i) => {
      const slot = layout[i] || layout[layout.length - 1];
      const state = characterState(scene, localT, i, globalT);
      if (state.opacity <= 0.001) return;

      const img = entry.image;
      const targetH = H * 0.42 * slot.scale * state.scale;
      const targetW = targetH * (img.width / img.height);
      const cx = (slot.x + state.dx) * W;
      const feetY = (slot.y + state.dy) * H;

      ctx.save();
      ctx.globalAlpha = clamp(state.opacity, 0, 1);

      // ground shadow keeps the cutout attached to the scene
      ctx.save();
      ctx.globalAlpha *= 0.28;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(cx, feetY + 6, targetW * 0.35, targetH * 0.035, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.translate(cx, feetY - targetH / 2);
      ctx.rotate(state.rotate);

      const hasAlpha = entry.person.hasTransparency;
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 12;

      if (hasAlpha) {
        ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
      } else {
        // Opaque photo: present it as a deliberate "sticker" cut-out.
        const pad = targetW * 0.045;
        ctx.fillStyle = '#ffffff';
        roundRect(ctx, -targetW / 2 - pad, -targetH / 2 - pad, targetW + pad * 2, targetH + pad * 2, targetW * 0.09);
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.save();
        roundRect(ctx, -targetW / 2, -targetH / 2, targetW, targetH, targetW * 0.07);
        ctx.clip();
        ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
        ctx.restore();
      }
      ctx.restore();

      // name tag under each person during the character scene
      if (scene.kind === 'characters' && localT > 0.9) {
        this.drawNameTag(this.script.people[i]?.name, cx, feetY + H * 0.022,
          W, clamp(progress(localT, 0.9, 1.4), 0, 1) * state.opacity);
      }
    });
  }

  drawNameTag(name, cx, cy, W, alpha) {
    if (!name || alpha <= 0.01) return;
    const { ctx } = this;
    const size = W * 0.045;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `700 ${size}px ${FONT_STACK}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const w = ctx.measureText(name).width + size * 1.1;
    const h = size * 1.6;
    ctx.fillStyle = rgba(this.template.palette.band, 0.92);
    roundRect(ctx, cx - w / 2, cy - h / 2, w, h, h / 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, cx, cy + size * 0.05);
    ctx.restore();
  }

  drawText(scene, localT, W, H) {
    if (!scene.text) return;
    const { ctx } = this;
    const style = textState(scene.textAnimation, localT, scene.duration);
    if (style.opacity <= 0.01) return;

    const isPunch = scene.kind === 'punchline';
    const size = W * (isPunch ? 0.115 : 0.082);
    ctx.save();
    ctx.font = `800 ${size}px ${FONT_STACK}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let text = scene.text;
    if (scene.textAnimation === 'typewriter') {
      text = text.slice(0, Math.ceil(text.length * style.reveal));
    }
    const lines = wrapLines(ctx, text, W * 0.84);
    const lineHeight = size * 1.22;
    const cx = W / 2 + style.dx * W + Math.sin(localT * 40) * style.shake * W;
    const cy = H * scene.textPosition + style.dy * H;

    ctx.globalAlpha = clamp(style.opacity, 0, 1);
    ctx.translate(cx, cy);
    ctx.rotate(style.rotate);
    ctx.scale(style.scale, style.scale);

    const totalH = lines.length * lineHeight;
    // decorative band behind the punchline
    if (isPunch) {
      ctx.save();
      ctx.rotate(-0.035);
      const bw = Math.min(W * 0.94, Math.max(...lines.map((l) => ctx.measureText(l).width)) + size * 1.2);
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = size * 0.5;
      ctx.shadowOffsetY = size * 0.12;
      ctx.fillStyle = this.template.palette.band;
      roundRect(ctx, -bw / 2, -totalH / 2 - size * 0.35, bw, totalH + size * 0.7, size * 0.35);
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = rgba('#ffffff', 0.65);
      ctx.lineWidth = size * 0.045;
      roundRect(ctx, -bw / 2, -totalH / 2 - size * 0.35, bw, totalH + size * 0.7, size * 0.35);
      ctx.stroke();
      ctx.restore();
    }

    lines.forEach((line, i) => {
      const y = -totalH / 2 + lineHeight * (i + 0.5);
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;
      ctx.lineWidth = size * 0.18;
      ctx.strokeStyle = this.template.palette.stroke;
      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = size * 0.25;
      ctx.shadowOffsetY = size * 0.08;
      ctx.strokeText(line, 0, y);
      ctx.shadowColor = 'transparent';
      const grad = ctx.createLinearGradient(0, y - size * 0.6, 0, y + size * 0.6);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(1, isPunch ? '#ffffff' : this.template.palette.text);
      ctx.fillStyle = grad;
      ctx.fillText(line, 0, y);
    });

    // blinking caret for the typewriter style
    if (scene.textAnimation === 'typewriter' && style.reveal < 1 && Math.floor(localT * 3) % 2 === 0) {
      const lastLine = lines[lines.length - 1] || '';
      const wLine = ctx.measureText(lastLine).width;
      ctx.fillStyle = this.template.palette.text;
      ctx.fillRect(wLine / 2 + size * 0.1, -totalH / 2 + lineHeight * (lines.length - 0.9), size * 0.08, size);
    }
    ctx.restore();
  }

  drawAmbientParticles(t, W, H) {
    if (!this.ambientFields?.length) return;
    const { ctx } = this;
    this.ambientFields.forEach((field) => {
      const sprite = this.sprites.get(`${field.id}:0`);
      if (!sprite) return;
      const prop = getProp(field.id);
      const size = (prop.size[0] / 1080) * W * 0.35;
      field.particles.forEach((p) => {
        const st = particleState(p, t);
        if (st.alpha <= 0.01) return;
        ctx.save();
        ctx.globalAlpha = clamp(st.alpha * 0.9, 0, 1);
        ctx.translate(st.x * W, st.y * H);
        ctx.rotate(st.rotate);
        const s = size * st.scale * (p.size * 22);
        ctx.drawImage(sprite, -s / 2, -s / 2, s, s);
        ctx.restore();
      });
    });
  }

  drawBurst(localT, W, H) {
    const sprite = this.sprites.get(this.burstSprite);
    if (!sprite) return;
    const { ctx } = this;
    const size = W * 0.09;
    this.burstField.forEach((p) => {
      const st = particleState(p, localT);
      if (st.alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = clamp(st.alpha, 0, 1);
      ctx.translate(st.x * W, st.y * H);
      ctx.rotate(st.rotate);
      const s = size * (0.6 + p.size * 8);
      ctx.drawImage(sprite, -s / 2, -s / 2, s, s);
      ctx.restore();
    });

    // emoji pop for the last beat
    const pop = Ease.outBack(progress(localT, 0.15, 0.9));
    if (pop > 0.01) {
      ctx.save();
      ctx.globalAlpha = clamp(1.4 - localT / 2.4, 0, 1);
      ctx.font = `${W * 0.16 * pop}px ${FONT_STACK}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('😂', W * 0.16, H * 0.62);
      ctx.fillText('🎉', W * 0.84, H * 0.66);
      ctx.restore();
    }
  }

  drawVignette(W, H) {
    const { ctx } = this;
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.32, W / 2, H / 2, H * 0.72);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.35)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
}
