/**
 * AudioManager.js
 * ---------------------------------------------------------------------------
 * All audio is generated with the Web Audio API - there are no audio files in
 * this project and nothing is sampled from anywhere. Music is a tiny two-voice
 * sequencer (square lead, triangle bass) with a lookahead scheduler; sound
 * effects are short envelopes on an oscillator.
 *
 * Everything is optional: if AudioContext is missing, blocked, or the browser
 * has not had a user gesture yet, every method quietly does nothing and the
 * game plays exactly the same.
 */

// Equal temperament, A4 = 440. Note names are "C4", "Eb5", "-" for a rest.
const NOTE_OFFSETS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }

function noteToFreq(name) {
  if (!name || name === '-') return 0
  const match = /^([A-G])(b|#)?(\d)$/.exec(name)
  if (!match) return 0
  let semitone = NOTE_OFFSETS[match[1]]
  if (match[2] === 'b') semitone -= 1
  if (match[2] === '#') semitone += 1
  const octave = parseInt(match[3], 10)
  const midi = semitone + (octave + 1) * 12
  return 440 * Math.pow(2, (midi - 69) / 12)
}

/**
 * Tracks. Each is [note, beats] pairs. The scale used across the soundtrack
 * keeps a flat second and flat sixth, which gives the whole thing one voice
 * instead of four unrelated jingles.
 */
const TRACKS = {
  title: {
    bpm: 84,
    lead: [
      ['C5', 2], ['Db5', 1], ['E5', 1], ['F5', 2], ['E5', 2],
      ['Db5', 2], ['C5', 2], ['-', 1], ['Ab4', 1], ['C5', 2],
      ['F5', 2], ['E5', 1], ['Db5', 1], ['C5', 4],
      ['-', 2], ['G4', 1], ['Ab4', 1], ['C5', 4],
    ],
    bass: [
      ['C3', 4], ['Ab2', 4], ['F2', 4], ['G2', 4],
      ['C3', 4], ['Ab2', 4], ['F2', 2], ['G2', 2], ['C3', 4],
    ],
    gain: 0.15,
  },
  town: {
    bpm: 116,
    lead: [
      ['C5', 1], ['E5', 1], ['G5', 1], ['E5', 1], ['F5', 1], ['E5', 1], ['Db5', 1], ['C5', 1],
      ['Db5', 1], ['E5', 1], ['F5', 1], ['G5', 1], ['E5', 2], ['C5', 2],
      ['G4', 1], ['C5', 1], ['E5', 1], ['G5', 1], ['F5', 1], ['E5', 1], ['Db5', 1], ['E5', 1],
      ['C5', 2], ['-', 1], ['G4', 1], ['C5', 4],
    ],
    bass: [
      ['C3', 2], ['C3', 2], ['Ab2', 2], ['Ab2', 2],
      ['F2', 2], ['F2', 2], ['G2', 2], ['G2', 2],
      ['C3', 2], ['C3', 2], ['Ab2', 2], ['Ab2', 2],
      ['F2', 2], ['G2', 2], ['C3', 4],
    ],
    gain: 0.12,
  },
  home: {
    bpm: 72,
    lead: [
      ['E5', 2], ['C5', 2], ['Db5', 2], ['C5', 2],
      ['Ab4', 4], ['G4', 4],
      ['C5', 2], ['E5', 2], ['F5', 2], ['E5', 2],
      ['C5', 6], ['-', 2],
    ],
    bass: [['C3', 8], ['Ab2', 8], ['F2', 8], ['C3', 8]],
    gain: 0.1,
  },
  encounter: {
    bpm: 132,
    lead: [
      ['C5', 1], ['C5', 1], ['Db5', 1], ['C5', 1], ['Ab4', 1], ['C5', 1], ['G4', 2],
      ['C5', 1], ['C5', 1], ['Db5', 1], ['E5', 1], ['F5', 2], ['E5', 2],
      ['F5', 1], ['G5', 1], ['Ab5', 1], ['G5', 1], ['F5', 1], ['E5', 1], ['Db5', 1], ['C5', 1],
      ['G4', 2], ['Ab4', 2], ['C5', 4],
    ],
    bass: [
      ['C2', 1], ['C2', 1], ['C2', 1], ['C2', 1], ['Ab1', 1], ['Ab1', 1], ['G1', 1], ['G1', 1],
      ['C2', 1], ['C2', 1], ['C2', 1], ['C2', 1], ['F2', 1], ['F2', 1], ['G2', 1], ['G2', 1],
    ],
    gain: 0.13,
  },
}

const SFX = {
  blip: { type: 'square', from: 780, to: 700, dur: 0.035, gain: 0.05 },
  select: { type: 'square', from: 520, to: 660, dur: 0.06, gain: 0.07 },
  confirm: { type: 'square', from: 660, to: 990, dur: 0.1, gain: 0.08 },
  cancel: { type: 'square', from: 420, to: 260, dur: 0.1, gain: 0.07 },
  open: { type: 'triangle', from: 300, to: 620, dur: 0.12, gain: 0.09 },
  close: { type: 'triangle', from: 620, to: 280, dur: 0.12, gain: 0.08 },
  discover: { type: 'square', from: 520, to: 1040, dur: 0.22, gain: 0.09, arpeggio: [0, 4, 7, 12] },
  note: { type: 'square', from: 880, to: 1180, dur: 0.09, gain: 0.06 },
  step: { type: 'triangle', from: 180, to: 120, dur: 0.05, gain: 0.03 },
  bad: { type: 'square', from: 300, to: 150, dur: 0.25, gain: 0.08 },
}

export class AudioManager {
  constructor(settings) {
    this.settings = settings || { music: true, sfx: true }
    this.ctx = null
    this.masterGain = null
    this.musicGain = null
    this.currentTrack = null
    this.schedulerId = null
    this.nextNoteTime = 0
    this.leadIndex = 0
    this.bassIndex = 0
    this.leadTime = 0
    this.bassTime = 0
    this.failed = false
  }

  /** Must be called from a user gesture. Safe to call repeatedly. */
  unlock() {
    if (this.failed) return false
    if (!this.ctx) {
      const Ctor = window.AudioContext || window.webkitAudioContext
      if (!Ctor) {
        this.failed = true
        return false
      }
      try {
        this.ctx = new Ctor()
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.value = 0.9
        this.masterGain.connect(this.ctx.destination)
        this.musicGain = this.ctx.createGain()
        this.musicGain.gain.value = this.settings.music ? 1 : 0
        this.musicGain.connect(this.masterGain)
      } catch (err) {
        this.failed = true
        return false
      }
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {})
    return true
  }

  setSettings(settings) {
    this.settings = settings
    if (this.musicGain) {
      this.musicGain.gain.value = settings.music ? 1 : 0
    }
    if (!settings.music) this.stopMusic()
    else if (this.pendingTrack) this.playMusic(this.pendingTrack)
  }

  playMusic(name) {
    this.pendingTrack = name
    if (!this.settings.music) return
    if (!this.unlock()) return
    if (this.currentTrack === name && this.schedulerId) return
    this.stopMusic()
    const track = TRACKS[name]
    if (!track) return
    this.currentTrack = name
    this.leadIndex = 0
    this.bassIndex = 0
    const now = this.ctx.currentTime + 0.08
    this.leadTime = now
    this.bassTime = now
    this.schedulerId = window.setInterval(() => this._schedule(), 60)
    this._schedule()
  }

  stopMusic() {
    if (this.schedulerId) {
      window.clearInterval(this.schedulerId)
      this.schedulerId = null
    }
    this.currentTrack = null
  }

  /** Schedule any notes that fall inside the next 300ms. */
  _schedule() {
    const track = TRACKS[this.currentTrack]
    if (!track || !this.ctx) return
    const horizon = this.ctx.currentTime + 0.3
    const beat = 60 / track.bpm / 2 // one "beat" unit == an eighth note
    let guard = 0
    while (this.leadTime < horizon && guard++ < 32) {
      const [note, beats] = track.lead[this.leadIndex % track.lead.length]
      const dur = beats * beat
      if (note !== '-') this._tone(noteToFreq(note), this.leadTime, dur * 0.92, 'square', track.gain)
      this.leadTime += dur
      this.leadIndex++
    }
    guard = 0
    while (this.bassTime < horizon && guard++ < 32) {
      const [note, beats] = track.bass[this.bassIndex % track.bass.length]
      const dur = beats * beat
      if (note !== '-') this._tone(noteToFreq(note), this.bassTime, dur * 0.95, 'triangle', track.gain * 1.1)
      this.bassTime += dur
      this.bassIndex++
    }
  }

  _tone(freq, time, dur, type, gain) {
    if (!freq || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const env = this.ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, time)
      env.gain.setValueAtTime(0, time)
      env.gain.linearRampToValueAtTime(gain, time + 0.012)
      env.gain.exponentialRampToValueAtTime(0.0008, time + dur)
      osc.connect(env)
      env.connect(this.musicGain)
      osc.start(time)
      osc.stop(time + dur + 0.02)
    } catch (err) {
      /* a dropped note is not worth breaking the frame for */
    }
  }

  play(name) {
    if (!this.settings.sfx) return
    if (!this.unlock()) return
    const def = SFX[name]
    if (!def || !this.ctx) return
    try {
      const now = this.ctx.currentTime
      if (def.arpeggio) {
        def.arpeggio.forEach((semi, i) => {
          const f = def.from * Math.pow(2, semi / 12)
          this._blip(f, f, now + i * (def.dur / def.arpeggio.length), def.dur / def.arpeggio.length, def.type, def.gain)
        })
        return
      }
      this._blip(def.from, def.to, now, def.dur, def.type, def.gain)
    } catch (err) {
      /* audio is never allowed to break gameplay */
    }
  }

  _blip(from, to, time, dur, type, gain) {
    const osc = this.ctx.createOscillator()
    const env = this.ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(from, time)
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, to), time + dur)
    env.gain.setValueAtTime(gain, time)
    env.gain.exponentialRampToValueAtTime(0.0008, time + dur)
    osc.connect(env)
    env.connect(this.masterGain)
    osc.start(time)
    osc.stop(time + dur + 0.02)
  }
}
