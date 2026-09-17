/**
 * ConfirmState.js - a small yes/no box. Used for saving, overwriting a save and
 * anything else where doing the thing by accident would be annoying.
 */

import { PAL } from '../gfx/Palette.js'
import { drawText, wrapText } from '../gfx/Font.js'
import { panel, cursor, dim } from '../ui/UIKit.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'

export class ConfirmState {
  constructor(game) {
    this.game = game
    this.name = 'CONFIRM'
    this.transparent = true
    this.time = 0
  }

  enter(params) {
    this.lines = wrapText(params.text || '', 180)
    this.options = params.options || ['Yes', 'No']
    this.index = params.defaultIndex || 0
    this.onResolve = params.onResolve || (() => {})
    this.time = 0
  }

  update(dt, input) {
    this.time += dt
    if (input.repeat('up', dt) || input.repeat('left', dt)) {
      this.index = (this.index - 1 + this.options.length) % this.options.length
      this.game.audio.play('select')
    }
    if (input.repeat('down', dt) || input.repeat('right', dt)) {
      this.index = (this.index + 1) % this.options.length
      this.game.audio.play('select')
    }
    if (input.justPressed('confirm')) {
      const chosen = this.index
      this.game.audio.play('confirm')
      this.game.states.pop()
      this.onResolve(chosen)
    } else if (input.justPressed('cancel')) {
      this.game.audio.play('cancel')
      this.game.states.pop()
      this.onResolve(-1)
    }
  }

  render(ctx) {
    dim(ctx, VIEW_W, VIEW_H, 0.45)
    const h = 30 + this.lines.length * 11 + this.options.length * 12
    const w = 196
    const x = Math.round((VIEW_W - w) / 2)
    const y = Math.round((VIEW_H - h) / 2)
    panel(ctx, x, y, w, h)
    this.lines.forEach((line, i) => drawText(ctx, line, x + 10, y + 10 + i * 11, PAL.uiBorder))
    const oy = y + 16 + this.lines.length * 11
    this.options.forEach((opt, i) => {
      const ly = oy + i * 12
      if (i === this.index) cursor(ctx, x + 12, ly, this.time)
      drawText(ctx, opt, x + 20, ly, i === this.index ? PAL.uiBorder : PAL.grey)
    })
  }
}
