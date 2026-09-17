/**
 * Journal.js
 * ---------------------------------------------------------------------------
 * The journal is not a separate database - it is a view over world state with
 * the rules about what counts as "known" in one place.
 */

import { World } from './WorldState.js'
import { PROBLEMS, getProblem } from '../../data/problems.js'
import { getNpc } from '../../data/npcs.js'

export class Journal {
  constructor(game) {
    this.game = game
  }

  get state() {
    return this.game.state
  }

  /** Returns true if this is the first time the problem has been recorded. */
  discoverProblem(id) {
    const state = this.state
    if (!getProblem(id)) {
      console.warn(`unknown problem "${id}"`)
      return false
    }
    if (World.hasDiscovered(state, id)) return false
    state.discovered.push(id)
    state.understanding[id] = Math.max(10, World.understandingOf(state, id))
    World.addCount(state, 'problemsFound')
    this.game.quests.notifyCounter('problemsFound')
    return true
  }

  addNote(problemId, text) {
    if (!problemId || !text) return false
    const state = this.state
    if (!state.notes[problemId]) state.notes[problemId] = []
    if (state.notes[problemId].includes(text)) return false
    state.notes[problemId].push(text)
    // A note about a problem you have not formally recorded still records it.
    this.discoverProblem(problemId)
    return true
  }

  meetNpc(id) {
    const state = this.state
    if (state.metNpcs.includes(id)) return false
    state.metNpcs.push(id)
    World.addCount(state, 'peopleMet')
    this.game.quests.notifyCounter('peopleMet')
    return true
  }

  visitMap(id) {
    const state = this.state
    if (state.visitedMaps.includes(id)) return false
    state.visitedMaps.push(id)
    return true
  }

  addDecision(decision) {
    const state = this.state
    state.decisions = state.decisions.filter((d) => d.id !== decision.id)
    state.decisions.push(Object.assign({ at: Date.now() }, decision))
  }

  /** People the player has met, as journal rows. */
  people() {
    return this.state.metNpcs
      .map((id) => getNpc(id))
      .filter(Boolean)
      .map((npc) => ({
        id: npc.id,
        name: npc.name,
        role: npc.role,
        age: npc.age,
        problem: npc.problem,
        trust: World.trustOf(this.state, npc.id),
      }))
  }

  /** Problems recorded, most recently found first. */
  problems() {
    return this.state.discovered
      .map((id) => PROBLEMS[id])
      .filter(Boolean)
      .map((p) => ({
        problem: p,
        understanding: World.understandingOf(this.state, p.id),
        notes: World.notesFor(this.state, p.id),
      }))
  }

  /** Connection pairs the player has noticed, as readable rows. */
  connections() {
    return (this.state.connections || [])
      .map((key) => key.split('|'))
      .map(([a, b]) => ({ a: getProblem(a), b: getProblem(b) }))
      .filter((row) => row.a && row.b)
  }

  /**
   * Connections that exist in the data between two recorded problems but that
   * the player has not noticed yet. Used to tell them there is more to see
   * without telling them what it is.
   */
  undiscoveredConnectionCount() {
    const discovered = this.state.discovered
    let count = 0
    for (const id of discovered) {
      const problem = PROBLEMS[id]
      if (!problem) continue
      for (const other of problem.connections || []) {
        if (!discovered.includes(other)) continue
        if (!World.hasConnection(this.state, id, other)) count++
      }
    }
    return Math.floor(count / 2)
  }

  allNotes() {
    const rows = []
    for (const [problemId, notes] of Object.entries(this.state.notes || {})) {
      const problem = getProblem(problemId)
      if (!problem) continue
      notes.forEach((text) => rows.push({ problem, text }))
    }
    return rows
  }
}
