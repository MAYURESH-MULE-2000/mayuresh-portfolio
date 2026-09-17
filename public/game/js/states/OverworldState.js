/**
 * OverworldState.js
 * ---------------------------------------------------------------------------
 * Walking around: it owns the active map, the NPCs placed on it, the camera and
 * the interaction rules. Every other screen in the game is pushed on top of
 * this one, so this file never has to know they exist.
 */

import { TILE } from '../gfx/Tiles.js'
import { PAL } from '../gfx/Palette.js'
import { drawText, drawTextShadow, measure } from '../gfx/Font.js'
import { panel } from '../ui/UIKit.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'
import { NPC } from '../entities/NPC.js'
import { getNpc } from '../../data/npcs.js'
import { applyEffect } from '../systems/Effects.js'
import { World } from '../systems/WorldState.js'
import { getProblem } from '../../data/problems.js'

export class OverworldState {
  constructor(game) {
    this.game = game
    this.name = 'OVERWORLD'
    this.transparent = false
    this.npcs = []
    this.time = 0
    this.bannerTime = 0
    this.hintTime = 0
    this.waterFrame = 0
  }

  enter() {
    this.time = 0
    this.showBanner()
    if (!World.flag(this.game.state, 'tutorial.shown')) {
      this.hintTime = 9
      World.setFlag(this.game.state, 'tutorial.shown')
    }
  }

  resume() {
    // Coming back from a menu or a conversation: drop any held direction so the
    // player does not walk off because a key was down when the menu closed.
    this.game.input.clear()
  }

  showBanner() {
    this.bannerTime = 2.6
  }

  /** Called by Game whenever a map is loaded. */
  onMapLoaded(map) {
    this.npcs = (map.def.npcs || [])
      .map((placement) => {
        const data = getNpc(placement.id)
        if (!data) {
          console.warn(`map ${map.id}: unknown npc "${placement.id}"`)
          return null
        }
        return new NPC(data, placement)
      })
      .filter(Boolean)
    // NPCs occupy their tile.
    this.npcs.forEach((npc) => map.setSolid(npc.tx, npc.ty, true))
    this.showBanner()
  }

  npcAt(tx, ty) {
    return this.npcs.find((n) => n.tx === tx && n.ty === ty) || null
  }

  update(dt, input) {
    this.time += dt
    this.waterFrame = Math.floor(this.time * 2)
    if (this.bannerTime > 0) this.bannerTime -= dt
    if (this.hintTime > 0) this.hintTime -= dt

    const game = this.game
    const map = game.map
    this.npcs.forEach((npc) => npc.update(dt))

    game.player.update(
      dt,
      input,
      (tx, ty) => !map.isSolid(tx, ty),
      (tx, ty) => this.onTileEntered(tx, ty),
      null,
    )

    game.camera.follow(game.player.px + TILE / 2, game.player.py + TILE / 2, dt)

    if (input.justPressed('confirm')) this.interact()
    if (input.justPressed('menu')) game.openMenu()
    if (input.justPressed('journal')) game.openJournal()
  }

  updateBackground(dt) {
    // Keep the world breathing while a menu or conversation is on top.
    this.time += dt
    this.waterFrame = Math.floor(this.time * 2)
    this.npcs.forEach((npc) => npc.update(dt))
  }

  onTileEntered(tx, ty) {
    const game = this.game
    game.state.x = tx
    game.state.y = ty
    game.state.dir = game.player.dir
    const exit = game.map.exitAt(tx, ty)
    if (exit) {
      game.travelTo(exit.to, exit.spawn)
      return
    }
    if (game.player.stepsTaken % 2 === 0) game.audio.play('step')
  }

  interact() {
    const game = this.game
    const { x, y } = game.player.facingTile()

    const npc = this.npcAt(x, y)
    if (npc) {
      npc.faceTowards(game.player.tx, game.player.ty)
      game.talkTo(npc)
      return
    }

    const object = game.map.objectAt(x, y)
    if (object) {
      this.useObject(object)
      return
    }

    // Nothing there: a small acknowledgement beats silence.
    const tile = game.map.ground[game.map.index(x, y)]
    if (tile && tile.startsWith('water')) {
      game.showText('', ['Open water. Nothing you can do about it from the bank.'])
    }
  }

  useObject(object) {
    const game = this.game

    if (object.kind === 'rest') {
      game.confirm('Lie down for a while? Your progress will be saved.', (choice) => {
        if (choice !== 0) return
        const result = game.saveGame()
        game.showText(
          'Home',
          result.ok
            ? ['You lie down for a while. The ceiling fan turns.', 'Progress saved.']
            : ['You lie down for a while.', 'This browser will not let the game store a save, so nothing was written.'],
        )
      })
      return
    }

    if (object.kind === 'board') {
      game.showText(object.name, this.noticeBoardLines())
      return
    }

    if (object.kind === 'investigate') {
      if (!World.hasItem(game.state, 'notebook')) {
        game.showText(object.name, [`${object.look}`, 'Worth writing down - if you had anything to write in.'])
        return
      }
      const problem = getProblem(object.problem)
      const first = !World.hasDiscovered(game.state, object.problem)
      if (object.effect) applyEffect(game, object.effect).forEach((m) => game.toast(m))
      game.showText(object.name, [object.look], () => {
        game.startEncounter(object.problem, null, {
          source: object.name,
          intro: first
            ? `You stop and actually look at it. ${problem ? problem.summary : ''}`
            : 'You look again, with what you already know.',
        })
      })
      return
    }

    // plain sign
    game.showText(object.name, [object.look || 'Nothing written on it any more.'])
  }

