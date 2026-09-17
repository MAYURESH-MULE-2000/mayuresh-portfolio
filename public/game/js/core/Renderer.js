/**
 * Renderer.js
 * ---------------------------------------------------------------------------
 * The game is drawn at a fixed 240x160 (the classic handheld resolution) into
 * an offscreen buffer, then blitted to the visible canvas at an integer scale
 * with smoothing off. Everything downstream can therefore think in whole
 * pixels and never worry about the display size.
 */

export const VIEW_W = 240
export const VIEW_H = 160

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', { alpha: false })
    this.buffer = document.createElement('canvas')
    this.buffer.width = VIEW_W
    this.buffer.height = VIEW_H
    this.bctx = this.buffer.getContext('2d', { alpha: false })
    this.bctx.imageSmoothingEnabled = false
    this.scale = 3
    this.resize()
  }

  /**
   * Sizing has two halves:
   *  - the bitmap is rendered at an integer multiple of 240x160, chosen so it
   *    has at least as many pixels as the display area needs;
   *  - CSS then fits that bitmap to the available box, preserving the aspect
   *    ratio, with nearest-neighbour filtering.
   *
   * Integer-only sizing looked correct on a desktop and left a postage stamp on
   * a phone, where the box is rarely a whole multiple of 240 wide.
   */
  resize() {
    const parent = this.canvas.parentElement
    const rect = parent ? parent.getBoundingClientRect() : { width: VIEW_W * 3, height: VIEW_H * 3 }
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    const boxW = Math.max(120, rect.width - 8)
    const boxH = Math.max(80, rect.height - 8)
    const fit = Math.min(boxW / VIEW_W, boxH / VIEW_H)
    const scale = Math.max(1, Math.min(6, Math.floor(fit * dpr)))

    if (scale !== this.scale || this.canvas.width !== VIEW_W * scale) {
      this.scale = scale
      this.canvas.width = VIEW_W * scale
      this.canvas.height = VIEW_H * scale
      this.ctx.imageSmoothingEnabled = false
    }
    const cssW = Math.floor(VIEW_W * fit)
    const cssH = Math.floor(VIEW_H * fit)
    this.canvas.style.width = `${cssW}px`
    this.canvas.style.height = `${cssH}px`
  }

  /** Context that game states draw into. Always 240x160. */
  get context() {
    return this.bctx
  }

  clear(color = '#000000') {
    this.bctx.fillStyle = color
    this.bctx.fillRect(0, 0, VIEW_W, VIEW_H)
  }

  present() {
    const { ctx, canvas } = this
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(this.buffer, 0, 0, VIEW_W, VIEW_H, 0, 0, canvas.width, canvas.height)
  }
}
