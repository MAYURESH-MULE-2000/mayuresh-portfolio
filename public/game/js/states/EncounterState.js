/**
 * EncounterState.js
 * ---------------------------------------------------------------------------
 * The problem encounter. It borrows the shape of a handheld RPG battle screen -
 * a subject at the top, meters, a menu of actions, a message box - but nothing
 * here does damage and nobody wins.
 *
 * What the actions move instead:
 *   Grasp   - how much of the situation you actually understand
 *   Open    - how willing the person in front of you is to keep going
 *   Strain  - what the conversation is costing them; push too hard and it ends
 *
 * Every line of content shown here comes from data/problems.js. Investigating
 * reveals causes and consequences one at a time; asking reveals a named
 * perspective, labelled as lived experience or as opinion. The screen never
 * asserts anything the data has not attributed to somebody.
 */

import { PAL, DIMENSION_COLORS, CATEGORY_COLORS } from '../gfx/Palette.js'
import { drawText, wrapText } from '../gfx/Font.js'
import { panel, darkPanel, bar, cursor, chip } from '../ui/UIKit.js'
import { drawEmblem } from '../gfx/Emblems.js'
import { VIEW_W, VIEW_H } from '../core/Renderer.js'
import { getProblem, DIMENSIONS } from '../../data/problems.js'
import { World } from '../systems/WorldState.js'
import { hasUnlock } from '../systems/Progression.js'
import { getNpc } from '../../data/npcs.js'

const ACTION_COLS = 3

export class EncounterState {
  constructor(game) {
    this.game = game
    this.name = 'ENCOUNTER'
    this.transparent = false
  }

  enter(params) {
    const game = this.game
    this.problem = getProblem(params.problemId)
    this.npcId = params.npcId || null
    this.npc = this.npcId ? getNpc(this.npcId) : null
    this.source = params.source || (this.npc ? this.npc.name : 'What you are looking at')
    this.time = 0
    this.messageLines = []
    this.typed = 0
    this.index = 0
    this.sharedThisEncounter = false
    this.gained = 0
    this.looks = 0
    this.asks = 0
    this.ending = false

    if (!this.problem) {
      // Never leave the player stuck on a broken screen.
      game.states.pop()
      return
    }

    const state = game.state
    this.startUnderstanding = World.understandingOf(state, this.problem.id)
    this.understanding = this.startUnderstanding
    this.openness = this.npc ? Math.max(25, World.trustOf(state, this.npcId)) : 45
    this.strain = 0
    this.revealed = World.revealedFor(state, this.problem.id)

    game.journal.discoverProblem(this.problem.id)
    World.addCount(state, 'encounters')
    game.audio.playMusic('encounter')

    this.setMessage(
      params.intro ||
        (this.npc
          ? `${this.npc.name} waits for you to ask something real.`
          : `${this.problem.summary}`),
    )
    this.buildActions()
  }

  exit() {
    this.game.audio.playMusic(this.game.map?.music || 'town')
  }

  // -----------------------------------------------------------------------
  // actions
  // -----------------------------------------------------------------------
  buildActions() {
    const game = this.game
    const state = game.state
    const remainingLooks = this.remainingFindings().length
    const remainingAsks = (this.problem.perspectives || []).length - this.revealed.perspectives

    this.actions = [
      {
        id: 'look',
        label: 'Look closer',
        enabled: remainingLooks > 0,
        reason: 'You have seen everything you can from here.',
      },
      {
        id: 'ask',
        label: 'Ask',
        enabled: remainingAsks > 0,
        reason: 'Nobody here has more to add right now.',
      },
      {
        id: 'compare',
        label: 'Compare',
        enabled: state.discovered.length >= 2,
        reason: 'You need a second problem recorded before you can compare.',
      },
      {
        id: 'share',
        label: 'Share',
        enabled: hasUnlock(state, 'share') && !this.sharedThisEncounter,
        reason: hasUnlock(state, 'share')
          ? 'You have already offered something of your own.'
          : 'Empathy 2 needed - sit with a few more answers first.',
      },
      {
        id: 'connect',
        label: 'Connect',
        enabled: hasUnlock(state, 'connect') && this.connectableProblem() !== null,
        reason: hasUnlock(state, 'connect')
          ? 'Nothing you have recorded links to this one yet.'
          : 'Knowledge 3 needed to test links between problems.',
      },
      { id: 'leave', label: 'Step back', enabled: true },
    ]
  }

