<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
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

const isBoxOpened = ref(false)
let openTimer: ReturnType<typeof setTimeout> | null = null

interface BurstParticle {
  id: number
  icon: string
  tx: number
  ty: number
  rot: number
  delay: number
}

const burstParticles: BurstParticle[] = [
  { id: 1, icon: '💖', tx: -115, ty: -95, rot: -28, delay: 0 },
  { id: 2, icon: '✨', tx: 118, ty: -90, rot: 32, delay: 0.03 },
  { id: 3, icon: '🎀', tx: -130, ty: -10, rot: -40, delay: 0.05 },
  { id: 4, icon: '💖', tx: 132, ty: -8, rot: 35, delay: 0.02 },
  { id: 5, icon: '⭐', tx: -95, ty: 88, rot: -22, delay: 0.06 },
  { id: 6, icon: '💝', tx: 102, ty: 85, rot: 25, delay: 0.04 },
  { id: 7, icon: '✨', tx: 0, ty: -128, rot: 15, delay: 0.01 },
  { id: 8, icon: '💗', tx: -58, ty: -118, rot: -18, delay: 0.04 },
  { id: 9, icon: '💗', tx: 62, ty: -115, rot: 20, delay: 0.05 },
  { id: 10, icon: '🌸', tx: -112, ty: 42, rot: -30, delay: 0.07 },
  { id: 11, icon: '🌸', tx: 114, ty: 44, rot: 30, delay: 0.07 },
  { id: 12, icon: '✨', tx: 0, ty: 110, rot: -12, delay: 0.03 },
]

