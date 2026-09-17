/**
 * Sprites.js
 * ---------------------------------------------------------------------------
 * Every human being in the game is drawn by one routine, `paintPerson`, from a
 * small description (skin, hair style, clothing, accessory). That single
 * routine is why the whole cast shares proportions, outline weight and lighting
 * instead of looking like sprites borrowed from different games.
 *
 * Sprite cell is 16x20: the extra 4px above a 16x16 tile is head room, so a
 * character standing on a tile reads as taller than the tile they occupy.
 */

import { PAL } from './Palette.js'

export const SPR_W = 16
export const SPR_H = 20
export const DIRS = ['down', 'up', 'left', 'right']
export const FRAMES = 4 // idle, step A, idle, step B

const p = (ctx, c, x, y, w = 1, h = 1) => {
  ctx.fillStyle = c
  ctx.fillRect(x, y, w, h)
}

/** Slightly darker version of a hex colour, for outlines and folds. */
function darken(hex, amount = 0.3) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, Math.round(((n >> 16) & 255) * (1 - amount)))
  const g = Math.max(0, Math.round(((n >> 8) & 255) * (1 - amount)))
  const b = Math.max(0, Math.round((n & 255) * (1 - amount)))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

function lighten(hex, amount = 0.25) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.round(((n >> 16) & 255) + 255 * amount))
  const g = Math.min(255, Math.round(((n >> 8) & 255) + 255 * amount))
  const b = Math.min(255, Math.round((n & 255) + 255 * amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

/**
 * Paint one frame of a character into the current 16x20 cell.
 *
 * @param {object} o   {skin, hair, hairStyle, top, bottom, outfit, accessory}
 * @param {string} dir 'down' | 'up' | 'left' | 'right'
 * @param {number} frame 0..3
 */
export function paintPerson(ctx, o, dir, frame) {
  const skin = o.skin || PAL.skinA
  const skinShade = darken(skin, 0.22)
  const hair = o.hair || PAL.hair
  const hairShade = darken(hair, 0.35)
  const top = o.top || PAL.blue
  const topShade = darken(top, 0.3)
  const topLight = lighten(top, 0.12)
  const bottom = o.bottom || PAL.ink
  const bottomShade = darken(bottom, 0.3)
  const outfit = o.outfit || 'shirt'
  const style = o.hairStyle || 'short'
  const ink = PAL.ink

  // Walk cycle: legs swap on frames 1 and 3, whole body bobs 1px on those.
  const step = frame === 1 ? 1 : frame === 3 ? -1 : 0
  const bob = step !== 0 ? 1 : 0

  // ---- ground shadow -----------------------------------------------------
  ctx.globalAlpha = 0.28
  p(ctx, PAL.black, 4, 18, 8, 2)
  p(ctx, PAL.black, 3, 19, 10, 1)
  ctx.globalAlpha = 1

  const yOff = bob

  // ---- legs / lower body -------------------------------------------------
  if (outfit === 'saree' || outfit === 'dress') {
    // A long garment: flared hem instead of separate legs.
    p(ctx, bottom, 4, 13 + yOff, 8, 5)
    p(ctx, bottom, 3, 15 + yOff, 10, 3)
    p(ctx, bottomShade, 3, 17 + yOff, 10, 1)
    p(ctx, bottomShade, 7, 14 + yOff, 1, 4)
    p(ctx, lighten(bottom, 0.18), 5, 14 + yOff, 1, 3)
    // hem border, offset by the walk step so the garment sways
    p(ctx, o.accent || PAL.yellow, 3 + (step > 0 ? 1 : 0), 16 + yOff, 10, 1)
    p(ctx, skinShade, 5, 18, 2, 1)
    p(ctx, skinShade, 9, 18, 2, 1)
  } else {
    const lA = 15 + yOff
    p(ctx, bottom, 4, 13 + yOff, 8, 5)
    p(ctx, bottomShade, 7, 13 + yOff, 1, 5)
    // left leg
    p(ctx, bottom, 4, lA, 3, 3 - (step > 0 ? 1 : 0))
    // right leg
    p(ctx, bottom, 9, lA, 3, 3 - (step < 0 ? 1 : 0))
    p(ctx, bottomShade, 4, 17, 3, 1)
    p(ctx, bottomShade, 9, 17, 3, 1)
    // shoes
    p(ctx, ink, 4, 18 - (step > 0 ? 1 : 0), 3, 1)
    p(ctx, ink, 9, 18 - (step < 0 ? 1 : 0), 3, 1)
  }

  // ---- torso -------------------------------------------------------------
  const ty = 9 + yOff
  p(ctx, top, 4, ty, 8, 5)
  p(ctx, topShade, 4, ty + 4, 8, 1)
  p(ctx, topLight, 5, ty, 2, 3)
  if (outfit === 'kurta') {
    // long shirt with a placket
    p(ctx, top, 4, ty + 5, 8, 2)
    p(ctx, topShade, 7, ty + 1, 1, 6)
    p(ctx, lighten(top, 0.3), 6, ty + 1, 1, 3)
  } else if (outfit === 'uniform') {
    p(ctx, PAL.white, 4, ty, 8, 3)
    p(ctx, PAL.concreteLight, 4, ty + 2, 8, 1)
    p(ctx, topShade, 7, ty, 1, 5)
  } else if (outfit === 'saree') {
    // pallu draped over one shoulder
    p(ctx, o.accent || PAL.yellow, 8, ty, 3, 5)
    p(ctx, darken(o.accent || PAL.yellow, 0.3), 10, ty, 1, 5)
  }

  // ---- arms --------------------------------------------------------------
  const armY = ty + 1
  const armSwing = step
  if (dir === 'left') {
    p(ctx, top, 5, armY - armSwing, 2, 3)
    p(ctx, skin, 5, armY + 3 - armSwing, 2, 2)
  } else if (dir === 'right') {
    p(ctx, top, 9, armY + armSwing, 2, 3)
    p(ctx, skin, 9, armY + 3 + armSwing, 2, 2)
  } else {
    p(ctx, top, 3, armY - armSwing, 2, 3)
    p(ctx, skin, 3, armY + 3 - armSwing, 2, 2)
    p(ctx, top, 11, armY + armSwing, 2, 3)
    p(ctx, skin, 11, armY + 3 + armSwing, 2, 2)
  }

  // ---- neck & head -------------------------------------------------------
  const hy = 2 + yOff
  p(ctx, skinShade, 6, hy + 6, 4, 2)
  p(ctx, skin, 4, hy, 8, 7)
  p(ctx, skinShade, 4, hy + 6, 8, 1)
  p(ctx, skinShade, 4, hy, 1, 7)
  p(ctx, lighten(skin, 0.12), 5, hy + 1, 2, 2)

  // ---- hair --------------------------------------------------------------
  const backOfHead = dir === 'up'
  p(ctx, hair, 4, hy - 1, 8, 3)
  p(ctx, hairShade, 4, hy + 1, 8, 1)
  p(ctx, lighten(hair, 0.18), 6, hy - 1, 3, 1)
  if (style === 'short') {
    p(ctx, hair, 3, hy, 1, 3)
    p(ctx, hair, 12, hy, 1, 3)
  } else if (style === 'bun') {
    p(ctx, hair, 3, hy, 1, 4)
    p(ctx, hair, 12, hy, 1, 4)
    p(ctx, hair, 6, hy - 3, 4, 2)
    p(ctx, hairShade, 6, hy - 3, 4, 1)
  } else if (style === 'long') {
    p(ctx, hair, 3, hy, 1, 7)
    p(ctx, hair, 12, hy, 1, 7)
    p(ctx, hairShade, 3, hy + 5, 1, 2)
    p(ctx, hairShade, 12, hy + 5, 1, 2)
    if (backOfHead) p(ctx, hair, 4, hy, 8, 8)
  } else if (style === 'braid') {
    p(ctx, hair, 3, hy, 1, 5)
    p(ctx, hair, 12, hy, 1, 5)
    if (backOfHead) {
      p(ctx, hair, 4, hy, 8, 7)
      p(ctx, hairShade, 7, hy + 3, 2, 8)
    } else {
      p(ctx, hairShade, 12, hy + 4, 1, 4)
    }
  } else if (style === 'cap') {
    p(ctx, o.capColor || PAL.red, 3, hy - 2, 10, 3)
    p(ctx, darken(o.capColor || PAL.red, 0.3), 3, hy, 10, 1)
    if (dir === 'down') p(ctx, darken(o.capColor || PAL.red, 0.35), 3, hy + 1, 10, 1)
    p(ctx, hair, 3, hy + 1, 1, 2)
    p(ctx, hair, 12, hy + 1, 1, 2)
  } else if (style === 'bald') {
    p(ctx, skin, 4, hy - 1, 8, 3)
    p(ctx, lighten(skin, 0.1), 6, hy - 1, 3, 1)
    p(ctx, hair, 3, hy + 2, 1, 3)
    p(ctx, hair, 12, hy + 2, 1, 3)
  } else if (style === 'turban') {
    p(ctx, o.capColor || PAL.saffron, 3, hy - 3, 10, 5)
    p(ctx, darken(o.capColor || PAL.saffron, 0.25), 3, hy - 1, 10, 1)
    p(ctx, lighten(o.capColor || PAL.saffron, 0.2), 5, hy - 3, 4, 1)
    p(ctx, darken(o.capColor || PAL.saffron, 0.3), 3, hy + 1, 10, 1)
  }

  // ---- face --------------------------------------------------------------
  if (!backOfHead) {
    const ey = hy + 3
    if (dir === 'down') {
      p(ctx, ink, 6, ey, 1, 2)
      p(ctx, ink, 9, ey, 1, 2)
      p(ctx, skinShade, 7, ey + 2, 2, 1)
    } else if (dir === 'left') {
      p(ctx, ink, 5, ey, 1, 2)
      p(ctx, skinShade, 4, ey + 2, 2, 1)
    } else if (dir === 'right') {
      p(ctx, ink, 10, ey, 1, 2)
      p(ctx, skinShade, 10, ey + 2, 2, 1)
    }
    if (o.accessory === 'glasses') {
      p(ctx, PAL.shadow, 5, ey - 1, 6, 1)
      p(ctx, PAL.shadow, 5, ey, 1, 2)
      p(ctx, PAL.shadow, 10, ey, 1, 2)
      p(ctx, PAL.greyLight, 6, ey, 1, 1)
      p(ctx, PAL.greyLight, 9, ey, 1, 1)
    }
    if (o.accessory === 'beard') {
      p(ctx, hairShade, 5, hy + 5, 6, 2)
      p(ctx, hair, 6, hy + 6, 4, 1)
    }
  }

  // ---- accessories -------------------------------------------------------
  if (o.accessory === 'bag' && dir !== 'up') {
    p(ctx, PAL.dirtDark, 5, ty, 1, 4)
    p(ctx, PAL.brickDark, 10, ty + 3, 4, 4)
    p(ctx, PAL.brick, 11, ty + 4, 2, 2)
  } else if (o.accessory === 'bag') {
    p(ctx, PAL.brickDark, 5, ty + 1, 6, 5)
    p(ctx, PAL.brick, 6, ty + 2, 4, 3)
  }
  if (o.accessory === 'dupatta') {
    p(ctx, o.accent || PAL.pink, 3, ty, 2, 6)
    p(ctx, darken(o.accent || PAL.pink, 0.25), 3, ty + 5, 2, 1)
    p(ctx, o.accent || PAL.pink, 5, ty, 6, 1)
  }
  if (o.accessory === 'headload' && dir !== 'up') {
    p(ctx, PAL.dirtDark, 4, hy - 5, 8, 3)
    p(ctx, PAL.dirt, 5, hy - 5, 6, 1)
  }
}

// ---------------------------------------------------------------------------
// Sprite sheet baking: one row per direction, one column per frame.
// ---------------------------------------------------------------------------
const sheets = new Map()

export function buildCharacterSheet(id, look) {
  if (sheets.has(id)) return sheets.get(id)
  const c = document.createElement('canvas')
  c.width = SPR_W * FRAMES
  c.height = SPR_H * DIRS.length
  const ctx = c.getContext('2d')
  ctx.imageSmoothingEnabled = false
  DIRS.forEach((dir, row) => {
    for (let f = 0; f < FRAMES; f++) {
      ctx.save()
      ctx.translate(f * SPR_W, row * SPR_H)
      ctx.beginPath()
      ctx.rect(0, 0, SPR_W, SPR_H)
      ctx.clip()
      paintPerson(ctx, look, dir, f)
      ctx.restore()
    }
  })
  sheets.set(id, c)
  return c
}

/** Draw a character frame with its feet at (x, y + TILE). */
export function drawCharacter(ctx, id, look, dir, frame, x, y) {
  const sheet = buildCharacterSheet(id, look)
  const row = Math.max(0, DIRS.indexOf(dir))
  const col = ((frame % FRAMES) + FRAMES) % FRAMES
  ctx.drawImage(sheet, col * SPR_W, row * SPR_H, SPR_W, SPR_H, Math.round(x), Math.round(y), SPR_W, SPR_H)
}

/** Portrait used by the dialogue box: the character's face, scaled up 2x. */
export function drawPortrait(ctx, id, look, x, y, scale = 2) {
  const sheet = buildCharacterSheet(id, look)
  ctx.save()
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(sheet, 0, 0, SPR_W, 12, x, y, SPR_W * scale, 12 * scale)
  ctx.restore()
}
