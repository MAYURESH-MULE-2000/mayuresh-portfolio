/**
 * Game.js
 * ---------------------------------------------------------------------------
 * The wiring. It owns the systems, the state stack and the few operations that
 * cross system boundaries - starting a conversation, opening a screen, moving
 * between maps, saving. States call into this object rather than into each
 * other, which keeps every screen independent of every other screen.
 */

import { GameLoop } from './GameLoop.js'
import { Input } from './Input.js'
import { Camera } from './Camera.js'
import { Renderer, VIEW_W, VIEW_H } from './Renderer.js'
import { StateMachine } from './StateMachine.js'
import { buildTileAtlas, TILE } from '../gfx/Tiles.js'
import { PAL } from '../gfx/Palette.js'
import { drawText, measure } from '../gfx/Font.js'
import { panel } from '../ui/UIKit.js'

import { MapManager } from '../world/MapManager.js'
import { Player } from '../entities/Player.js'

import { createWorldState, World } from '../systems/WorldState.js'
import { SaveManager } from '../systems/SaveManager.js'
import { AudioManager } from '../systems/AudioManager.js'
import { Journal } from '../systems/Journal.js'
import { QuestManager } from '../systems/QuestManager.js'
import { checkRequirement } from '../systems/Effects.js'

import { TitleState } from '../states/TitleState.js'
import { OverworldState } from '../states/OverworldState.js'
import { DialogueState } from '../states/DialogueState.js'
import { EncounterState } from '../states/EncounterState.js'
import { ComparisonState } from '../states/ComparisonState.js'
import { JournalState } from '../states/JournalState.js'
import { MenuState } from '../states/MenuState.js'
import { StatusState } from '../states/StatusState.js'
import { SettingsState } from '../states/SettingsState.js'
import { ConfirmState } from '../states/ConfirmState.js'

const TOAST_TIME = 2.4
const FADE_TIME = 0.22

export class Game {
  constructor(canvas, controlsRoot) {
    buildTileAtlas()

    this.renderer = new Renderer(canvas)
    this.input = new Input()
    this.input.attach(window)
    this.input.attachVirtualControls(controlsRoot)
    this.camera = new Camera(VIEW_W, VIEW_H)
    this.states = new StateMachine(this)
    this.maps = new MapManager()
    this.player = new Player()

    this.settings = SaveManager.loadSettings()
    this.audio = new AudioManager(this.settings)
    this.state = createWorldState()
    this.journal = new Journal(this)
    this.quests = new QuestManager(this)
    this.quests.onComplete = (quest) => {
      this.toast(`Objective complete: ${quest.name}`)
      this.audio.play('discover')
    }

    this.map = null
    this.toasts = []
    this.fade = { alpha: 0, phase: 'idle', callback: null }
    this.isTouch = window.matchMedia('(pointer: coarse)').matches

    // Screens are created once and reused - no allocation on state changes.
    this.screens = {
      title: new TitleState(this),
      overworld: new OverworldState(this),
      dialogue: new DialogueState(this),
      encounter: new EncounterState(this),
      comparison: new ComparisonState(this),
      journal: new JournalState(this),
      menu: new MenuState(this),
      status: new StatusState(this),
      settings: new SettingsState(this),
      confirm: new ConfirmState(this),
    }

    this.loop = new GameLoop(
      (dt) => this.update(dt),
      () => this.render(),
    )

    window.addEventListener('resize', () => this.renderer.resize())
    // Any first interaction is our chance to start audio.
    const unlockAudio = () => this.audio.unlock()
    window.addEventListener('pointerdown', unlockAudio, { once: true })
    window.addEventListener('keydown', unlockAudio, { once: true })
  }

  start() {
    this.states.replaceAll(this.screens.title)
    this.loop.start()
  }

  // -----------------------------------------------------------------------
  // frame
  // -----------------------------------------------------------------------
  update(dt) {
    if (this.states.currentName !== 'TITLE') this.state.playtime += dt

    this.updateFade(dt)
    if (this.fade.phase !== 'out') {
      this.states.update(dt, this.input)
    }
    this.updateToasts(dt)
    this.input.endFrame()
  }

  render() {
    const ctx = this.renderer.context
    this.renderer.clear(PAL.black)
    this.states.render(ctx)
    if (this.fade.alpha > 0) {
      ctx.globalAlpha = Math.min(1, this.fade.alpha)
      ctx.fillStyle = PAL.black
      ctx.fillRect(0, 0, VIEW_W, VIEW_H)
      ctx.globalAlpha = 1
    }
    this.renderer.present()
  }

  // -----------------------------------------------------------------------
  // transitions
  // -----------------------------------------------------------------------
  updateFade(dt) {
    const fade = this.fade
    if (fade.phase === 'out') {
      fade.alpha += dt / FADE_TIME
      if (fade.alpha >= 1) {
        fade.alpha = 1
        fade.phase = 'in'
        if (fade.callback) {
          const cb = fade.callback
          fade.callback = null
          cb()
        }
      }
    } else if (fade.phase === 'in') {
      fade.alpha -= dt / FADE_TIME
      if (fade.alpha <= 0) {
        fade.alpha = 0
        fade.phase = 'idle'
      }
    }
  }

  fadeThrough(callback) {
    this.fade.phase = 'out'
    this.fade.alpha = 0
    this.fade.callback = callback
  }

  // -----------------------------------------------------------------------
  // game lifecycle
  // -----------------------------------------------------------------------
  newGame() {
    this.state = createWorldState()
    this.journal = new Journal(this)
    this.quests = new QuestManager(this)
    this.quests.onComplete = (quest) => {
      this.toast(`Objective complete: ${quest.name}`)
      this.audio.play('discover')
    }
    this.quests.startAutoQuests()
    this.enterWorld()
  }

