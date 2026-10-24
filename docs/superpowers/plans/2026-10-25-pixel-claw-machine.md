# Pixel Claw Machine Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first 2.5D pink pixel-art claw machine website with 4-way (`Trái/Phải/Vào trong/Ra ngoài`) controls, 15 gift boxes, a scripted 5-prize sequence (`5 -> 4 -> 2 -> 1 -> 1 -> 0` turns), smooth GSAP modal animations, and a final clickable pixel love letter.

**Architecture:** Vue 3 (`<script setup lang="ts">`) + Tailwind CSS + GSAP single-page mobile arcade application. Pure game logic (2.5D coordinate movement, nearest-box selection in `(x, z)` space, and the 5-catch turn progression state machine) lives in `src/composables/useClawMachine.ts` and is unit-tested with Vitest. Visual components render crisp SVG pixel art, GSAP-choreographed claw/modal/envelope animations, and Web Audio 8-bit SFX.

**Tech Stack:** Vue 3.5, TypeScript 5.7, Tailwind CSS 3.4, GSAP 3.12, Vitest 5.0

**Spec:** `docs/superpowers/specs/2026-10-25-pixel-claw-machine-design.md`

## Global Constraints

- Mobile-first viewport layout (`max-w-[430px]`, `100dvh`) with touch-friendly 4-way D-Pad (`◀`, `▶`, `▲ Vào trong`, `▼ Ra ngoài`) and `GẮP! 💖` button.
- Exact 5-catch scripted sequence starting from `5` turns:
  1. Catch 1 (`Món 1`): `kind: 'gift'`, `turnDelta: 0` -> `4` turns left
  2. Catch 2 (`Món 2`): `kind: 'kiss_penalty'`, *"Thơm anh Quân 1 cái"*, `turnDelta: -1` -> `2` turns left
  3. Catch 3 (`Món 3`): `kind: 'gift'`, `turnDelta: 0` -> `1` turn left
  4. Catch 4 (`Món 4`): `kind: 'kiss_bonus'`, *"Được anh Quân thơm 1 cái"*, `turnDelta: +1` -> `1` turn left
  5. Catch 5 (`Món 5`): `kind: 'gift'`, `turnDelta: 0` -> `0` turns left
- 15 gift boxes inside the claw machine (`initialBoxes.length === 15`) distributed across 2.5D `(x, z)` coordinates.
- Closing the 5th prize modal automatically transitions to the floating Pixel Love Letter envelope; clicking the envelope opens the letter modal with content from `src/config/clawConfig.ts`.

## Review Focus

- Rapidly pressing `GẮP!` while the claw is already moving/grabbing or while a modal is open must be ignored so turns and prize indices never desync.
- Moving the claw in 4 directions (`left`, `right`, `in`, `out`) must clamp `x` within `[12, 88]` and `z` within `[0, 1]` so the claw and target shadow never leave the cabinet glass.
- Even if the player presses `GẮP!` when the claw `(x, z)` is not directly on top of a box, `findNearestAvailableBox` must always pick the closest ungrabbed box among the 15 boxes so no turn is wasted.
- Closing a prize modal for catches 1–4 must not trigger the final love letter envelope; only closing the 5th prize modal triggers `envelopeReady = true`.
- When `prefers-reduced-motion: reduce` is enabled, GSAP durations shorten gracefully without breaking state callbacks.

---

### Task 1: Claw Machine Types & Creator Config (`src/types/claw.ts`, `src/config/clawConfig.ts`)

**Files:**
- Create: `src/types/claw.ts`
- Create: `src/config/clawConfig.ts`
- Test: `src/config/clawConfig.test.ts`

**Interfaces:**
- Produces:
  - `PrizeKind = 'gift' | 'kiss_penalty' | 'kiss_bonus'`
  - `ClawPrize`, `GiftBoxItem`, `LoveLetterConfig`, `ClawMachineConfig` in `src/types/claw.ts`
  - `clawConfig: ClawMachineConfig` in `src/config/clawConfig.ts`

