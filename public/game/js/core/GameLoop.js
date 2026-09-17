/**
 * GameLoop.js - requestAnimationFrame driver with a clamped delta.
 * Clamping matters: after a tab is backgrounded the browser hands us a huge
 * delta, which without a clamp teleports the player through walls.
 */
export class GameLoop {
  constructor(update, render) {
    this.update = update
    this.render = render
    this.running = false
    this.lastTime = 0
    this.accumulatedTime = 0
    this._frame = this._frame.bind(this)
  }

  start() {
    if (this.running) return
    this.running = true
    this.lastTime = performance.now()
    requestAnimationFrame(this._frame)
  }

  stop() {
    this.running = false
  }

  _frame(now) {
    if (!this.running) return
    // 100ms cap == never advance more than ~6 frames of simulation at once.
    const dt = Math.min((now - this.lastTime) / 1000, 0.1)
    this.lastTime = now
    this.update(dt)
    this.render()
    requestAnimationFrame(this._frame)
  }
}
