<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { giftConfig } from '@/config/giftData'
import { Heart, MailOpen, Sparkles } from '@lucide/vue'
import { prefersReducedMotion } from '@/utils/motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const letterSection = ref<HTMLElement | null>(null)
const envelopeRef = ref<HTMLElement | null>(null)
const waxSealRef = ref<HTMLElement | null>(null)
const flapRef = ref<HTMLElement | null>(null)
const letterCard = ref<HTMLElement | null>(null)

const isOpened = ref(false)
const isOpening = ref(false)

let ctx: gsap.Context | null = null
const splitInstances: SplitText[] = []

function animateParagraphs() {
  if (prefersReducedMotion() || !letterCard.value) return
  const paragraphs = letterCard.value.querySelectorAll('.letter-para')
  if (paragraphs && paragraphs.length > 0) {
    paragraphs.forEach((p) => {
      const split = new SplitText(p, { type: 'lines', linesClass: 'overflow-hidden' })
      splitInstances.push(split)
      gsap.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      })
    })
  }
}

async function handleOpenEnvelope() {
  if (isOpening.value || isOpened.value) return
  isOpening.value = true

  if (prefersReducedMotion()) {
    isOpened.value = true
    isOpening.value = false
    await nextTick()
    animateParagraphs()
    return
  }

  // 1. Wax seal burst & pop
  const tl = gsap.timeline({
    onComplete: async () => {
      isOpened.value = true
      isOpening.value = false
      await nextTick()

      // 2. Letter emergence animation
      if (letterCard.value) {
        gsap.fromTo(
          letterCard.value,
          { y: 35, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            onComplete: () => {
              animateParagraphs()
            },
          }
        )
      }
    },
  })

  // Wax seal pops and dissolves
  if (waxSealRef.value) {
    tl.to(waxSealRef.value, {
      scale: 1.3,
      opacity: 0,
      duration: 0.4,
      ease: 'back.in(1.7)',
    })
  }

  // Flap 3D fold open
  if (flapRef.value) {
    tl.to(
      flapRef.value,
      {
        rotateX: 180,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '-=0.2'
    )
  }
}

function handleCloseEnvelope() {
  splitInstances.forEach((s) => s.revert())
  splitInstances.length = 0
  isOpened.value = false
}

onMounted(() => {
  if (prefersReducedMotion()) {
    isOpened.value = true
    return
  }

  ctx = gsap.context(() => {
    // Entrance reveal for the section container
    gsap.fromTo(
      letterSection.value,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: letterSection.value,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, letterSection.value ?? undefined)
})

onUnmounted(() => {
  splitInstances.forEach((s) => s.revert())
  ctx?.revert()
})
</script>

<template>
  <section
    id="love-letter-section"
    ref="letterSection"
    class="py-24 px-4 max-w-mobile mx-auto relative select-none"
  >
    <!-- Section Title & Subtitle -->
    <div class="text-center mb-10 space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-romantic-100/80 text-romantic-700 text-xs font-medium ring-1 ring-romantic-200/60 shadow-sm">
        <MailOpen class="w-3.5 h-3.5" />
        <span>Bức thư từ trái tim</span>
      </div>
      <h2 class="font-serif text-3xl font-semibold text-romantic-900 tracking-tight">
        Lá Thư Cho Em
      </h2>
      <p class="text-xs text-warm-700/80 max-w-xs mx-auto leading-relaxed font-light">
        Những lời chân thành và yêu thương nhất anh muốn gửi gắm đến riêng em.
      </p>
    </div>

    <!-- 1. CLOSED STATE: 3D Interactive Wax-Sealed Envelope (User Choice 2.1) -->
    <div
      v-if="!isOpened"
      ref="envelopeRef"
      @click="handleOpenEnvelope"
      class="group relative w-full aspect-[16/11] bg-gradient-to-br from-[#FAF7F2] to-[#F2EDE4] rounded-3xl border border-warm-200/90 shadow-[0_20px_50px_-15px_rgba(46,43,42,0.22)] cursor-pointer overflow-hidden transition-transform duration-300 ease-smooth active:scale-[0.98]"
      role="button"
      tabindex="0"
      @keydown.enter="handleOpenEnvelope"
      @keydown.space.prevent="handleOpenEnvelope"
      aria-label="Chạm để mở phong thư"
    >
      <!-- Envelope Inner Pocket Shadows & Pattern -->
      <div class="absolute inset-0 bg-radial-gradient from-transparent to-black/[0.03] pointer-events-none"></div>

      <!-- Envelope Bottom Pocket Triangle -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="clip-path: polygon(0% 45%, 50% 78%, 100% 45%, 100% 100%, 0% 100%); background: linear-gradient(180deg, #F5EFE6 0%, #EDE5D8 100%); border-top: 1px solid rgba(221, 215, 203, 0.7);"
      ></div>

      <!-- Envelope Left & Right Side Folds -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="clip-path: polygon(0 0, 0 100%, 50% 68%); background: rgba(240, 232, 220, 0.4);"
      ></div>
      <div
        class="absolute inset-0 pointer-events-none"
        style="clip-path: polygon(100% 0, 100% 100%, 50% 68%); background: rgba(235, 226, 214, 0.4);"
      ></div>

      <!-- Envelope Top Flap (3D Perspective Fold) -->
      <div
        ref="flapRef"
        class="absolute inset-0 origin-top pointer-events-none"
        style="transform-style: preserve-3d; clip-path: polygon(0 0, 100% 0, 50% 58%); background: linear-gradient(180deg, #FFFFFF 0%, #F5EFE6 100%); filter: drop-shadow(0 4px 6px rgba(0,0,0,0.06));"
      ></div>

      <!-- 3D Heart Wax Seal Button in Center -->
      <div
        ref="waxSealRef"
        class="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none"
      >
        <div class="relative w-16 h-16 rounded-full bg-gradient-to-tr from-romantic-800 via-romantic-600 to-romantic-500 shadow-2xl ring-4 ring-romantic-200/80 flex items-center justify-center transition-transform duration-300 ease-smooth group-hover:scale-110">
          <!-- Wax Seal Texture Highlight -->
          <div class="absolute inset-1 rounded-full border border-white/30 shadow-inner"></div>
          <Heart class="w-7 h-7 text-white fill-white/95 drop-shadow-md" />
        </div>
      </div>

      <!-- Prompt Banner below Wax Seal -->
      <div class="absolute bottom-4 inset-x-0 flex justify-center z-10 pointer-events-none">
        <div class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-romantic-200/80 text-romantic-800 text-xs font-medium shadow-sm transition-transform duration-300 group-hover:scale-105">
          <Sparkles class="w-3.5 h-3.5 text-romantic-500 animate-pulse" />
          <span>Chạm vào dấu sáp để mở thư</span>
        </div>
      </div>
    </div>

    <!-- 2. OPENED STATE: Full Stationery Card with SplitText Reveal -->
    <div
      v-else
      ref="letterCard"
      class="relative bg-white/95 rounded-[2rem] p-7 sm:p-8 shadow-warm-diffused border border-warm-200/80 overflow-hidden"
    >
      <!-- Top Decorative Stationery Header / Stamp -->
      <div class="flex items-center justify-between pb-5 border-b border-warm-200/60">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-romantic-100 flex items-center justify-center text-romantic-600 ring-1 ring-romantic-200/50 shadow-sm">
            <Heart class="w-4 h-4 fill-romantic-500" />
          </div>
          <span class="font-serif italic text-warm-800/80 text-sm">A letter from my heart</span>
        </div>
        <span v-if="giftConfig.loveLetter.date" class="text-[11px] font-mono text-warm-500">
          {{ giftConfig.loveLetter.date }}
        </span>
      </div>

      <!-- Letter Content (DATA-003, FR-014) -->
      <div class="py-6 space-y-4">
        <!-- Title or Greeting -->
        <h3
          v-if="giftConfig.loveLetter.title"
          class="font-serif text-xl sm:text-2xl font-semibold text-romantic-900 tracking-tight"
        >
          {{ giftConfig.loveLetter.title }}
        </h3>
        <p
          v-if="giftConfig.loveLetter.greeting"
          class="font-serif italic text-base text-warm-800"
        >
          {{ giftConfig.loveLetter.greeting }}
        </p>

        <!-- Paragraphs with line-by-line emergence -->
        <div class="space-y-4 text-sm leading-relaxed text-warm-800/90 font-light font-sans">
          <p
            v-for="(para, idx) in giftConfig.loveLetter.paragraphs"
            :key="idx"
            class="letter-para first-letter:text-xl first-letter:font-serif first-letter:text-romantic-800"
          >
            {{ para }}
          </p>
        </div>
      </div>

      <!-- Signature & Fold Back Button -->
      <div class="pt-5 border-t border-warm-200/60 flex items-center justify-between">
        <button
          type="button"
          @click="handleCloseEnvelope"
          class="text-xs text-warm-500 hover:text-romantic-600 transition-colors flex items-center gap-1 cursor-pointer font-sans"
        >
          <span>Gấp thư lại</span>
        </button>

        <p v-if="giftConfig.loveLetter.signature" class="font-serif italic text-base text-romantic-800 font-medium">
          {{ giftConfig.loveLetter.signature }}
        </p>
      </div>
    </div>
  </section>
</template>
