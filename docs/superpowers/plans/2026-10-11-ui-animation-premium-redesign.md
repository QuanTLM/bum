# UI & Animation Premium Redesign - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate "Website For My Love" from a functional MVP to an Awwwards-tier romantic experience with cinematic GSAP motion choreography, premium visual design, and compositor-only 60fps animations on mobile.

**Architecture:** Redesign-overhaul the existing Vue 3 + Vite + Tailwind CSS + GSAP source base in-place. Preserve all business logic, data contracts (`src/types/gift.ts`, `src/config/giftData.ts`), composables, and feature compliance (FEAT-001 through FEAT-005). Touch only visual/motion/styling layers. No new dependencies except `gsap/SplitText` (already bundled free with gsap 3.12+).

**Tech Stack:** Vue 3, TypeScript, Tailwind CSS 3.4, GSAP 3.12+ (ScrollTrigger, SplitText), @lucide/vue, @vueuse/core

**Spec:** `docs/01_BRD_Website_For_My_Love.md` through `docs/05_User_Stories_AC_Website_For_My_Love.md`

---

## Design Audit (Current State)

> **Design Read:** "Reading this as: romantic gift experience for a single recipient, with a Modern Minimal premium-consumer language, leaning toward editorial serif + elegant sans, mobile-optimized single-page scroll with cinematic motion."
>
> **Dials:** `DESIGN_VARIANCE: 7` / `MOTION_INTENSITY: 7` / `VISUAL_DENSITY: 2`

### Brand Tokens to Preserve
- **Palette:** `romantic-*` (rose tones) + `warm-*` (warm neutrals) - good, keep
- **Fonts:** Playfair Display (serif) + Plus Jakarta Sans (sans) - acceptable for romantic/editorial brief; Playfair is justified here because this is a love letter / personal gift
- **Shape system:** rounded-full pills, rounded-2xl/3xl cards - keep, refine
- **Data contracts:** `GiftConfig`, `PhotoItem`, `LoveLetterConfig` etc - untouched

### Patterns to Retire (AI Tells & Generic Patterns Found)

