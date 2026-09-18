/**
 * JournalState.js
 * ---------------------------------------------------------------------------
 * The notebook. Seven pages, each a view over world state: People, Problems,
 * Connections, Notes, Objectives, Places, Decisions.
 *
 * The rule the journal follows everywhere: it only shows what the player has
 * actually found. A problem's causes and perspectives appear as they are
 * revealed in encounters, never before - so the journal filling up is the
 * visible record of the player's own work.
 */

import { PAL, CATEGORY_COLORS, DIMENSION_COLORS } from '../gfx/Palette.js'
import { drawText, wrapText } from '../gfx/Font.js'
import { panel, cursor, chip, bar, divider } from '../ui/UIKit.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'
import { getProblem, DIMENSIONS } from '../../data/problems.js'
import { World } from '../systems/WorldState.js'
import { getNpc } from '../../data/npcs.js'

const TABS = ['People', 'Problems', 'Links', 'Notes', 'Tasks', 'Places', 'Choices']

export class JournalState {
  constructor(game) {
    this.game = game
    this.name = 'JOURNAL'
    this.transparent = false
  }

  enter(params = {}) {
    this.tab = params.tab || 0
    this.index = 0
    this.scroll = 0
    this.detail = null
    this.detailScroll = 0
    this.time = 0
    this.rows = this.buildRows()
  }

  buildRows() {
    const game = this.game
    const state = game.state
    switch (TABS[this.tab]) {
      case 'People':
        return game.journal.people().map((person) => ({
          label: person.name,
          right: person.role,
          detail: { kind: 'person', person },
        }))
      case 'Problems':
        return game.journal.problems().map((row) => ({
          label: row.problem.short,
          right: `${Math.round(row.understanding)}%`,
          detail: { kind: 'problem', problem: row.problem },
        }))
      case 'Links':
        return game.journal.connections().map((link) => ({
          label: `${link.a.short}`,
          right: `→ ${link.b.short}`,
          detail: { kind: 'link', link },
        }))
      case 'Notes':
        return game.journal.allNotes().map((note) => ({
          label: note.problem.short,
          right: '',
          sub: note.text,
          detail: { kind: 'note', note },
        }))
      case 'Tasks':
        return game.quests.rows().map((row) => ({
          label: row.quest.name,
          right: row.status === 'done' ? 'done' : 'active',
          detail: { kind: 'quest', row },
        }))
      case 'Places':
        return state.visitedMaps
          .map((id) => game.maps.definition(id))
          .filter(Boolean)
          .map((def) => ({
            label: def.name,
            right: def.subtitle || '',
            detail: { kind: 'place', def },
          }))
      case 'Choices':
        return state.decisions.map((decision) => ({
          label: decision.title,
          right: '',
          sub: decision.choice,
          detail: { kind: 'decision', decision },
        }))
      default:
        return []
    }
  }

  update(dt, input) {
    this.time += dt

    if (this.detail) {
      if (input.justPressed('cancel') || input.justPressed('journal')) {
        this.detail = null
        this.game.audio.play('close')
        return
      }
      if (input.repeat('down', dt)) this.detailScroll = Math.min(this.detailMax || 0, this.detailScroll + 1)
      if (input.repeat('up', dt)) this.detailScroll = Math.max(0, this.detailScroll - 1)
      if (input.justPressed('confirm') && this.detail.kind === 'problem') {
        // Comparing straight from a problem page.
        if (this.game.state.discovered.length >= 2) {
          this.game.openComparison(this.detail.problem.id, null)
        } else {
          this.game.toast('Record a second problem first')
        }
      }
      return
    }

    if (input.justPressed('cancel') || input.justPressed('menu') || input.justPressed('journal')) {
      this.game.audio.play('close')
      this.game.states.pop()
      return
    }
    if (input.repeat('right', dt)) {
      this.tab = (this.tab + 1) % TABS.length
      this.index = 0
      this.scroll = 0
      this.rows = this.buildRows()
      this.game.audio.play('select')
    }
    if (input.repeat('left', dt)) {
      this.tab = (this.tab - 1 + TABS.length) % TABS.length
      this.index = 0
      this.scroll = 0
      this.rows = this.buildRows()
      this.game.audio.play('select')
    }
    if (this.rows.length) {
      if (input.repeat('down', dt)) {
        this.index = (this.index + 1) % this.rows.length
        this.game.audio.play('select')
      }
      if (input.repeat('up', dt)) {
        this.index = (this.index - 1 + this.rows.length) % this.rows.length
        this.game.audio.play('select')
      }
      if (input.justPressed('confirm')) {
        this.detail = this.rows[this.index].detail
        this.detailScroll = 0
        this.game.audio.play('open')
      }
    }
  }

