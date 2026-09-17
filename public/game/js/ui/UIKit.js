/**
 * UIKit.js
 * ---------------------------------------------------------------------------
 * Shared window furniture: panels, bars, cursors, dividers. Every screen in the
 * game draws its chrome from here, which is what keeps the title, the dialogue
 * box, the journal and the encounter screen looking like one product.
 */

import { PAL } from '../gfx/Palette.js'
import { drawText, measure } from '../gfx/Font.js'

const px = (ctx, c, x, y, w, h) => {
  ctx.fillStyle = c
  ctx.fillRect(x, y, w, h)
}

/**
 * The standard window: a dark outer rule, a light inner rule, a cream field and
 * a one-pixel drop shadow. Corners are notched so it reads as a drawn frame
 * rather than a CSS box.
 */
export function panel(ctx, x, y, w, h, opts = {}) {
  const fill = opts.fill || PAL.uiPanel
  const border = opts.border || PAL.uiBorder
  const inner = opts.inner || PAL.uiPanelDark
  if (opts.shadow !== false) {
    ctx.globalAlpha = 0.35
    px(ctx, PAL.black, x + 2, y + 2, w, h)
    ctx.globalAlpha = 1
  }
  px(ctx, border, x, y, w, h)
  px(ctx, fill, x + 1, y + 1, w - 2, h - 2)
  // inner rule
  px(ctx, inner, x + 2, y + 2, w - 4, 1)
  px(ctx, inner, x + 2, y + h - 3, w - 4, 1)
  px(ctx, inner, x + 2, y + 2, 1, h - 4)
  px(ctx, inner, x + w - 3, y + 2, 1, h - 4)
  // corner notches
  px(ctx, fill, x, y, 1, 1)
  px(ctx, fill, x + w - 1, y, 1, 1)
  px(ctx, fill, x, y + h - 1, 1, 1)
  px(ctx, fill, x + w - 1, y + h - 1, 1, 1)
  px(ctx, border, x + 1, y + 1, 1, 1)
  px(ctx, border, x + w - 2, y + 1, 1, 1)
  px(ctx, border, x + 1, y + h - 2, 1, 1)
  px(ctx, border, x + w - 2, y + h - 2, 1, 1)
}

/** Dark variant used on the encounter screen and over the map at night. */
export function darkPanel(ctx, x, y, w, h, opts = {}) {
  panel(ctx, x, y, w, h, {
    fill: opts.fill || PAL.uiBack,
    border: opts.border || PAL.black,
    inner: opts.inner || PAL.shadow,
    shadow: opts.shadow,
  })
}

/** A panel with a title strip across the top. Returns the inner content top. */
export function titledPanel(ctx, x, y, w, h, title, opts = {}) {
  panel(ctx, x, y, w, h, opts)
  const accent = opts.accent || PAL.uiBorder
  px(ctx, accent, x + 3, y + 3, w - 6, 11)
  drawText(ctx, title, x + 6, y + 5, opts.titleColor || PAL.uiPanel)
  return y + 16
}

/** Horizontal rule inside a panel. */
export function divider(ctx, x, y, w, color = PAL.uiPanelDark) {
  px(ctx, color, x, y, w, 1)
}

/**
 * A segmented meter. Segments (rather than a smooth fill) keep it legible at
 * 240x160 and reinforce the handheld look.
 */
export function bar(ctx, x, y, w, h, value, color, opts = {}) {
  const max = opts.max === undefined ? 100 : opts.max
  const pct = Math.max(0, Math.min(1, value / max))
  px(ctx, opts.border || PAL.uiBorder, x, y, w, h)
  px(ctx, opts.track || PAL.shadow, x + 1, y + 1, w - 2, h - 2)
  const innerW = w - 2
  const filled = Math.round(innerW * pct)
  if (filled > 0) {
    px(ctx, color, x + 1, y + 1, filled, h - 2)
    // top highlight line
    px(ctx, opts.highlight || PAL.white, x + 1, y + 1, filled, 1)
    ctx.globalAlpha = 0.25
    px(ctx, PAL.black, x + 1, y + h - 2, filled, 1)
    ctx.globalAlpha = 1
  }
  // segment ticks every 10%
  if (opts.ticks !== false) {
    ctx.globalAlpha = 0.35
    for (let i = 1; i < 10; i++) {
      px(ctx, PAL.black, x + 1 + Math.round((innerW * i) / 10), y + 1, 1, h - 2)
    }
    ctx.globalAlpha = 1
  }
}

/** Blinking selection cursor. `t` is seconds since load. */
export function cursor(ctx, x, y, t, color = PAL.uiBorder) {
  const bob = Math.sin(t * 8) > 0 ? 0 : 1
  drawText(ctx, '▶', x + bob, y, color)
}

/**
 * A vertical list of options with a cursor. Returns the height it used.
 * Options may be plain strings or {label, enabled, note}.
 */
export function optionList(ctx, x, y, options, index, t, opts = {}) {
  const lineH = opts.lineH || 12
  const color = opts.color || PAL.uiBorder
  const disabled = opts.disabledColor || PAL.greyLight
  options.forEach((raw, i) => {
    const opt = typeof raw === 'string' ? { label: raw, enabled: true } : raw
    const enabled = opt.enabled !== false
    const ly = y + i * lineH
    if (i === index) cursor(ctx, x, ly, t, enabled ? color : disabled)
    drawText(ctx, opt.label, x + 7, ly, enabled ? color : disabled)
    if (opt.note) {
      drawText(ctx, opt.note, x + (opts.width || 100) - 2, ly, PAL.grey, 'right')
    }
  })
  return options.length * lineH
}

/** Screen-wide dim, used behind modal screens. */
export function dim(ctx, w, h, alpha = 0.55, color = PAL.black) {
  ctx.globalAlpha = alpha
  px(ctx, color, 0, 0, w, h)
  ctx.globalAlpha = 1
}

/** A small tag chip - category labels, quest status, etc. */
export function chip(ctx, x, y, label, color) {
  const w = measure(label) + 6
  px(ctx, color, x, y, w, 11)
  px(ctx, PAL.black, x, y + 10, w, 1)
  drawText(ctx, label, x + 3, y + 2, PAL.white)
  return w
}