  /** Causes and consequences the player has not been shown yet. */
  remainingFindings() {
    const out = []
    const causes = this.problem.causes || []
    const consequences = this.problem.consequences || []
    for (let i = this.revealed.causes; i < causes.length; i++) out.push({ type: 'cause', text: causes[i] })
    for (let i = this.revealed.consequences; i < consequences.length; i++) {
      out.push({ type: 'consequence', text: consequences[i] })
    }
    return out
  }

  /** A recorded problem this one is linked to and that is not yet connected. */
  connectableProblem() {
    const state = this.game.state
    for (const other of this.problem.connections || []) {
      if (!World.hasDiscovered(state, other)) continue
      if (World.hasConnection(state, this.problem.id, other)) continue
      return other
    }
    return null
  }

  /** Messages are paginated three lines at a time, like the dialogue box. */
  setMessage(text) {
    const wrapped = wrapText(text, 216)
    this.pages = []
    for (let i = 0; i < wrapped.length; i += 3) this.pages.push(wrapped.slice(i, i + 3))
    if (!this.pages.length) this.pages = [['']]
    this.pageIndex = 0
    this.messageLines = this.pages[0]
    this.typed = 0
  }

  messageComplete() {
    return this.typed >= this.messageLines.join('').length
  }

  hasMorePages() {
    return this.pageIndex < this.pages.length - 1
  }

  nextPage() {
    this.pageIndex++
    this.messageLines = this.pages[this.pageIndex]
    this.typed = 0
  }

  // -----------------------------------------------------------------------
  update(dt, input) {
    this.time += dt
    if (!this.messageComplete()) {
      this.typed += 90 * dt
      // A press skips the typing rather than forcing the player to wait.
      if (input.justPressed('confirm') || input.justPressed('cancel')) {
        this.typed = this.messageLines.join('').length
      }
      return
    }

    // The encounter has run its course: let the player read the last line, then
    // close on a press. Ending here rather than in render() means the state
    // stack is never mutated while it is being drawn.
    if (this.queueEnd && !this.hasMorePages() && !this.ending) {
      if (input.justPressed('confirm') || input.justPressed('cancel')) {
        const reason = this.queueEnd
        this.queueEnd = null
        this.finish(
          reason === 'strain'
            ? 'They have had enough of being asked. You stop.'
            : 'There is nothing more you can take from this without taking something from them.',
        )
      }
      return
    }

    // Long answers are read a page at a time before the menu comes back.
    if (this.hasMorePages()) {
      if (input.justPressed('confirm') || input.justPressed('cancel')) {
        this.nextPage()
        this.game.audio.play('blip')
      }
      return
    }

    const cols = ACTION_COLS
    if (input.repeat('right', dt)) {
      this.index = (this.index + 1) % this.actions.length
      this.game.audio.play('select')
    }
    if (input.repeat('left', dt)) {
      this.index = (this.index - 1 + this.actions.length) % this.actions.length
      this.game.audio.play('select')
    }
    if (input.repeat('down', dt)) {
      this.index = (this.index + cols) % this.actions.length
      this.game.audio.play('select')
    }
    if (input.repeat('up', dt)) {
      this.index = (this.index - cols + this.actions.length) % this.actions.length
      this.game.audio.play('select')
    }
    if (input.justPressed('confirm')) this.choose(this.actions[this.index])
    if (input.justPressed('cancel')) this.choose(this.actions[this.actions.length - 1])
  }

  choose(action) {
    if (!action) return
    if (!action.enabled) {
      this.game.audio.play('cancel')
      this.setMessage(action.reason || 'Not available here.')
      return
    }
    this.game.audio.play('confirm')
    switch (action.id) {
      case 'look':
        this.doLook()
        break
      case 'ask':
        this.doAsk()
        break
      case 'compare':
        this.doCompare()
        break
      case 'share':
        this.doShare()
        break
      case 'connect':
        this.doConnect()
        break
      default:
        this.finish('You step back, and let it be for now.')
    }
    this.buildActions()
  }

  doLook() {
    const state = this.game.state
    const deep = hasUnlock(state, 'detail')
    const findings = this.remainingFindings().slice(0, deep ? 2 : 1)
    findings.forEach((f) => {
      if (f.type === 'cause') this.revealed.causes++
      else this.revealed.consequences++
    })
    this.looks++
    const gain = 8 + Math.min(6, World.stat(state, 'observation') * 2) + (deep ? 4 : 0)
    this.addUnderstanding(gain)
    if (this.npc) this.addStrain(3)
    const text = findings
      .map((f) => (f.type === 'cause' ? `Why: ${f.text}.` : `What follows: ${f.text}.`))
      .join(' ')
    this.setMessage(text || 'Nothing new from here.')
    this.game.audio.play('note')
  }