- [ ] **Step 1: Write the failing test in `src/config/clawConfig.test.ts`**
  Verify `clawConfig.initialTurns === 5`, `clawConfig.giftBoxes.length === 15`, `clawConfig.prizes.length === 5`, the exact `kind` and `turnDelta` of prizes 1..5 (`0, -1, 0, +1, 0`), and non-empty `clawConfig.loveLetter.paragraphs`.
- [ ] **Step 2: Run test to verify it fails**
  Run: `npm test -- src/config/clawConfig.test.ts`
- [ ] **Step 3: Implement `src/types/claw.ts` and `src/config/clawConfig.ts`**
- [ ] **Step 4: Run test to verify it passes**
  Run: `npm test -- src/config/clawConfig.test.ts`

---

### Task 2: 2.5D Claw Machine State & Physics Composable (`src/composables/useClawMachine.ts`)

**Files:**
- Create: `src/composables/useClawMachine.ts`
- Test: `src/composables/useClawMachine.test.ts`

**Interfaces:**
- Consumes: `ClawMachineConfig`, `ClawPrize`, `GiftBoxItem` from `src/types/claw.ts`
- Produces: `useClawMachine(config?: ClawMachineConfig)` returning reactive state (`turnsLeft`, `caughtCount`, `clawX`, `clawZ`, `phase`, `boxes`, `activePrize`, `lastTurnChange`, `caughtHistory`, `isEnvelopeVisible`, `isLetterOpen`, `nearestBoxId`) and actions (`moveClaw`, `startGrab`, `completeGrabAnimation`, `closePrizeModal`, `openLoveLetter`, `closeLoveLetter`, `resetGame`).

- [ ] **Step 1: Write failing tests in `src/composables/useClawMachine.test.ts`**
  Test:
  1. 4-directional movement (`left`, `right`, `in`, `out`) and clamping (`x` in `[12, 88]`, `z` in `[0, 1]`).
  2. Nearest ungrabbed box selection in 2.5D `(x, z)` space.
  3. Full 5-catch turn progression (`5 -> 4 -> 2 -> 1 -> 1 -> 0`), verifying `activePrize`, `lastTurnChange`, and box removal on each catch.
  4. Guarding against duplicate `startGrab()` calls while busy or when `turnsLeft === 0`.
  5. Envelope visibility (`isEnvelopeVisible`) becoming `true` only after `closePrizeModal()` on Catch 5, and `openLoveLetter()` opening the final letter.
- [ ] **Step 2: Run test to verify it fails**
  Run: `npm test -- src/composables/useClawMachine.test.ts`
- [ ] **Step 3: Implement `src/composables/useClawMachine.ts`**
- [ ] **Step 4: Run test to verify it passes**
  Run: `npm test -- src/composables/useClawMachine.test.ts`

---

### Task 3: Pixel Art Theme, Fonts & 8-Bit Web Audio SFX (`src/utils/pixelAudio.ts`, `index.html`, `tailwind.config.js`, `src/style.css`)

**Files:**
- Create: `src/utils/pixelAudio.ts`
- Modify: `index.html`, `tailwind.config.js`, `src/style.css`

- [ ] **Step 1: Implement `src/utils/pixelAudio.ts`** with safe Web Audio API synthesized cute 8-bit sound effects (`playMoveTick`, `playClawDrop`, `playClawGrab`, `playPrizeWin`, `playPenaltySfx`, `playBonusSfx`, `playEnvelopeAppear`, `playLetterOpen`).
- [ ] **Step 2: Update `index.html`, `tailwind.config.js`, and `src/style.css`** with pixel/cute Vietnamese font pairing (`VT323` / `Press Start 2P` + `Plus Jakarta Sans` / `Quicksand`), custom pixel borders, and pink arcade utilities.

---

### Task 4: Animated Pink Pixel Heart Background (`src/components/PixelHeartBackground.vue`)

**Files:**
- Create: `src/components/PixelHeartBackground.vue`

- [ ] **Step 1: Build `src/components/PixelHeartBackground.vue`** featuring a dreamy pink pixel gradient sky, animated pixel clouds, twinkling 8-bit stars, and floating pixel hearts with smooth GPU-accelerated animations.

---

