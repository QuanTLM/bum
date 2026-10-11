<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { giftConfig } from '@/config/giftData'
import { Heart, Sparkles } from '@lucide/vue'
import { prefersReducedMotion } from '@/utils/motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionRef = ref<HTMLElement | null>(null)
const haloGlow = ref<HTMLElement | null>(null)
const heartIcon = ref<HTMLElement | null>(null)
const headlineEl = ref<HTMLElement | null>(null)
const subheadlineEl = ref<HTMLElement | null>(null)
const closingEl = ref<HTMLElement | null>(null)
const footerCredits = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null
let splitInstance: SplitText | null = null

onMounted(() => {
  if (prefersReducedMotion()) return

  ctx = gsap.context(() => {
    // 1. Halo glow gentle continuous ambient breath
    gsap.to(haloGlow.value, {
      scale: 1.2,
      opacity: 0.6,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // 2. Master reveal timeline with ScrollTrigger (DEC-022, FR-022)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      defaults: { ease: 'power3.out' },
    })

    // Heart icon reveal
    tl.fromTo(
      heartIcon.value,
      { scale: 0, opacity: 0, rotation: -20 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.7)' }
    )

    // Headline word-by-word reveal (SplitText)
    if (headlineEl.value) {
      splitInstance = new SplitText(headlineEl.value, { type: 'words' })
      tl.fromTo(
        splitInstance.words,
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    }

    // Subheadline gentle fade up
    if (subheadlineEl.value) {
      tl.fromTo(
        subheadlineEl.value,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
    }

    // Closing thought reveal
    if (closingEl.value) {
      tl.fromTo(
        closingEl.value,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        '-=0.2'
      )
    }

    // Footer credits reveal
    if (footerCredits.value) {
      tl.fromTo(
        footerCredits.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      )
    }
  }, sectionRef.value ?? undefined)
})

onUnmounted(() => {
  splitInstance?.revert()
  ctx?.revert()
})
</script>

<template>
  <section
    id="final-message-section"
    ref="sectionRef"
    class="py-28 px-6 max-w-mobile mx-auto text-center relative overflow-hidden"
  >
    <!-- Background subtle soft halo with compositor-only scale animation -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        ref="haloGlow"
        class="w-72 h-72 bg-romantic-200/40 rounded-full blur-3xl transform-gpu"
      ></div>
    </div>

    <!-- Final Message Content (DATA-004, FR-021, FR-022) -->
    <div class="relative z-10 flex flex-col items-center space-y-6">
      <!-- Heart icon in nested pill with active heartbeat pulse -->
      <div
        ref="heartIcon"
        class="p-2 rounded-full bg-romantic-100/70 ring-1 ring-romantic-200/60 shadow-romantic-soft"
      >
        <div class="w-14 h-14 rounded-full bg-romantic-100 flex items-center justify-center text-romantic-600 shadow-inner">
          <Heart class="w-7 h-7 fill-romantic-500 text-romantic-600 animate-heartbeat" />
        </div>
      </div>

      <!-- Main Headline with SplitText words -->
      <h2
        ref="headlineEl"
        class="font-serif text-2xl sm:text-3xl font-bold text-romantic-900 leading-[1.25] tracking-tight"
      >
        {{ giftConfig.finalMessage.headline }}
      </h2>

      <!-- Subheadline -->
      <p
        v-if="giftConfig.finalMessage.subheadline"
        ref="subheadlineEl"
        class="text-sm text-warm-700/80 font-light max-w-xs leading-relaxed"
      >
        {{ giftConfig.finalMessage.subheadline }}
      </p>

      <!-- Closing thought -->
      <div
        v-if="giftConfig.finalMessage.closingThought"
        ref="closingEl"
        class="pt-3 flex items-center justify-center gap-2 text-xs font-serif italic text-romantic-800/90"
      >
        <Sparkles class="w-3.5 h-3.5 text-romantic-500" />
        <span>{{ giftConfig.finalMessage.closingThought }}</span>
        <Sparkles class="w-3.5 h-3.5 text-romantic-500" />
      </div>

      <!-- Footer credits -->
      <div
        ref="footerCredits"
        class="pt-14 text-[11px] font-mono text-warm-500/80"
      >
        Dành riêng cho {{ giftConfig.recipientName }} • Chúc em luôn rạng rỡ và hạnh phúc ✨
      </div>
    </div>
  </section>
</template>
