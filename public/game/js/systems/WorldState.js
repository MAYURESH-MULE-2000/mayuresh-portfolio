/**
 * WorldState.js
 * ---------------------------------------------------------------------------
 * Everything the save file contains, in one plain object. Systems read and
 * write it through small helpers rather than each keeping their own copy, so
 * there is exactly one answer to "what does the player know?".
 */

export const SAVE_VERSION = 3

export function createWorldState() {
  return {
    version: SAVE_VERSION,
    createdAt: Date.now(),
    playtime: 0,

    // where the player is
    mapId: 'home',
    x: 5,
    y: 7,
    dir: 'up',

    // progression
    stats: { empathy: 0, knowledge: 0, observation: 0, communication: 0, resilience: 0 },

    // knowledge
    discovered: [], // problem ids, in the order they were found
    understanding: {}, // problemId -> 0..100
    revealed: {}, // problemId -> { causes: n, consequences: n, perspectives: n }
    notes: {}, // problemId -> [note strings]
    connections: [], // ['a|b', ...] pairs the player has actually noticed

    // people and places
    metNpcs: [],
    trust: {}, // npcId -> 0..100
    visitedMaps: [],

    // things
    items: [],

    // the world's memory of what the player did
    flags: {},
    counters: { peopleMet: 0, problemsFound: 0, encounters: 0, comparisons: 0 },
    quests: {}, // id -> { status, steps: {}, counts: {} }
    decisions: [],
  }
}

/** Defensive getters/setters - a corrupt or old save must never throw. */
export const World = {
  flag(state, name) {
    return Boolean(state.flags && state.flags[name])
  },
  setFlag(state, name, value = true) {
    if (!state.flags) state.flags = {}
    state.flags[name] = value
  },
  hasItem(state, id) {
    return Array.isArray(state.items) && state.items.includes(id)
  },
  addItem(state, id) {
    if (!Array.isArray(state.items)) state.items = []
    if (!state.items.includes(id)) {
      state.items.push(id)
      return true
    }
    return false
  },
  hasDiscovered(state, id) {
    return Array.isArray(state.discovered) && state.discovered.includes(id)
  },
  stat(state, key) {
    return (state.stats && state.stats[key]) || 0
  },
  addStat(state, key, amount) {
    if (!state.stats) state.stats = {}
    state.stats[key] = (state.stats[key] || 0) + amount
  },
  count(state, key) {
    return (state.counters && state.counters[key]) || 0
  },
  addCount(state, key, amount = 1) {
    if (!state.counters) state.counters = {}
    state.counters[key] = (state.counters[key] || 0) + amount
  },
  trustOf(state, npcId) {
    return (state.trust && state.trust[npcId]) || 0
  },
  understandingOf(state, problemId) {
    return (state.understanding && state.understanding[problemId]) || 0
  },
  notesFor(state, problemId) {
    return (state.notes && state.notes[problemId]) || []
  },
  revealedFor(state, problemId) {
    if (!state.revealed) state.revealed = {}
    if (!state.revealed[problemId]) {
      state.revealed[problemId] = { causes: 0, consequences: 0, perspectives: 0 }
    }
    return state.revealed[problemId]
  },
  hasConnection(state, a, b) {
    const key = [a, b].sort().join('|')
    return Array.isArray(state.connections) && state.connections.includes(key)
  },
  addConnection(state, a, b) {
    if (!Array.isArray(state.connections)) state.connections = []
    const key = [a, b].sort().join('|')
    if (!state.connections.includes(key)) {
      state.connections.push(key)
      return true
    }
    return false
  },
}
