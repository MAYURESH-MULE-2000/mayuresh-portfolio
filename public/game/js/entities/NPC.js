/**
 * NPC.js
 * ---------------------------------------------------------------------------
 * A placed character: data from data/npcs.js, a position from the map, and
 * just enough behaviour to look alive (occasional idle turns, and turning to
 * face whoever talks to them).
 */

import { TILE } from '../gfx/Tiles.js'
import { drawCharacter } from '../gfx/Sprites.js'

const OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' }

export class NPC {
  constructor(data, placement) {
    this.data = data
    this.id = data.id
    this.tx = placement.x
    this.ty = placement.y
    this.homeDir = placement.dir || 'down'
    this.dir = this.homeDir
    this.frame = 0
    this.idleTimer = 2 + Math.random() * 4
    this.bobTimer = Math.random() * 3
  }

  get x() {
    return this.tx * TILE
  }

  get y() {
    return this.ty * TILE
  }

  update(dt) {
    this.bobTimer += dt
    // A small breathing bob: frame 0 and 2 are the two standing frames.
    this.frame = Math.floor(this.bobTimer / 0.9) % 2 === 0 ? 0 : 2
    this.idleTimer -= dt
    if (this.idleTimer <= 0) {
      this.idleTimer = 4 + Math.random() * 6
      // Glance around, then settle back to the direction the map gave them.
      const options = ['up', 'down', 'left', 'right']
      this.dir = Math.random() < 0.55 ? this.homeDir : options[Math.floor(Math.random() * options.length)]
    }
  }

  /** Turn to face the player when spoken to. */
  faceTowards(tx, ty) {
    const dx = tx - this.tx
    const dy = ty - this.ty
    if (Math.abs(dx) > Math.abs(dy)) this.dir = dx > 0 ? 'right' : 'left'
    else if (dy !== 0) this.dir = dy > 0 ? 'down' : 'up'
    else this.dir = OPPOSITE[this.dir] || 'down'
  }

  render(ctx, camX, camY) {
    drawCharacter(ctx, `npc-${this.id}`, this.data.look, this.dir, this.frame, this.x - camX, this.y - camY - 4)
  }
}
