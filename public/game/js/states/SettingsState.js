/**
 * SettingsState.js - music, sound, text speed, and the one destructive action
 * in the game (erasing the save), which always asks first.
 */

import { PAL } from '../gfx/Palette.js'
import { drawText, wrapText } from '../gfx/Font.js'
import { panel, cursor, divider } from '../ui/UIKit.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'
import { SaveManager } from '../systems/SaveManager.js'

export class SettingsState {
  constructor(game) {
    this.game = game
    this.name = 'SETTINGS'
    this.transparent = false
  }

  enter(params = {}) {
    this.index = 0
    this.time = 0
    this.fromTitle = Boolean(params.fromTitle)
    this.message = null
  }

  get rows() {
    const settings = this.game.settings
    const rows = [
      { id: 'music', label: 'Music', value: settings.music ? 'on' : 'off' },
      { id: 'sfx', label: 'Sound', value: settings.sfx ? 'on' : 'off' },
      { id: 'textSpeed', label: 'Text speed', value: settings.textSpeed },
    ]
    if (SaveManager.hasSave()) rows.push({ id: 'erase', label: 'Erase saved game', value: '' })
    rows.push({ id: 'back', label: 'Back', value: '' })
    return rows
  }

  update(dt, input) {
    this.time += dt
    const rows = this.rows
    if (input.repeat('down', dt)) {
      this.index = (this.index + 1) % rows.length
      this.game.audio.play('select')
    }
    if (input.repeat('up', dt)) {
      this.index = (this.index - 1 + rows.length) % rows.length
      this.game.audio.play('select')
    }
    const row = rows[this.index]
    const toggle = input.justPressed('confirm') || input.repeat('right', dt) || input.repeat('left', dt)
    if (!toggle) {
      if (input.justPressed('cancel') || input.justPressed('menu')) {
        this.game.audio.play('close')
        this.game.states.pop()
      }
      return
    }

    if (row.id === 'music') {
      this.game.settings.music = !this.game.settings.music
      this.game.applySettings()
      this.game.audio.play('confirm')
    } else if (row.id === 'sfx') {
      this.game.settings.sfx = !this.game.settings.sfx
      this.game.applySettings()
      this.game.audio.play('confirm')
    } else if (row.id === 'textSpeed') {
      const order = ['slow', 'normal', 'fast']
      const next = (order.indexOf(this.game.settings.textSpeed) + 1) % order.length
      this.game.settings.textSpeed = order[next]
      this.game.applySettings()
      this.game.audio.play('confirm')
    } else if (row.id === 'erase') {
      if (!input.justPressed('confirm')) return
      this.game.confirm('Erase the saved game? This cannot be undone.', (choice) => {
        if (choice !== 0) return
        SaveManager.clear()
        this.message = 'Saved game erased.'
        this.index = 0
        this.game.audio.play('bad')
      })
    } else if (row.id === 'back') {
      if (!input.justPressed('confirm')) return
      this.game.audio.play('close')
      this.game.states.pop()
    }
  }

  render(ctx) {
    ctx.fillStyle = PAL.uiBack
    ctx.fillRect(0, 0, VIEW_W, VIEW_H)
    ctx.fillStyle = PAL.uiBorder
    ctx.fillRect(0, 0, VIEW_W, 14)
    drawText(ctx, 'SETTINGS', VIEW_W / 2, 3, PAL.uiPanel, 'center')

    panel(ctx, 30, 24, 180, 104)
    this.rows.forEach((row, i) => {
      const y = 32 + i * 14
      if (i === this.index) cursor(ctx, 38, y, this.time)
      drawText(ctx, row.label, 46, y, i === this.index ? PAL.uiBorder : PAL.shadow)
      if (row.value) drawText(ctx, row.value, 198, y, PAL.grey, 'right')
    })
    divider(ctx, 38, 108, 164)
    const note = this.message || (SaveManager.available() ? '' : 'This browser is blocking storage, so saving is unavailable.')
    if (note) {
      wrapText(note, 164).forEach((line, i) => drawText(ctx, line, 38, 113 + i * 9, PAL.grey))
    }

    panel(ctx, 4, 141, 232, 15, { fill: PAL.uiPanel, shadow: false })
    drawText(ctx, 'Change: A or ← →    Back: B', 10, 145, PAL.grey)
  }
}
