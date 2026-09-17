/**
 * DialogueState.js
 * ---------------------------------------------------------------------------
 * Walks an NPC's dialogue graph: pages of text typed out a character at a time,
 * branching choices, and effects fired as nodes are entered. It sits on top of
 * the overworld in the state stack, which is what stops the player walking
 * while someone is talking.
 *
 * It also serves simple one-off text (signs, investigating objects) through
 * plain `lines`, so there is only one dialogue renderer in the game.
 */

import { PAL } from '../gfx/Palette.js'
import { drawText, wrapText, measure } from '../gfx/Font.js'
import { drawPortrait } from '../gfx/Sprites.js'
import { panel, cursor, dim } from '../ui/UIKit.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'
import { applyEffect, checkRequirement } from '../systems/Effects.js'

const BOX = { x: 4, y: 110, w: 232, h: 46 }
const TEXT_X = BOX.x + 8
const TEXT_Y = BOX.y + 7
const TEXT_W = BOX.w - 16
const LINES_PER_PAGE = 3
const SPEEDS = { slow: 22, normal: 45, fast: 90 }

export class DialogueState {
  constructor(game) {
    this.game = game
    this.name = 'DIALOGUE'
    this.transparent = true
    this.reset()
  }

  reset() {
    this.npc = null
    this.nodes = null
    this.node = null
    this.nodeId = null
    this.pages = []
    this.pageIndex = 0
    this.typed = 0
    this.choices = null
    this.choiceIndex = 0
    this.time = 0
    this.pendingEncounter = null
    this.speaker = ''
    this.look = null
    this.onClose = null
  }

  /** params: { npc, node } for a conversation, or { speaker, lines, look }. */
  enter(params) {
    this.reset()
    if (params.npc) {
      this.npc = params.npc
      this.nodes = params.npc.data.nodes
      this.speaker = params.npc.data.name
      this.look = params.npc.data.look
      this.goTo(params.node || 'first')
    } else {
      this.speaker = params.speaker || ''
      this.look = params.look || null
      this.onClose = params.onClose || null
      this.setPages(params.lines || [''])
    }
  }

  get speed() {
    return SPEEDS[this.game.settings.textSpeed] || SPEEDS.normal
  }

  setPages(lines) {
    const arr = Array.isArray(lines) ? lines : [lines]
    this.pages = arr.flatMap((line) => this.paginate(line))
    this.pageIndex = 0
    this.typed = 0
  }

  /** Wrap one written line, then split it into screenfuls of three lines. */
  paginate(text) {
    const wrapped = wrapText(text, TEXT_W)
    const pages = []
    for (let i = 0; i < wrapped.length; i += LINES_PER_PAGE) {
      pages.push(wrapped.slice(i, i + LINES_PER_PAGE))
    }
    return pages.length ? pages : [['']]
  }

  goTo(nodeId) {
    const node = this.nodes ? this.nodes[nodeId] : null
    if (!node) {
      this.finish()
      return
    }
    this.node = node
    this.nodeId = nodeId
    this.choices = null
    this.choiceIndex = 0

    if (node.effect) {
      const messages = applyEffect(this.game, node.effect, { npcId: this.npc ? this.npc.id : null })
      messages.forEach((m) => this.game.toast(m))
      if (node.effect.encounter) this.pendingEncounter = node.effect.encounter
      if (node.effect.discover || node.effect.note) this.game.audio.play('note')
    }
    if (this.npc) this.game.raiseTrust(this.npc.id, 2)

    this.setPages(node.text || '')
  }

  currentLines() {
    return this.pages[this.pageIndex] || ['']
  }

  totalChars() {
    return this.currentLines().reduce((sum, line) => sum + line.length, 0)
  }

  pageComplete() {
    return this.typed >= this.totalChars()
  }

