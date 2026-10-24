# Pixel Claw Machine Website — Design Specification

## 1. Intent & Why

Build a dedicated mobile-first romantic interactive gift website on a new branch (`feat/pixel-claw-machine`) featuring a **2.5D Pixel Art Pink Heart Claw Machine**. The recipient ("Bé Bum" / configurable in one config file) plays a 5-turn claw machine game filled with 15 pixel gift boxes, experiencing an emotional twist in the turn counter (`5 -> 4 -> 2 -> 1 -> 1 -> 0`) before unlocking a final interactive pixel love letter from "anh Quân".

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Mobile-First Arcade Layout (`100dvh`)**: Fits comfortably on a smartphone portrait screen (`max-w-[430px]` centered on desktop) without awkward scrolling during gameplay.
- **Pink Heart Pixel Aesthetic**: Pastel/berry pink palette, crisp pixel-art SVG sprites (`shape-rendering="crispEdges"`), pixel font (`"Press Start 2P"` / `"VT323"` / `"Plus Jakarta Sans"` for Vietnamese readability), and an animated background with floating pixel hearts, sparkles, and clouds.
- **2.5D 4-Direction Claw Machine (`Trái ◀`, `Phải ▶`, `Vào trong ▲`, `Ra ngoài ▼`)**:
  - 15 pixel gift boxes arranged across 3 depth layers (Front, Middle, Back) on the 2.5D machine floor.
  - Moving `Trái / Phải` changes horizontal `x` (`12%` to `88%`).
  - Moving `Vào trong / Ra ngoài` changes depth `z` (`0` = front near glass to `1` = back deep inside), scaling the claw (`1.0` to `0.82`), shifting its vertical rail anchor and moving the **floor target heart shadow** in 2.5D perspective so the player can aim at any box in any depth layer.
  - Pressing **`GẮP! 💖`** snaps gently to the nearest available box in `(x, z)` space, drops the claw to the box's 2.5D floor depth, closes the prongs, shakes with suspense, lifts the caught box, carries it to the front-left prize chute, drops it with a heart burst, and opens the Prize Reveal Modal.
- **Scripted 5-Catch Sequence & Turn Rollercoaster**:
  - Initial turns: `5`.
  - **Catch 1 (Món 1 — Quà)**: Uses 1 turn (`5 -> 4`). Opens Modal with Gift #1 image, title, and description from config.
  - **Catch 2 (Món 2 — Thơm anh Quân 1 cái & `-1 Lượt`)**: Uses 1 turn (`4 -> 3`) plus `-1` turn effect -> **`2` turns remaining**. Modal shows pixel kiss illustration, *"Thơm anh Quân 1 cái 💋"*, and a playful `-1 Lượt gắp` badge.
  - **Catch 3 (Món 3 — Quà)**: Uses 1 turn (`2 -> 1`). Opens Modal with Gift #2 image, title, and description from config.
  - **Catch 4 (Món 4 — Được anh Quân thơm 1 cái & `+1 Lượt`)**: Uses the last turn (`1 -> 0`) then awards **`+1 Lượt gắp`** -> **`1` turn remaining**! Modal shows sweet pixel kiss reward *"Được anh Quân thơm 1 cái 😘"* and `+1 Lượt gắp` bonus badge.
  - **Catch 5 (Món 5 — Quà)**: Uses the bonus turn (`1 -> 0`). Opens Modal with Gift #3 image, title, and description from config.
- **Final Interactive Love Letter**:
  - Immediately when the Modal for **Catch 5 (Món 5)** is closed, a glowing pixel **Love Letter Envelope** floats into the center of the screen with heart particles.
  - Clicking/tapping the envelope animates the wax-heart seal opening and unfolds the scrollable/readable love letter populated from `src/config/clawConfig.ts`.
- **Smooth Animations Everywhere**:
  - Every action (4-way claw movement, cable extension, claw prongs opening/closing, box wobble, chute drop, turn badge `-1`/`+1` pop, prize box shaking & bursting open inside the modal, modal entrance/exit, envelope arrival & unfolding) is smoothly animated via GSAP / hardware-accelerated transforms.

### Non-Goals
- Backend server or database persistence (all state is client-side, configured via `src/config/clawConfig.ts`).

### Anti-Goals
- Never allow the player to run out of turns before opening all 5 scripted prizes (no wasted empty grabs).
- Never render blurry pixel art or clipped UI controls on small mobile viewports (`360x640` to `430x932`).

## 3. Technical Architecture & Configurability

- **Single Creator Config (`src/config/clawConfig.ts`)**:
  - `machineTitle`, `recipientName`, `senderName` ("anh Quân")
  - `initialTurns`: `5`
  - `prizes`: Array of 5 `ClawPrize` items (`id`, `order`, `kind`: `'gift' | 'kiss_penalty' | 'kiss_bonus'`, `title`, `subtitle`, `description`, `imageUrl`, `badgeText`, `turnDelta`)
  - `giftBoxes`: 15 initial `GiftBoxItem` entries positioned across `(x, z)` 2.5D coordinates with distinct pink/rose/gold/cream pixel palettes and ribbon styles
  - `loveLetter`: `envelopeLabel`, `title`, `greeting`, `paragraphs`, `signature`, `closingNote`
  - `audio`: background music file (`public/audio/...`) + synthesized 8-bit Web Audio SFX toggle
