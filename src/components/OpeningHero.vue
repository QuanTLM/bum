<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { giftConfig } from '@/config/giftData'
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { Heart, Sparkles, ChevronDown } from '@lucide/vue'
import gsap from 'gsap'

const emit = defineEmits<{
  (e: 'start'): void
}>()

const { startPlayback } = useAudioPlayer()
const isStarted = ref(false)
const heroContainer = ref<HTMLElement | null>(null)
const heartIcon = ref<HTMLElement | null>(null)
const recipientText = ref<HTMLElement | null>(null)
const taglineText = ref<HTMLElement | null>(null)
const startBtn = ref<HTMLElement | null>(null)

onMounted(() => {
  // Respect prefers-reduced-motion (US-009, DEC-037)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    gsap.set([heartIcon.value, recipientText.value, taglineText.value, startBtn.value], {
      opacity: 1,
      y: 0,
      scale: 1,
    })
    return
  }

  // Standout Opening Animation (BR-027, DEC-031)
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.fromTo(
    heartIcon.value,
    { scale: 0, opacity: 0, rotation: -20 },
    { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
  )
    .fromTo(
      recipientText.value,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 },
      '-=0.6'
    )
    .fromTo(
      taglineText.value,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    )
    .fromTo(
      startBtn.value,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
      '-=0.4'
    )
})

async function handleStart() {
  if (isStarted.value) return // Prevent multiple duplicate triggers (OQ-024, FR-004)
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
    class="min-h-screen flex flex-col items-center justify-between px-6 py-12 text-center relative overflow-hidden max-w-mobile mx-auto"
  >
    <!-- Background subtle ambient glow -->
    <div class="absolute -top-24 -left-24 w-72 h-72 bg-romantic-200/40 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -right-24 w-72 h-72 bg-romantic-300/30 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Header tag -->
    <div class="w-full pt-6 flex justify-center items-center gap-1.5 text-romantic-600 text-xs font-medium tracking-widest uppercase">
      <Sparkles class="w-3.5 h-3.5" />
      <span>A special gift for you</span>
    </div>

    <!-- Central Hero Content -->
    <div class="my-auto flex flex-col items-center max-w-xs space-y-6">
      <!-- Heart Icon with gentle breathing pulse -->
      <div ref="heartIcon" class="relative">
        <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-romantic-300 to-romantic-100 flex items-center justify-center shadow-lg shadow-romantic-200/50">
          <Heart class="w-10 h-10 text-romantic-600 fill-romantic-500 animate-pulse" />
        </div>
      </div>

      <!-- Recipient Name (DATA-001, FR-001) -->
      <div ref="recipientText" class="space-y-2">
        <span class="text-xs uppercase tracking-widest text-warm-800/60 font-semibold">Dành riêng cho</span>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-romantic-900 leading-tight">
          {{ giftConfig.recipientName }}
        </h1>
      </div>

      <!-- Tagline / Subtitle -->
      <p ref="taglineText" class="text-sm text-warm-800/80 leading-relaxed font-light px-2">
        {{ giftConfig.heroTagline }}
      </p>

      <!-- Start Button (FR-001, FR-002) -->
      <div ref="startBtn" class="pt-4">
        <button
          type="button"
          @click="handleStart"
          :disabled="isStarted"
          class="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-romantic-600 text-white font-medium text-sm shadow-md shadow-romantic-500/25 transition-all duration-300 hover:bg-romantic-700 active:scale-95 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
        >
          <span>{{ giftConfig.startButtonText || 'Bắt đầu hành trình' }}</span>
          <Heart class="w-4 h-4 fill-white/80 transition-transform group-hover:scale-125" />
        </button>
      </div>
    </div>

    <!-- Scroll down prompt -->
    <div class="w-full pb-2 flex flex-col items-center text-warm-800/40 text-xs gap-1">
      <span class="tracking-wider">Cuộn xuống để khám phá</span>
      <ChevronDown class="w-4 h-4 animate-bounce" />
    </div>
  </section>
</template>
