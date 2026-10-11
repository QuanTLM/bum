import { describe, it, expect, vi } from 'vitest'
import { EASE_SMOOTH, EASE_PREMIUM, prefersReducedMotion } from './motion'

describe('motion constants and utilities', () => {
  it('exports expected cubic-bezier easing constants', () => {
    expect(EASE_SMOOTH).toBe('cubic-bezier(0.16, 1, 0.3, 1)')
    expect(EASE_PREMIUM).toBe('cubic-bezier(0.32, 0.72, 0, 1)')
  })

  it('detects prefersReducedMotion correctly based on matchMedia', () => {
    const mockMatchMedia = (matches: boolean) => vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    // When matches: true
    vi.stubGlobal('window', {
      matchMedia: mockMatchMedia(true)
    })
    expect(prefersReducedMotion()).toBe(true)

    // When matches: false
    vi.stubGlobal('window', {
      matchMedia: mockMatchMedia(false)
    })
    expect(prefersReducedMotion()).toBe(false)
  })
})
