/**
 * Particles.js
 * ---------------------------------------------------------------------------
 * Ambient atmosphere per region: dust off the highway, haze over the city,
 * smoke from the estate chimneys, spray at the coast, leaves on the campus.
 *
 * Particles live in world coordinates so they move with the map rather than
 * sliding across the screen when the camera pans. The pool is fixed size and
 * reused, so a long session never allocates in the loop.
 */

import { PAL } from './Palette.js'

const TYPES = {
  dust: {
    rate: 14,
    life: [2.2, 4.5],
    vx: [10, 26],
    vy: [-4, 4],
    size: [1, 1],
    colors: ['#c4a377', '#d8bd8e', '#a98757'],
    alpha: 0.5,
    from: 'left',
  },
  haze: {
    rate: 5,
    life: [4, 7],
    vx: [4, 12],
    vy: [-3, 1],
    size: [2, 3],
    colors: ['#a59c8f', '#c6bcab'],
    alpha: 0.18,
    from: 'left',
  },
  smoke: {
    rate: 9,
    life: [2.5, 4],
    vx: [6, 16],
    vy: [-22, -12],
    size: [2, 3],
    colors: ['#6b6478', '#9a93a6', '#3a3347'],
    alpha: 0.35,
    from: 'anchors',
  },
  spray: {
    rate: 10,
    life: [1.2, 2.4],
    vx: [-14, -4],
    vy: [-16, -6],
    size: [1, 2],
    colors: ['#f6efe4', '#ded3c4', '#5b92ba'],
    alpha: 0.6,
    from: 'bottom',
  },
  leaves: {
    rate: 4,
    life: [3.5, 6],
    vx: [-10, 10],
    vy: [8, 16],
    size: [1, 2],
    colors: ['#5a9651', '#427a45', '#e8c04a'],
    alpha: 0.7,
    from: 'top',
  },
}

const MAX = 90
const rand = (a, b) => a + Math.random() * (b - a)

export class ParticleField {
  constructor() {
    this.type = null
    this.config = null
    this.anchors = []
    this.spawnDebt = 0
    // Fixed pool: every particle object is created once, here.
    this.pool = new Array(MAX).fill(null).map(() => ({
      alive: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 1,
      size: 1,
      color: '#ffffff',
      sway: 0,
    }))
  }

  /** Switch region. Anchors are world pixel positions (chimneys, vents). */
  setType(type, anchors = []) {
    if (this.type === type && anchors.length === this.anchors.length) return
    this.type = type || null
    this.config = type ? TYPES[type] || null : null
    this.anchors = anchors
    this.pool.forEach((p) => {
      p.alive = false
    })
    this.spawnDebt = 0
  }

  spawn(camX, camY, viewW, viewH) {
    const c = this.config
    const p = this.pool.find((q) => !q.alive)
    if (!p) return
    p.alive = true
    p.maxLife = rand(c.life[0], c.life[1])
    p.life = p.maxLife
    p.vx = rand(c.vx[0], c.vx[1])
    p.vy = rand(c.vy[0], c.vy[1])
    p.size = Math.round(rand(c.size[0], c.size[1]))
    p.color = c.colors[Math.floor(Math.random() * c.colors.length)]
    p.sway = Math.random() * Math.PI * 2

    switch (c.from) {
      case 'anchors': {
        if (!this.anchors.length) {
          p.alive = false
          return
        }
        const a = this.anchors[Math.floor(Math.random() * this.anchors.length)]
        p.x = a.x + rand(-2, 2)
        p.y = a.y + rand(-2, 2)
        break
      }
      case 'bottom':
        p.x = camX + rand(0, viewW)
        p.y = camY + viewH + rand(0, 12)
        break
      case 'top':
        p.x = camX + rand(0, viewW)
        p.y = camY - rand(0, 12)
        break
      default:
        p.x = camX - rand(0, 16)
        p.y = camY + rand(0, viewH)
    }
  }

  update(dt, camX, camY, viewW, viewH) {
    if (!this.config) return
    this.spawnDebt += this.config.rate * dt
    while (this.spawnDebt >= 1) {
      this.spawnDebt -= 1
      this.spawn(camX, camY, viewW, viewH)
    }
    for (const p of this.pool) {
      if (!p.alive) continue
      p.life -= dt
      if (p.life <= 0) {
        p.alive = false
        continue
      }
      p.sway += dt * 2
      p.x += (p.vx + Math.sin(p.sway) * 4) * dt
      p.y += p.vy * dt
      // cull generously outside the view so nothing pops in view
      if (p.x < camX - 40 || p.x > camX + viewW + 40 || p.y < camY - 40 || p.y > camY + viewH + 40) {
        p.alive = false
      }
    }
  }

  render(ctx, camX, camY) {
    if (!this.config) return
    const baseAlpha = this.config.alpha
    for (const p of this.pool) {
      if (!p.alive) continue
      // fade in and out rather than appearing and vanishing
      const t = p.life / p.maxLife
      const fade = t > 0.8 ? (1 - t) / 0.2 : Math.min(1, t / 0.3)
      ctx.globalAlpha = baseAlpha * fade
      ctx.fillStyle = p.color
      ctx.fillRect(Math.round(p.x - camX), Math.round(p.y - camY), p.size, p.size)
    }
    ctx.globalAlpha = 1
  }
}

/** A flat colour wash used to grade a region (haze, sea light, dusk). */
export function applyTint(ctx, tint, w, h) {
  if (!tint) return
  ctx.globalAlpha = tint.alpha === undefined ? 0.08 : tint.alpha
  ctx.fillStyle = tint.color || PAL.dusk
  ctx.fillRect(0, 0, w, h)
  ctx.globalAlpha = 1
}