  update(dt, input) {
    this.time += dt

    // Whether the page was already fully typed when this frame began decides
    // what a press means. Without this, the same press that finishes the text
    // would also pick the first choice that appears under it.
    const wasComplete = this.pageComplete()
    const confirm = input.justPressed('confirm')
    const cancel = input.justPressed('cancel')

    if (!wasComplete) {
      const before = Math.floor(this.typed)
      this.typed += this.speed * dt
      const after = Math.min(Math.floor(this.typed), this.totalChars())
      if (after > before && after % 3 === 0) this.game.audio.play('blip')
      // A press skips the rest of the typing, and is spent doing only that.
      if (confirm || cancel) this.typed = this.totalChars()
      return
    }

    // The last page of a node with choices shows them without another press.
    if (!this.choices && this.pageIndex === this.pages.length - 1 && this.node) {
      const available = (this.node.choices || []).filter((c) => checkRequirement(this.game, c.require))
      if (available.length) {
        this.choices = available
        this.choiceIndex = 0
      }
    }

    if (this.choices) {
      if (input.repeat('up', dt)) {
        this.choiceIndex = (this.choiceIndex - 1 + this.choices.length) % this.choices.length
        this.game.audio.play('select')
      }
      if (input.repeat('down', dt)) {
        this.choiceIndex = (this.choiceIndex + 1) % this.choices.length
        this.game.audio.play('select')
      }
      if (confirm) {
        const choice = this.choices[this.choiceIndex]
        this.game.audio.play('confirm')
        if (choice.effect) {
          applyEffect(this.game, choice.effect, { npcId: this.npc ? this.npc.id : null }).forEach((m) =>
            this.game.toast(m),
          )
        }
        this.goTo(choice.to)
      }
      return
    }

    if (confirm || cancel) this.advance()
  }

  advance() {
    if (this.pageIndex < this.pages.length - 1) {
      this.pageIndex++
      this.typed = 0
      this.game.audio.play('blip')
      return
    }
    const node = this.node
    if (node && node.choices) {
      const available = node.choices.filter((c) => checkRequirement(this.game, c.require))
      if (available.length) {
        this.choices = available
        this.choiceIndex = 0
        return
      }
    }
    if (node && node.next) {
      this.goTo(node.next)
      return
    }
    this.finish()
  }

  finish() {
    this.game.audio.play('close')
    const encounter = this.pendingEncounter
    const callback = this.onClose
    this.game.states.pop()
    if (callback) callback()
    if (encounter) this.game.startEncounter(encounter, this.npc ? this.npc.id : null)
  }

  render(ctx) {
    dim(ctx, VIEW_W, VIEW_H, 0.25)

    if (this.look) {
      panel(ctx, 6, 84, 36, 30)
      drawPortrait(ctx, `portrait-${this.speaker}`, this.look, 8, 86, 2)
    }

    if (this.speaker) {
      const w = measure(this.speaker) + 12
      const x = this.look ? 44 : 8
      panel(ctx, x, 92, w, 15, { fill: PAL.uiBorder, inner: PAL.shadow, shadow: false })
      drawText(ctx, this.speaker, x + 6, 96, PAL.uiPanel)
    }

    panel(ctx, BOX.x, BOX.y, BOX.w, BOX.h)

    const lines = this.currentLines()
    let budget = Math.floor(this.typed)
    lines.forEach((line, i) => {
      const shown = line.slice(0, Math.max(0, budget))
      budget -= line.length
      drawText(ctx, shown, TEXT_X, TEXT_Y + i * 11, PAL.uiBorder)
    })

    if (this.pageComplete() && !this.choices) {
      const bob = Math.sin(this.time * 6) > 0 ? 0 : 1
      drawText(ctx, '▼', BOX.x + BOX.w - 14, BOX.y + BOX.h - 12 + bob, PAL.uiAccent)
    }

    if (this.choices) this.renderChoices(ctx)
  }

  renderChoices(ctx) {
    const lineH = 12
    const w = 118
    const h = this.choices.length * lineH + 10
    const x = VIEW_W - w - 6
    const y = BOX.y - h - 3
    panel(ctx, x, y, w, h)
    this.choices.forEach((choice, i) => {
      const ly = y + 6 + i * lineH
      if (i === this.choiceIndex) cursor(ctx, x + 4, ly, this.time)
      drawText(ctx, choice.label, x + 12, ly, i === this.choiceIndex ? PAL.uiBorder : PAL.grey)
    })
  }
}