  continueGame() {
    const result = SaveManager.load()
    if (!result.ok) {
      this.showText(
        'Save',
        result.reason === 'corrupt'
          ? ['That save file could not be read - it looks damaged, so it has been left alone.', 'Start a new game to continue.']
          : ['There is no save in this browser.'],
      )
      return
    }
    this.state = result.state
    this.journal = new Journal(this)
    this.quests = new QuestManager(this)
    this.quests.onComplete = (quest) => {
      this.toast(`Objective complete: ${quest.name}`)
      this.audio.play('discover')
    }
    this.enterWorld(true)
  }

  /** Read-only look at the notebook from the title screen. */
  reviewSavedJournal() {
    const result = SaveManager.load()
    if (!result.ok) {
      this.showText('Save', ['There is no readable save to open.'])
      return
    }
    this.state = result.state
    this.journal = new Journal(this)
    this.quests = new QuestManager(this)
    this.states.push(this.screens.journal, {})
  }

  enterWorld(fromSave = false) {
    this.fadeThrough(() => {
      const mapId = fromSave ? this.state.mapId : 'home'
      const map = this.loadMap(mapId)
      const spawn = fromSave
        ? { x: this.state.x, y: this.state.y, dir: this.state.dir }
        : map.spawn('default')
      this.player.placeAt(spawn.x, spawn.y, spawn.dir || 'down')
      this.camera.snapTo(this.player.px + TILE / 2, this.player.py + TILE / 2)
      this.states.replaceAll(this.screens.overworld)
      this.audio.playMusic(map.music)
    })
  }

  goToTitle() {
    this.fadeThrough(() => {
      this.states.replaceAll(this.screens.title)
      this.audio.playMusic('title')
    })
  }

  loadMap(id) {
    const map = this.maps.load(id)
    this.map = map
    this.camera.setBounds(map.width * TILE, map.height * TILE)
    this.state.mapId = map.id
    this.journal.visitMap(map.id)
    this.screens.overworld.onMapLoaded(map)
    return map
  }

  travelTo(mapId, spawnName) {
    this.audio.play('open')
    this.fadeThrough(() => {
      const map = this.loadMap(mapId)
      const spawn = map.spawn(spawnName)
      this.player.placeAt(spawn.x, spawn.y, spawn.dir || 'down')
      this.state.x = spawn.x
      this.state.y = spawn.y
      this.state.dir = spawn.dir || 'down'
      this.camera.snapTo(this.player.px + TILE / 2, this.player.py + TILE / 2)
      this.camera.follow(this.player.px + TILE / 2, this.player.py + TILE / 2, 1)
      this.audio.playMusic(map.music)
      this.input.clear()
    })
  }

  saveGame() {
    this.state.x = this.player.tx
    this.state.y = this.player.ty
    this.state.dir = this.player.dir
    this.state.mapId = this.map ? this.map.id : this.state.mapId
    const result = SaveManager.save(this.state)
    if (result.ok) this.toast('Game saved')
    return result
  }

  applySettings() {
    SaveManager.saveSettings(this.settings)
    this.audio.setSettings(this.settings)
  }

  // -----------------------------------------------------------------------
  // screens
  // -----------------------------------------------------------------------
  talkTo(npc) {
    this.journal.meetNpc(npc.id)
    const entry = (npc.data.entry || []).find((rule) => checkRequirement(this, rule.require))
    const node = entry ? entry.node : 'first'
    this.audio.play('open')
    this.states.push(this.screens.dialogue, { npc, node })
  }

  showText(speaker, lines, onClose) {
    this.states.push(this.screens.dialogue, { speaker, lines, onClose })
  }

  startEncounter(problemId, npcId, options = {}) {
    this.states.push(this.screens.encounter, Object.assign({ problemId, npcId }, options))
  }

  openComparison(problemId, onDone) {
    this.states.push(this.screens.comparison, { problemId, onDone })
  }

  openJournal() {
    if (!World.hasItem(this.state, 'notebook')) {
      this.toast('You have nothing to write in yet')
      return
    }
    this.audio.play('open')
    this.states.push(this.screens.journal, {})
  }

  openStatus() {
    this.audio.play('open')
    this.states.push(this.screens.status, {})
  }

  openSettings(fromTitle = false) {
    this.audio.play('open')
    this.states.push(this.screens.settings, { fromTitle })
  }

  openMenu() {
    this.audio.play('open')
    this.states.push(this.screens.menu, {})
  }

  confirm(text, onResolve) {
    this.states.push(this.screens.confirm, { text, onResolve })
  }

  raiseTrust(npcId, amount) {
    if (!npcId || !amount) return
    const current = World.trustOf(this.state, npcId)
    this.state.trust[npcId] = Math.max(0, Math.min(100, current + amount))
  }

  // -----------------------------------------------------------------------
  // toasts
  // -----------------------------------------------------------------------
  toast(text) {
    if (!text) return
    this.toasts.push({ text, life: TOAST_TIME })
    if (this.toasts.length > 3) this.toasts.shift()
  }

  updateToasts(dt) {
    for (const toast of this.toasts) toast.life -= dt
    this.toasts = this.toasts.filter((t) => t.life > 0)
  }

  renderToasts(ctx) {
    this.toasts.forEach((toast, i) => {
      const w = measure(toast.text) + 14
      const x = VIEW_W - w - 4
      const y = 4 + i * 17
      const alpha = Math.min(1, toast.life / 0.4)
      ctx.globalAlpha = alpha
      panel(ctx, x, y, w, 15, { fill: PAL.uiAccent, inner: PAL.saffronDark, shadow: false })
      drawText(ctx, toast.text, x + 7, y + 4, PAL.uiBack)
      ctx.globalAlpha = 1
    })
  }
}
