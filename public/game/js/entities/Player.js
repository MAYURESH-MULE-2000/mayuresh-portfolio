/**
 * Player.js
 * ---------------------------------------------------------------------------
 * Grid-locked movement with smooth interpolation between tiles: the player is
 * always either standing on a tile or travelling to exactly one neighbouring
 * tile. That is what makes collision honest and keeps the feel of the era.
 *
 * Turning in place costs a beat, so tapping a direction to face something does
 * not send you walking into it.
 */

import { TILE } from '../gfx/Tiles.js'
import { drawCharacter } from '../gfx/Sprites.js'
import { PAL } from '../gfx/Palette.js'

const STEP_TIME = 0.17 // seconds per tile
const TURN_TIME = 0.07

const DELTA = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}

export class Player {
  constructor() {
    this.look = {
      skin: PAL.skinA,
      hair: PAL.hair,
      hairStyle: 'short',
      top: PAL.saffron,
      bottom: PAL.blueDark,
      outfit: 'shirt',
      accessory: 'bag',
    }
    this.name = 'Kiran'
    this.tx = 0
    this.ty = 0
    this.px = 0
    this.py = 0
    this.dir = 'down'
    this.moving = false
    this.turnTimer = 0
    this.stepProgress = 0
    this.fromX = 0
    this.fromY = 0
    this.animTime = 0
    this.frame = 0
    this.stepsTaken = 0
  }

  placeAt(tx, ty, dir = 'down') {
    this.tx = tx
    this.ty = ty
    this.px = tx * TILE
    this.py = ty * TILE
    this.dir = dir
    this.moving = false
    this.stepProgress = 0
    this.turnTimer = 0
  }

  /** Tile directly in front of the player - what interaction looks at. */
  facingTile() {
    const [dx, dy] = DELTA[this.dir]
    return { x: this.tx + dx, y: this.ty + dy }
  }

  /**
   * @param canEnter (tx, ty) => boolean, supplied by the overworld so the
   * player never needs to know about maps or NPCs.
   * @param onArrive (tx, ty) => void, fired once per tile entered.
   */
  update(dt, input, canEnter, onArrive, onBlocked) {
    if (this.moving) {
      this.stepProgress += dt / STEP_TIME
      this.animTime += dt
      if (this.stepProgress >= 1) {
        this.stepProgress = 0
        this.moving = false
        this.px = this.tx * TILE
        this.py = this.ty * TILE
        this.stepsTaken++
        if (onArrive) onArrive(this.tx, this.ty)
      } else {
        const t = this.stepProgress
        this.px = this.fromX * TILE + (this.tx - this.fromX) * TILE * t
        this.py = this.fromY * TILE + (this.ty - this.fromY) * TILE * t
      }
      this.updateFrame()
      return
    }

    const wanted = input ? input.heldDirection() : null
    if (!wanted) {
      this.turnTimer = 0
      this.frame = 0
      this.animTime = 0
      return
    }

    if (wanted !== this.dir) {
      this.dir = wanted
      this.turnTimer = TURN_TIME
      return
    }

    if (this.turnTimer > 0) {
      this.turnTimer -= dt
      return
    }

    const [dx, dy] = DELTA[this.dir]
    const nx = this.tx + dx
    const ny = this.ty + dy
    if (canEnter(nx, ny)) {
      this.fromX = this.tx
      this.fromY = this.ty
      this.tx = nx
      this.ty = ny
      this.moving = true
      this.stepProgress = 0
    } else if (onBlocked) {
      onBlocked(nx, ny)
    }
  }

  updateFrame() {
    // four-frame cycle: idle, step, idle, other step
    const cycle = Math.floor(this.animTime / (STEP_TIME / 2)) % 4
    this.frame = cycle
  }

  render(ctx, camX, camY) {
    drawCharacter(ctx, 'player', this.look, this.dir, this.frame, this.px - camX, this.py - camY - 4)
  }
}