| # | Problem | Component | Skill Source |
|---|---------|-----------|-------------|
| 1 | **`animate-pulse` on Heart icons** - infinite CSS `animate-pulse` is cheap/generic; three instances across Hero, FinalMessage, AudioPlayer | OpeningHero, FinalMessage, AudioPlayer | redesign: "instant transitions with zero duration" / high-end: "banned motion: standard linear or ease-in-out" |
| 2 | **`animate-bounce` on ChevronDown** - scroll cue entirely banned per design-taste 9.F: "Scroll cues are banned" | OpeningHero L132 | design-taste 9.F |
| 3 | **`animate-bounce`/`animate-pulse` equalizer bars** - CSS default keyframes, not spring physics | AudioPlayer L38-40 | high-end: "never use default transitions" |
| 4 | **`min-h-screen`** - should be `min-h-[100dvh]` for iOS Safari address bar stability | OpeningHero L81 | design-taste 3.E, redesign layout, high-end 3 |
| 5 | **No `gsap.context()` cleanup** - all GSAP code uses raw `gsap.fromTo` without `gsap.context()`/`.revert()` on unmount; memory leaks on SPA navigation | All components with GSAP | gsap-web: "SPA cleanup is mandatory" |
| 6 | **`document.querySelectorAll('.gallery-card')` in Gallery** - fragile string selector instead of scoped refs; no cleanup on unmount | PhotoGallery L55 | gsap-web: "use gsap.context()" |
| 7 | **Eyebrow pill on every section** - Hero has "A special gift for you", Gallery has "Khoảnh khắc kỷ niệm", Letter has "Bức thư cho em", all with identical pill styling. 3 eyebrows in 4 sections violates max-1-per-3 rule | All sections | design-taste 4.7 Eyebrow Restraint |
| 8 | **`#index` numbering on gallery cards** - `#1`, `#2` etc with mono font and heart icon = section-number pagination Tell | PhotoGallery L124-127 | design-taste 9.F: "NO 01/4-style pagination on images" |
| 9 | **Section padding too thin** (`py-16`) - for premium romantic experience at VISUAL_DENSITY 2, minimum should be `py-24` to `py-32` | Gallery, LoveLetter | high-end 4.C: "Double your standard padding. Use py-24 to py-40" |
| 10 | **No scroll-driven stagger** - gallery cards all reveal at the same time per card; no stagger orchestration | PhotoGallery | gsap-web: "ScrollTrigger.batch() reveals", design-taste 5.C |
| 11 | **No GSAP context/timeline for Hero** - uses individual `gsap.fromTo` calls; should be one timeline with position parameters | OpeningHero | gsap-web: "Prefer one timeline over many independent tweens" |
| 12 | **Backdrop-blur on scrolling audio pill** - `backdrop-blur-md` on a fixed-position element is fine per rules, but error banner also uses it on a fixed element - acceptable. Gallery overlay gradient is on scrolling content - watch for perf | AudioPlayer | 60fps: "backdrop-filter expensive; animate via opacity" |
| 13 | **No SplitText** for any text reveals - the letter and final message just fade; premium romantic feel demands line-by-line or word-by-word reveals | LoveLetter, FinalMessage | gsap-web: SplitText, high-end 5.C |
| 14 | **Lightbox image transition is CSS `transition-all`** - should be GSAP-driven crossfade for 60fps compositor-only animation | PhotoLightbox L133 | 60fps: "animate only transform and opacity" |
| 15 | **Shadow animation on gallery cards uses `shadow-sm` in base** - if hover adds/changes shadow, that's a paint-per-frame; should use pseudo-element opacity technique | PhotoGallery | 60fps: "Cheap box-shadow via pseudo-element opacity" |
| 16 | **Gallery caption overlay always visible at opacity-90** - should reveal on hover/tap only for cleaner minimal look | PhotoGallery L123 | redesign: "Missing whitespace. Let the design breathe" |
| 17 | **No noise/grain texture** - premium surfaces feel flat without subtle texture overlay | Global | high-end 3.A: "CSS noise/film-grain overlay opacity-[0.03]" / 60fps: "apply noise textures to fixed pointer-events-none pseudo-elements" |
| 18 | **Transition easing uses default `ease-out` / `ease-in`** everywhere - should use custom cubic-beziers for premium feel | All | high-end 5: "custom cubic-bezier(0.32,0.72,0,1)" |
| 19 | **Love Letter card uses `shadow-xl`** - generic Tailwind shadow, should use tinted shadow matching warm palette | LoveLetter L49 | redesign: "Generic box-shadow - tint to background hue" |
| 20 | **Hero Start button hover is basic `hover:bg-romantic-700`** - no kinetic tension, no trailing icon architecture | OpeningHero L121 | high-end 4.B: "Magnetic Button Hover Physics" |

---

## Global Constraints

- **Framework:** Vue 3 + Vite + TypeScript - do not change
- **Styling:** Tailwind CSS 3.4 - do not upgrade to v4
- **Animation library:** GSAP 3.12+ (ScrollTrigger, SplitText) - already installed; register SplitText where used
- **Icons:** @lucide/vue (existing) - acceptable per design-taste override for existing projects
- **All business logic, data contracts, composables, feature compliance (FEAT-001 through FEAT-005) are frozen** - do not modify `src/types/gift.ts`, `src/config/giftData.ts`, or `src/composables/useAudioPlayer.ts`
- **Animate ONLY `transform` and `opacity`** per frame (60fps skill). No animating `top`, `left`, `width`, `height`, `box-shadow`
- **Every GSAP usage MUST use `gsap.context()` with `revert()` on component unmount** (gsap-web skill)
- **`prefers-reduced-motion: reduce`** must disable all non-essential animation (GSAP gated, CSS gated) (DEC-037, US-009, 60fps skill)
- **Mobile-first single-page scroll** - `max-w-mobile` (440px) container preserved (DEC-036)
- **Custom easing:** Replace all default `ease-out`/`ease-in-out` with `cubic-bezier(0.16, 1, 0.3, 1)` for UI transitions and `power3.out` / `power4.out` for GSAP reveals

