/**
 * Lightweight 8-Bit Chiptune SFX Synthesizer using Web Audio API.
 * Non-blocking and safe if AudioContext is unavailable or blocked.
 */

let audioCtx: AudioContext | null = null
let sfxMuted = false
let sfxVolume = 0.7

function clampVolume(val: number): number {
  return Math.min(1, Math.max(0, Number(val.toFixed(2))))
}

function getAudioContext(): AudioContext | null {
  if (sfxMuted || sfxVolume <= 0 || typeof window === 'undefined') return null
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext
  if (!Ctx) return null
  if (!audioCtx) {
    audioCtx = new Ctx()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

function playTone(
  freq: number,
  durationSec: number,
  type: OscillatorType = 'square',
  startTimeOffset = 0,
  baseVolume = 0.06
) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const effectiveVolume = Math.max(0.002, baseVolume * (sfxVolume / 0.7))

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const now = ctx.currentTime + startTimeOffset

    osc.type = type
    osc.frequency.setValueAtTime(freq, now)

    gain.gain.setValueAtTime(effectiveVolume, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + durationSec)
  } catch {
    // Ignore audio errors on restricted devices
  }
}

export function setSfxMuted(muted: boolean) {
  sfxMuted = muted
}

export function isSfxMuted(): boolean {
  return sfxMuted
}

export function setSfxVolume(level: number) {
  sfxVolume = clampVolume(level)
}

export function getSfxVolume(): number {
  return sfxVolume
}

export function playMoveTick() {
  playTone(587.33, 0.045, 'square', 0, 0.035)
}

export function playClawDrop() {
  const notes = [659.25, 587.33, 523.25, 440, 392]
  notes.forEach((n, idx) => {
    playTone(n, 0.07, 'triangle', idx * 0.055, 0.05)
  })
}

export function playClawGrab() {
  playTone(330, 0.08, 'square', 0, 0.055)
  playTone(493.88, 0.1, 'square', 0.08, 0.055)
}

export function playPrizeWin() {
  // Cute 8-bit fanfare arpeggio
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((n, idx) => {
    playTone(n, 0.14, 'square', idx * 0.085, 0.06)
  })
}

export function playPenaltySfx() {
  // Playful teasing "oops -1" sound
  const notes = [587.33, 554.37, 523.25, 392.0]
  notes.forEach((n, idx) => {
    playTone(n, 0.13, 'sawtooth', idx * 0.09, 0.045)
  })
}

export function playBonusSfx() {
  // 1-UP extra turn arpeggio
  const notes = [330, 392, 659.25, 523.25, 587.33, 783.99]
  notes.forEach((n, idx) => {
    playTone(n, 0.11, 'square', idx * 0.075, 0.065)
  })
}

export function playEnvelopeAppear() {
  const notes = [523.25, 659.25, 783.99, 987.77, 1046.5]
  notes.forEach((n, idx) => {
    playTone(n, 0.15, 'triangle', idx * 0.08, 0.06)
  })
}

export function playLetterOpen() {
  const notes = [440, 554.37, 659.25, 880]
  notes.forEach((n, idx) => {
    playTone(n, 0.16, 'sine', idx * 0.09, 0.07)
  })
}
