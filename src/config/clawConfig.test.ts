import { describe, expect, it } from 'vitest'
import { clawConfig } from './clawConfig'

describe('clawConfig', () => {
  it('starts with 5 initial turns and 15 pixel gift boxes inside the machine', () => {
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

    expect(p2.order).toBe(2)
    expect(p2.kind).toBe('kiss_penalty')
    expect(p2.turnDelta).toBe(-1)
    expect(p2.title.toLowerCase()).toContain('thơm anh quân')

    expect(p3.order).toBe(3)
    expect(p3.kind).toBe('gift')
    expect(p3.turnDelta).toBe(0)

    expect(p4.order).toBe(4)
    expect(p4.kind).toBe('kiss_bonus')
    expect(p4.turnDelta).toBe(1)
    expect(p4.title.toLowerCase()).toContain('anh quân thơm')

    expect(p5.order).toBe(5)
    expect(p5.kind).toBe('gift')
    expect(p5.turnDelta).toBe(0)
  })

  it('includes a complete love letter configuration for the final reveal', () => {
    expect(clawConfig.loveLetter.title.length).toBeGreaterThan(0)
    expect(clawConfig.loveLetter.greeting.length).toBeGreaterThan(0)
    expect(clawConfig.loveLetter.paragraphs.length).toBeGreaterThanOrEqual(2)
    expect(clawConfig.loveLetter.signature.length).toBeGreaterThan(0)
  })
})