## Review Focus

1. **Reduced Motion with GSAP SplitText** - when `prefers-reduced-motion: reduce`, SplitText DOM manipulation still runs but animation skips; verify text is still readable and `.revert()` cleans up split nodes on unmount
2. **Gallery with 30 photos on low-end mobile** - 30 ScrollTrigger instances on a budget phone may choke; verify `ScrollTrigger.batch()` keeps trigger count manageable and images use `loading="lazy"`
3. **Lightbox body scroll lock** - when Lightbox opens, background scroll must be locked (`overflow: hidden` on body) and restored on close; current implementation does not do this
4. **Audio player z-index collision with Lightbox** - AudioPlayer is `z-40`, Lightbox is `z-50`; verify the audio pill is hidden or beneath the Lightbox when it opens
5. **GSAP cleanup on fast scroll** - if user scrolls quickly past multiple ScrollTrigger zones, verify no animations are left in a half-started state (test with `.toggleActions: 'play none none none'` which is one-shot)

---

### Task 1: Global Foundation - Easing, Cleanup Utility, Texture, CSS Overhaul

**Files:**
- Modify: `src/style.css`
- Create: `src/utils/motion.ts`
- Modify: `tailwind.config.js`
- Modify: `index.html`

**Interfaces:**
- Produces: `EASE_SMOOTH` cubic-bezier constant, `useGsapContext(rootRef)` composable for scoped GSAP cleanup, `prefersReducedMotion(): boolean` utility, noise texture CSS class `.grain-overlay`

- [ ] **Step 1: Create `src/utils/motion.ts` with shared motion constants and GSAP context helper**

```ts
// Easing constants (high-end skill: custom cubic-bezier)
export const EASE_SMOOTH = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const EASE_PREMIUM = 'cubic-bezier(0.32, 0.72, 0, 1)'

// Check reduced motion preference (DEC-037)
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
```

- [ ] **Step 2: Update `src/style.css` - add grain overlay, refined scrollbar, enhanced base styles**

Add fixed noise-grain pseudo-element class (applied to a `pointer-events-none` fixed overlay in App.vue). Add custom keyframes for the audio equalizer bars (replacing `animate-pulse`/`animate-bounce`). Ensure `prefers-reduced-motion` block also kills GSAP-driven CSS custom properties. Replace `min-h-screen` utility override note.

- [ ] **Step 3: Update `tailwind.config.js` - add transition-timing-function extension and refine spacing**

Add `transitionTimingFunction: { smooth: 'cubic-bezier(0.16, 1, 0.3, 1)', premium: 'cubic-bezier(0.32, 0.72, 0, 1)' }` to theme.extend. Add warm color shades `400`, `500`, `600`, `700` that are currently missing for richer gradient options.

- [ ] **Step 4: Update `index.html` - add `font-display: swap` note and preload critical font weights**

Add `<link rel="preload">` for the 400 and 700 weights of Plus Jakarta Sans (the body font used above the fold). This improves LCP and prevents FOIT on the Hero.

- [ ] **Step 5: Verify build passes**

Run: `npm run build`
Expected: 0 errors

- [ ] **Step 6: Commit**

```bash
git add src/utils/motion.ts src/style.css tailwind.config.js index.html
git commit -m "feat: global motion foundation - easing constants, grain overlay, refined base styles"
```

---

### Task 2: App.vue - Grain Overlay, Improved Container, Section Transitions

**Files:**
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: `.grain-overlay` class from Task 1
- Produces: grain overlay DOM element, refined container wrapper

- [ ] **Step 1: Add grain/noise overlay as a fixed pseudo-element layer**

Add a `<div>` with class `grain-overlay` as the last child of the root wrapper. This is a `fixed inset-0 pointer-events-none z-[60]` element with a subtle noise SVG filter at `opacity-[0.02]`. Per 60fps skill: noise on fixed elements only, never on scrolling containers.

- [ ] **Step 2: Replace `min-h-screen` with `min-h-[100dvh]` on the outer wrapper and main**

