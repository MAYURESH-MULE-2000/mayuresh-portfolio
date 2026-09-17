/**
 * StatusState.js
 * ---------------------------------------------------------------------------
 * Two pages: what the player has become (attributes and what each one unlocks)
 * and what they are carrying. Both read straight from world state.
 */

import { PAL } from '../gfx/Palette.js'
import { drawText, wrapText } from '../gfx/Font.js'
import { panel, bar, cursor, divider } from '../ui/UIKit.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'
import { ATTRIBUTES, UNLOCKS, understandingLevel } from '../systems/Progression.js'
import { World } from '../systems/WorldState.js'
import { getItem } from '../../data/items.js'

const PAGES = ['Attributes', 'Carrying']

export class StatusState {
  constructor(game) {
    this.game = game
    this.name = 'STATUS'
    this.transparent = false
  }

  enter(params = {}) {
    this.page = params.page || 0
    this.index = 0
    this.time = 0
  }

  get items() {
    return (this.game.state.items || []).map((id) => getItem(id)).filter(Boolean)
  }

  update(dt, input) {
    this.time += dt
    if (input.justPressed('cancel') || input.justPressed('menu')) {
      this.game.audio.play('close')
      this.game.states.pop()
      return
    }
    if (input.repeat('left', dt) || input.repeat('right', dt)) {
      this.page = (this.page + 1) % PAGES.length
      this.index = 0
      this.game.audio.play('select')
    }
    if (this.page === 1 && this.items.length) {
      if (input.repeat('down', dt)) {
        this.index = (this.index + 1) % this.items.length
        this.game.audio.play('select')
      }
      if (input.repeat('up', dt)) {
        this.index = (this.index - 1 + this.items.length) % this.items.length
        this.game.audio.play('select')
      }
    }
  }

  render(ctx) {
    ctx.fillStyle = PAL.uiBack
    ctx.fillRect(0, 0, VIEW_W, VIEW_H)
    ctx.fillStyle = PAL.uiBorder
    ctx.fillRect(0, 0, VIEW_W, 14)
    drawText(ctx, '←', 6, 3, PAL.uiAccent)
    drawText(ctx, PAGES[this.page].toUpperCase(), VIEW_W / 2, 3, PAL.uiPanel, 'center')
    drawText(ctx, '→', VIEW_W - 12, 3, PAL.uiAccent)

    if (this.page === 0) this.renderAttributes(ctx)
    else this.renderItems(ctx)

    panel(ctx, 4, 141, 232, 15, { fill: PAL.uiPanel, shadow: false })
    drawText(ctx, 'Change page: ← →    Back: B', 10, 145, PAL.grey)
  }

  renderAttributes(ctx) {
    const state = this.game.state
    panel(ctx, 4, 17, 232, 122)
    drawText(ctx, `${this.game.player.name} · understanding level ${understandingLevel(state)}`, 12, 23, PAL.uiBorder)
    divider(ctx, 12, 34, 216)
    ATTRIBUTES.forEach((attr, i) => {
      const y = 39 + i * 12
      const value = World.stat(state, attr.key)
      drawText(ctx, attr.label, 12, y, PAL.shadow)
      bar(ctx, 86, y, 90, 8, Math.min(10, value), PAL.uiAccent, { max: 10, ticks: false, track: PAL.uiPanelDark })
      drawText(ctx, String(value), 182, y, PAL.grey)
    })
    divider(ctx, 12, 100, 216)
    const next = UNLOCKS.find((u) => World.stat(state, u.stat) < u.at)
    const line = next
      ? `Next: ${next.label} at ${next.stat} ${next.at}. ${next.detail}`
      : 'Every approach unlocked. The rest is what you do with it.'
    wrapText(line, 212)
      .slice(0, 4)
      .forEach((text, i) => drawText(ctx, text, 12, 105 + i * 9, PAL.grey))
  }

  renderItems(ctx) {
    panel(ctx, 4, 17, 232, 122)
    const items = this.items
    if (!items.length) {
      drawText(ctx, 'Nothing on you.', 12, 24, PAL.grey)
      return
    }
    items.forEach((item, i) => {
      const y = 23 + i * 12
      if (i === this.index) cursor(ctx, 10, y, this.time)
      drawText(ctx, item.name, 18, y, i === this.index ? PAL.uiBorder : PAL.shadow)
    })
    const selected = items[this.index]
    const top = 23 + items.length * 12 + 4
    divider(ctx, 12, top, 216)
    wrapText(selected.description, 212).forEach((line, i) => drawText(ctx, line, 12, top + 6 + i * 10, PAL.shadow))
    const usageY = top + 6 + wrapText(selected.description, 212).length * 10 + 4
    wrapText(selected.usage, 212).forEach((line, i) => drawText(ctx, line, 12, usageY + i * 10, PAL.blueDark))
  }
}