  doAsk() {
    const state = this.game.state
    const perspective = (this.problem.perspectives || [])[this.revealed.perspectives]
    if (!perspective) {
      this.setMessage('Nobody here has more to add right now.')
      return
    }
    this.revealed.perspectives++
    this.asks++
    this.addUnderstanding(10)
    this.openness = Math.min(100, this.openness + 6 + Math.min(6, World.stat(state, 'communication') * 2))
    // Painful subjects cost something to ask about. Skill softens that.
    const painful = this.problem.impacts.emotional > 70
    if (painful) this.addStrain(hasUnlock(state, 'press') ? 4 : 8)
    const tag = perspective.stance === 'opinion' ? 'their opinion' : 'their own experience'
    this.setMessage(`${perspective.speaker}, ${perspective.role} - ${tag}: "${perspective.text}"`)
    this.game.audio.play('blip')
  }

  doCompare() {
    this.game.openComparison(this.problem.id, (result) => {
      if (!result) return
      this.addUnderstanding(6)
      World.addCount(this.game.state, 'comparisons')
      this.setMessage(result.summary || 'You hold the two side by side. Neither one cancels the other.')
      this.buildActions()
    })
  }

  doShare() {
    this.sharedThisEncounter = true
    this.openness = Math.min(100, this.openness + 14)
    this.addStrain(-15)
    this.addUnderstanding(4)
    World.addStat(this.game.state, 'empathy', 1)
    const line = this.npc
      ? `You say something about your own house instead of asking about theirs. ${this.npc.name} looks at you properly for the first time.`
      : 'You stop taking notes for a minute and just stand with it.'
    this.setMessage(line)
    this.game.audio.play('open')
  }

  doConnect() {
    const other = this.connectableProblem()
    if (!other) return
    const target = getProblem(other)
    World.addConnection(this.game.state, this.problem.id, other)
    this.addUnderstanding(12)
    World.addStat(this.game.state, 'knowledge', 1)
    this.setMessage(
      `You put it next to ${target.short}. They are not the same problem, but one keeps feeding the other. Noted in the journal.`,
    )
    this.game.toast('Connection noted')
    this.game.audio.play('discover')
  }

  addUnderstanding(amount) {
    const before = this.understanding
    this.understanding = Math.max(0, Math.min(100, this.understanding + amount))
    this.gained += this.understanding - before
    if (this.understanding >= 100) {
      // Not "solved" - just as complete a picture as this encounter can give.
      this.queueEnd = 'full'
    }
  }

  addStrain(amount) {
    this.strain = Math.max(0, Math.min(100, this.strain + amount))
    if (this.strain >= 100) this.queueEnd = 'strain'
  }

  finish(reason) {
    if (this.ending) return
    this.ending = true
    const game = this.game
    const state = game.state

    state.understanding[this.problem.id] = this.understanding
    if (this.npcId) game.raiseTrust(this.npcId, Math.round((this.openness - 40) / 10))

    // Attribute gains reflect what the player actually did in the encounter.
    if (this.looks >= 2) World.addStat(state, 'observation', 1)
    if (this.asks >= 2) World.addStat(state, 'communication', 1)
    if (this.gained >= 25) World.addStat(state, 'knowledge', 1)
    if (this.strain > 60) World.addStat(state, 'resilience', 1)

    const lines = [reason]
    lines.push(
      `${this.problem.name}: you understand about ${Math.round(this.understanding)}% of what is going on here.`,
    )
    if (this.understanding < 60) {
      lines.push('There is more to this. People will still be here tomorrow.')
    } else if (this.understanding >= 100) {
      lines.push('You have as much of this as one conversation can give you. What to do with it is another question.')
    }

    game.states.pop()
    game.showText(this.problem.short, lines)
  }

  // -----------------------------------------------------------------------
  render(ctx) {
    ctx.fillStyle = PAL.uiBack
    ctx.fillRect(0, 0, VIEW_W, VIEW_H)
    // subtle vertical banding so the background is not a flat field
    ctx.globalAlpha = 0.25
    for (let y = 0; y < VIEW_H; y += 4) {
      ctx.fillStyle = PAL.black
      ctx.fillRect(0, y, VIEW_W, 1)
    }
    ctx.globalAlpha = 1

    this.renderHeader(ctx)
    this.renderImpacts(ctx)
    this.renderSubject(ctx)
    this.renderMeters(ctx)
    this.renderActions(ctx)
    this.renderMessage(ctx)
    this.game.renderToasts(ctx)
  }

