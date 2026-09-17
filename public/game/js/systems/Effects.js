/**
 * Effects.js
 * ---------------------------------------------------------------------------
 * One implementation of "what an effect does", shared by dialogue nodes,
 * investigating objects and encounter outcomes. Content files therefore never
 * need to know which system is firing them.
 *
 * Returns a list of toast lines describing what visibly changed, so the caller
 * can show the player that recording something actually happened.
 */

import { World } from './WorldState.js'
import { getProblem } from '../../data/problems.js'
import { getItem } from '../../data/items.js'
import { newUnlocksBetween } from './Progression.js'

export function applyEffect(game, effect, context = {}) {
  if (!effect) return []
  const state = game.state
  const messages = []
  const statsBefore = Object.assign({}, state.stats)

  if (effect.flag) World.setFlag(state, effect.flag)
  if (Array.isArray(effect.flags)) effect.flags.forEach((f) => World.setFlag(state, f))

  if (effect.discover) {
    if (game.journal.discoverProblem(effect.discover)) {
      const problem = getProblem(effect.discover)
      messages.push(`Recorded: ${problem ? problem.short : effect.discover}`)
    }
  }

  if (effect.note) {
    if (game.journal.addNote(effect.note.problem, effect.note.text)) {
      messages.push('Note added')
    }
  }

  if (effect.item) {
    if (World.addItem(state, effect.item)) {
      const item = getItem(effect.item)
      messages.push(`Received: ${item ? item.name : effect.item}`)
    }
  }

  if (effect.stat) {
    for (const [key, amount] of Object.entries(effect.stat)) {
      World.addStat(state, key, amount)
    }
  }

  if (effect.trust && context.npcId) {
    state.trust[context.npcId] = Math.max(
      0,
      Math.min(100, World.trustOf(state, context.npcId) + effect.trust),
    )
  }

  if (effect.quest) {
    if (game.quests.start(effect.quest)) {
      messages.push('New objective')
    }
  }

  if (effect.step) {
    const [questId, stepId] = String(effect.step).split('/')
    if (game.quests.completeStep(questId, stepId)) {
      messages.push('Objective updated')
    }
  }

  if (effect.decision) {
    game.journal.addDecision(effect.decision)
    messages.push('Decision recorded')
  }

  if (effect.connection) {
    const [a, b] = effect.connection
    if (World.addConnection(state, a, b)) messages.push('Connection noted')
  }

  // Attribute thresholds that unlock a real action are worth announcing.
  const unlocked = newUnlocksBetween(statsBefore, state.stats)
  unlocked.forEach((u) => messages.push(`Unlocked: ${u.label}`))

  return messages
}

/** Condition check shared by dialogue choices and entry rules. */
export function checkRequirement(game, require) {
  if (!require) return true
  const state = game.state
  if (require.flag && !World.flag(state, require.flag)) return false
  if (require.notFlag && World.flag(state, require.notFlag)) return false
  if (require.item && !World.hasItem(state, require.item)) return false
  if (require.discovered && !World.hasDiscovered(state, require.discovered)) return false
  if (require.questActive && !game.quests.isActive(require.questActive)) return false
  if (require.questDone && !game.quests.isComplete(require.questDone)) return false
  if (require.stat) {
    for (const [key, min] of Object.entries(require.stat)) {
      if (World.stat(state, key) < min) return false
    }
  }
  if (require.minDiscovered && state.discovered.length < require.minDiscovered) return false
  return true
}