  render(ctx) {
    ctx.fillStyle = PAL.uiBack
    ctx.fillRect(0, 0, VIEW_W, VIEW_H)
    // ruled-paper feel behind the panels
    ctx.globalAlpha = 0.15
    for (let y = 18; y < VIEW_H; y += 6) {
      ctx.fillStyle = PAL.blue
      ctx.fillRect(0, y, VIEW_W, 1)
    }
    ctx.globalAlpha = 1

    ctx.fillStyle = PAL.uiBorder
    ctx.fillRect(0, 0, VIEW_W, 14)
    drawText(ctx, '←', 6, 3, PAL.uiAccent)
    drawText(ctx, TABS[this.tab].toUpperCase(), VIEW_W / 2, 3, PAL.uiPanel, 'center')
    drawText(ctx, '→', VIEW_W - 12, 3, PAL.uiAccent)

    if (this.detail) this.renderDetail(ctx)
    else this.renderList(ctx)
  }

  renderList(ctx) {
    panel(ctx, 4, 17, 232, 122)
    if (!this.rows.length) {
      wrapText(this.emptyText(), 210).forEach((line, i) => drawText(ctx, line, 12, 26 + i * 11, PAL.grey))
    } else {
      const lineH = this.rows.some((r) => r.sub) ? 20 : 12
      const visible = Math.floor(114 / lineH)
      const start = Math.max(0, Math.min(this.index - Math.floor(visible / 2), this.rows.length - visible))
      this.scroll = Math.max(0, start)
      this.rows.slice(this.scroll, this.scroll + visible).forEach((row, i) => {
        const realIndex = this.scroll + i
        const y = 23 + i * lineH
        const active = realIndex === this.index
        if (active) cursor(ctx, 10, y, this.time)
        drawText(ctx, row.label, 18, y, active ? PAL.uiBorder : PAL.shadow)
        if (row.right) drawText(ctx, row.right, 230, y, PAL.grey, 'right')
        if (row.sub) {
          const wrapped = wrapText(row.sub, 196)
          const sub = wrapped.length > 1 ? `${wrapped[0]}\u2026` : wrapped[0] || ''
          drawText(ctx, sub, 18, y + 9, PAL.grey)
        }
      })
      // position, so a long list does not look like a short one
      if (this.rows.length > visible) {
        drawText(ctx, `${this.index + 1}/${this.rows.length}`, 228, 129, PAL.greyLight, 'right')
      }
    }
    this.renderFooter(ctx, this.rows.length ? 'Open: A    Change page: ← →    Close: B' : 'Change page: ← →    Close: B')
  }

  emptyText() {
    switch (TABS[this.tab]) {
      case 'People':
        return 'Nobody yet. Talk to someone - the notebook fills itself from conversations.'
      case 'Problems':
        return 'Nothing recorded. Ask people what their day costs them, or look properly at something in the street.'
      case 'Links':
        return 'No links traced yet. Compare two problems, or use Connect during an encounter, to find where one feeds another.'
      case 'Notes':
        return 'No notes yet. Specifics get written here: what someone said, what you saw.'
      case 'Tasks':
        return 'No objectives.'
      case 'Places':
        return 'Nowhere visited yet.'
      default:
        return 'No decisions taken yet. When you make one that matters, it is recorded here - including what it cost.'
    }
  }