Per design-taste 3.E and redesign skill: use `100dvh` to prevent iOS Safari address bar layout jump.

- [ ] **Step 3: Add subtle section dividers between major sections**

Add thin decorative elements (a small centered dot or gradient line) between Gallery-to-Letter and Letter-to-Final transitions for visual rhythm. No eyebrow pills.

- [ ] **Step 4: Verify dev server renders correctly**

Run: `npm run dev`
Open `http://localhost:3000` - verify grain is barely visible, sections flow correctly.

- [ ] **Step 5: Commit**

```bash
git add src/App.vue
git commit -m "feat: grain overlay, 100dvh fix, section rhythm dividers"
```

---

### Task 3: OpeningHero.vue - Cinematic Entrance, Premium Button, Remove Scroll Cue

**Files:**
- Modify: `src/components/OpeningHero.vue`

**Interfaces:**
- Consumes: `prefersReducedMotion()` from Task 1's `src/utils/motion.ts`
- Produces: upgraded hero with GSAP timeline (one master timeline), SplitText on recipient name, premium CTA with trailing-icon architecture, removed scroll cue, removed generic `animate-pulse`

- [ ] **Step 1: Replace `animate-pulse` on Heart with a GSAP-driven gentle scale breathing loop**

Use `gsap.to(heartEl, { scale: 1.08, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' })` gated behind reduced-motion check. This is compositor-only (transform). Kill the loop in `gsap.context()` cleanup.

- [ ] **Step 2: Remove scroll cue entirely (ChevronDown + "Cuộn xuống để khám phá")**

Per design-taste 9.F: "Scroll cues are banned. If the user has not scrolled yet, they are looking at the hero. They know what scroll is."

- [ ] **Step 3: Upgrade Hero entrance to a single GSAP master timeline with SplitText on the name**

Import `SplitText` from `gsap/SplitText` and register it. Split `recipientName` into chars. Animate chars with stagger for a premium reveal. Wrap all entrance animation in `gsap.context()` scoped to the hero container ref, and `ctx.revert()` in `onUnmounted`.

Timeline sequence:
1. Background glow orbs fade in (`opacity: 0 -> 0.4`, 0.8s)
2. Heart icon enters with `elastic.out(1, 0.4)` (scale 0 -> 1)
3. "Dành riêng cho" eyebrow fades up (`y: 15, opacity: 0 -> y: 0, opacity: 1`)
4. Recipient name chars stagger in from below with slight rotation (`yPercent: 100, rotateX: -40 -> 0`, stagger 0.04)
5. Tagline fades up
6. CTA button scales in with `back.out(1.7)`

- [ ] **Step 4: Upgrade Start button to premium pill with trailing arrow icon**

Add a nested circular arrow container inside the button (high-end 4.B "Button-in-Button" pattern). On hover, the arrow translates diagonally and scales. On active, the entire button scales to 0.97. Use custom easing `cubic-bezier(0.32, 0.72, 0, 1)` for all button transitions.

- [ ] **Step 5: Fix `min-h-screen` to `min-h-[100dvh]`**

- [ ] **Step 6: Remove the top eyebrow "A special gift for you"**

Per eyebrow restraint: we keep at most 1 eyebrow across the 4 sections. The hero name is strong enough without a label.

- [ ] **Step 7: Verify hero renders and animates on dev server**

Run: `npm run dev`
Check: entrance animation plays, reduced-motion skips to static, no console errors, `gsap.context` cleanup exists.

- [ ] **Step 8: Commit**

```bash
git add src/components/OpeningHero.vue
git commit -m "feat: cinematic hero - SplitText name reveal, premium CTA, GSAP timeline cleanup"
```

---

### Task 4: PhotoGallery.vue - Staggered Batch Reveal, Caption Polish, Remove Index Numbers

**Files:**
- Modify: `src/components/PhotoGallery.vue`

**Interfaces:**
- Consumes: `prefersReducedMotion()` from Task 1
- Produces: `ScrollTrigger.batch()`-driven staggered reveal, cleaned caption overlay (no `#index` numbers), hover-only caption reveal, premium shadow via pseudo-element

