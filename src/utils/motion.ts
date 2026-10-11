// Easing constants (high-end skill: custom cubic-bezier)
export const EASE_SMOOTH = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const EASE_PREMIUM = 'cubic-bezier(0.32, 0.72, 0, 1)'

// Check reduced motion preference (DEC-037, US-009)
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
