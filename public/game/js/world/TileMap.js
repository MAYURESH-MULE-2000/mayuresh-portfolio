/**
 * TileMap.js
 * ---------------------------------------------------------------------------
 * One reusable map. A map definition is pure data: an ASCII terrain grid plus
 * lists of structures, props, objects, NPC placements and exits. This class
 * turns that into three render layers and a collision grid.
 *
 * Layers, bottom to top:
 *   ground - terrain and building bodies (opaque)
 *   over   - props that stand in front of terrain but behind the player
 *   top    - canopies and awnings, drawn over the player so you can walk behind
 */

import { TILE, drawTile, hasTile } from '../gfx/Tiles.js'
import { stampStructure } from './Structures.js'
import { LEGEND } from '../../data/tileLegend.js'

export class TileMap {
  constructor(def) {
    this.def = def
    this.id = def.id
    this.name = def.name
    this.width = def.width
    this.height = def.height
    this.music = def.music || 'town'
    this.ground = new Array(this.width * this.height).fill('grass')
    this.over = new Array(this.width * this.height).fill(null)
    this.top = new Array(this.width * this.height).fill(null)
    this.solid = new Uint8Array(this.width * this.height)
    this.animated = [] // indices of tiles that swap frames (water)
    this.build()
  }

  index(tx, ty) {
    return ty * this.width + tx
  }

  inBounds(tx, ty) {
    return tx >= 0 && ty >= 0 && tx < this.width && ty < this.height
  }

  build() {
    const { def } = this
    const legend = Object.assign({}, LEGEND, def.legend || {})

    // 1. terrain
    const rows = def.terrain || []
    for (let y = 0; y < this.height; y++) {
      const row = rows[y] || ''
      for (let x = 0; x < this.width; x++) {
        const ch = row[x] || rows[0]?.[0] || '.'
        const entry = legend[ch] || legend['.']
        const i = this.index(x, y)
        this.ground[i] = entry.tile
        if (entry.solid) this.solid[i] = 1
        if (entry.animated) this.animated.push(i)
        if (entry.over) this.over[i] = entry.over
      }
    }

    // 2. structures (houses, shops, walls) stamped by a shared builder
    for (const s of def.structures || []) {
      stampStructure(this, s)
    }

    // 3. loose props
    for (const prop of def.props || []) {
      this.place(prop.tile, prop.x, prop.y, prop.layer || 'over', prop.solid !== false)
    }

    // 4. explicit collision overrides (openings in otherwise solid stamps)
    for (const c of def.walkable || []) this.setSolid(c.x, c.y, false)
    for (const c of def.blocked || []) this.setSolid(c.x, c.y, true)
  }

  /** Put a tile on a layer, optionally marking the cell solid. */
  place(tile, tx, ty, layer = 'over', solid = false) {
    if (!this.inBounds(tx, ty)) return
    const i = this.index(tx, ty)
    if (!hasTile(tile)) {
      console.warn(`map ${this.id}: unknown tile "${tile}"`)
      return
    }
    this[layer][i] = tile
    if (solid) this.solid[i] = 1
  }

  setSolid(tx, ty, value) {
    if (!this.inBounds(tx, ty)) return
    this.solid[this.index(tx, ty)] = value ? 1 : 0
  }

  isSolid(tx, ty) {
    if (!this.inBounds(tx, ty)) return true // the world edge blocks movement
    return this.solid[this.index(tx, ty)] === 1
  }

  /** Exit whose tile the player is standing on, if any. */
  exitAt(tx, ty) {
    return (this.def.exits || []).find((e) => e.x === tx && e.y === ty) || null
  }

  /** Interactive object on a tile (sign, pothole, notice board...). */
  objectAt(tx, ty) {
    return (this.def.objects || []).find((o) => o.x === tx && o.y === ty) || null
  }

  spawn(name = 'default') {
    return this.def.spawns?.[name] || this.def.spawns?.default || { x: 2, y: 2, dir: 'down' }
  }

  /**
   * Draw one layer, culled to the camera. `frame` swaps animated water tiles.
   */
  renderLayer(ctx, layer, camX, camY, viewW, viewH, frame = 0) {
    const x0 = Math.max(0, Math.floor(camX / TILE))
    const y0 = Math.max(0, Math.floor(camY / TILE))
    const x1 = Math.min(this.width - 1, Math.ceil((camX + viewW) / TILE))
    const y1 = Math.min(this.height - 1, Math.ceil((camY + viewH) / TILE))
    const data = this[layer]
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        let tile = data[this.index(tx, ty)]
        if (!tile) continue
        if (tile === 'water' && frame % 2 === 1) tile = 'water_b'
        drawTile(ctx, tile, tx * TILE - camX, ty * TILE - camY)
      }
    }
  }
}
