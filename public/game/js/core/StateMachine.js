/**
 * StateMachine.js
 * ---------------------------------------------------------------------------
 * A stack of game states. Only the top state receives input, which is what
 * guarantees the player cannot walk around while a dialogue box is open - the
 * rule the brief cares about most.
 *
 * States that set `transparent = true` let the state beneath them keep drawing
 * (dialogue over the overworld, a menu over the map).
 */
export class StateMachine {
  constructor(game) {
    this.game = game
    this.stack = []
  }

  get current() {
    return this.stack[this.stack.length - 1] || null
  }

  /** Name of the active state, used for debugging and save metadata. */
  get currentName() {
    return this.current ? this.current.name : 'NONE'
  }

  push(state, params) {
    const previous = this.current
    if (previous && previous.pause) previous.pause()
    this.stack.push(state)
    state.game = this.game
    if (state.enter) state.enter(params || {})
  }

  pop(result) {
    const state = this.stack.pop()
    if (state && state.exit) state.exit()
    const next = this.current
    if (next && next.resume) next.resume(result)
    return state
  }

  /** Clear the stack down to a single state - used by title/new game. */
  replaceAll(state, params) {
    while (this.stack.length) {
      const s = this.stack.pop()
      if (s && s.exit) s.exit()
    }
    this.push(state, params)
  }

  /** Pop states until `name` is on top (inclusive of nothing). */
  popTo(name) {
    while (this.stack.length > 1 && this.currentName !== name) this.pop()
  }

  has(name) {
    return this.stack.some((s) => s.name === name)
  }

  update(dt, input) {
    const top = this.current
    if (!top) return
    // Everything below the top still ticks (animations keep running), but only
    // the top state is handed the input object.
    for (let i = 0; i < this.stack.length - 1; i++) {
      const s = this.stack[i]
      if (s.updateBackground) s.updateBackground(dt)
    }
    if (top.update) top.update(dt, input)
  }

  render(ctx) {
    // Find the deepest state that must be drawn: walk back over transparents.
    let start = this.stack.length - 1
    while (start > 0 && this.stack[start].transparent) start--
    for (let i = start; i < this.stack.length; i++) {
      const s = this.stack[i]
      if (s.render) s.render(ctx)
    }
  }
}
