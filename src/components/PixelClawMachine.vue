<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import gsap from 'gsap'
import type { ClawDirection, ClawPhase } from '@/composables/useClawMachine'
import type { ClawPrize, GiftBoxItem } from '@/types/claw'
import {
  playClawDrop,
  playClawGrab,
  playMoveTick,
} from '@/utils/pixelAudio'
import PixelGiftBoxSvg from './PixelGiftBoxSvg.vue'

const props = defineProps<{
  machineTitle: string
  machineSubtitle: string
  turnsLeft: number
  caughtCount: number
  totalPrizes: number
  clawX: number
  clawZ: number
  phase: ClawPhase
  boxes: GiftBoxItem[]
  nearestBoxId: string | null
  activeBox: GiftBoxItem | null
  lastTurnDelta: -1 | 0 | 1
  turnDeltaTick: number
  caughtHistory: ClawPrize[]
}>()

const emit = defineEmits<{
  (e: 'move', direction: ClawDirection): void
  (e: 'grab'): void
  (e: 'grabAnimationComplete'): void
  (e: 'selectHistoryPrize', prize: ClawPrize): void
}>()

// Animated visual coordinates driven by GSAP for silky-smooth motion
const visualClawX = ref(props.clawX)
const visualClawZ = ref(props.clawZ)
const cableLengthPx = ref(18)
const prongAngleDeg = ref(12) // 4 = closed tight, 12 = relaxed, 26 = wide open
const clawSwayDeg = ref(0)

// Carried gift box state during lift -> chute -> drop choreography
const isCarryingBox = ref(false)
const carriedBoxDropOffsetY = ref(0)
const carriedBoxScale = ref(1)
const carriedBoxOpacity = ref(1)
const showChuteBurst = ref(false)

// Turn delta floating badge state
const floatingDeltaText = ref<string | null>(null)
const floatingDeltaPositive = ref(false)
const turnBadgeRef = ref<HTMLElement | null>(null)

let activeTimeline: gsap.core.Timeline | null = null
let holdInterval: ReturnType<typeof setInterval> | null = null
const activeDirection = ref<ClawDirection | null>(null)