- [ ] **Step 1: Replace individual ScrollTrigger-per-card with `ScrollTrigger.batch()`**

Per gsap-web skill: "Batch many similar scroll reveals with `ScrollTrigger.batch()` instead of one trigger per element." This reduces trigger count from N to 1, critical for 30 photos on mobile.

```ts
ScrollTrigger.batch('.gallery-card', {
  start: 'top 90%',
  onEnter: (batch) => {
    gsap.fromTo(batch, 
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 }
    )
  },
  once: true,
})
```

Wrap in `gsap.context()` scoped to section ref. Revert on unmount.

- [ ] **Step 2: Remove `#index` numbering from caption overlay**

Delete the `#{{ index + 1 }}` mono-font counter and heart icon from the overlay. Per design-taste 9.F: "NO `01/4`-style pagination on images or bento tiles."

- [ ] **Step 3: Make caption overlay appear only on hover/tap instead of always-visible**

Change the gradient overlay from `opacity-90` base to `opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`. This gives a cleaner minimal gallery and rewards interaction.

- [ ] **Step 4: Remove the section eyebrow pill ("Khoảnh khắc kỷ niệm")**

Keep only the `<h2>` section title and subtitle. Per eyebrow restraint (max 1 per 3 sections), and the Hero already consumed one (even after removal, we budget conservatively).

- [ ] **Step 5: Increase section padding from `py-16` to `py-28`**

Per high-end 4.C: "Use py-24 to py-40 for sections. Allow the design to breathe heavily."

- [ ] **Step 6: Verify gallery scroll reveal with stagger on dev server**

Run: `npm run dev`
Check: cards appear with stagger as they scroll into view, captions hidden until hover, no `#N` labels, increased whitespace between sections.

- [ ] **Step 7: Commit**

```bash
git add src/components/PhotoGallery.vue
git commit -m "feat: gallery batch reveal, caption hover-only, remove index numbers, premium spacing"
```

---

### Task 5: PhotoLightbox.vue - GSAP Image Crossfade, Body Scroll Lock, Premium Transitions

**Files:**
- Modify: `src/components/PhotoLightbox.vue`

**Interfaces:**
- Consumes: `prefersReducedMotion()` from Task 1
- Produces: GSAP-driven image crossfade on prev/next, body scroll lock on open, premium open/close transitions

- [ ] **Step 1: Add body scroll lock when Lightbox opens**

Watch `isOpen` prop. On open: `document.body.style.overflow = 'hidden'`. On close: `document.body.style.overflow = ''`. This prevents background scroll while viewing photos (Review Focus item 3).

- [ ] **Step 2: Replace CSS `transition-all duration-300` on image with GSAP crossfade**

On prev/next navigation, use a quick GSAP tween: `gsap.fromTo(imgEl, { opacity: 0, x: direction * 30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' })`. This is compositor-only (transform + opacity). Gate behind reduced motion.

- [ ] **Step 3: Upgrade open/close transition to GSAP timeline**

Replace Vue `<transition>` CSS classes with a GSAP-driven enter/leave: backdrop fades in, then image scales from 0.9 to 1 with blur clearing. All compositor-only properties. Use `gsap.context()` for cleanup.

- [ ] **Step 4: Replace `transition-all` on nav buttons with `transition-[transform,opacity]`**

`transition-all` animates ALL properties including layout-triggering ones. Scope to only `transform` and `opacity`. Per 60fps skill.

- [ ] **Step 5: Verify lightbox opens, transitions, swipe-navigates, and closes cleanly**

Run: `npm run dev`
Check: body scroll locks, image crossfade animates, prev/next boundary stops work, Escape closes, background click closes, no scroll jump on close.

- [ ] **Step 6: Commit**

```bash
git add src/components/PhotoLightbox.vue
git commit -m "feat: lightbox GSAP crossfade, body scroll lock, compositor-only transitions"
```

---

### Task 6: LoveLetter.vue - SplitText Paragraph Reveal, Premium Card Surface

