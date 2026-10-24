<script setup lang="ts">
import { watch } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import type { ClawLoveLetterConfig, ClawPrize } from '@/types/claw'
import { playEnvelopeAppear, playLetterOpen } from '@/utils/pixelAudio'

const props = defineProps<{
  visible: boolean
  isLetterOpen: boolean
  letter: ClawLoveLetterConfig
  caughtPrizes?: ClawPrize[]
}>()

const emit = defineEmits<{
  (e: 'openLetter'): void
  (e: 'closeLetter'): void
  (e: 'replayGame'): void
}>()

const floatingHearts = [
  { id: 1, icon: '💖', tx: -85, ty: -145, rot: -22, delay: 0.25 },
  { id: 2, icon: '✨', tx: 90, ty: -140, rot: 24, delay: 0.3 },
  { id: 3, icon: '💕', tx: -42, ty: -165, rot: -14, delay: 0.28 },
  { id: 4, icon: '💗', tx: 48, ty: -160, rot: 18, delay: 0.32 },
  { id: 5, icon: '🌸', tx: -108, ty: -85, rot: -30, delay: 0.35 },
  { id: 6, icon: '✨', tx: 110, ty: -80, rot: 28, delay: 0.34 },
]

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible) {
      playEnvelopeAppear()
    }
  },
  { immediate: true }
)