// Sync claw horizontal & depth coordinates smoothly when user moves via 4-way D-Pad
watch(
  () => [props.clawX, props.clawZ] as const,
  ([newX, newZ]) => {
    if (props.phase === 'grabbing') return
    gsap.to(visualClawX, {
      value: newX,
      duration: 0.16,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    gsap.to(visualClawZ, {
      value: newZ,
      duration: 0.16,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    // Gentle pendulum sway when moving horizontally
    gsap.fromTo(
      clawSwayDeg,
      { value: newX > visualClawX.value ? -5 : 5 },
      { value: 0, duration: 0.35, ease: 'elastic.out(1.2, 0.4)', overwrite: 'auto' }
    )
  }
)

// Trigger floating -1 / +1 turn animation whenever turnDeltaTick increments
watch(
  () => props.turnDeltaTick,
  () => {
    if (props.lastTurnDelta === 0) return
    floatingDeltaPositive.value = props.lastTurnDelta > 0
    floatingDeltaText.value =
      props.lastTurnDelta > 0 ? '+1 LƯỢT GẮP 💖' : '-1 LƯỢT GẮP 💔'

    if (turnBadgeRef.value) {
      gsap.fromTo(
        turnBadgeRef.value,
        { scale: 1.35 },
        { scale: 1, duration: 0.45, ease: 'back.out(2.5)' }
      )
    }

    setTimeout(() => {
      floatingDeltaText.value = null
    }, 2400)
  }
)

// Run full GSAP Claw Grab Choreography when phase enters 'grabbing'
watch(
  () => props.phase,
  (newPhase) => {
    if (newPhase === 'grabbing' && props.activeBox) {
      runGrabChoreography(props.activeBox)
    }
  }
)

/**
 * 2.5D Perspective Helpers:
 * z = 0 is Front (closest to glass, lower on screen, larger scale, higher z-index)
 * z = 1 is Back (deep inside cabinet, higher on floor, smaller scale, lower z-index)
 */
function floorBottomPx(z: number): number {
  return Math.round(14 + z * 68)
}

function depthScale(z: number): number {
  return Number((1.05 - z * 0.22).toFixed(3))
}

function boxZIndex(z: number, isHighlighted: boolean): number {
  const base = Math.round((1 - z) * 30) + 10
  return isHighlighted ? base + 25 : base
}

const depthLabel = computed(() => {
  if (visualClawZ.value >= 0.68) return 'LỚP TRONG'
  if (visualClawZ.value >= 0.34) return 'LỚP GIỮA'
  return 'LỚP NGOÀI'
})

// Visible floor boxes (hide the active box once the claw clamps onto it)
const floorBoxes = computed(() =>
  props.boxes.filter(
    (box) =>
      !box.grabbed &&
      !(isCarryingBox.value && props.activeBox && box.id === props.activeBox.id)
  )
)

function runGrabChoreography(targetBox: GiftBoxItem) {
  if (activeTimeline) {
    activeTimeline.kill()
  }

  isCarryingBox.value = false
  carriedBoxDropOffsetY.value = 0
  carriedBoxScale.value = depthScale(targetBox.z)
  carriedBoxOpacity.value = 1
  showChuteBurst.value = false

  // Calculate how far the cable must extend to reach the box at its 2.5D depth z
  // Deeper boxes (z near 1) sit higher on the perspective floor; front boxes (z near 0) sit lower
  const targetDropLength = Math.round(136 - targetBox.z * 52)

  const tl = gsap.timeline({
    onComplete: () => {
      isCarryingBox.value = false
      emit('grabAnimationComplete')
    },
  })
  activeTimeline = tl

  // 1. Align claw to target box (x, z) and open prongs wide
  tl.to(
    visualClawX,
    {
      value: targetBox.x,
      duration: 0.26,
      ease: 'power2.out',
    },
    0
  )
  tl.to(
    visualClawZ,
    {
      value: targetBox.z,
      duration: 0.26,
      ease: 'power2.out',
    },
    0
  )
  tl.to(
    prongAngleDeg,
    {
      value: 26,
      duration: 0.24,
      ease: 'back.out(1.7)',
    },
    0
  )

  // 2. Drop cable down to the 2.5D floor depth of the target box
  tl.add(() => {
    playClawDrop()
  })
  tl.to(cableLengthPx, {
    value: targetDropLength,
    duration: 0.52,
    ease: 'power2.inOut',
  })

  // 3. Clamp prongs shut around the gift box & attach box to claw
  tl.add(() => {
    playClawGrab()
    isCarryingBox.value = true
  })
  tl.to(prongAngleDeg, {
    value: 5,
    duration: 0.18,
    ease: 'back.in(2)',
  })

  // 4. Exciting arcade suspense wobble before lifting
  tl.to(clawSwayDeg, { value: -6, duration: 0.07, ease: 'sine.inOut' })
  tl.to(clawSwayDeg, { value: 6, duration: 0.07, ease: 'sine.inOut' })
  tl.to(clawSwayDeg, { value: -4, duration: 0.06, ease: 'sine.inOut' })
  tl.to(clawSwayDeg, { value: 0, duration: 0.06, ease: 'sine.inOut' })

  // 5. Lift cable up with the caught gift box
  tl.to(cableLengthPx, {
    value: 22,
    duration: 0.48,
    ease: 'power2.inOut',
  })

  // 6. Carry box to front-left Prize Chute (x = 18%, z = 0.08)
  tl.to(
    visualClawX,
    {
      value: 18,
      duration: 0.46,
      ease: 'power2.inOut',
    },
    'carryToChute'
  )
  tl.to(
    visualClawZ,
    {
      value: 0.08,
      duration: 0.46,
      ease: 'power2.inOut',
    },
    'carryToChute'
  )
  tl.to(
    carriedBoxScale,
    {
      value: 1.02,
      duration: 0.46,
      ease: 'power2.inOut',
    },
    'carryToChute'
  )

  // 7. Release prongs & drop gift box into the illuminated Prize Chute
  tl.to(prongAngleDeg, {
    value: 25,
    duration: 0.16,
    ease: 'power2.out',
  })
  tl.add(() => {
    showChuteBurst.value = true
  })
  tl.to(
    carriedBoxDropOffsetY,
    {
      value: 125,
      duration: 0.34,
      ease: 'power2.in',
    },
    'dropInChute'
  )
  tl.to(
    carriedBoxOpacity,
    {
      value: 0,
      duration: 0.18,
      delay: 0.16,
    },
    'dropInChute'
  )
  tl.to(prongAngleDeg, {
    value: 12,
    duration: 0.18,
  })
}

function triggerMove(dir: ClawDirection) {
  if (props.phase !== 'idle') return
  playMoveTick()
  emit('move', dir)
}

function startHoldMove(dir: ClawDirection) {
  stopHoldMove()
  if (props.phase !== 'idle') return
  activeDirection.value = dir
  triggerMove(dir)
  holdInterval = setInterval(() => {
    if (props.phase !== 'idle') {
      stopHoldMove()
      return
    }
    triggerMove(dir)
  }, 85)
}

function stopHoldMove() {
  activeDirection.value = null
  if (holdInterval) {
    clearInterval(holdInterval)
    holdInterval = null
  }
}

function handleGrabPress() {
  stopHoldMove()
  if (props.phase !== 'idle' || props.turnsLeft <= 0) return
  emit('grab')
}

function handleKeyDown(e: KeyboardEvent) {
  if (props.phase !== 'idle') return
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    e.preventDefault()
    triggerMove('left')
  } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    e.preventDefault()
    triggerMove('right')
  } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
    e.preventDefault()
    triggerMove('in')
  } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
    e.preventDefault()
    triggerMove('out')
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault()
    handleGrabPress()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  stopHoldMove()
  window.removeEventListener('keydown', handleKeyDown)
  if (activeTimeline) activeTimeline.kill()
})
</script>