**Files:**
- Modify: `src/components/LoveLetter.vue`

**Interfaces:**
- Consumes: `prefersReducedMotion()`, `EASE_PREMIUM` from Task 1
- Produces: SplitText line-by-line reveal on letter paragraphs, tinted shadow on card, refined section spacing, removed eyebrow pill

- [ ] **Step 1: Remove eyebrow pill ("Bức thư cho em")**

Per eyebrow restraint. The letter card itself is distinctive enough. Keep the decorative header inside the card (Heart icon + "A letter from my heart").

- [ ] **Step 2: Replace `shadow-xl shadow-warm-200/50` with tinted, diffused shadow**

Use `shadow-[0_8px_40px_-12px_rgba(180,160,140,0.25)]` - a warm-tinted, highly diffused shadow that matches the warm palette. Per redesign skill: "Generic box-shadow - tint to background hue."

- [ ] **Step 3: Add SplitText line-by-line reveal for letter paragraphs**

When the letter section enters viewport, split each paragraph into lines and stagger-reveal them (`yPercent: 100, opacity: 0` inside `overflow: hidden` line wrappers). This creates a premium "typewriter emergence" effect that suits the intimate reading moment.

Wrap in `gsap.context()`. Revert SplitText on unmount with `split.revert()`.

- [ ] **Step 4: Animate the card itself with a gentle parallax-float on scroll**

Use GSAP ScrollTrigger with `scrub: 1` to apply a subtle `y: 20 -> -20` over the scroll range of the section. This creates a floating-card illusion. Compositor-only (transform).

- [ ] **Step 5: Increase section padding from `py-16` to `py-28`**

- [ ] **Step 6: Verify letter reveals line-by-line on scroll**

Run: `npm run dev`
Check: card floats subtly, paragraphs reveal line-by-line with stagger, reduced motion shows static, SplitText `.revert()` in devtools unmount.

- [ ] **Step 7: Commit**

```bash
git add src/components/LoveLetter.vue
git commit -m "feat: love letter SplitText line reveal, tinted shadow, parallax float"
```

---

### Task 7: FinalMessage.vue - Cinematic Closing, Gentle Particle/Sparkle Effect

**Files:**
- Modify: `src/components/FinalMessage.vue`

**Interfaces:**
- Consumes: `prefersReducedMotion()` from Task 1
- Produces: SplitText word-by-word reveal on headline, refined closing animation, removed `animate-pulse` on heart, premium spacing

- [ ] **Step 1: Replace `animate-pulse` on Heart with GSAP gentle breathing (same pattern as Hero Task 3)**

- [ ] **Step 2: Add SplitText word-by-word reveal on the headline**

Split the `finalMessage.headline` into words. Stagger-reveal with `yPercent: 60, opacity: 0, rotateX: -20`, stagger `0.06`. This creates a poetic word-by-word emergence for the closing moment. Wrap in `gsap.context()`.

- [ ] **Step 3: Stagger-reveal the sub-elements (subheadline, closing thought, footer)**

After headline completes, sequentially fade in subheadline, closing thought, and footer with the same master timeline. Position parameter `"-=0.3"` for overlap.

- [ ] **Step 4: Replace background halo with a GSAP-animated scale-breathing glow**

Instead of static `blur-3xl` div, animate its scale between 0.9 and 1.1 with `yoyo: true, repeat: -1, duration: 6` for a living, breathing background ambiance. Gate behind reduced motion.

- [ ] **Step 5: Increase section padding from `py-20` to `py-32`**

- [ ] **Step 6: Verify closing sequence on dev server**

Run: `npm run dev`
Check: words reveal poetically, background breathes, heart breathes (not CSS pulse), reduced motion static.

- [ ] **Step 7: Commit**

```bash
git add src/components/FinalMessage.vue
git commit -m "feat: cinematic closing - SplitText word reveal, breathing glow, GSAP cleanup"
```

---

### Task 8: AudioPlayer.vue - Custom Equalizer Animation, Premium Surface

