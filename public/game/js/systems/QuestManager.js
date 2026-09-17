/**
 * QuestManager.js
 * ---------------------------------------------------------------------------
 * Tracks objective state. Steps are ticked by effects (dialogue, investigation)
 * or by counters (talk to two people). When every step but a gated final one is
 * done, the quest's `evidenceFlag` is raised - that is how an NPC's dialogue
 * knows the player is ready to report back.
 */

import { QUESTS, getQuest } from '../../data/quests.js'
import { World } from './WorldState.js'

export class QuestManager {
  constructor(game) {
    this.game = game
    this.onComplete = null
  }

  get state() {
    return this.game.state
  }

  /** Quests that start on their own the first time the world is entered. */
  startAutoQuests() {
    for (const quest of Object.values(QUESTS)) {
      if (quest.autoStart) this.start(quest.id)
    }
  }

  start(id) {
    const quest = getQuest(id)
    if (!quest) return false
    const quests = this.state.quests
    if (quests[id]) return false
    quests[id] = { status: 'active', steps: {}, counts: {} }
    this.refresh(id)
    return true
  }

  isActive(id) {
    return this.state.quests[id]?.status === 'active'
  }

  isComplete(id) {
    return this.state.quests[id]?.status === 'done'
  }

  entry(id) {
    return this.state.quests[id] || null
  }

  completeStep(questId, stepId) {
    const entry = this.state.quests[questId]
    if (!entry || entry.status !== 'active') return false
    if (entry.steps[stepId]) return false
    entry.steps[stepId] = true
    this.refresh(questId)
    return true
  }

  /** Counter-driven steps ("talk to two people"). */
  notifyCounter(counterName) {
    for (const [id, entry] of Object.entries(this.state.quests)) {
      if (entry.status !== 'active') continue
      const quest = getQuest(id)
      if (!quest) continue
      let changed = false
      for (const step of quest.steps) {
        if (step.counter !== counterName || entry.steps[step.id]) continue
        if (World.count(this.state, counterName) >= step.count) {
          entry.steps[step.id] = true
          changed = true
        }
      }
      if (changed) this.refresh(id)
    }
  }

  /** Re-evaluate gates and completion for one quest. */
  refresh(id) {
    const quest = getQuest(id)
    const entry = this.state.quests[id]
    if (!quest || !entry || entry.status !== 'active') return
    const gated = quest.steps.filter((s) => s.gatedBy)
    const ungated = quest.steps.filter((s) => !s.gatedBy)
    const ungatedDone = ungated.every((s) => entry.steps[s.id])
    if (ungatedDone && quest.evidenceFlag) World.setFlag(this.state, quest.evidenceFlag)
    const allDone = quest.steps.every((s) => entry.steps[s.id])
    if (allDone || (ungatedDone && gated.length === 0)) this.complete(id)
  }

  complete(id) {
    const quest = getQuest(id)
    const entry = this.state.quests[id]
    if (!quest || !entry || entry.status === 'done') return
    entry.status = 'done'
    entry.completedAt = Date.now()
    if (quest.setFlag) World.setFlag(this.state, quest.setFlag)
    if (quest.grants?.stat) {
      for (const [key, amount] of Object.entries(quest.grants.stat)) World.addStat(this.state, key, amount)
    }
    if (quest.grants?.item) World.addItem(this.state, quest.grants.item)
    if (this.onComplete) this.onComplete(quest)
  }

  /** Rows for the journal's quest page. */
  rows() {
    return Object.entries(this.state.quests)
      .map(([id, entry]) => {
        const quest = getQuest(id)
        if (!quest) return null
        return {
          quest,
          status: entry.status,
          steps: quest.steps.map((step) => ({
            text: step.text,
            done: Boolean(entry.steps[step.id]),
            locked: Boolean(step.gatedBy) && !quest.steps.filter((s) => !s.gatedBy).every((s) => entry.steps[s.id]),
          })),
        }
      })
      .filter(Boolean)
      .sort((a, b) => (a.status === b.status ? 0 : a.status === 'active' ? -1 : 1))
  }

  /** The single line shown on the overworld HUD. */
  activeHint() {
    const active = this.rows().find((r) => r.status === 'active')
    if (!active) return null
    const step = active.steps.find((s) => !s.done && !s.locked)
    return step ? { quest: active.quest.name, step: step.text } : null
  }
}
