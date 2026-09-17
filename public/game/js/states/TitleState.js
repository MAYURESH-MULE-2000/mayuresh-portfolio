/**
 * TitleState.js
 * ---------------------------------------------------------------------------
 * The title screen, drawn rather than composited: a dusk sky, a silhouetted
 * small-town skyline with water tanks and antennas, wires with birds on them,
 * and the road the game starts on. All of it original, all of it painted with
 * the same palette as the world.
 */

import { PAL } from '../gfx/Palette.js'
import { drawText, drawTextScaled } from '../gfx/Font.js'
import { panel, cursor } from '../ui/UIKit.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'
import { SaveManager } from '../systems/SaveManager.js'

/** Stable pseudo-random skyline so the title looks the same every load. */
function rng(seed) {
  let a = seed
  return () => {
    a = (a * 1664525 + 1013904223) % 4294967296
    return a / 4294967296
  }
}

const SKYLINE = (() => {
  const r = rng(20240917)
  const buildings = []
  let x = -4
  while (x < VIEW_W + 8) {
    const w = 16 + Math.floor(r() * 22)
    const h = 16 + Math.floor(r() * 30)
    const windows = []
    for (let wy = 0; wy < Math.floor(h / 9); wy++) {
      for (let wx = 0; wx < Math.floor(w / 8); wx++) {
        if (r() > 0.45) windows.push({ x: wx * 8 + 3, y: wy * 9 + 5, lit: r() > 0.45 })
      }
    }
    buildings.push({
      x,
      w,
      h,
      windows,
      tank: r() > 0.55,
      antenna: r() > 0.6,
    })
    x += w + 1 + Math.floor(r() * 3)
  }
  return buildings
})()

const BIRDS = [
  { x: 40, y: 30 },
  { x: 52, y: 30 },
  { x: 61, y: 30 },
  { x: 150, y: 24 },
  { x: 162, y: 24 },
]

export class TitleState {
  constructor(game) {
    this.game = game
    this.name = 'TITLE'
    this.transparent = false
  }

  enter() {
    this.time = 0
    this.index = 0
    this.saveSummary = SaveManager.summary()
    this.game.audio.playMusic('title')
  }

  resume() {
    this.saveSummary = SaveManager.summary()
    this.game.audio.playMusic('title')
    this.game.input.clear()
  }

  get rows() {
    const rows = [{ id: 'new', label: 'NEW GAME' }]
    if (this.saveSummary) {
      rows.splice(0, 0, { id: 'continue', label: 'CONTINUE' })
      rows.push({ id: 'journal', label: 'JOURNAL' })
    }
    rows.push({ id: 'settings', label: 'SETTINGS' })
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
    if (!input.justPressed('confirm')) return

    const row = rows[this.index]
    this.game.audio.play('confirm')
    switch (row.id) {
      case 'continue':
        this.game.continueGame()
        break
      case 'new':
        if (this.saveSummary) {
          this.game.confirm('Start a new game? The existing save will be overwritten when you next save.', (choice) => {
            if (choice === 0) this.game.newGame()
          })
        } else {
          this.game.newGame()
        }
        break
      case 'journal':
        this.game.reviewSavedJournal()
        break
      default:
        this.game.openSettings(true)
    }
  }

  render(ctx) {
    this.renderSky(ctx)
    this.renderSkyline(ctx)
    this.renderForeground(ctx)
    this.renderTitle(ctx)
    this.renderMenu(ctx)
  }

  renderSky(ctx) {
    // banded dusk gradient, dithered at each seam so it stays pixel art
    const bands = [
      [PAL.skyDeep, 0, 26],
      ['#5a7fa8', 26, 20],
      [PAL.sky, 46, 16],
      ['#c8a06e', 62, 12],
      [PAL.dusk, 74, 12],
    ]
    bands.forEach(([color, y, h]) => {
      ctx.fillStyle = color
      ctx.fillRect(0, y, VIEW_W, h)
    })
    bands.forEach(([color, y]) => {
      if (y === 0) return
      ctx.fillStyle = color
      for (let x = 0; x < VIEW_W; x += 2) ctx.fillRect(x, y - 1, 1, 1)
    })
    // sun sinking behind the town
    const sunY = 74
    ctx.fillStyle = PAL.yellow
    ctx.fillRect(176, sunY, 18, 12)
    ctx.fillRect(178, sunY - 2, 14, 16)
    ctx.fillStyle = '#f2d98a'
    ctx.fillRect(180, sunY + 1, 8, 5)

    // slow clouds
    const drift = (this.time * 4) % (VIEW_W + 80)
    ctx.fillStyle = '#8fa8c4'
    ctx.fillRect(-60 + drift, 18, 34, 3)
    ctx.fillRect(-52 + drift, 15, 20, 3)
    ctx.fillRect(-140 + drift, 34, 26, 3)
  }

