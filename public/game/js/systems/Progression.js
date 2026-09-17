/**
 * Progression.js
 * ---------------------------------------------------------------------------
 * Five attributes, no experience bar and no levels in the monster-collecting
 * sense. Attributes rise from doing the thing they describe, and each one
 * unlocks a concrete ability - never a passive number nobody can see.
 */

import { World } from './WorldState.js'

export const ATTRIBUTES = [
  { key: 'empathy', label: 'Empathy', blurb: 'Sitting with an answer instead of moving to the next question.' },
  { key: 'knowledge', label: 'Knowledge', blurb: 'What you have actually learned about how things here work.' },
  { key: 'observation', label: 'Observation', blurb: 'Noticing the detail nobody pointed out to you.' },
  { key: 'communication', label: 'Communication', blurb: 'Asking in a way that gets the second answer, not the polite one.' },
  { key: 'resilience', label: 'Resilience', blurb: 'Staying useful when what you find is heavy.' },
]

/** Abilities gated on attributes. Each one is a real action somewhere. */
export const UNLOCKS = [
  {
    id: 'share',
    stat: 'empathy',
    at: 2,
    label: 'Share experience',
    detail: 'An encounter action: offer something of your own instead of asking.',
  },
  {
    id: 'connect',
    stat: 'knowledge',
    at: 3,
    label: 'Look for connections',
    detail: 'An encounter action: test whether this problem is tied to another you know.',
  },
  {
    id: 'detail',
    stat: 'observation',
    at: 3,
    label: 'Closer investigation',
    detail: 'Investigating reveals two findings at a time instead of one.',
  },
  {
    id: 'press',
    stat: 'communication',
    at: 3,
    label: 'Ask the harder question',
    detail: 'Asking gains more trust, and costs less when the subject is painful.',
  },
]

export function hasUnlock(state, id) {
  const unlock = UNLOCKS.find((u) => u.id === id)
  if (!unlock) return false
  return World.stat(state, unlock.stat) >= unlock.at
}

/** A single readable number for the status screen. Not used in any formula. */
export function understandingLevel(state) {
  const total = ATTRIBUTES.reduce((sum, a) => sum + World.stat(state, a.key), 0)
  return Math.max(1, Math.floor(total / 4) + 1)
}

export function newUnlocksBetween(before, after) {
  return UNLOCKS.filter((u) => (before[u.stat] || 0) < u.at && (after[u.stat] || 0) >= u.at)
}
