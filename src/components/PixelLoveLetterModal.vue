<script setup lang="ts">
import { watch } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import type { ClawLoveLetterConfig, ClawPrize } from '@/types/claw'
import { playEnvelopeAppear, playLetterOpen } from '@/utils/pixelAudio'

const props = defineProps<{
  visible: boolean
  isLetterOpen: boolean
  letter: ClawLoveLetterConfig
  caughtPrizes: ClawPrize[]
}>()

const emit = defineEmits<{
  (e: 'openLetter'): void
  (e: 'closeLetter'): void
  (e: 'replayGame'): void
}>()

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
  playLetterOpen()
  emit('openLetter')
}
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="visible"
      key="love-letter-overlay"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 py-5 bg-[#3d0820]/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      :aria-label="letter.title"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.25 }"
    >
      <AnimatePresence mode="wait">
        <!-- ==================== STATE 1: SEALED PIXEL LOVE ENVELOPE ==================== -->
        <motion.div
          v-if="!isLetterOpen"
          key="envelope-sealed"
          class="relative z-10 flex flex-col items-center text-center max-w-[350px] w-full"
          :initial="{ opacity: 0, scale: 0.45, y: 55, rotate: -6 }"
          :animate="{ opacity: 1, scale: 1, y: 0, rotate: 0 }"
          :exit="{ opacity: 0, scale: 1.25, y: -30, rotate: 4 }"
          :transition="{ type: 'spring', stiffness: 340, damping: 20 }"
        >
          <!-- Top Floating Badge -->
          <motion.div
            class="mb-4 px-4 py-1 rounded-full bg-[#ffe47a] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] font-pixel text-lg font-bold text-[#8c1449]"
            :animate="{ y: [0, -5, 0] }"
            :transition="{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }"
          >
            {{ letter.envelopeBadge }}
          </motion.div>

          <!-- Clickable Pixel Art Envelope -->
          <motion.button
            type="button"
            aria-label="Mở bức thư tình yêu"
            class="group relative p-5 rounded-3xl bg-gradient-to-b from-[#fff5f9] to-[#ffc2dc] border-4 border-[#8c1449] shadow-[0_10px_0_#8c1449] cursor-pointer"
            :animate="{ y: [0, -6, 0], rotate: [-1.5, 1.5, -1.5] }"
            :while-hover="{ scale: 1.06 }"
            :while-tap="{ scale: 0.93 }"
            :transition="{
              y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
              default: { type: 'spring', stiffness: 400, damping: 20 },
            }"
            @click="handleEnvelopeClick"
          >
            <!-- Glowing Halo -->
            <div
              class="absolute -inset-3 rounded-3xl bg-pink-400/30 blur-xl animate-pulse pointer-events-none"
            />

            <!-- Crisp Pixel Envelope SVG -->
            <svg
              width="190"
              height="136"
              viewBox="0 0 28 20"
              shape-rendering="crispEdges"
              class="relative z-10 mx-auto drop-shadow-[0_4px_0_rgba(140,20,73,0.3)]"
            >
              <rect x="1" y="2" width="26" height="17" fill="#8c1449" />
              <rect x="2" y="3" width="24" height="15" fill="#fff0f6" />
              <path d="M2 15h24v3H2v-3z" fill="#ffd6e7" />
              <path
                d="M2 4h2v1h2v1h2v1h2v1h8V7h2V6h2V5h2V4h2v2h-2v1h-2v1h-2v1h-2v1h-8V9H8V8H6V7H4V6H2V4z"
                fill="#ff85b3"
              />
              <path
                d="M3 3h22v2h-2v1h-2v1h-2v1h-2v1h-6V8H9V7H7V6H5V5H3V3z"
                fill="#ffc2dc"
              />
              <path
                d="M11 7h2v1h2V7h2v1h1v3h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-1V8h1V7z"
                fill="#8c1449"
              />
              <path
                d="M11 8h2v1h2V8h2v2h-1v1h-1v1h-2v-1h-1v-1h-1V8z"
                fill="#ff2e7e"
              />
              <rect x="11" y="8" width="1" height="1" fill="#ffffff" />
            </svg>

            <!-- Prompt inside button -->
            <div
              class="relative z-10 mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#ff2e7e] text-white font-pixel text-lg tracking-wide shadow-[0_2px_0_#8c1449]"
            >
              <span>💌 BẤM VÀO ĐỂ MỞ THƯ</span>
            </div>
          </motion.button>

          <p class="mt-4 font-sans text-sm font-bold text-pink-100 drop-shadow">
            {{ letter.envelopePrompt }}
          </p>
        </motion.div>

        <!-- ==================== STATE 2: UNFOLDED LOVE LETTER MODAL ==================== -->
        <motion.div
          v-else
          key="envelope-opened"
          class="relative z-10 w-full max-w-[390px] max-h-[88dvh] flex flex-col bg-gradient-to-b from-[#fff9fb] via-[#fff0f6] to-[#ffd9e8] border-4 border-[#8c1449] rounded-3xl p-4 sm:p-5 shadow-[0_10px_0_#8c1449] overflow-hidden"
          :initial="{ opacity: 0, scale: 0.65, y: 45 }"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.8, y: 25 }"
          :transition="{ type: 'spring', stiffness: 340, damping: 23 }"
        >
          <!-- Decorative Stationary Header -->
          <div
            class="flex items-center justify-between border-b-2 border-dashed border-[#ff85b3] pb-2.5"
          >
            <div class="flex items-center gap-2">
              <span class="text-xl">💌</span>
              <h2 class="font-pixel text-2xl leading-none font-bold text-[#8c1449]">
                {{ letter.title }}
              </h2>
            </div>
            <span
              class="px-2 py-0.5 rounded-md bg-[#ffe47a] border border-[#8c1449] font-pixel text-xs text-[#8c1449] font-bold"
            >
              5/5 MÓN QUÀ
            </span>
          </div>

          <!-- Scrollable Letter Content -->
          <div class="mt-3 overflow-y-auto pr-1 space-y-3 text-left no-scrollbar">
            <p class="font-sans text-sm font-bold text-[#d92b76]">
              {{ letter.greeting }}
            </p>

            <motion.p
              v-for="(para, index) in letter.paragraphs"
              :key="`para-${index}`"
              class="font-sans text-xs sm:text-sm leading-relaxed text-[#591234] font-semibold bg-white/85 rounded-xl p-3 border border-pink-200 shadow-sm"
              :initial="{ opacity: 0, y: 14 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{
                type: 'spring',
                stiffness: 320,
                damping: 24,
                delay: 0.08 * (index + 1),
              }"
            >
              {{ para }}
            </motion.p>

            <!-- Signature Box -->
            <div class="pt-1 pb-2 flex flex-col items-end text-right">
              <p class="font-pixel text-xl font-bold text-[#8c1449]">
                {{ letter.signature }}
              </p>
              <span class="font-sans text-[11px] font-semibold text-[#d92b76]">
                {{ letter.dateNote }}
              </span>
            </div>

            <!-- Summary of 5 Prizes Caught -->
            <div class="rounded-2xl bg-[#ffe6f1] border-2 border-[#8c1449] p-2.5">
              <div class="font-pixel text-sm font-bold text-[#8c1449] mb-1.5 text-center">
                🎁 TỔNG KẾT 5 PHẦN THƯỞNG CỦA EM 🎁
              </div>
              <div class="grid grid-cols-1 gap-1">
                <div
                  v-for="prize in caughtPrizes"
                  :key="prize.id"
                  class="flex items-center gap-2 bg-white rounded-lg px-2.5 py-1 border border-pink-300 text-xs font-bold text-[#591234]"
                >
                  <span>
                    {{
                      prize.kind === 'gift'
                        ? '🎁'
                        : prize.kind === 'kiss_penalty'
                          ? '💋'
                          : '😘'
                    }}
                  </span>
                  <span class="font-pixel text-sm text-[#d92b76] shrink-0">
                    Món #{{ prize.order }}:
                  </span>
                  <span class="truncate">{{ prize.title }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="mt-3 pt-2 border-t-2 border-pink-200 grid grid-cols-2 gap-2">
            <motion.button
              type="button"
              class="py-2.5 px-3 rounded-xl bg-[#fff0f6] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] font-pixel text-base font-bold text-[#8c1449] cursor-pointer"
              :while-hover="{ scale: 1.03 }"
              :while-tap="{ scale: 0.95, y: 2 }"
              @click="emit('closeLetter')"
            >
              GẤP THƯ LẠI 💌
            </motion.button>
            <motion.button
              type="button"
              class="py-2.5 px-3 rounded-xl bg-gradient-to-b from-[#ff4d94] to-[#d92b76] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] font-pixel text-base font-bold text-white cursor-pointer"
              :while-hover="{ scale: 1.03 }"
              :while-tap="{ scale: 0.95, y: 2 }"
              @click="emit('replayGame')"
            >
              CHƠI LẠI TỪ ĐẦU 🔄
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  </AnimatePresence>
</template>
