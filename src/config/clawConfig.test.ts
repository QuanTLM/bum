import { describe, expect, it } from 'vitest'
import { clawConfig } from './clawConfig'
import { getSfxVolume, setSfxVolume } from '@/utils/pixelAudio'
import { useAudioPlayer } from '@/composables/useAudioPlayer'

describe('clawConfig', () => {
  it('starts with 5 initial turns and 15 pixel gift boxes inside the machine', () => {
    expect(clawConfig.machineSubtitle).toBe('Tiệm gắp quà trái tim')
    expect(clawConfig.initialTurns).toBe(5)
    expect(clawConfig.giftBoxes).toHaveLength(15)

    for (const box of clawConfig.giftBoxes) {
      expect(box.x).toBeGreaterThanOrEqual(14)
      expect(box.x).toBeLessThanOrEqual(86)
      expect(box.z).toBeGreaterThanOrEqual(0)
      expect(box.z).toBeLessThanOrEqual(1)
    }
  })

  it('defines the exact 5-prize scripted sequence (Gift, Kiss -1, Gift, Kiss +1, Gift)', () => {
    expect(clawConfig.prizes).toHaveLength(5)

    const [p1, p2, p3, p4, p5] = clawConfig.prizes
    expect(p1.order).toBe(1)
    expect(p1.kind).toBe('gift')
    expect(p1.turnDelta).toBe(0)
    expect(p1.title).toBe('Son Watery Tint Colorkey')
    expect(p1.imageUrl).toBe('/photos/qua1.webp')

    expect(p2.order).toBe(2)
    expect(p2.kind).toBe('kiss_penalty')
    expect(p2.turnDelta).toBe(-1)
    expect(p2.title.toLowerCase()).toContain('thơm má anh quân')

    expect(p3.order).toBe(3)
    expect(p3.kind).toBe('gift')
    expect(p3.turnDelta).toBe(0)
    expect(p3.title).toBe('Son Velvet COLORKEY')
    expect(p3.imageUrl).toBe('/photos/qua3.webp')

    expect(p4.order).toBe(4)
    expect(p4.kind).toBe('kiss_bonus')
    expect(p4.turnDelta).toBe(1)
    expect(p4.title.toLowerCase()).toContain('anh quân thơm má')

    expect(p5.order).toBe(5)
    expect(p5.kind).toBe('gift')
    expect(p5.turnDelta).toBe(0)
    expect(p5.title).toBe('Phấn Mắt GOGO TALES')
    expect(p5.imageUrl).toBe('/photos/qua5.webp')
  })

  it('includes a single-line love letter configuration for the final reveal', () => {
    expect(clawConfig.loveLetter.title.length).toBeGreaterThan(0)
    expect(clawConfig.loveLetter.paragraphs).toHaveLength(1)
    expect(clawConfig.loveLetter.signature.length).toBeGreaterThan(0)
  })

  it('supports volume up/down clamping between 0 and 1 for both music and 8-bit SFX', () => {
    const player = useAudioPlayer()
    player.setVolume(0.7)
    expect(player.volume.value).toBeCloseTo(0.7)

    player.changeVolume(0.2)
    expect(player.volume.value).toBeCloseTo(0.9)

    player.changeVolume(0.5)
    expect(player.volume.value).toBe(1)

    player.changeVolume(-1.5)
    expect(player.volume.value).toBe(0)

    setSfxVolume(0.4)
    expect(getSfxVolume()).toBeCloseTo(0.4)
    setSfxVolume(2)
    expect(getSfxVolume()).toBe(1)
    setSfxVolume(-1)
    expect(getSfxVolume()).toBe(0)
  })
})
