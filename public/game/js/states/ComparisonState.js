/**
 * ComparisonState.js
 * ---------------------------------------------------------------------------
 * "Whose problem is bigger?" - answered the only honest way: on five axes at
 * once, with the screen refusing to total them. One problem leads on money,
 * another on what it does to a person, and the summary says exactly that.
 *
 * Two modes: a picker (choose what to compare against) and the comparison
 * itself. Reachable from an encounter and from the journal.
 */

import { PAL, DIMENSION_COLORS, CATEGORY_COLORS } from '../gfx/Palette.js'
import { drawText, wrapText, measure } from '../gfx/Font.js'
import { panel, darkPanel, cursor, chip } from '../ui/UIKit.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'
import { getProblem, DIMENSIONS } from '../../data/problems.js'
import { World } from '../systems/WorldState.js'

const MID = 120
const MAX_BAR = 64

export class ComparisonState {
  constructor(game) {
    this.game = game
    this.name = 'COMPARE'
    this.transparent = false
  }

  enter(params) {
    this.baseId = params.problemId || null
    this.onDone = params.onDone || null
    this.time = 0
    this.index = 0
    this.optionIndex = 0
    this.mode = 'pick'
    this.message = null
    this.left = null
    this.right = null

    const discovered = this.game.state.discovered.filter((id) => id !== this.baseId)
    this.candidates = discovered.map((id) => getProblem(id)).filter(Boolean)

    if (!this.baseId) {
      // Opened from the journal: pick both sides, left first.
      this.candidates = this.game.state.discovered.map((id) => getProblem(id)).filter(Boolean)
      this.pickStage = 'left'
    } else {
      this.pickStage = 'right'
    }
    if (this.candidates.length === 0) {
      this.game.states.pop()
      this.game.showText('Notebook', ['You need two recorded problems before you can compare anything.'])
    }
  }

  exit() {
    if (this.onDone) this.onDone(this.result || null)
  }

  startComparison(leftId, rightId) {
    this.left = getProblem(leftId)
    this.right = getProblem(rightId)
    this.mode = 'compare'
    this.optionIndex = 0
    this.rows = DIMENSIONS.map((dim) => {
      const a = this.left.impacts[dim.key]
      const b = this.right.impacts[dim.key]
      return { dim, a, b, lead: a === b ? 'level' : a > b ? 'left' : 'right' }
    })
    this.summary = this.buildSummary()
    World.addCount(this.game.state, 'comparisons')
    this.game.quests.notifyComparison(leftId, rightId)
    this.result = { summary: this.summary[0], left: leftId, right: rightId }
    this.buildOptions()
  }

  buildSummary() {
    const leftWins = this.rows.filter((r) => r.lead === 'left').map((r) => r.dim.label.toLowerCase())
    const rightWins = this.rows.filter((r) => r.lead === 'right').map((r) => r.dim.label.toLowerCase())
    const lines = []
    if (leftWins.length && rightWins.length) {
      lines.push(
        `${this.left.short} weighs more on ${leftWins.join(', ')}. ${this.right.short} weighs more on ${rightWins.join(', ')}.`,
      )
      lines.push('Neither cancels the other. Bigger depends on the axis you stand on.')
    } else if (leftWins.length) {
      lines.push(`${this.left.short} scores higher on every axis here.`)
      lines.push('That still does not make the other one small for the person carrying it.')
    } else if (rightWins.length) {
      lines.push(`${this.right.short} scores higher on every axis here.`)
      lines.push('That still does not make the other one small for the person carrying it.')
    } else {
      lines.push('These two land almost identically - by different routes.')
    }
    return lines
  }

  linkExists() {
    return (this.left.connections || []).includes(this.right.id) || (this.right.connections || []).includes(this.left.id)
  }

  buildOptions() {
    this.options = [
      { id: 'link', label: 'What links them' },
      { id: 'voices', label: 'Hear both' },
      { id: 'done', label: 'Done' },
    ]
  }

  update(dt, input) {
    this.time += dt
    if (this.mode === 'pick') return this.updatePicker(dt, input)
    return this.updateCompare(dt, input)
  }

  updatePicker(dt, input) {
    if (input.repeat('down', dt)) {
      this.index = (this.index + 1) % this.candidates.length
      this.game.audio.play('select')
    }
    if (input.repeat('up', dt)) {
      this.index = (this.index - 1 + this.candidates.length) % this.candidates.length
      this.game.audio.play('select')
    }
    if (input.justPressed('confirm')) {
      const chosen = this.candidates[this.index]
      this.game.audio.play('confirm')
      if (this.pickStage === 'left') {
        this.baseId = chosen.id
        this.candidates = this.candidates.filter((p) => p.id !== chosen.id)
        this.index = 0
        this.pickStage = 'right'
        return
      }
      this.startComparison(this.baseId, chosen.id)
    }
    if (input.justPressed('cancel') || input.justPressed('menu')) {
      this.game.audio.play('cancel')
      this.game.states.pop()
    }
  }

