<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import gsap from 'gsap'
import type { ClawPrize } from '@/types/claw'
import {
  playBonusSfx,
  playPenaltySfx,
  playPrizeWin,
} from '@/utils/pixelAudio'
import PixelGiftBoxSvg from './PixelGiftBoxSvg.vue'

const props = defineProps<{
  prize: ClawPrize | null
  turnsLeft: number
  isReplayView?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const backdropRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const boxStageRef = ref<HTMLElement | null>(null)
const revealContentRef = ref<HTMLElement | null>(null)
const isBoxOpened = ref(false)
const isClosing = ref(false)

watch(
  () => props.prize,
  async (newPrize) => {
    if (!newPrize) return
    isClosing.value = false
    isBoxOpened.value = Boolean(props.isReplayView)

    await nextTick()

    if (backdropRef.value) {
      gsap.fromTo(
        backdropRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.26, ease: 'power2.out' }
      )
    }

    if (cardRef.value) {
      gsap.fromTo(
        cardRef.value,
        { opacity: 0, scale: 0.72, y: 32 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.44,
          ease: 'back.out(1.65)',
        }
      )
    }

    if (props.isReplayView) {
      playPrizeWin()
      return
    }

    // Play exciting box shake -> pop open animation
    if (boxStageRef.value) {
      const tl = gsap.timeline({
        onComplete: () => {
          isBoxOpened.value = true
          if (newPrize.kind === 'kiss_penalty') {
            playPenaltySfx()
          } else if (newPrize.kind === 'kiss_bonus') {
            playBonusSfx()
          } else {
            playPrizeWin()
          }

          nextTick(() => {
            if (revealContentRef.value) {
              gsap.fromTo(
                revealContentRef.value,
                { opacity: 0, scale: 0.84, y: 14 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.42,
                  ease: 'back.out(1.7)',
                }
              )
            }
          })
        },
      })

      tl.fromTo(
        boxStageRef.value,
        { scale: 0.7, rotate: 0 },
        { scale: 1.08, duration: 0.2, ease: 'back.out(2)' }
      )
      tl.to(boxStageRef.value, { rotate: -10, duration: 0.065 })
      tl.to(boxStageRef.value, { rotate: 10, duration: 0.065 })
      tl.to(boxStageRef.value, { rotate: -8, duration: 0.065 })
      tl.to(boxStageRef.value, { rotate: 8, duration: 0.065 })
      tl.to(boxStageRef.value, {
        scale: 1.28,
        rotate: 0,
        duration: 0.14,
        ease: 'power2.out',
      })
    }
  },
  { immediate: true }
)

function handleClose() {
  if (isClosing.value) return
  isClosing.value = true

  const tl = gsap.timeline({
    onComplete: () => {
      isClosing.value = false
      emit('close')
    },
  })

  if (cardRef.value) {
    tl.to(
      cardRef.value,
      {
        opacity: 0,
        scale: 0.8,
        y: 24,
        duration: 0.24,
        ease: 'power2.in',
      },
      0
    )
  }

  if (backdropRef.value) {
    tl.to(
      backdropRef.value,
      {
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
      },
      0.04
    )
  }
}
</script>