watch(
  () => props.prize,
  (newPrize) => {
    if (openTimer) {
      clearTimeout(openTimer)
      openTimer = null
    }
    if (!newPrize) return

    if (props.isReplayView) {
      isBoxOpened.value = true
      playPrizeWin()
      return
    }

    isBoxOpened.value = false
    openTimer = setTimeout(() => {
      isBoxOpened.value = true
      if (newPrize.kind === 'kiss_penalty') {
        playPenaltySfx()
      } else if (newPrize.kind === 'kiss_bonus') {
        playBonusSfx()
      } else {
        playPrizeWin()
      }
    }, 620)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (openTimer) clearTimeout(openTimer)
})
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="prize"
      :key="`modal-${prize.id}`"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      :aria-label="prize.title"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.22 }"
    >
      <!-- Animated Translucent Blur Backdrop -->
      <motion.div
        class="absolute inset-0 bg-[#3d0820]/75 backdrop-blur-md"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        @click="emit('close')"
      />

      <!-- Main 3D Spring Modal Card -->
      <motion.div
        class="relative z-10 w-full max-w-[360px] bg-gradient-to-b from-[#fff7fa] via-[#ffe6f1] to-[#ffc4df] border-4 border-[#8c1449] rounded-[28px] p-4 shadow-[0_10px_0_#8c1449,0_20px_40px_rgba(74,11,38,0.45)] text-center overflow-hidden"
        :initial="{ opacity: 0, scale: 0.52, y: 65, rotate: -4 }"
        :animate="{ opacity: 1, scale: 1, y: 0, rotate: 0 }"
        :exit="{ opacity: 0, scale: 0.72, y: 36, rotate: 3 }"
        :transition="{ type: 'spring', stiffness: 360, damping: 23 }"
      >
        <!-- Rotating SSR Sunburst Rays Behind Prize -->
        <motion.div
          class="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none opacity-45"
          style="
            background: repeating-conic-gradient(
              from 0deg,
              rgba(255, 228, 122, 0.55) 0deg 15deg,
              transparent 15deg 30deg
            );
            border-radius: 50%;
          "
          :animate="{ rotate: 360 }"
          :transition="{ duration: 16, repeat: Infinity, ease: 'linear' }"
        />

        <!-- Soft Radial Glow Core -->
        <div
          class="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-white/70 blur-2xl pointer-events-none"
        />

        <!-- Corner Floating Decorations -->
        <motion.div
          class="absolute top-3 left-3.5 text-lg select-none pointer-events-none"
          :animate="{ rotate: [-12, 12, -12], scale: [0.95, 1.15, 0.95] }"
          :transition="{ duration: 2, repeat: Infinity, ease: 'easeInOut' }"
        >
          ✨
        </motion.div>
        <motion.div
          class="absolute top-3 right-3.5 text-lg select-none pointer-events-none"
          :animate="{ rotate: [12, -12, 12], scale: [1.1, 0.9, 1.1] }"
          :transition="{ duration: 2, repeat: Infinity, ease: 'easeInOut' }"
        >
          💖
        </motion.div>

        <!-- Top Order Ribbon Badge -->
        <motion.div
          class="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#ff2e7e] to-[#ff5c9e] border-2 border-[#8c1449] text-white font-pixel text-base tracking-wide shadow-[0_3px_0_#8c1449]"
          :initial="{ opacity: 0, y: -18, scale: 0.7 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ type: 'spring', stiffness: 420, damping: 20, delay: 0.05 }"
        >
          <span>{{ prize.badgeText }}</span>
        </motion.div>

        <!-- Two-Stage Unboxing -> Reveal Transition -->
        <AnimatePresence mode="wait">
          <!-- STAGE 1: Shaking Gift Box Before Pop -->
          <motion.div
            v-if="!isBoxOpened"
            key="stage-unboxing"
            class="relative z-10 py-12 flex flex-col items-center justify-center"
            :initial="{ opacity: 0, scale: 0.6 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 1.45 }"
            :transition="{ duration: 0.2 }"
          >
            <!-- Pulsing Ring Around Shaking Box -->
            <motion.div
              class="absolute w-32 h-32 rounded-full border-4 border-[#ffe47a]"
              :animate="{ scale: [0.8, 1.4], opacity: [0.9, 0] }"
              :transition="{ duration: 0.6, repeat: Infinity }"
            />

            <motion.div
              class="p-3"
              :animate="{
                rotate: [0, -14, 14, -12, 12, -8, 8, 0],
                scale: [0.85, 1.12, 1.15, 1.2, 1.28],
              }"
              :transition="{ duration: 0.58, ease: 'easeInOut' }"
            >
              <PixelGiftBoxSvg
                box-color="#ff4d94"
                ribbon-color="#ffe47a"
                accent-color="#b81d5c"
                :size="96"
                :highlighted="true"
              />
            </motion.div>
            <p class="mt-3 font-pixel text-xl text-[#8c1449] font-bold">
              Đang khui hộp quà... ✨
            </p>
          </motion.div>

          <!-- STAGE 2: Bursting Confetti + Revealed Prize Card -->
          <motion.div
            v-else
            key="stage-revealed"
            class="relative z-10 mt-3 flex flex-col items-center"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ duration: 0.18 }"
          >
            <!-- 360° Exploding Heart & Star Confetti Burst -->
            <div
              class="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
            >
              <motion.span
                v-for="p in burstParticles"
                :key="p.id"
                class="absolute left-0 top-0 text-xl select-none"
                :initial="{ x: 0, y: 0, scale: 0, opacity: 1 }"
                :animate="{
                  x: p.tx,
                  y: p.ty,
                  scale: [0, 1.35, 0.85],
                  rotate: p.rot,
                  opacity: [1, 1, 0],
                }"
                :transition="{
                  duration: 0.85,
                  delay: p.delay,
                  ease: 'easeOut',
                }"
              >
                {{ p.icon }}
              </motion.span>
            </div>

            <!-- Turn Modifier Alert Pill (-1 or +1 Turn) -->
            <motion.div
              v-if="prize.turnDelta !== 0 && prize.turnDeltaLabel"
              class="mb-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl border-2 border-[#8c1449] font-pixel text-lg font-bold shadow-[0_3px_0_#8c1449]"
              :class="
                prize.turnDelta > 0
                  ? 'bg-[#b8ffda] text-[#0b5e36]'
                  : 'bg-[#ffe47a] text-[#8c1449]'
              "
              :initial="{ scale: 0.4, opacity: 0, y: -12 }"
              :animate="{ scale: [1, 1.06, 1], opacity: 1, y: 0 }"
              :transition="{
                scale: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
                default: { type: 'spring', stiffness: 420, damping: 18 },
              }"
            >
              <span>{{ prize.turnDelta > 0 ? '🎉 THƯỞNG:' : '😝 PHẠT YÊU:' }}</span>
              <span>{{ prize.turnDeltaLabel }}</span>
            </motion.div>

            <!-- 3D Floating Prize Showcase Card -->
            <motion.div
              class="relative mx-auto w-full max-w-[238px] rounded-2xl bg-white border-4 border-[#8c1449] p-2.5 shadow-[0_6px_0_#8c1449]"
              :initial="{ scale: 0.45, rotate: -8, y: 24, opacity: 0 }"
              :animate="{ scale: 1, rotate: 0, y: [0, -5, 0], opacity: 1 }"
              :while-hover="{ scale: 1.03, rotate: 1 }"
              :while-tap="{ scale: 0.97 }"
              :transition="{
                y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                default: { type: 'spring', stiffness: 320, damping: 18 },
              }"
            >
              <!-- Case A: Real Gift Item (Món 1, 3, 5) -->
              <template v-if="prize.kind === 'gift'">
                <div
                  class="relative aspect-square w-full rounded-xl overflow-hidden bg-pink-50 border-2 border-pink-200"
                >
                  <img
                    v-if="prize.imageUrl"
                    :src="prize.imageUrl"
                    :alt="prize.title"
                    class="w-full h-full object-cover"
                  />
                  <!-- Floating Gift Ribbon Tag -->
                  <div
                    class="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-lg bg-[#ffe47a] border-2 border-[#8c1449] font-pixel text-sm font-bold text-[#8c1449] shadow-[0_2px_0_#8c1449]"
                  >
                    🎁 QUÀ #{{ prize.order }}
                  </div>
                </div>
              </template>

              <!-- Case B: Kiss Penalty (-1 Turn: Thơm anh Quân 1 cái) -->
              <template v-else-if="prize.kind === 'kiss_penalty'">
                <div
                  class="aspect-square w-full rounded-xl bg-gradient-to-b from-[#ffd6e7] to-[#ff9ec7] border-2 border-[#ff4d94] flex flex-col items-center justify-center p-3 relative overflow-hidden"
                >
                  <motion.div
                    :animate="{ scale: [1, 1.16, 1], rotate: [-4, 4, -4] }"
                    :transition="{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }"
                  >
                    <svg
                      width="94"
                      height="84"
                      viewBox="0 0 16 14"
                      shape-rendering="crispEdges"
                      class="drop-shadow-[0_4px_0_rgba(140,20,73,0.35)]"
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
                  </motion.div>
                  <div class="mt-2 font-pixel text-2xl text-[#8c1449] font-bold">
                    CHU MỎ LÊN NÀO! 💋
                  </div>
                  <div
                    class="mt-1 px-2.5 py-0.5 rounded-full bg-[#8c1449] text-[#ffe47a] font-pixel text-sm"
                  >
                    Thơm 1 cái + Trừ 1 lượt!
                  </div>
                </div>
              </template>

              <!-- Case C: Kiss Bonus (+1 Turn: Được anh Quân thơm 1 cái) -->
              <template v-else>
                <div
                  class="aspect-square w-full rounded-xl bg-gradient-to-b from-[#fff3b0] via-[#ffd6e7] to-[#ff9ec7] border-2 border-[#ff4d94] flex flex-col items-center justify-center p-3 relative overflow-hidden"
                >
                  <motion.div
                    :animate="{ scale: [1, 1.16, 1], y: [0, -4, 0] }"
                    :transition="{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }"
                  >
                    <svg
                      width="100"
                      height="84"
                      viewBox="0 0 18 15"
                      shape-rendering="crispEdges"
                      class="drop-shadow-[0_4px_0_rgba(140,20,73,0.35)]"
                    >
                      <path
                        d="M4 2h3v1h1v1h2V3h1V2h3v1h1v4h-1v2h-2v2h-2v2H8v-2H6V9H4V7H3V3h1V2z"
                        fill="#ff2e7e"
                      />
                      <rect x="5" y="3" width="2" height="1" fill="#ffffff" />
                      <path d="M6 0h2v1h2V0h2v2H6V0z" fill="#ff9f1c" />
                    </svg>
                  </motion.div>
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
            </motion.div>

            <!-- Prize Title & Subtitle (Clean, No Long White Text Box) -->
            <motion.div
              class="mt-3.5 px-2"
              :initial="{ opacity: 0, y: 14 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ type: 'spring', stiffness: 340, damping: 22, delay: 0.1 }"
            >
              <h2 class="font-pixel text-2xl sm:text-[26px] leading-tight font-bold text-[#8c1449]">
                {{ prize.title }}
              </h2>
              <p class="mt-1 font-sans text-xs font-bold text-[#d92b76]">
                {{ prize.subtitle }}
              </p>
            </motion.div>

            <!-- Interactive Motion CTA Button -->
            <motion.button
              type="button"
              class="relative mt-4 w-full py-3 px-4 rounded-2xl bg-gradient-to-b from-[#ff4d94] to-[#d92b76] border-3 border-[#8c1449] shadow-[0_5px_0_#8c1449] font-pixel text-xl text-white tracking-wider flex items-center justify-center gap-2 overflow-hidden cursor-pointer"
              :initial="{ opacity: 0, y: 16, scale: 0.9 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :while-hover="{ scale: 1.03, y: -1 }"
              :while-tap="{ scale: 0.95, y: 3 }"
              :transition="{ type: 'spring', stiffness: 420, damping: 22, delay: 0.15 }"
              @click="emit('close')"
            >
              <span v-if="prize.order === 5 && !isReplayView">
                MỞ BỨC THƯ BÍ MẬT 💌
              </span>
              <span v-else-if="isReplayView">
                QUAY LẠI MÁY GẮP 💖
              </span>
              <span v-else>
                TIẾP TỤC BẤM QUÀ 💖
              </span>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  </AnimatePresence>
</template>