  renderFooter(ctx, text) {
    panel(ctx, 4, 141, 232, 15, { fill: PAL.uiPanel, shadow: false })
    drawText(ctx, text, 10, 145, PAL.grey)
  }

  // -----------------------------------------------------------------------
  renderDetail(ctx) {
    panel(ctx, 4, 17, 232, 122)
    const lines = this.detailLines()
    this.detailMax = Math.max(0, lines.length - 10)
    const shown = lines.slice(this.detailScroll, this.detailScroll + 10)
    shown.forEach((line, i) => {
      const y = 23 + i * 11
      if (typeof line === 'string') {
        drawText(ctx, line, 12, y, PAL.shadow)
      } else if (line.kind === 'head') {
        drawText(ctx, line.text, 12, y, PAL.uiBorder)
        divider(ctx, 12, y + 9, 216)
      } else if (line.kind === 'chip') {
        chip(ctx, 12, y - 1, line.text, line.color)
      } else if (line.kind === 'bar') {
        drawText(ctx, line.label, 12, y, PAL.grey)
        bar(ctx, 52, y, 120, 7, line.value, line.color, { ticks: false, track: PAL.uiPanelDark })
        drawText(ctx, String(line.value), 230, y, PAL.grey, 'right')
      } else if (line.kind === 'quote') {
        drawText(ctx, line.text, 16, y, PAL.blueDark)
      }
    })
    if (this.detailMax > 0) {
      drawText(ctx, `${this.detailScroll + 1}/${this.detailMax + 1}`, 228, 127, PAL.greyLight, 'right')
    }
    const hint =
      this.detail.kind === 'problem' ? 'Compare: A    Scroll: ↑ ↓    Back: B' : 'Scroll: ↑ ↓    Back: B'
    this.renderFooter(ctx, hint)
  }