<template>
  <div
    v-if="prize"
    class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
    role="dialog"
    aria-modal="true"
    :aria-label="prize.title"
  >
    <!-- Translucent Pink Backdrop -->
    <div
      ref="backdropRef"
      class="absolute inset-0 bg-[#4a0b26]/70 backdrop-blur-sm"
      @click="handleClose"
    />

    <!-- Pixel Modal Card -->
    <div
      ref="cardRef"
      class="relative z-10 w-full max-w-[370px] bg-gradient-to-b from-[#fff5f9] via-[#ffe6f1] to-[#ffcce2] border-4 border-[#8c1449] rounded-3xl p-4 shadow-[0_8px_0_#8c1449] text-center overflow-hidden"
    >
      <!-- Corner Pixel Sparkles -->
      <div class="absolute top-3 left-3 text-base animate-pulse">✨</div>
      <div class="absolute top-3 right-3 text-base animate-pulse">💖</div>

      <!-- Top Order Badge -->
      <div
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff2e7e] border-2 border-[#8c1449] text-white font-pixel text-base tracking-wide shadow-[0_2px_0_#8c1449]"
      >
        <span>{{ prize.badgeText }}</span>
      </div>

      <!-- Stage 1: Shaking Gift Box Before Pop -->
      <div
        v-if="!isBoxOpened"
        class="py-10 flex flex-col items-center justify-center"
      >
        <div ref="boxStageRef" class="p-3">
          <PixelGiftBoxSvg
            box-color="#ff4d94"
            ribbon-color="#ffe47a"
            accent-color="#b81d5c"
            :size="92"
            :highlighted="true"
          />
        </div>
        <p class="mt-3 font-pixel text-xl text-[#8c1449] animate-pulse">
          Đang mở hộp quà bí mật... ✨
        </p>
      </div>

      <!-- Stage 2: Revealed Prize Content -->
      <div v-else ref="revealContentRef" class="mt-3">
        <!-- Turn Modifier Alert Pill (-1 or +1 Turn) -->
        <div
          v-if="prize.turnDelta !== 0 && prize.turnDeltaLabel"
          class="mb-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl border-2 border-[#8c1449] font-pixel text-lg font-bold shadow-[0_3px_0_#8c1449] animate-bounce"
          :class="
            prize.turnDelta > 0
              ? 'bg-[#b8ffda] text-[#0b5e36]'
              : 'bg-[#ffe47a] text-[#8c1449]'
          "
        >
          <span>{{ prize.turnDelta > 0 ? '🎉 THƯỞNG:' : '😝 PHẠT YÊU:' }}</span>
          <span>{{ prize.turnDeltaLabel }}</span>
        </div>

        <!-- Visual Frame: Gift Photo OR Pixel Kiss Illustration -->
        <div
          class="relative mx-auto w-full max-w-[250px] rounded-2xl bg-white border-4 border-[#8c1449] p-2.5 shadow-[0_4px_0_#8c1449]"
        >
          <!-- Case A: Real Gift Item (Món 1, 3, 5) -->
          <template v-if="prize.kind === 'gift'">
            <div
              class="relative aspect-square w-full rounded-xl overflow-hidden bg-pink-100 border-2 border-pink-300"
            >
              <img
                v-if="prize.imageUrl"
                :src="prize.imageUrl"
                :alt="prize.title"
                class="w-full h-full object-cover"
              />
              <!-- Floating Gift Ribbon Tag -->
              <div
                class="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-lg bg-[#ffe47a] border-2 border-[#8c1449] font-pixel text-sm font-bold text-[#8c1449]"
              >
                🎁 QUÀ THẬT #{{ prize.order }}
              </div>
            </div>
          </template>

          <!-- Case B: Kiss Penalty (-1 Turn: Thơm anh Quân 1 cái) -->
          <template v-else-if="prize.kind === 'kiss_penalty'">
            <div
              class="aspect-square w-full rounded-xl bg-gradient-to-b from-[#ffd6e7] to-[#ff9ec7] border-2 border-[#ff4d94] flex flex-col items-center justify-center p-3 relative overflow-hidden"
            >
              <!-- Pixel Art Lip/Heart Emblem -->
              <svg
                width="96"
                height="88"
                viewBox="0 0 16 14"
                shape-rendering="crispEdges"
                class="drop-shadow-[0_4px_0_rgba(140,20,73,0.35)] animate-heartbeat"
              >
                <path
                  d="M3 1h3v1h1v1h2V2h1V1h3v1h1v2h1v3h-1v2h-2v2h-2v1H9v1H7v-1H5v-1H3V9H1V7H0V4h1V2h2V1z"
                  fill="#8c1449"
                />
                <path
                  d="M3 2h3v1h1v1h2V3h1V2h3v1h1v4h-1v2h-2v2H9v1H7v-1H5V9H3V7H2V3h1V2z"
                  fill="#ff2e7e"
                />
                <rect x="4" y="3" width="2" height="1" fill="#fff0f6" />
                <rect x="3" y="4" width="1" height="2" fill="#fff0f6" />
              </svg>
              <div class="mt-2 font-pixel text-2xl text-[#8c1449] font-bold">
                CHU MỎ LÊN NÀO! 💋
              </div>
              <div
                class="mt-1 px-2.5 py-0.5 rounded-full bg-[#8c1449] text-[#ffe47a] font-pixel text-sm"
              >
                Bị trừ 1 lượt gắp nha!
              </div>
            </div>
          </template>

          <!-- Case C: Kiss Bonus (+1 Turn: Được anh Quân thơm 1 cái) -->
          <template v-else>
            <div
              class="aspect-square w-full rounded-xl bg-gradient-to-b from-[#fff3b0] via-[#ffd6e7] to-[#ff9ec7] border-2 border-[#ff4d94] flex flex-col items-center justify-center p-3 relative overflow-hidden"
            >
              <!-- Twin Pixel Hearts + +1 UP Star -->
              <svg
                width="104"
                height="88"
                viewBox="0 0 18 15"
                shape-rendering="crispEdges"
                class="drop-shadow-[0_4px_0_rgba(140,20,73,0.35)] animate-heartbeat"
              >
                <path
                  d="M4 2h3v1h1v1h2V3h1V2h3v1h1v4h-1v2h-2v2h-2v2H8v-2H6V9H4V7H3V3h1V2z"
                  fill="#ff2e7e"
                />
                <rect x="5" y="3" width="2" height="1" fill="#ffffff" />
                <!-- Gold 1-UP Crown Top -->
                <path d="M6 0h2v1h2V0h2v2H6V0z" fill="#ff9f1c" />
              </svg>
              <div class="mt-2 font-pixel text-2xl text-[#8c1449] font-bold">
                ANH QUÂN THƠM EM 😘
              </div>
              <div
                class="mt-1 px-2.5 py-0.5 rounded-full bg-[#0b5e36] text-[#b8ffda] font-pixel text-sm"
              >
                +1 Lượt gắp cứu nguy!
              </div>
            </div>
          </template>
        </div>

        <!-- Prize Title & Subtitle -->
        <h2 class="mt-3 font-pixel text-2xl leading-tight font-bold text-[#8c1449]">
          {{ prize.title }}
        </h2>
        <p class="mt-0.5 font-sans text-xs font-bold text-[#d92b76]">
          {{ prize.subtitle }}
        </p>

        <!-- Description Box -->
        <div
          class="mt-2.5 bg-white/85 border-2 border-[#8c1449]/30 rounded-xl px-3 py-2 text-left"
        >
          <p class="font-sans text-xs leading-relaxed text-[#591234] font-semibold">
            {{ prize.description }}
          </p>
        </div>

        <!-- Action Button -->
        <button
          type="button"
          class="arcade-btn mt-3.5 w-full py-3 px-4 rounded-2xl bg-gradient-to-b from-[#ff4d94] to-[#d92b76] border-3 border-[#8c1449] shadow-[0_4px_0_#8c1449] font-pixel text-xl text-white tracking-wider flex items-center justify-center gap-2"
          @click="handleClose"
        >
          <span v-if="prize.order === 5 && !isReplayView">
            ĐÓNG & MỞ BỨC THƯ BÍ MẬT 💌
          </span>
          <span v-else-if="isReplayView">
            QUAY LẠI MÁY GẮP 💖
          </span>
          <span v-else>
            TIẾP TỤC GẮP QUÀ (CÒN {{ turnsLeft }} LƯỢT) 💖
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
