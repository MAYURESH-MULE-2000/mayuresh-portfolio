/**
 * SaveManager.js
 * ---------------------------------------------------------------------------
 * localStorage with the paranoia a browser save needs: every read is wrapped,
 * the payload is version-checked and shape-checked, and anything that fails
 * validation is reported as "no save" rather than crashing the game or, worse,
 * half-loading into an inconsistent world.
 */

import { createWorldState, SAVE_VERSION } from './WorldState.js'

const SAVE_KEY = 'real-india-rpg:save:v1'
const SETTINGS_KEY = 'real-india-rpg:settings:v1'

function storage() {
  try {
    const test = '__rirpg_probe__'
    window.localStorage.setItem(test, '1')
    window.localStorage.removeItem(test)
    return window.localStorage
  } catch (err) {
    // Private mode, disabled storage, or a blocked origin.
    return null
  }
}

/** Shape check. Deliberately strict about the fields the game indexes into. */
function validate(data) {
  if (!data || typeof data !== 'object') return false
  if (typeof data.mapId !== 'string') return false
  if (!Number.isFinite(data.x) || !Number.isFinite(data.y)) return false
  const required = ['stats', 'flags', 'quests', 'counters']
  for (const key of required) {
    if (!data[key] || typeof data[key] !== 'object') return false
  }
  const arrays = ['discovered', 'metNpcs', 'items', 'visitedMaps', 'decisions', 'connections']
  for (const key of arrays) {
    if (!Array.isArray(data[key])) return false
  }
  return true
}

/** Fill in anything a save from an earlier version is missing. */
function migrate(data) {
  const fresh = createWorldState()
  const merged = Object.assign({}, fresh, data)
  merged.stats = Object.assign({}, fresh.stats, data.stats || {})
  merged.counters = Object.assign({}, fresh.counters, data.counters || {})
  merged.version = SAVE_VERSION
  return merged
}

export const SaveManager = {
  available() {
    return storage() !== null
  },

  hasSave() {
    const store = storage()
    if (!store) return false
    try {
      return typeof store.getItem(SAVE_KEY) === 'string'
    } catch (err) {
      return false
    }
  },

  /** Returns { ok, state, reason }. Never throws. */
  load() {
    const store = storage()
    if (!store) return { ok: false, reason: 'unavailable' }
    let raw = null
    try {
      raw = store.getItem(SAVE_KEY)
    } catch (err) {
      return { ok: false, reason: 'unavailable' }
    }
    if (!raw) return { ok: false, reason: 'empty' }
    let parsed = null
    try {
      parsed = JSON.parse(raw)
    } catch (err) {
      return { ok: false, reason: 'corrupt' }
    }
    if (!validate(parsed)) return { ok: false, reason: 'corrupt' }
    return { ok: true, state: migrate(parsed) }
  },

  /** Returns { ok, reason }. */
  save(state) {
    const store = storage()
    if (!store) return { ok: false, reason: 'unavailable' }
    try {
      const payload = JSON.stringify(Object.assign({}, state, { savedAt: Date.now() }))
      store.setItem(SAVE_KEY, payload)
      return { ok: true }
    } catch (err) {
      // Quota, or storage revoked mid-session.
      return { ok: false, reason: 'write-failed' }
    }
  },

  clear() {
    const store = storage()
    if (!store) return
    try {
      store.removeItem(SAVE_KEY)
    } catch (err) {
      /* nothing useful to do */
    }
  },

  /** Metadata for the title screen's CONTINUE line. */
  summary() {
    const result = this.load()
    if (!result.ok) return null
    const s = result.state
    return {
      mapId: s.mapId,
      problems: Array.isArray(s.discovered) ? s.discovered.length : 0,
      people: Array.isArray(s.metNpcs) ? s.metNpcs.length : 0,
      playtime: s.playtime || 0,
      savedAt: s.savedAt || s.createdAt || 0,
    }
  },

  loadSettings() {
    const store = storage()
    const defaults = { music: true, sfx: true, textSpeed: 'normal' }
    if (!store) return defaults
    try {
      const raw = store.getItem(SETTINGS_KEY)
      if (!raw) return defaults
      const parsed = JSON.parse(raw)
      if (!parsed || typeof parsed !== 'object') return defaults
      return {
        music: parsed.music !== false,
        sfx: parsed.sfx !== false,
        textSpeed: ['slow', 'normal', 'fast'].includes(parsed.textSpeed) ? parsed.textSpeed : 'normal',
      }
    } catch (err) {
      return defaults
    }
  },

  saveSettings(settings) {
    const store = storage()
    if (!store) return
    try {
      store.setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch (err) {
      /* settings are a nicety; failing to persist them is not fatal */
    }
  },
}