  /** Build the detail page as a list of renderable lines. */
  detailLines() {
    const d = this.detail
    const state = this.game.state
    const out = []
    const push = (text) => wrapText(text, 212).forEach((l) => out.push(l))

    if (d.kind === 'problem') {
      const problem = d.problem
      const revealed = World.revealedFor(state, problem.id)
      out.push({ kind: 'head', text: problem.name })
      out.push('')
      out.push({ kind: 'chip', text: problem.category, color: CATEGORY_COLORS[problem.category] || PAL.grey })
      out.push('')
      push(problem.description)
      out.push('')
      out.push({ kind: 'head', text: `Understood: ${Math.round(World.understandingOf(state, problem.id))}%` })
      out.push('')
      DIMENSIONS.forEach((dim) =>
        out.push({
          kind: 'bar',
          label: dim.label,
          value: problem.impacts[dim.key],
          color: DIMENSION_COLORS[dim.key],
        }),
      )
      out.push('')
      out.push({ kind: 'head', text: 'Who it lands on' })
      out.push('')
      ;(problem.affectedGroups || []).forEach((g) => push(`• ${g}`))
      const causes = (problem.causes || []).slice(0, revealed.causes)
      if (causes.length) {
        out.push('')
        out.push({ kind: 'head', text: 'Why it happens' })
        out.push('')
        causes.forEach((c) => push(`• ${c}`))
      }
      const consequences = (problem.consequences || []).slice(0, revealed.consequences)
      if (consequences.length) {
        out.push('')
        out.push({ kind: 'head', text: 'What follows' })
        out.push('')
        consequences.forEach((c) => push(`• ${c}`))
      }
      const perspectives = (problem.perspectives || []).slice(0, revealed.perspectives)
      if (perspectives.length) {
        out.push('')
        out.push({ kind: 'head', text: 'In their words' })
        out.push('')
        perspectives.forEach((p) => {
          push(`${p.speaker}, ${p.role} (${p.stance === 'opinion' ? 'opinion' : 'experience'}):`)
          wrapText(`"${p.text}"`, 208).forEach((l) => out.push({ kind: 'quote', text: l }))
          out.push('')
        })
      }
      const notes = World.notesFor(state, problem.id)
      if (notes.length) {
        out.push({ kind: 'head', text: 'Your notes' })
        out.push('')
        notes.forEach((n) => push(`• ${n}`))
      }
      const hidden =
        (problem.causes || []).length -
        revealed.causes +
        ((problem.consequences || []).length - revealed.consequences) +
        ((problem.perspectives || []).length - revealed.perspectives)
      if (hidden > 0) {
        out.push('')
        push(`${hidden} thing${hidden === 1 ? '' : 's'} about this you have not found out yet.`)
      }
      return out
    }

    if (d.kind === 'person') {
      const npc = getNpc(d.person.id)
      out.push({ kind: 'head', text: npc.name })
      out.push('')
      push(`${npc.role}${npc.age ? `, ${npc.age}` : ''}`)
      out.push('')
      out.push({ kind: 'bar', label: 'Trust', value: World.trustOf(state, npc.id), color: PAL.teal })
      out.push('')
      if (npc.problem) {
        const problem = getProblem(npc.problem)
        if (problem && World.hasDiscovered(state, npc.problem)) {
          push(`What they are carrying: ${problem.short}.`)
        } else {
          push('You have not got to what they are carrying yet.')
        }
      }
      const notes = []
      Object.entries(state.notes || {}).forEach(([problemId, list]) => {
        list.forEach((text) => {
          if (text.toLowerCase().includes(npc.name.split(' ')[0].toLowerCase())) notes.push(text)
        })
      })
      if (notes.length) {
        out.push('')
        out.push({ kind: 'head', text: 'From your notes' })
        out.push('')
        notes.forEach((n) => push(`• ${n}`))
      }
      return out
    }

    if (d.kind === 'link') {
      out.push({ kind: 'head', text: 'Connection' })
      out.push('')
      push(`${d.link.a.name}`)
      push('   ↓')
      push(`${d.link.b.name}`)
      out.push('')
      push(`${d.link.a.short} and ${d.link.b.short} are not the same problem. They share causes and they make each other heavier.`)
      out.push('')
      push(`${d.link.a.short}: ${d.link.a.summary}`)
      out.push('')
      push(`${d.link.b.short}: ${d.link.b.summary}`)
      return out
    }

    if (d.kind === 'note') {
      out.push({ kind: 'head', text: d.note.problem.short })
      out.push('')
      push(d.note.text)
      out.push('')
      push('Recorded by you, in the ward, on the day it was said.')
      return out
    }

    if (d.kind === 'quest') {
      const row = d.row
      out.push({ kind: 'head', text: row.quest.name })
      out.push('')
      push(row.quest.summary)
      out.push('')
      row.steps.forEach((step) => {
        push(`${step.done ? '[x]' : step.locked ? '[ ]' : '[ ]'} ${step.text}`)
      })
      if (row.status === 'done') {
        out.push('')
        push(row.quest.completionText || 'Done.')
      }
      return out
    }

    if (d.kind === 'place') {
      out.push({ kind: 'head', text: d.def.name })
      out.push('')
      push(d.def.subtitle || '')
      out.push('')
      push(d.def.blurb || 'Walked, and written down.')
      const here = state.metNpcs
        .map((id) => getNpc(id))
        .filter((npc) => npc && (d.def.npcs || []).some((p) => p.id === npc.id))
      if (here.length) {
        out.push('')
        out.push({ kind: 'head', text: 'People you met here' })
        out.push('')
        here.forEach((npc) => push(`\u2022 ${npc.name} - ${npc.role}`))
      }
      return out
    }

    if (d.kind === 'decision') {
      out.push({ kind: 'head', text: d.decision.title })
      out.push('')
      push(`You chose: ${d.decision.choice}`)
      out.push('')
      out.push({ kind: 'head', text: 'What followed' })
      out.push('')
      push(d.decision.consequence)
      return out
    }

    return out
  }
}