function handleEnvelopeClick() {
  if (props.isLetterOpen) return
  playLetterOpen()
  emit('openLetter')
}
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="visible"
      key="love-letter-overlay"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 py-5 bg-[#3d0820]/80 backdrop-blur-md select-none"
      role="dialog"
      aria-modal="true"
      :aria-label="letter.title"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.25 }"
    >
      <!-- Main Container -->
      <motion.div
        class="relative z-10 w-full max-w-[350px] flex flex-col items-center"
        :initial="{ opacity: 0, scale: 0.55, y: 50 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.75, y: 30 }"
        :transition="{ type: 'spring', stiffness: 320, damping: 22 }"
      >
        <!-- Top Floating Badge (fades out softly when letter slides up) -->
        <motion.div
          class="mb-3 px-4 py-1 rounded-full bg-[#ffe47a] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] font-pixel text-lg font-bold text-[#8c1449]"
          :animate="
            isLetterOpen
              ? { opacity: 0, y: -20, scale: 0.85 }
              : { opacity: 1, y: [0, -5, 0], scale: 1 }
          "
          :transition="
            isLetterOpen
              ? { duration: 0.2 }
              : { y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }
          "
        >
          {{ letter.envelopeBadge }}
        </motion.div>

        <!-- ==================== INTERACTIVE ENVELOPE + SLIDING LETTER STAGE ==================== -->
        <!-- Extra top margin gives room for the open flap and rising letter -->
        <div
          class="relative w-[316px] h-[210px] mt-24 flex items-end justify-center"
          :class="!isLetterOpen ? 'cursor-pointer' : ''"
          style="perspective: 900px"
          @click="handleEnvelopeClick"
        >
          <!-- Glowing Pink Aura Behind Envelope -->
          <div
            class="absolute -inset-4 rounded-3xl bg-pink-400/30 blur-2xl animate-pulse pointer-events-none"
          />

          <!-- Bursting Hearts When Flap Opens & Letter Slides Out -->
          <div
            v-if="isLetterOpen"
            class="absolute left-1/2 top-1/3 -translate-x-1/2 pointer-events-none z-40"
          >
            <motion.span
              v-for="h in floatingHearts"
              :key="h.id"
              class="absolute left-0 top-0 text-xl"
              :initial="{ x: 0, y: 0, scale: 0, opacity: 1 }"
              :animate="{
                x: h.tx,
                y: h.ty,
                scale: [0, 1.3, 0.9],
                rotate: h.rot,
                opacity: [1, 1, 0],
              }"
              :transition="{ duration: 0.95, delay: h.delay, ease: 'easeOut' }"
            >
              {{ h.icon }}
            </motion.span>
          </div>

          <!-- 1. ENVELOPE BACK WALL (Inside of Pocket) -->
          <div
            class="absolute inset-0 rounded-2xl bg-[#ff85b3] border-4 border-[#8c1449] shadow-[0_10px_0_#8c1449] z-10"
          />

          <!-- 2. THE SLIDING LETTER SHEET (Lá thư chạy từ trong phong bì lên) -->
          <motion.div
            class="absolute left-3.5 right-3.5 bottom-3 rounded-2xl bg-gradient-to-b from-[#fffdfd] via-[#fff5f9] to-[#ffe6f1] border-4 border-[#8c1449] px-4 py-4 shadow-[0_6px_0_rgba(140,20,73,0.28)] z-20 text-center"
            :initial="false"
            :animate="
              isLetterOpen
                ? { y: -96, scale: 1, opacity: 1 }
                : { y: 18, scale: 0.92, opacity: 0 }
            "
            :transition="
              isLetterOpen
                ? {
                    type: 'spring',
                    stiffness: 190,
                    damping: 19,
                    delay: 0.28,
                  }
                : { duration: 0.22, ease: 'easeIn' }
            "
          >
            <!-- Top Corner Stamp & Title -->
            <div
              class="flex items-center justify-center gap-1.5 pb-2 border-b-2 border-dashed border-[#ff9ec7]"
            >
              <span class="text-base">💌</span>
              <h2 class="font-pixel text-xl leading-none font-bold text-[#8c1449]">
                {{ letter.title }}
              </h2>
            </div>

            <!-- Single-Line Sweet Message -->
            <p
              class="mt-3 font-sans text-sm sm:text-[15px] leading-relaxed font-bold text-[#591234]"
            >
              {{ letter.paragraphs[0] }}
            </p>

            <!-- Signature -->
            <div class="mt-2.5 text-right">
              <span class="font-pixel text-lg font-bold text-[#d92b76]">
                {{ letter.signature }}
              </span>
            </div>
          </motion.div>

          <!-- 3. ENVELOPE FRONT POCKET FOLDS (Covers the bottom of the letter so it emerges from inside) -->
          <div
            class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-30 border-4 border-[#8c1449]"
          >
            <svg
              class="w-full h-full"
              viewBox="0 0 316 210"
              preserveAspectRatio="none"
            >
              <!-- Left Fold Triangle -->
              <polygon
                points="0,0 158,115 0,210"
                fill="#ffd6e7"
                stroke="#8c1449"
                stroke-width="4"
              />
              <!-- Right Fold Triangle -->
              <polygon
                points="316,0 158,115 316,210"
                fill="#ffc2dc"
                stroke="#8c1449"
                stroke-width="4"
              />
              <!-- Bottom Pocket Flap -->
              <polygon
                points="0,210 158,102 316,210"
                fill="#fff0f6"
                stroke="#8c1449"
                stroke-width="4"
              />
            </svg>
          </div>

          <!-- 4. ENVELOPE TOP FLAP (Flips open 180deg before the letter slides out) -->
          <motion.div
            class="absolute top-0 inset-x-0 h-[118px] origin-top pointer-events-none"
            :style="{ zIndex: isLetterOpen ? 15 : 40 }"
            :initial="false"
            :animate="
              isLetterOpen
                ? { rotateX: 180 }
                : { rotateX: 0 }
            "
            :transition="{ duration: 0.34, ease: 'easeInOut' }"
          >
            <svg
              class="w-full h-full drop-shadow-[0_3px_0_rgba(140,20,73,0.25)]"
              viewBox="0 0 316 118"
              preserveAspectRatio="none"
            >
              <polygon
                points="2,2 314,2 158,112"
                fill="#ffb3d1"
                stroke="#8c1449"
                stroke-width="4"
                stroke-linejoin="round"
              />
            </svg>
          </motion.div>

          <!-- 5. WAX HEART SEAL + PROMPT (When Sealed) -->
          <AnimatePresence>
            <motion.div
              v-if="!isLetterOpen"
              key="wax-seal"
              class="absolute inset-0 z-40 flex flex-col items-center justify-center pt-6 pointer-events-none"
              :initial="{ scale: 0.8, opacity: 0 }"
              :animate="{ scale: [1, 1.08, 1], opacity: 1 }"
              :exit="{ scale: 1.4, opacity: 0 }"
              :transition="{
                scale: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
                default: { duration: 0.18 },
              }"
            >
              <!-- Pixel Heart Wax Seal -->
              <div
                class="w-14 h-14 rounded-full bg-[#ff2e7e] border-3 border-[#8c1449] shadow-[0_4px_0_#8c1449] flex items-center justify-center"
              >
                <span class="text-2xl">💖</span>
              </div>

              <div
                class="mt-5 px-3.5 py-1 rounded-xl bg-[#ff2e7e] border-2 border-[#8c1449] text-white font-pixel text-base tracking-wide shadow-[0_3px_0_#8c1449]"
              >
                💌 BẤM ĐỂ MỞ PHONG BÌ
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <!-- ==================== BOTTOM CONTROLS ==================== -->
        <div class="mt-5 w-full">
          <p
            v-if="!isLetterOpen"
            class="font-sans text-sm font-bold text-pink-100 text-center drop-shadow"
          >
            {{ letter.envelopePrompt }}
          </p>

          <motion.div
            v-else
            class="grid grid-cols-2 gap-2.5"
            :initial="{ opacity: 0, y: 12 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.45, duration: 0.25 }"
          >
            <motion.button
              type="button"
              class="py-2.5 px-3 rounded-xl bg-[#fff0f6] border-2 border-[#8c1449] shadow-[0_4px_0_#8c1449] font-pixel text-base font-bold text-[#8c1449] cursor-pointer"
              :while-hover="{ scale: 1.03 }"
              :while-tap="{ scale: 0.95, y: 2 }"
              @click="emit('closeLetter')"
            >
              ĐÓNG PHONG BÌ 💌
            </motion.button>
            <motion.button
              type="button"
              class="py-2.5 px-3 rounded-xl bg-gradient-to-b from-[#ff4d94] to-[#d92b76] border-2 border-[#8c1449] shadow-[0_4px_0_#8c1449] font-pixel text-base font-bold text-white cursor-pointer"
              :while-hover="{ scale: 1.03 }"
              :while-tap="{ scale: 0.95, y: 2 }"
              @click="emit('replayGame')"
            >
              CHƠI LẠI TỪ ĐẦU 🔄
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
</template>
