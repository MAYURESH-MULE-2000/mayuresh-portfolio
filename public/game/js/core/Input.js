/**
 * Input.js
 * ---------------------------------------------------------------------------
 * One place where keyboard, virtual D-pad and touch all turn into the same
 * small set of named actions. Game systems never read key codes directly, so
 * adding a control scheme never means touching gameplay code.
 */

export const ACTIONS = ['up', 'down', 'left', 'right', 'confirm', 'cancel', 'menu', 'journal']

const KEY_MAP = {
  ArrowUp: 'up',
  KeyW: 'up',
  ArrowDown: 'down',
  KeyS: 'down',
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  Enter: 'confirm',
  Space: 'confirm',
  KeyZ: 'confirm',
  KeyE: 'confirm',
  KeyX: 'cancel',
  Backspace: 'cancel',
  Escape: 'menu',
  KeyM: 'menu',
  KeyJ: 'journal',
}

export class Input {
  constructor() {
    this.down = new Set()
    this.pressed = new Set() // edge-triggered, cleared at end of frame
    this.released = new Set()
    this.repeatTimers = new Map()
    this.anyInputSeen = false
    this._bound = false
  }

  attach(target = window) {
    if (this._bound) return
    this._bound = true

    target.addEventListener('keydown', (e) => {
      const action = KEY_MAP[e.code]
      if (!action) return
      // Stop the page scrolling under the game.
      e.preventDefault()
      if (!this.down.has(action)) {
        this.down.add(action)
        this.pressed.add(action)
        this.repeatTimers.set(action, 0)
      }
      this.anyInputSeen = true
    })

    target.addEventListener('keyup', (e) => {
      const action = KEY_MAP[e.code]
      if (!action) return
      e.preventDefault()
      this.down.delete(action)
      this.released.add(action)
      this.repeatTimers.delete(action)
    })

    // Losing focus must not leave a direction stuck on.
    target.addEventListener('blur', () => this.clear())
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.clear()
    })
  }

  /**
   * Wire up on-screen controls. Each element carries data-action="<action>".
   * Pointer events cover mouse, touch and pen with one code path.
   */
  attachVirtualControls(root) {
    if (!root) return
    const buttons = root.querySelectorAll('[data-action]')
    buttons.forEach((btn) => {
      const action = btn.dataset.action
      if (!ACTIONS.includes(action)) return
      const press = (e) => {
        e.preventDefault()
        if (!this.down.has(action)) {
          this.down.add(action)
          this.pressed.add(action)
          this.repeatTimers.set(action, 0)
        }
        this.anyInputSeen = true
        btn.classList.add('is-pressed')
        if (btn.setPointerCapture && e.pointerId !== undefined) {
          try {
            btn.setPointerCapture(e.pointerId)
          } catch (_) {
            /* capture is a nicety, not a requirement */
          }
        }
      }
      const release = (e) => {
        if (e) e.preventDefault()
        this.down.delete(action)
        this.released.add(action)
        this.repeatTimers.delete(action)
        btn.classList.remove('is-pressed')
      }
      btn.addEventListener('pointerdown', press)
      btn.addEventListener('pointerup', release)
      btn.addEventListener('pointercancel', release)
      btn.addEventListener('pointerleave', release)
      btn.addEventListener('contextmenu', (e) => e.preventDefault())
    })
  }

  /** True while the action is held. */
  isDown(action) {
    return this.down.has(action)
  }

  /** True only on the frame the action went down. */
  justPressed(action) {
    return this.pressed.has(action)
  }

  justReleased(action) {
    return this.released.has(action)
  }

  /**
   * Edge press plus key-repeat, used by menus so holding a direction keeps
   * scrolling. `delay` before the first repeat, then every `rate` seconds.
   */
  repeat(action, dt, delay = 0.32, rate = 0.09) {
    if (this.justPressed(action)) return true
    if (!this.down.has(action)) return false
    const t = (this.repeatTimers.get(action) || 0) + dt
    this.repeatTimers.set(action, t)
    if (t < delay) return false
    const over = t - delay
    const ticks = Math.floor(over / rate)
    const prev = Math.floor((over - dt) / rate)
    return ticks > prev
  }

  /** The direction currently held, or null. Vertical wins on a diagonal. */
  heldDirection() {
    if (this.down.has('up')) return 'up'
    if (this.down.has('down')) return 'down'
    if (this.down.has('left')) return 'left'
    if (this.down.has('right')) return 'right'
    return null
  }

  endFrame() {
    this.pressed.clear()
    this.released.clear()
  }

  clear() {
    this.down.clear()
    this.pressed.clear()
    this.released.clear()
    this.repeatTimers.clear()
    document.querySelectorAll('.is-pressed').forEach((el) => el.classList.remove('is-pressed'))
  }
}