### Task 5: 2.5D Pixel Claw Machine Cabinet, 15 Gift Boxes & 4-Way Controls (`src/components/PixelGiftBoxSvg.vue`, `src/components/PixelClawMachine.vue`)

**Files:**
- Create: `src/components/PixelGiftBoxSvg.vue`
- Create: `src/components/PixelClawMachine.vue`

- [ ] **Step 1: Build `src/components/PixelGiftBoxSvg.vue`** rendering crisp pixel-art gift boxes with customizable box color, ribbon color, bow style, and pixel heart emblem.
- [ ] **Step 2: Build `src/components/PixelClawMachine.vue`** featuring:
  - Arcade marquee header with blinking LED hearts, turn counter badge (`LƯỢT: 5`) + animated floating `-1 LƯỢT` / `+1 LƯỢT` popups, and progress hearts (`0/5`).
  - 2.5D glass cabinet with back/middle/front depth grid lines, 15 layered pixel gift boxes sorted by depth `z`, glowing target heart shadow on the floor at `(clawX, clawZ)`, and the animated 2.5D overhead rail + extendable cable + 3-prong pixel claw.
  - GSAP grab choreography: horizontal/depth alignment -> cable drop to box depth -> claw prong close -> suspense shake -> lift box -> travel to prize chute -> drop into chute with pixel heart burst -> emit `grabComplete`.
  - Lower arcade deck with 4-way tactile pixel D-Pad (`◀`, `▶`, `▲ VÀO`, `▼ RA`) supporting both tap and press-and-hold continuous movement, plus the big 3D pixel `GẮP QUÀ 💖` button and illuminated prize chute.

---

### Task 6: Smooth Animated Prize Reveal Modal (`src/components/PrizeRevealModal.vue`)

**Files:**
- Create: `src/components/PrizeRevealModal.vue`

- [ ] **Step 1: Build `src/components/PrizeRevealModal.vue`** with:
  - Two-stage smooth GSAP animation: Stage 1 shows the caught pixel gift box shaking with anticipation and bursting open in a shower of pixel hearts & sparkles; Stage 2 reveals the prize card.
  - Distinct visual treatments for:
    - **Quà (Món 1, 3, 5)**: Framed gift photo/pixel illustration, gift badge (`MÓN QUÀ #1, #3, #5`), title, and sweet message.
    - **Thơm anh Quân 1 cái + `-1 Lượt` (Món 2)**: Cute pixel couple kiss illustration, playful warning badge `⚠️ BỊ TRỪ 1 LƯỢT GẮP (-1)`, and sweet teasing copy.
    - **Được anh Quân thơm 1 cái + `+1 Lượt` (Món 4)**: Romantic pixel kiss reward illustration, glowing bonus badge `🎁 THƯỞNG THÊM 1 LƯỢT GẮP (+1)`, and celebration copy.
  - Smooth GSAP entrance and exit transitions before emitting `close`.

---

### Task 7: Final Interactive Pixel Love Letter Modal (`src/components/PixelLoveLetterModal.vue`)

**Files:**
- Create: `src/components/PixelLoveLetterModal.vue`

- [ ] **Step 1: Build `src/components/PixelLoveLetterModal.vue`** with:
  - Floating Pixel Heart Envelope overlay that appears with a magical GSAP entrance when the 5th prize modal closes.
  - Interactive tap-to-open envelope flap animation (`GSAP timeline`) that breaks the pixel heart seal, slides the stationery letter up, and reveals the full love letter from `clawConfig.loveLetter` along with a summary strip of the 5 prizes won and a "Chơi lại từ đầu 🔄" option.

---

### Task 8: App Integration & Full Verification (`src/App.vue`)

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Update `src/App.vue`** to wire `PixelHeartBackground`, `PixelClawMachine`, `PrizeRevealModal`, `PixelLoveLetterModal`, and `AudioPlayer` / SFX toggle into a cohesive mobile-first layout.
- [ ] **Step 2: Run unit tests (`npm test`) and production build (`npm run build`)** to verify zero TypeScript or test errors.
- [ ] **Step 3: Commit all changes to `feat/pixel-claw-machine`.**
