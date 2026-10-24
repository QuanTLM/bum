<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import gsap from 'gsap'
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

const overlayRef = ref<HTMLElement | null>(null)
const envelopeButtonRef = ref<HTMLElement | null>(null)
const letterCardRef = ref<HTMLElement | null>(null)
const isOpeningAnimation = ref(false)

watch(
  () => props.visible,
  async (isVisible) => {
    if (!isVisible) return
    playEnvelopeAppear()
    await nextTick()

    if (overlayRef.value) {
      gsap.fromTo(
        overlayRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
    }

    if (envelopeButtonRef.value && !props.isLetterOpen) {
      gsap.fromTo(
        envelopeButtonRef.value,
        { opacity: 0, scale: 0.45, y: 40, rotate: -6 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 0.6,
          ease: 'back.out(1.8)',
        }
      )
    }
  },
  { immediate: true }
)

watch(
  () => props.isLetterOpen,
  async (opened) => {
    if (!opened) return
    await nextTick()
    if (letterCardRef.value) {
      gsap.fromTo(
        letterCardRef.value,
        { opacity: 0, scale: 0.78, y: 36 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.55)',
        }
      )
    }
  }
)

function handleEnvelopeClick() {
  if (isOpeningAnimation.value) return
  isOpeningAnimation.value = true
  playLetterOpen()

  if (envelopeButtonRef.value) {
    const tl = gsap.timeline({
      onComplete: () => {
        isOpeningAnimation.value = false
        emit('openLetter')
      },
    })

    tl.to(envelopeButtonRef.value, {
      scale: 1.12,
      rotate: -3,
      duration: 0.12,
    })
    tl.to(envelopeButtonRef.value, {
      scale: 1.18,
      rotate: 3,
      duration: 0.12,
    })
    tl.to(envelopeButtonRef.value, {
      scale: 0.85,
      opacity: 0,
      y: -24,
      duration: 0.22,
      ease: 'power2.in',
    })
  } else {
    isOpeningAnimation.value = false
    emit('openLetter')
  }
}
</script>

<template>
  <div
    v-if="visible"
    ref="overlayRef"
    class="fixed inset-0 z-50 flex items-center justify-center px-4 py-5 bg-[#4a0b26]/75 backdrop-blur-md"
    role="dialog"
    aria-modal="true"
    :aria-label="letter.title"
  >
    <!-- ==================== STATE 1: SEALED PIXEL LOVE ENVELOPE ==================== -->
    <div
      v-if="!isLetterOpen"
      class="relative z-10 flex flex-col items-center text-center max-w-[350px] w-full"
    >
      <!-- Top Floating Badge -->
      <div
        class="mb-4 px-4 py-1 rounded-full bg-[#ffe47a] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] font-pixel text-lg font-bold text-[#8c1449]"
      >
        {{ letter.envelopeBadge }}
      </div>

      <!-- Clickable Pixel Art Envelope -->
      <button
        ref="envelopeButtonRef"
        type="button"
        aria-label="Mở bức thư tình yêu"
        class="group relative p-5 rounded-3xl bg-gradient-to-b from-[#fff5f9] to-[#ffc2dc] border-4 border-[#8c1449] shadow-[0_8px_0_#8c1449] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
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
          <!-- Outer Dark Pixel Border -->
          <rect x="1" y="2" width="26" height="17" fill="#8c1449" />
          <!-- Main Cream-Pink Envelope Body -->
          <rect x="2" y="3" width="24" height="15" fill="#fff0f6" />
          <!-- Bottom & Side Envelope Fold Shading -->
          <path
            d="M2 15h24v3H2v-3z"
            fill="#ffd6e7"
          />
          <path
            d="M2 4h2v1h2v1h2v1h2v1h8V7h2V6h2V5h2V4h2v2h-2v1h-2v1h-2v1h-2v1h-8V9H8V8H6V7H4V6H2V4z"
            fill="#ff85b3"
          />
          <!-- Top Flap Fill -->
          <path
            d="M3 3h22v2h-2v1h-2v1h-2v1h-2v1h-6V8H9V7H7V6H5V5H3V3z"
            fill="#ffc2dc"
          />

          <!-- Center Pixel Wax Heart Seal -->
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
          class="relative z-10 mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#ff2e7e] text-white font-pixel text-lg tracking-wide shadow-[0_2px_0_#8c1449] animate-bounce"
        >
          <span>💌 BẤM VÀO ĐỂ MỞ THƯ</span>
        </div>
      </button>

      <p class="mt-4 font-sans text-sm font-bold text-pink-100 drop-shadow">
        {{ letter.envelopePrompt }}
      </p>
    </div>

    <!-- ==================== STATE 2: UNFOLDED LOVE LETTER MODAL ==================== -->
    <div
      v-else
      ref="letterCardRef"
      class="relative z-10 w-full max-w-[390px] max-h-[88dvh] flex flex-col bg-gradient-to-b from-[#fff9fb] via-[#fff0f6] to-[#ffd9e8] border-4 border-[#8c1449] rounded-3xl p-4 sm:p-5 shadow-[0_8px_0_#8c1449] overflow-hidden"
    >
      <!-- Decorative Stationary Header -->
      <div class="flex items-center justify-between border-b-2 border-dashed border-[#ff85b3] pb-2.5">
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

        <p
          v-for="(para, index) in letter.paragraphs"
          :key="`para-${index}`"
          class="font-sans text-xs sm:text-sm leading-relaxed text-[#591234] font-semibold bg-white/80 rounded-xl p-3 border border-pink-200 shadow-sm"
        >
          {{ para }}
        </p>

        <!-- Signature Box -->
        <div
          class="pt-1 pb-2 flex flex-col items-end text-right"
        >
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
        <button
          type="button"
          class="arcade-btn py-2.5 px-3 rounded-xl bg-[#fff0f6] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] font-pixel text-base font-bold text-[#8c1449]"
          @click="emit('closeLetter')"
        >
          GẤP THƯ LẠI 💌
        </button>
        <button
          type="button"
          class="arcade-btn py-2.5 px-3 rounded-xl bg-gradient-to-b from-[#ff4d94] to-[#d92b76] border-2 border-[#8c1449] shadow-[0_3px_0_#8c1449] font-pixel text-base font-bold text-white"
          @click="emit('replayGame')"
        >
          CHƠI LẠI TỪ ĐẦU 🔄
        </button>
      </div>
    </div>
  </div>
</template>
