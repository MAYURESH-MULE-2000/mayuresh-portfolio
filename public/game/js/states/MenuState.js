/**
 * MenuState.js
 * ---------------------------------------------------------------------------
 * The pause menu. Every row here does something now - there is no row waiting
 * on a feature that does not exist yet.
 */

import { PAL } from '../gfx/Palette.js'
import { drawText, wrapText } from '../gfx/Font.js'
import { panel, cursor, divider } from '../ui/UIKit.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'
import { understandingLevel } from '../systems/Progression.js'
import { SaveManager } from '../systems/SaveManager.js'

export class MenuState {
  constructor(game) {
    this.game = game
    this.name = 'MENU'
    this.transparent = true
  }

  enter() {
    this.index = 0
    this.time = 0
    this.note = null
  }

  resume() {
    this.note = null
  }

  get rows() {
    const rows = [
      { id: 'journal', label: 'Journal', hint: 'People, problems, links, notes.' },
      { id: 'status', label: 'Status', hint: 'What you have become, and what you are carrying.' },
    ]
    if (this.game.state.discovered.length >= 2) {
      rows.push({ id: 'compare', label: 'Compare', hint: 'Hold two problems side by side.' })
    }
    rows.push({ id: 'save', label: 'Save', hint: SaveManager.available() ? 'Write progress to this browser.' : 'Storage is blocked in this browser.' })
    rows.push({ id: 'settings', label: 'Settings', hint: 'Music, sound, text speed.' })
    rows.push({ id: 'title', label: 'Title screen', hint: 'Leave the ward. Unsaved progress is lost.' })
    rows.push({ id: 'close', label: 'Close', hint: 'Back to the street.' })
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
    if (input.justPressed('cancel') || input.justPressed('menu')) {
      this.game.audio.play('close')
      this.game.states.pop()
      return
    }
    if (input.justPressed('journal')) {
      this.game.states.pop()
      this.game.openJournal()
      return
    }
    if (!input.justPressed('confirm')) return

    const row = rows[this.index]
    this.game.audio.play('confirm')
    switch (row.id) {
      case 'journal':
        this.game.openJournal()
        break
      case 'status':
        this.game.openStatus()
        break
      case 'compare':
        this.game.openComparison(null, null)
        break
      case 'save': {
        const result = this.game.saveGame()
        this.note = result.ok
          ? 'Saved.'
          : result.reason === 'unavailable'
            ? 'This browser will not let the game store a save.'
            : 'Could not write the save - storage may be full.'
        this.game.audio.play(result.ok ? 'discover' : 'bad')
        break
      }
      case 'settings':
        this.game.openSettings()
        break
      case 'title':
        this.game.confirm('Return to the title screen? Anything since your last save is lost.', (choice) => {
          if (choice === 0) this.game.goToTitle()
        })
        break
      default:
        this.game.states.pop()
    }
  }

  render(ctx) {
    const game = this.game
    const state = game.state
    // dim the map behind, but keep it visible - you have not left the street
    ctx.globalAlpha = 0.55
    ctx.fillStyle = PAL.black
    ctx.fillRect(0, 0, VIEW_W, VIEW_H)
    ctx.globalAlpha = 1

    const rows = this.rows
    const w = 104
    const h = rows.length * 13 + 12
    panel(ctx, VIEW_W - w - 6, 6, w, h)
    rows.forEach((row, i) => {
      const y = 12 + i * 13
      if (i === this.index) cursor(ctx, VIEW_W - w, y, this.time)
      drawText(ctx, row.label, VIEW_W - w + 8, y, i === this.index ? PAL.uiBorder : PAL.shadow)
    })

    // context panel: who you are and what you have found so far
    panel(ctx, 6, 6, 118, 74)
    drawText(ctx, game.player.name, 12, 12, PAL.uiBorder)
    drawText(ctx, game.map.name, 12, 22, PAL.grey)
    divider(ctx, 12, 33, 106)
    drawText(ctx, `Problems  ${state.discovered.length}`, 12, 38, PAL.shadow)
    drawText(ctx, `People    ${state.metNpcs.length}`, 12, 48, PAL.shadow)
    drawText(ctx, `Links     ${(state.connections || []).length}`, 12, 58, PAL.shadow)
    drawText(ctx, `Level     ${understandingLevel(state)}`, 12, 68, PAL.shadow)

    // hint / result line
    panel(ctx, 6, 84, 118, 66)
    const text = this.note || rows[this.index].hint
    wrapText(text, 106).forEach((line, i) => drawText(ctx, line, 12, 90 + i * 10, PAL.shadow))
    const playtime = Math.floor(state.playtime || 0)
    const mm = String(Math.floor(playtime / 60)).padStart(2, '0')
    const ss = String(playtime % 60).padStart(2, '0')
    drawText(ctx, `${mm}:${ss}`, 118, 138, PAL.greyLight, 'right')
  }
}