  updateCompare(dt, input) {
    if (this.message) {
      if (input.justPressed('confirm') || input.justPressed('cancel')) {
        this.message = null
        this.game.audio.play('blip')
      }
      return
    }
    if (input.repeat('right', dt)) {
      this.optionIndex = (this.optionIndex + 1) % this.options.length
      this.game.audio.play('select')
    }
    if (input.repeat('left', dt)) {
      this.optionIndex = (this.optionIndex - 1 + this.options.length) % this.options.length
      this.game.audio.play('select')
    }
    if (input.justPressed('confirm')) {
      const option = this.options[this.optionIndex]
      this.game.audio.play('confirm')
      if (option.id === 'done') {
        this.game.states.pop()
        return
      }
      if (option.id === 'voices') {
        const a = (this.left.perspectives || [])[0]
        const b = (this.right.perspectives || [])[0]
        this.message = [
          a ? `${a.speaker}: "${a.text}"` : 'Nobody has spoken to you about this one yet.',
          b ? `${b.speaker}: "${b.text}"` : 'Nobody has spoken to you about that one yet.',
        ].join('\n')
        return
      }
      if (option.id === 'link') {
        if (this.linkExists()) {
          const isNew = World.addConnection(this.game.state, this.left.id, this.right.id)
          this.message = isNew
            ? `You can trace it: ${this.left.short} feeds ${this.right.short}, and it runs back the other way too. Written into the journal.`
            : `You have already traced this one: ${this.left.short} and ${this.right.short} keep feeding each other.`
          if (isNew) {
            World.addStat(this.game.state, 'knowledge', 1)
            this.game.audio.play('discover')
            this.game.toast('Connection noted')
          }
        } else {
          this.message =
            'Nothing in your notes ties these two together. That is an answer as well - not everything connects.'
        }
      }
    }
    if (input.justPressed('cancel') || input.justPressed('menu')) {
      this.game.audio.play('cancel')
      this.game.states.pop()
    }
  }

  // -----------------------------------------------------------------------
  render(ctx) {
    ctx.fillStyle = PAL.uiBack
    ctx.fillRect(0, 0, VIEW_W, VIEW_H)
    ctx.fillStyle = PAL.uiBorder
    ctx.fillRect(0, 0, VIEW_W, 13)
    drawText(ctx, this.mode === 'pick' ? 'COMPARE - CHOOSE' : 'COMPARE', 5, 3, PAL.uiPanel)
    if (this.mode === 'pick') this.renderPicker(ctx)
    else this.renderCompare(ctx)
  }

  renderPicker(ctx) {
    const label =
      this.pickStage === 'left' ? 'Which problem first?' : `Compare with ${getProblem(this.baseId)?.short || ''}:`
    drawText(ctx, label, VIEW_W - 5, 3, PAL.uiAccent, 'right')
    panel(ctx, 4, 17, 232, 134)
    const visible = 10
    const start = Math.max(0, Math.min(this.index - 4, this.candidates.length - visible))
    this.candidates.slice(start, start + visible).forEach((problem, i) => {
      const realIndex = start + i
      const y = 23 + i * 12
      if (realIndex === this.index) cursor(ctx, 10, y, this.time)
      drawText(ctx, problem.short, 18, y, realIndex === this.index ? PAL.uiBorder : PAL.grey)
      drawText(ctx, problem.category, 230, y, PAL.greyLight, 'right')
    })
    if (this.candidates.length > visible) {
      drawText(ctx, `${this.index + 1}/${this.candidates.length}`, 230, 140, PAL.grey, 'right')
    }
  }

  renderCompare(ctx) {
    // headings
    panel(ctx, 4, 15, 112, 24, { fill: PAL.uiPanel })
    panel(ctx, 124, 15, 112, 24, { fill: PAL.uiPanel })
    drawText(ctx, this.left.short, 10, 19, PAL.uiBorder)
    drawText(ctx, this.right.short, 130, 19, PAL.uiBorder)
    chip(ctx, 10, 27, this.left.category, CATEGORY_COLORS[this.left.category] || PAL.grey)
    chip(ctx, 130, 27, this.right.category, CATEGORY_COLORS[this.right.category] || PAL.grey)

    // mirrored bars
    this.rows.forEach((row, i) => {
      const y = 43 + i * 12
      const color = DIMENSION_COLORS[row.dim.key]
      const aw = Math.round((row.a / 100) * MAX_BAR)
      const bw = Math.round((row.b / 100) * MAX_BAR)
      // left bar grows leftwards from the centre gutter
      ctx.fillStyle = PAL.shadow
      ctx.fillRect(MID - 22 - MAX_BAR, y, MAX_BAR, 8)
      ctx.fillRect(MID + 22, y, MAX_BAR, 8)
      ctx.fillStyle = color
      ctx.fillRect(MID - 22 - aw, y, aw, 8)
      ctx.fillRect(MID + 22, y, bw, 8)
      ctx.fillStyle = PAL.white
      ctx.fillRect(MID - 22 - aw, y, aw, 1)
      ctx.fillRect(MID + 22, y, bw, 1)
      drawText(ctx, String(row.a), MID - 24 - MAX_BAR, y, PAL.greyLight, 'right')
      drawText(ctx, String(row.b), MID + 24 + MAX_BAR, y, PAL.greyLight)
      drawText(ctx, row.dim.label, MID, y, PAL.uiPanel, 'center')
      // a small marker on the side that leads, never a total
      if (row.lead !== 'level') {
        const mx = row.lead === 'left' ? MID - 18 : MID + 15
        drawText(ctx, row.lead === 'left' ? '←' : '→', mx, y, PAL.uiAccent)
      }
    })

    // summary and options
    darkPanel(ctx, 4, 104, 232, 36)
    const text = this.message || this.summary.join(' ')
    wrapText(text, 216)
      .slice(0, 4)
      .forEach((line, i) => drawText(ctx, line, 11, 108 + i * 9, PAL.uiPanel))

    panel(ctx, 4, 142, 232, 14, { fill: PAL.uiPanel, shadow: false })
    let x = 12
    this.options.forEach((option, i) => {
      if (i === this.optionIndex) cursor(ctx, x - 6, 145, this.time)
      drawText(ctx, option.label, x, 145, i === this.optionIndex ? PAL.uiBorder : PAL.grey)
      x += measure(option.label) + 22
    })
  }
}
