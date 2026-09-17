/**
 * Camera.js - follows a target, clamped to map bounds, with a shake offset.
 * Positions are rounded on read so the tile grid never lands on half pixels.
 */
export class Camera {
  constructor(viewW, viewH) {
    this.viewW = viewW
    this.viewH = viewH
    this.x = 0
    this.y = 0
    this.mapW = viewW
    this.mapH = viewH
    this.shakeTime = 0
    this.shakeMag = 0
    this._shakeX = 0
    this._shakeY = 0
  }

  setBounds(mapW, mapH) {
    this.mapW = mapW
    this.mapH = mapH
  }

  /** Snap straight to the target - used on map load so there is no pan-in. */
  snapTo(px, py) {
    this.x = this._clampX(px - this.viewW / 2)
    this.y = this._clampY(py - this.viewH / 2)
  }

  follow(px, py, dt) {
    const targetX = this._clampX(px - this.viewW / 2)
    const targetY = this._clampY(py - this.viewH / 2)
    // Light smoothing: enough to feel alive, tight enough to never lag behind.
    const k = Math.min(1, dt * 14)
    this.x += (targetX - this.x) * k
    this.y += (targetY - this.y) * k

    if (this.shakeTime > 0) {
      this.shakeTime -= dt
      const decay = Math.max(0, this.shakeTime)
      this._shakeX = (Math.random() * 2 - 1) * this.shakeMag * decay
      this._shakeY = (Math.random() * 2 - 1) * this.shakeMag * decay
      if (this.shakeTime <= 0) {
        this._shakeX = 0
        this._shakeY = 0
      }
    }
  }

  shake(magnitude = 3, duration = 0.3) {
    this.shakeMag = magnitude
    this.shakeTime = duration
  }

  _clampX(x) {
    if (this.mapW <= this.viewW) return Math.round((this.mapW - this.viewW) / 2)
    return Math.max(0, Math.min(x, this.mapW - this.viewW))
  }

  _clampY(y) {
    if (this.mapH <= this.viewH) return Math.round((this.mapH - this.viewH) / 2)
    return Math.max(0, Math.min(y, this.mapH - this.viewH))
  }

  get renderX() {
    return Math.round(this.x + this._shakeX)
  }

  get renderY() {
    return Math.round(this.y + this._shakeY)
  }
}
