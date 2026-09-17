/**
 * MapManager.js
 * ---------------------------------------------------------------------------
 * Owns the map registry and the single active TileMap. Maps are built lazily
 * and then cached, so walking in and out of a building does not re-stamp every
 * structure.
 */

import { TileMap } from './TileMap.js'
import { shivnagar } from '../../data/maps/shivnagar.js'
import { home } from '../../data/maps/home.js'

const DEFINITIONS = {
  shivnagar,
  home,
}

export class MapManager {
  constructor() {
    this.cache = new Map()
    this.current = null
  }

  /** Every map id the game knows about - used by the journal's Places page. */
  get ids() {
    return Object.keys(DEFINITIONS)
  }

  definition(id) {
    return DEFINITIONS[id] || null
  }

  load(id) {
    const def = DEFINITIONS[id]
    if (!def) {
      console.error(`unknown map "${id}"`)
      return this.current
    }
    let map = this.cache.get(id)
    if (!map) {
      map = new TileMap(def)
      this.cache.set(id, map)
    }
    this.current = map
    return map
  }
}