  renderHeader(ctx) {
    ctx.fillStyle = PAL.uiBorder
    ctx.fillRect(0, 0, VIEW_W, 13)
    ctx.fillStyle = PAL.black
    ctx.fillRect(0, 13, VIEW_W, 1)
    drawText(ctx, 'PROBLEM ENCOUNTER', 5, 3, PAL.uiPanel)
    drawText(ctx, this.source, VIEW_W - 5, 3, PAL.uiAccent, 'right')
  }

  renderImpacts(ctx) {
    const x = 4
    const y = 15
    panel(ctx, x, y, 120, 58, { fill: PAL.uiPanel })
    drawText(ctx, this.problem.short, x + 6, y + 5, PAL.uiBorder)
    DIMENSIONS.forEach((dim, i) => {
      const ly = y + 17 + i * 8
      drawText(ctx, dim.label, x + 6, ly - 1, PAL.grey)
      bar(ctx, x + 38, ly, 58, 7, this.problem.impacts[dim.key], DIMENSION_COLORS[dim.key], {
        ticks: false,
        track: PAL.uiPanelDark,
      })
      drawText(ctx, String(this.problem.impacts[dim.key]), x + 116, ly - 1, PAL.grey, 'right')
    })
  }

  renderSubject(ctx) {
    const x = 128
    const y = 15
    panel(ctx, x, y, 108, 58, { fill: PAL.uiPanel })
    drawEmblem(ctx, this.problem, x + 4, y + 6, this.time)
    const category = this.problem.category
    chip(ctx, x + 56, y + 6, category, CATEGORY_COLORS[category] || PAL.grey)
    const who = this.npc ? this.npc.role : 'What you can see'
    wrapText(who, 46)
      .slice(0, 3)
      .forEach((line, i) => drawText(ctx, line, x + 56, y + 19 + i * 8, PAL.grey))
    const understood = Math.round(this.understanding)
    drawText(ctx, `${understood}% grasped`, x + 102, y + 45, PAL.uiBorder, 'right')
  }

  renderMeters(ctx) {
    const y = 75
    panel(ctx, 4, y, 232, 16, { fill: PAL.uiPanel })
    drawText(ctx, 'Grasp', 9, y + 4, PAL.grey)
    bar(ctx, 38, y + 4, 38, 8, this.understanding, PAL.uiGood, { ticks: false, track: PAL.uiPanelDark })
    drawText(ctx, 'Open', 84, y + 4, PAL.grey)
    bar(ctx, 110, y + 4, 38, 8, this.openness, PAL.blue, { ticks: false, track: PAL.uiPanelDark })
    drawText(ctx, 'Strain', 156, y + 4, PAL.grey)
    bar(ctx, 190, y + 4, 40, 8, this.strain, this.strain > 60 ? PAL.uiBad : PAL.uiWarn, {
      ticks: false,
      track: PAL.uiPanelDark,
    })
  }

  renderActions(ctx) {
    const x = 4
    const y = 93
    panel(ctx, x, y, 232, 26, { fill: PAL.uiPanel })
    this.actions.forEach((action, i) => {
      const col = i % ACTION_COLS
      const row = Math.floor(i / ACTION_COLS)
      const ax = x + 8 + col * 76
      const ay = y + 4 + row * 11
      if (i === this.index) cursor(ctx, ax - 6, ay, this.time)
      drawText(ctx, action.label, ax + 1, ay, action.enabled ? PAL.uiBorder : PAL.greyLight)
    })
  }

  renderMessage(ctx) {
    const x = 4
    const y = 121
    darkPanel(ctx, x, y, 232, 35)
    let budget = Math.floor(this.typed)
    this.messageLines.slice(0, 3).forEach((line, i) => {
      const shown = line.slice(0, Math.max(0, budget))
      budget -= line.length
      drawText(ctx, shown, x + 7, y + 5 + i * 10, PAL.uiPanel)
    })
    if (this.messageLines.length > 3 && this.messageComplete()) {
      drawText(ctx, '…', x + 222, y + 25, PAL.uiAccent, 'right')
    }
  }
}