<template>
  <section
    class="relative z-10 w-full max-w-[410px] mx-auto flex flex-col items-center px-2.5 pt-1 pb-2 select-none"
    aria-label="Máy Gắp Quà Pixel Trái Tim"
  >
    <!-- ==================== 1. TOP CROWN & MARQUEE HEADER ==================== -->
    <div
      class="relative w-full bg-gradient-to-b from-[#ff7eb6] to-[#ff4d94] rounded-t-2xl border-4 border-[#8c1449] px-3 pt-2 pb-2.5 shadow-[0_4px_0_#8c1449]"
    >
      <!-- Decorative Top Pixel Heart Crown -->
      <div
        class=" -mt-5 mb-1 mx-auto w-fit px-3 py-0.5 bg-[#ffe47a] border-2 border-[#8c1449] rounded-full shadow-[0_2px_0_#8c1449] flex items-center gap-1.5"
      >
        <span class="text-xs">💖</span>
        <span class="font-pixel text-base leading-none tracking-wider text-[#8c1449] font-bold">
          {{ machineTitle }}
        </span>
        <span class="text-xs">💖</span>
      </div>

      <!-- Blinking Arcade LED Lights Row -->
      <div class="flex items-center justify-between px-1 mb-1">
        <span
          v-for="n in 9"
          :key="`led-${n}`"
          class="w-2 h-2 rounded-none border border-[#8c1449] animate-led-blink"
          :class="n % 2 === 0 ? 'bg-[#ffe47a]' : 'bg-[#fff0f6]'"
          :style="{ animationDelay: `${n * 0.14}s` }"
        />
      </div>

      <!-- Subtitle Banner -->
      <div
        class="bg-[#fff0f6] border-2 border-[#8c1449] rounded-lg px-2 py-1 text-center shadow-inner"
      >
        <p class="font-sans text-xs font-bold text-[#8c1449] truncate">
          {{ machineSubtitle }}
        </p>
      </div>

      <!-- Digital Status HUD: Turns Left + Depth Indicator + Caught Progress -->
      <div class="mt-2 grid grid-cols-3 gap-1.5 items-center">
        <!-- Turns Counter Badge -->
        <div
          ref="turnBadgeRef"
          class="relative bg-[#4a0b26] border-2 border-[#ffe47a] rounded-lg px-2 py-1 flex flex-col items-center justify-center"
        >
          <span class="font-pixel text-[11px] leading-none text-pink-200 uppercase">
            LƯỢT GẮP
          </span>
          <div class="flex items-center gap-1 mt-0.5">
            <span
              class="font-pixel text-2xl leading-none font-bold"
              :class="turnsLeft <= 1 ? 'text-[#ff5c8a] animate-pulse' : 'text-[#ffe47a]'"
            >
              {{ turnsLeft }}
            </span>
            <span class="text-xs">🪙</span>
          </div>

          <!-- Floating -1 / +1 Turn Delta Popup -->
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2 scale-75"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 -translate-y-3 scale-90"
          >
            <div
              v-if="floatingDeltaText"
              class="absolute -bottom-7 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-2 py-0.5 rounded border-2 border-[#8c1449] font-pixel text-sm font-bold shadow-md"
              :class="
                floatingDeltaPositive
                  ? 'bg-[#b8ffda] text-[#0b5e36]'
                  : 'bg-[#ffe066] text-[#8c1449]'
              "
            >
              {{ floatingDeltaText }}
            </div>
          </transition>
        </div>

        <!-- 2.5D Depth Layer HUD -->
        <div
          class="bg-[#4a0b26] border-2 border-[#ff85b3] rounded-lg px-2 py-1 flex flex-col items-center justify-center"
        >
          <span class="font-pixel text-[11px] leading-none text-pink-200 uppercase">
            VỊ TRÍ GẮP
          </span>
          <span class="font-pixel text-base leading-tight text-[#fff0f6] mt-0.5">
            {{ depthLabel }}
          </span>
        </div>

        <!-- Caught Prizes Progress -->
        <div
          class="bg-[#4a0b26] border-2 border-[#ff85b3] rounded-lg px-2 py-1 flex flex-col items-center justify-center"
        >
          <span class="font-pixel text-[11px] leading-none text-pink-200 uppercase">
            ĐÃ TRÚNG
          </span>
          <div class="flex items-center gap-0.5 mt-1">
            <span
              v-for="idx in totalPrizes"
              :key="`slot-${idx}`"
              class="text-[11px] leading-none transition-transform duration-300"
              :class="idx <= caughtCount ? 'scale-110 opacity-100' : 'opacity-30 grayscale'"
            >
              💖
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 2. 2.5D GLASS CLAW CABINET WINDOW ==================== -->
    <div
      class="relative w-full h-[300px] sm:h-[320px] bg-gradient-to-b from-[#fff5f9] via-[#ffe5f0] to-[#ffc2dc] border-x-4 border-[#8c1449] overflow-hidden"
    >
      <!-- Back Wall Decorative Pixel Heart Wallpaper -->
      <div
        class="absolute inset-0 opacity-30 pointer-events-none"
        style="
          background-image: radial-gradient(#ff4d94 1.5px, transparent 1.5px);
          background-size: 18px 18px;
        "
      />

      <!-- 2.5D Side Wall Perspective Lines -->
      <div
        class="absolute inset-x-3 top-3 bottom-[88px] border-2 border-dashed border-pink-300/70 rounded-lg pointer-events-none"
      />

      <!-- 2.5D Perspective Floor Stage (Back z=1 -> Front z=0) -->
      <div
        class="absolute inset-x-0 bottom-0 h-[96px] bg-gradient-to-b from-[#ff9ec7] via-[#ff7eb6] to-[#f0488c] border-t-2 border-[#d92b76]"
      >
        <!-- Perspective Depth Guide Lines (Back / Middle / Front) -->
        <div class="absolute inset-x-0 top-[22%] border-t border-dashed border-white/45" />
        <div class="absolute inset-x-0 top-[54%] border-t border-dashed border-white/55" />
        <div class="absolute inset-x-0 top-[82%] border-t border-white/40" />

        <!-- Perspective Diagonal Floor Grid Lines -->
        <div
          class="absolute inset-0 opacity-25"
          style="
            background-image: linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
            background-size: 20% 100%;
          "
        />
      </div>

      <!-- Front-Left Illuminated Prize Chute (Hố Nhận Quà) -->
      <div
        class="absolute left-2.5 bottom-2 w-[68px] h-[54px] rounded-lg bg-[#4a0b26] border-2 border-[#ffe47a] z-35 flex flex-col items-center justify-end pb-1 shadow-inner"
      >
        <div class="text-[10px] animate-bounce">⬇️</div>
        <span class="font-pixel text-[11px] leading-none text-[#ffe47a] tracking-wide">
          HỐ QUÀ
        </span>

        <!-- Heart Sparkle Burst when Box Drops in Chute -->
        <div
          v-if="showChuteBurst"
          class="absolute -top-5 inset-x-0 flex justify-center gap-1 animate-ping"
        >
          <span>💖</span>
          <span>✨</span>
          <span>🎁</span>
        </div>
      </div>

      <!-- ==================== TOP RAIL & 2.5D MOVING CLAW GANTRY ==================== -->
      <!-- Overhead Rail Bar (shifts subtly with depth z for 2.5D parallax) -->
      <div
        class="absolute inset-x-2 h-2.5 bg-[#d92b76] border-y-2 border-[#8c1449] transition-all duration-75"
        :style="{
          top: `${6 + Math.round((1 - visualClawZ) * 8)}px`,
          zIndex: 25,
        }"
      />

      <!-- Floor Target Shadow / Reticle at (visualClawX, visualClawZ) -->
      <div
        class="absolute -translate-x-1/2 pointer-events-none transition-transform duration-75"
        :style="{
          left: `${visualClawX}%`,
          bottom: `${floorBottomPx(visualClawZ) - 4}px`,
          transform: `translateX(-50%) scale(${depthScale(visualClawZ)})`,
          zIndex: 12,
        }"
      >
        <div
          class="w-12 h-4 rounded-full bg-[#8c1449]/35 border border-[#ffe47a] flex items-center justify-center shadow-[0_0_8px_rgba(255,228,122,0.8)]"
        >
          <span class="text-[9px] leading-none">🎯</span>
        </div>
      </div>

      <!-- Claw Carriage + Extendable Cable + 3-Prong Pixel Claw -->
      <div
        class="absolute -translate-x-1/2 pointer-events-none"
        :style="{
          left: `${visualClawX}%`,
          top: `${4 + Math.round((1 - visualClawZ) * 8)}px`,
          transform: `translateX(-50%) scale(${depthScale(visualClawZ)}) rotate(${clawSwayDeg}deg)`,
          transformOrigin: 'top center',
          zIndex: Math.round((1 - visualClawZ) * 30) + 28,
        }"
      >
        <!-- Top Carriage Motor Box -->
        <div
          class="w-9 h-4 mx-auto bg-[#ffe47a] border-2 border-[#8c1449] rounded-sm flex items-center justify-center shadow-sm"
        >
          <div class="w-4 h-1.5 bg-[#ff2e7e]" />
        </div>

        <!-- Extendable Pixel Cable -->
        <div
          class="w-1.5 mx-auto bg-gradient-to-b from-[#8c1449] to-[#591234] relative"
          :style="{ height: `${cableLengthPx}px` }"
        >
          <div
            class="absolute inset-y-0 left-0.5 w-0.5 bg-pink-200/50"
          />
        </div>

        <!-- Claw Hub & Articulated Left/Right Pixel Prongs -->
        <div class="relative w-14 h-12 mx-auto -mt-0.5 flex flex-col items-center">
          <!-- Heart Hub -->
          <div
            class="w-6 h-5 bg-[#ff2e7e] border-2 border-[#8c1449] rounded-sm flex items-center justify-center z-20 shadow-sm"
          >
            <div class="w-2 h-2 bg-[#ffe47a]" />
          </div>

          <!-- Left Prong -->
          <div
            class="absolute top-3 left-1 origin-top-right transition-transform duration-75"
            :style="{ transform: `rotate(${prongAngleDeg}deg)` }"
          >
            <svg width="20" height="28" viewBox="0 0 10 14" shape-rendering="crispEdges">
              <path
                d="M7 0h3v3H7v2H5v4h2v2h3v3H5v-2H3V9H1V4h2V2h4V0z"
                fill="#8c1449"
              />
              <path
                d="M7 1h2v2H6v2H4v4h2v2h3v1H6v-1H4V9H2V4h2V2h3V1z"
                fill="#ffe47a"
              />
            </svg>
          </div>

          <!-- Right Prong -->
          <div
            class="absolute top-3 right-1 origin-top-left transition-transform duration-75"
            :style="{ transform: `rotate(${-prongAngleDeg}deg)` }"
          >
            <svg width="20" height="28" viewBox="0 0 10 14" shape-rendering="crispEdges">
              <path
                d="M0 0h3v2h4v2h2v5H7v3H5v2H0v-3h3V9h2V5H3V3H0V0z"
                fill="#8c1449"
              />
              <path
                d="M1 1h2v1h3v2h2v5H6v2H4v1H1v-1h3V9h2V5H4V3H1V1z"
                fill="#ffe47a"
              />
            </svg>
          </div>

          <!-- Caught Box Riding Inside the Claw Prongs -->
          <div
            v-if="isCarryingBox && activeBox"
            class="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
            :style="{
              transform: `translate(-50%, ${carriedBoxDropOffsetY}px) scale(${carriedBoxScale})`,
              opacity: carriedBoxOpacity,
            }"
          >
            <PixelGiftBoxSvg
              :box-color="activeBox.boxColor"
              :ribbon-color="activeBox.ribbonColor"
              :accent-color="activeBox.accentColor"
              :size="44"
              :highlighted="true"
            />
          </div>
        </div>
      </div>

      <!-- ==================== 15 LAYERED PIXEL GIFT BOXES IN 2.5D ==================== -->
      <div
        v-for="box in floorBoxes"
        :key="box.id"
        class="absolute -translate-x-1/2 transition-all duration-200"
        :style="{
          left: `${box.x}%`,
          bottom: `${floorBottomPx(box.z)}px`,
          transform: `translateX(-50%) scale(${depthScale(box.z)}) rotate(${box.tilt}deg)`,
          zIndex: boxZIndex(box.z, box.id === nearestBoxId && phase === 'idle'),
        }"
      >
        <PixelGiftBoxSvg
          :box-color="box.boxColor"
          :ribbon-color="box.ribbonColor"
          :accent-color="box.accentColor"
          :size="44"
          :highlighted="box.id === nearestBoxId && phase === 'idle'"
        />
      </div>

      <!-- Arcade Cabinet Front Glass Reflection & Scanlines -->
      <div class="absolute inset-0 pixel-scanlines pointer-events-none z-40" />
      <div
        class="absolute -top-10 -left-12 w-28 h-[140%] bg-white/20 rotate-12 pointer-events-none z-40"
      />
    </div>

    <!-- ==================== 3. LOWER 4-WAY ARCADE CONTROL DECK ==================== -->
    <div
      class="relative w-full bg-gradient-to-b from-[#ff5c9e] to-[#d92b76] border-4 border-[#8c1449] rounded-b-2xl px-3 pt-2.5 pb-3 shadow-[0_6px_0_#8c1449]"
    >
      <!-- Control Deck Instruction Strip -->
      <div class="flex items-center justify-between mb-2 px-1">
        <span class="font-pixel text-sm text-[#fff0f6] tracking-wide">
          🎮 ĐIỀU KHIỂN 4 HƯỚNG (TRÁI / PHẢI / VÀO / RA)
        </span>
        <span class="font-pixel text-xs text-[#ffe47a]">
          CÒN {{ boxes.filter((b) => !b.grabbed).length }}/15 HỘP
        </span>
      </div>

      <div class="grid grid-cols-12 gap-2 items-center">
        <!-- 4-Way Pixel D-Pad (Left, Right, In ▲, Out ▼) -->
        <div class="col-span-7 flex flex-col items-center">
          <div class="grid grid-cols-3 gap-1.5 w-full max-w-[196px]">
            <!-- Row 1: Vào Trong (▲) -->
            <div />
            <button
              type="button"
              :disabled="phase !== 'idle'"
              aria-label="Di chuyển vào trong"
              class="arcade-btn h-11 rounded-lg bg-[#fff0f6] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] flex flex-col items-center justify-center active:bg-[#ffe47a] disabled:opacity-50"
              :class="activeDirection === 'in' ? 'bg-[#ffe47a] translate-y-0.5' : ''"
              @pointerdown.prevent="startHoldMove('in')"
              @pointerup="stopHoldMove"
              @pointerleave="stopHoldMove"
              @pointercancel="stopHoldMove"
            >
              <span class="text-xs leading-none text-[#8c1449] font-bold">▲</span>
              <span class="font-pixel text-[11px] leading-none text-[#8c1449] font-bold">
                VÀO
              </span>
            </button>
            <div />

            <!-- Row 2: Trái (◀) + Center Heart Pivot + Phải (▶) -->
            <button
              type="button"
              :disabled="phase !== 'idle'"
              aria-label="Di chuyển sang trái"
              class="arcade-btn h-11 rounded-lg bg-[#fff0f6] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] flex items-center justify-center gap-0.5 active:bg-[#ffe47a] disabled:opacity-50"
              :class="activeDirection === 'left' ? 'bg-[#ffe47a] translate-y-0.5' : ''"
              @pointerdown.prevent="startHoldMove('left')"
              @pointerup="stopHoldMove"
              @pointerleave="stopHoldMove"
              @pointercancel="stopHoldMove"
            >
              <span class="text-xs leading-none text-[#8c1449] font-bold">◀</span>
              <span class="font-pixel text-xs leading-none text-[#8c1449] font-bold">
                TRÁI
              </span>
            </button>

            <!-- D-Pad Center Pivot -->
            <div
              class="h-11 rounded-lg bg-[#8c1449] border-2 border-[#591234] flex items-center justify-center shadow-inner"
            >
              <span class="text-sm">💗</span>
            </div>

            <button
              type="button"
              :disabled="phase !== 'idle'"
              aria-label="Di chuyển sang phải"
              class="arcade-btn h-11 rounded-lg bg-[#fff0f6] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] flex items-center justify-center gap-0.5 active:bg-[#ffe47a] disabled:opacity-50"
              :class="activeDirection === 'right' ? 'bg-[#ffe47a] translate-y-0.5' : ''"
              @pointerdown.prevent="startHoldMove('right')"
              @pointerup="stopHoldMove"
              @pointerleave="stopHoldMove"
              @pointercancel="stopHoldMove"
            >
              <span class="font-pixel text-xs leading-none text-[#8c1449] font-bold">
                PHẢI
              </span>
              <span class="text-xs leading-none text-[#8c1449] font-bold">▶</span>
            </button>

            <!-- Row 3: Ra Ngoài (▼) -->
            <div />
            <button
              type="button"
              :disabled="phase !== 'idle'"
              aria-label="Di chuyển ra ngoài"
              class="arcade-btn h-11 rounded-lg bg-[#fff0f6] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] flex flex-col items-center justify-center active:bg-[#ffe47a] disabled:opacity-50"
              :class="activeDirection === 'out' ? 'bg-[#ffe47a] translate-y-0.5' : ''"
              @pointerdown.prevent="startHoldMove('out')"
              @pointerup="stopHoldMove"
              @pointerleave="stopHoldMove"
              @pointercancel="stopHoldMove"
            >
              <span class="font-pixel text-[11px] leading-none text-[#8c1449] font-bold">
                RA
              </span>
              <span class="text-xs leading-none text-[#8c1449] font-bold">▼</span>
            </button>
            <div />
          </div>
        </div>

        <!-- Big 3D Arcade GRAB Button -->
        <div class="col-span-5 flex flex-col items-center justify-center">
          <button
            type="button"
            :disabled="phase !== 'idle' || turnsLeft <= 0"
            class="arcade-btn relative w-full py-4 px-3 rounded-2xl bg-gradient-to-b from-[#ffe47a] via-[#ffca3a] to-[#ff9f1c] border-4 border-[#8c1449] shadow-[0_6px_0_#8c1449] flex flex-col items-center justify-center disabled:opacity-50"
            @click="handleGrabPress"
          >
            <!-- Top glossy pixel highlight -->
            <span
              class="absolute top-1.5 inset-x-3 h-1.5 rounded-full bg-white/60 pointer-events-none"
            />
            <span class="text-2xl leading-none mb-1">💝</span>
            <span
              class="font-pixel text-2xl leading-none font-bold text-[#8c1449] tracking-wider"
            >
              {{ phase === 'grabbing' ? 'ĐANG GẮP...' : 'GẮP QUÀ!' }}
            </span>
            <span class="font-sans text-[11px] font-bold text-[#8c1449]/85 mt-0.5">
              Chạm để thả cần
            </span>
          </button>
        </div>
      </div>

      <!-- Mini Collected Prizes Strip at Bottom of Cabinet -->
      <div
        v-if="caughtHistory.length > 0"
        class="mt-2.5 pt-2 border-t-2 border-[#8c1449]/30 flex items-center justify-between gap-1.5"
      >
        <span class="font-pixel text-xs text-[#fff0f6] shrink-0">
          GIỎ QUÀ CỦA EM:
        </span>
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            v-for="item in caughtHistory"
            :key="item.id"
            type="button"
            class="px-2 py-0.5 rounded-md bg-[#fff0f6] border border-[#8c1449] font-pixel text-xs text-[#8c1449] flex items-center gap-1 shrink-0 hover:bg-[#ffe47a] transition-colors"
            @click="emit('selectHistoryPrize', item)"
          >
            <span>
              {{
                item.kind === 'gift'
                  ? '🎁'
                  : item.kind === 'kiss_penalty'
                    ? '💋'
                    : '😘'
              }}
            </span>
            <span>Món #{{ item.order }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