**Files:**
- Modify: `src/components/AudioPlayer.vue`

**Interfaces:**
- Consumes: `EASE_SMOOTH` from Task 1
- Produces: GSAP-driven equalizer bars (replacing CSS `animate-pulse`/`animate-bounce`), glassmorphism refinement on the pill, premium easing on all transitions

- [ ] **Step 1: Replace CSS `animate-pulse`/`animate-bounce` equalizer bars with GSAP stagger loop**

Create 3-4 thin bars animated with `gsap.to(bars, { scaleY: gsap.utils.random(0.3, 1), duration: 0.4, stagger: { each: 0.12, repeat: -1, yoyo: true }, ease: 'sine.inOut' })`. This is compositor-only (`scaleY` = transform). Gate behind reduced motion; under reduced motion show a static "playing" icon instead.

- [ ] **Step 2: Refine glassmorphism on the pill**

Add `shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]` for edge refraction (high-end 4.A, design-taste 5 Liquid Glass). Ensure the pill remains on a `fixed` element so `backdrop-blur` is performant (60fps skill).

- [ ] **Step 3: Replace all `transition-all` with scoped `transition-[transform,opacity,background-color]`**

Per 60fps: `transition-all` can animate layout-triggering properties. Scope explicitly.

- [ ] **Step 4: Replace all `ease-out` / `ease-in` in Vue `<transition>` with custom cubic-bezier**

Use `transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]` for enter, `duration-200` for leave.

- [ ] **Step 5: Verify audio pill animates cleanly when playing**

Run: `npm run dev`
Check: equalizer bars animate smoothly with GSAP, reduced motion shows static icon, pill glass edge refraction visible, error banner enters/leaves with premium easing.

- [ ] **Step 6: Commit**

```bash
git add src/components/AudioPlayer.vue
git commit -m "feat: GSAP equalizer bars, glass pill refinement, scoped transitions"
```

---

### Task 9: Final Verification and Performance Audit

**Files:**
- No new files

**Interfaces:**
- Consumes: all previous tasks

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: 0 errors, 0 TypeScript warnings

- [ ] **Step 2: Verify reduced motion compliance**

Open dev server. Enable "Reduce motion" in OS/browser settings. Scroll through entire experience. Verify:
- Hero shows static (no animation entrance, all elements visible)
- Gallery cards are visible without scroll animation
- Letter paragraphs are visible without SplitText animation
- Final message is visible without word reveal
- Audio equalizer shows static icon
- Heart icons do not pulse/breathe
- Background halos do not animate

- [ ] **Step 3: Verify all GSAP contexts clean up**

Open Vue devtools or browser devtools. Navigate away and back (if SPA) or refresh. Check no orphaned ScrollTrigger instances via `ScrollTrigger.getAll().length` in console.

- [ ] **Step 4: Verify mobile experience**

Open `http://localhost:3000` on a phone (or Chrome DevTools mobile emulation, iPhone 14 Pro viewport). Scroll through entire experience:
- Hero fits in initial viewport (100dvh)
- Gallery cards stagger-reveal smoothly
- Lightbox opens with scroll lock, swipe works, boundary stops work
- Letter reveals line-by-line
- Final message reveals word-by-word
- Audio pill stays accessible throughout

- [ ] **Step 5: Check animation is compositor-only**

Open Chrome DevTools > Performance tab. Record a scroll through the gallery section. Verify:
- No purple "Layout" bands per frame
- No green "Paint" bands per frame (except initial)
- Only "Composite Layers" during scroll animations
- FPS counter stays above 55fps

- [ ] **Step 6: Commit final state**

```bash
git add -A
git commit -m "chore: final verification - 60fps confirmed, reduced motion compliant, all GSAP contexts cleaned"
```

---

## Dependency Check

No new npm packages are needed. `SplitText` is included free in `gsap` 3.12+ and imported as `import { SplitText } from 'gsap/SplitText'`. All other dependencies (`gsap`, `gsap/ScrollTrigger`, `@lucide/vue`, `@vueuse/core`, Tailwind CSS 3.4) are already in `package.json`.