  renderSkyline(ctx) {
    const base = 124
    SKYLINE.forEach((b) => {
      const top = base - b.h
      ctx.fillStyle = PAL.ink
      ctx.fillRect(b.x, top, b.w, b.h)
      ctx.fillStyle = PAL.shadow
      ctx.fillRect(b.x, top, b.w, 1)
      ctx.fillRect(b.x, top, 1, b.h)
      b.windows.forEach((w) => {
        const flicker = w.lit && Math.sin(this.time * 2 + w.x + w.y) > -0.9
        ctx.fillStyle = flicker ? PAL.yellow : PAL.shadow
        if (top + w.y < base - 2) ctx.fillRect(b.x + w.x, top + w.y, 3, 3)
      })
      if (b.tank) {
        ctx.fillStyle = PAL.black
        ctx.fillRect(b.x + b.w - 9, top - 6, 7, 6)
        ctx.fillRect(b.x + b.w - 8, top - 8, 5, 2)
      }
      if (b.antenna) {
        ctx.fillStyle = PAL.black
        ctx.fillRect(b.x + 4, top - 9, 1, 9)
        ctx.fillRect(b.x + 2, top - 9, 5, 1)
        ctx.fillRect(b.x + 3, top - 6, 3, 1)
      }
    })
  }

  renderForeground(ctx) {
    // wires across the sky with birds on them
    ctx.fillStyle = PAL.black
    ctx.fillRect(0, 33, VIEW_W, 1)
    ctx.fillRect(0, 27, VIEW_W, 1)
    BIRDS.forEach((bird, i) => {
      const hop = Math.sin(this.time * 1.5 + i) > 0.96 ? -1 : 0
      ctx.fillStyle = PAL.black
      ctx.fillRect(bird.x, bird.y + hop, 3, 2)
      ctx.fillRect(bird.x + 2, bird.y - 1 + hop, 2, 1)
    })

    // the road the game begins on
    ctx.fillStyle = PAL.roadDark
    ctx.fillRect(0, 124, VIEW_W, VIEW_H - 124)
    ctx.fillStyle = PAL.road
    ctx.fillRect(0, 128, VIEW_W, VIEW_H - 128)
    ctx.fillStyle = PAL.concreteDark
    ctx.fillRect(0, 124, VIEW_W, 4)
    ctx.fillStyle = PAL.bone
    for (let x = 6; x < VIEW_W; x += 26) ctx.fillRect(x, 146, 12, 2)

    // lamp post on the right, a hoarding frame on the left
    ctx.fillStyle = PAL.black
    ctx.fillRect(214, 92, 3, 38)
    ctx.fillRect(202, 92, 14, 2)
    ctx.fillStyle = PAL.yellow
    ctx.fillRect(200, 94, 6, 3)
    ctx.globalAlpha = 0.18
    ctx.fillStyle = PAL.yellow
    ctx.fillRect(194, 97, 18, 28)
    ctx.globalAlpha = 1
    // a painted hoarding on two posts, kept below the subtitle line
    ctx.fillStyle = PAL.black
    ctx.fillRect(14, 110, 2, 16)
    ctx.fillRect(40, 110, 2, 16)
    ctx.fillRect(12, 96, 32, 15)
    ctx.fillStyle = PAL.teal
    ctx.fillRect(13, 97, 30, 13)
    ctx.fillStyle = PAL.yellow
    ctx.fillRect(16, 100, 2, 7)
    ctx.fillRect(20, 100, 7, 2)
    ctx.fillRect(30, 100, 2, 7)
    ctx.fillRect(34, 103, 6, 2)
  }

  renderTitle(ctx) {
    const cx = VIEW_W / 2
    drawTextScaled(ctx, 'REAL INDIA', cx + 2, 40, PAL.black, 3, 'center')
    drawTextScaled(ctx, 'REAL INDIA', cx, 38, PAL.white, 3, 'center')
    drawTextScaled(ctx, 'RPG', cx + 2, 62, PAL.black, 3, 'center')
    drawTextScaled(ctx, 'RPG', cx, 60, PAL.uiAccent, 3, 'center')
    const subtitle = 'Different people. Different problems. One world.'
    drawText(ctx, subtitle, cx + 1, 85, PAL.black, 'center')
    drawText(ctx, subtitle, cx, 84, PAL.bone, 'center')
  }

  renderMenu(ctx) {
    const rows = this.rows
    const w = 108
    const h = rows.length * 13 + 12
    const x = Math.round((VIEW_W - w) / 2)
    const y = 96
    panel(ctx, x, y, w, h)
    rows.forEach((row, i) => {
      const ly = y + 7 + i * 13
      if (i === this.index) cursor(ctx, x + 10, ly, this.time)
      drawText(ctx, row.label, x + 20, ly, i === this.index ? PAL.uiBorder : PAL.grey)
    })

    if (this.saveSummary) {
      const s = this.saveSummary
      const line = `Last save: ${s.people} people, ${s.problems} problems`
      drawText(ctx, line, VIEW_W / 2, y + h + 4, PAL.bone, 'center')
    }
    const hint = this.game.isTouch ? 'Tap A to choose' : 'Space or Enter to choose'
    drawText(ctx, hint, 5, VIEW_H - 9, PAL.greyLight)
    drawText(ctx, 'vertical slice', VIEW_W - 5, VIEW_H - 9, PAL.greyLight, 'right')
  }
}