  /** The ward board doubles as the game's "what can I do here" surface. */
  noticeBoardLines() {
    const game = this.game
    const lines = [
      'WARD 4 NOTICE BOARD',
      'Water supply: Lane 2 and Lane 3, morning hours only, until further notice.',
      'Road repair work: tender stage. No date given.',
    ]
    const hint = game.quests.activeHint()
    if (hint) lines.push(`Your notebook, top page: ${hint.step}.`)
    return lines
  }

  render(ctx) {
    const game = this.game
    const map = game.map
    const camX = game.camera.renderX
    const camY = game.camera.renderY

    ctx.fillStyle = map.def.indoor ? PAL.ink : PAL.grassDark
    ctx.fillRect(0, 0, VIEW_W, VIEW_H)

    map.renderLayer(ctx, 'ground', camX, camY, VIEW_W, VIEW_H, this.waterFrame)
    map.renderLayer(ctx, 'over', camX, camY, VIEW_W, VIEW_H, this.waterFrame)
    this.renderSignage(ctx, camX, camY)

    // entities, painter's order by their feet
    const drawables = [...this.npcs, game.player]
    drawables.sort((a, b) => (a.py !== undefined ? a.py : a.y) - (b.py !== undefined ? b.py : b.y))
    drawables.forEach((d) => d.render(ctx, camX, camY))

    map.renderLayer(ctx, 'top', camX, camY, VIEW_W, VIEW_H, this.waterFrame)

    this.renderHud(ctx)
  }

  /**
   * Painted shop and building names. They live in map data and are drawn into
   * the world (not the HUD), which is what makes the street readable without a
   * single tooltip.
   */
  renderSignage(ctx, camX, camY) {
    const labels = this.game.map.def.labels || []
    labels.forEach((label) => {
      const x = Math.round(label.x * TILE + TILE / 2) - camX
      const y = Math.round(label.y * TILE + (label.offset === undefined ? 4 : label.offset)) - camY
      if (x < -80 || x > VIEW_W + 80 || y < -20 || y > VIEW_H + 20) return
      drawTextShadow(ctx, label.text, x, y, label.color || PAL.yellow, PAL.black, 'center')
    })
  }

  renderHud(ctx) {
    const game = this.game

    if (this.bannerTime > 0) {
      const map = game.map
      const w = Math.max(measure(map.name), measure(map.def.subtitle || '')) + 16
      const alpha = Math.min(1, this.bannerTime / 0.5)
      ctx.globalAlpha = alpha
      panel(ctx, 4, 4, w, map.def.subtitle ? 28 : 18)
      drawText(ctx, map.name, 12, 8, PAL.uiBorder)
      if (map.def.subtitle) drawText(ctx, map.def.subtitle, 12, 18, PAL.grey)
      ctx.globalAlpha = 1
    } else {
      const hint = game.quests.activeHint()
      if (hint) {
        const label = hint.step
        const w = measure(label) + 14
        ctx.globalAlpha = 0.9
        panel(ctx, 4, 4, w, 16, { fill: PAL.uiPanel })
        ctx.globalAlpha = 1
        drawText(ctx, label, 11, 8, PAL.uiBorder)
      }
    }

    if (this.hintTime > 0) {
      const lines = game.isTouch
        ? ['Pad to move  ·  A to talk', 'MENU for menu  ·  JOURNAL for notes']
        : ['Arrows / WASD to move  ·  Space to talk', 'M for menu  ·  J for the journal']
      const w = Math.max(...lines.map(measure)) + 16
      const x = Math.round((VIEW_W - w) / 2)
      ctx.globalAlpha = Math.min(1, this.hintTime / 1.2)
      panel(ctx, x, VIEW_H - 34, w, 28)
      lines.forEach((line, i) => drawText(ctx, line, x + 8, VIEW_H - 29 + i * 11, PAL.uiBorder))
      ctx.globalAlpha = 1
    }

    // Interaction prompt, only while the overworld actually has input - during
    // a conversation the dialogue box already names the speaker.
    if (game.states.current !== this) return
    const facing = game.player.facingTile()
    const target = this.npcAt(facing.x, facing.y) || game.map.objectAt(facing.x, facing.y)
    if (target && !game.player.moving) {
      const label = target.data ? target.data.name : target.name
      const w = measure(label) + 10
      const x = Math.min(VIEW_W - w - 4, Math.max(4, game.player.px - game.camera.renderX + 8 - w / 2))
      const y = game.player.py - game.camera.renderY - 14
      ctx.globalAlpha = 0.85
      panel(ctx, Math.round(x), Math.round(y), w, 14, { shadow: false })
      ctx.globalAlpha = 1
      drawText(ctx, label, Math.round(x) + 5, Math.round(y) + 3, PAL.uiBorder)
    }

    game.renderToasts(ctx)
  }
}
