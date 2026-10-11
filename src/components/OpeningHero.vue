<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { giftConfig } from '@/config/giftData'
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { prefersReducedMotion } from '@/utils/motion'
import { Heart } from '@lucide/vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const emit = defineEmits<{
  (e: 'start'): void
}>()

const { startPlayback } = useAudioPlayer()
const isStarted = ref(false)

const heroContainer = ref<HTMLElement | null>(null)
const heartIcon = ref<HTMLElement | null>(null)
const recipientHeading = ref<HTMLElement | null>(null)
const dedicateLabel = ref<HTMLElement | null>(null)
const taglineText = ref<HTMLElement | null>(null)
const startBtn = ref<HTMLElement | null>(null)
const ambientGlowTop = ref<HTMLElement | null>(null)
const ambientGlowBottom = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null
let splitInstance: SplitText | null = null

onMounted(() => {
  if (prefersReducedMotion()) {
    return
  }

  ctx = gsap.context(() => {
    // Ambient subtle float on glow orbs
    gsap.to(ambientGlowTop.value, {
      scale: 1.15,
      x: 15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    gsap.to(ambientGlowBottom.value, {
      scale: 1.1,
      y: -15,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // Master Hero entrance timeline (BR-027, DEC-031)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 1. Central Heart icon container emergence with elastic pop
    tl.fromTo(
      heartIcon.value,
      { scale: 0, opacity: 0, rotation: -15 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.1, ease: 'elastic.out(1, 0.5)' }
    )

    // 2. Dedicate label subtle slide
    tl.fromTo(
      dedicateLabel.value,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.5'
    )

    // 3. Recipient name character reveal with SplitText
    if (recipientHeading.value) {
      splitInstance = new SplitText(recipientHeading.value, { type: 'words,chars' })
      tl.fromTo(
        splitInstance.chars,
        { opacity: 0, y: 24, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.035,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    }

    // 4. Tagline gentle reveal
    tl.fromTo(
      taglineText.value,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.3'
    )

    // 5. Start button enters with tactile pop
    tl.fromTo(
      startBtn.value,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    )
  }, heroContainer.value ?? undefined)
})

onUnmounted(() => {
  splitInstance?.revert()
  ctx?.revert()
})

async function handleStart() {
  if (isStarted.value) return // Prevent duplicate clicks (OQ-024, FR-004)
  isStarted.value = true

  // Request audio playback (FEAT-004, AC-002)
  await startPlayback()

  emit('start')

  // Smooth scroll down to the gallery
  const galleryEl = document.getElementById('gallery-section')
  if (galleryEl) {
    galleryEl.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section
    ref="heroContainer"
    class="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden max-w-mobile mx-auto"
  >
    <!-- Background subtle ambient glow with hardware acceleration -->
    <div
      ref="ambientGlowTop"
      class="absolute -top-20 -left-20 w-80 h-80 bg-romantic-200/35 rounded-full blur-3xl pointer-events-none transform-gpu"
    ></div>
    <div
      ref="ambientGlowBottom"
      class="absolute -bottom-20 -right-20 w-80 h-80 bg-romantic-300/25 rounded-full blur-3xl pointer-events-none transform-gpu"
    ></div>

    <!-- Central Hero Content -->
    <div class="flex flex-col items-center max-w-xs space-y-7 z-10">
      <!-- Heart Icon in Double-Bezel nested container with active heartbeat pulse -->
      <div
        ref="heartIcon"
        class="p-2 rounded-full bg-romantic-100/60 ring-1 ring-romantic-200/50 shadow-romantic-soft"
      >
        <div class="w-18 h-18 rounded-full bg-gradient-to-tr from-romantic-300 to-romantic-100 flex items-center justify-center shadow-inner">
          <Heart class="w-9 h-9 text-romantic-600 fill-romantic-500 animate-heartbeat" />
        </div>
      </div>

      <!-- Recipient Name Block (DATA-001, FR-001) -->
      <div class="space-y-2">
        <span
          ref="dedicateLabel"
          class="inline-block text-[11px] uppercase tracking-[0.2em] text-warm-700/70 font-semibold"
        >
          Dành riêng cho
        </span>
        <h1
          ref="recipientHeading"
          class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-romantic-900 leading-[1.15]"
        >
          {{ giftConfig.recipientName }}
        </h1>
      </div>

      <!-- Tagline / Subtitle -->
      <p
        ref="taglineText"
        class="text-sm text-warm-800/80 leading-relaxed font-light px-2"
      >
        {{ giftConfig.heroTagline }}
      </p>

      <!-- Start Button with Button-in-Button Architecture (FR-001, FR-002) -->
      <div ref="startBtn" class="pt-2">
        <button
          type="button"
          @click="handleStart"
          :disabled="isStarted"
          class="group relative inline-flex items-center gap-3.5 pl-7 pr-3 py-2.5 rounded-full bg-romantic-600 text-white font-medium text-sm shadow-romantic-soft transition-all duration-300 ease-smooth hover:bg-romantic-700 active:scale-[0.97] disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
        >
          <span class="tracking-wide">{{ giftConfig.startButtonText || 'Bắt đầu hành trình' }}</span>
          <!-- Nested circular icon pill -->
          <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ease-smooth group-hover:scale-110 group-hover:translate-x-0.5">
            <Heart class="w-3.5 h-3.5 fill-white text-white" />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
