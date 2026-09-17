/**
 * main.js - entry point. Finds the canvas, builds the game, reports failures
 * to the player instead of leaving a blank rectangle.
 */

import { Game } from './core/Game.js'

function fail(message) {
  const el = document.getElementById('game-error')
  if (el) {
    el.textContent = message
    el.hidden = false
  }
  const loading = document.getElementById('game-loading')
  if (loading) loading.hidden = true
}

function boot() {
  const canvas = document.getElementById('game-canvas')
  if (!canvas || !canvas.getContext) {
    fail('This browser cannot run the game: no canvas support.')
    return
  }
  try {
    const game = new Game(canvas, document.getElementById('game-controls'))
    game.start()
    const loading = document.getElementById('game-loading')
    if (loading) loading.hidden = true
    // Exposed for debugging in the console; nothing in the game reads it.
    window.__realIndiaRpg = game
  } catch (err) {
    console.error(err)
    fail(`The game failed to start: ${err && err.message ? err.message : 'unknown error'}`)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
