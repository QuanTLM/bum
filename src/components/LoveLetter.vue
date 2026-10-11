<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { giftConfig } from '@/config/giftData'
import { Heart } from '@lucide/vue'
import { prefersReducedMotion } from '@/utils/motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const letterSection = ref<HTMLElement | null>(null)
const letterCard = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null
const splitInstances: SplitText[] = []

onMounted(() => {
  if (prefersReducedMotion()) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: letterSection.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // 1. Reveal letter stationery card
    tl.fromTo(
      letterCard.value,
      { y: 45, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
      }
    )

    // 2. Line-by-line reveal for intimate reading experience (gsap-web SplitText)
    const paragraphs = letterCard.value?.querySelectorAll('.letter-para')
    if (paragraphs && paragraphs.length > 0) {
      paragraphs.forEach((p) => {
        const split = new SplitText(p, { type: 'lines', linesClass: 'overflow-hidden' })
        splitInstances.push(split)
        tl.from(
          split.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
          },
          '-=0.4'
        )
      })
    }
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
    class="py-24 px-4 max-w-mobile mx-auto relative"
  >
    <!-- Letter Stationery Card in Modern Minimal Romantic Aesthetic -->
    <div
      ref="letterCard"
      class="relative bg-white/95 rounded-[2rem] p-7 sm:p-8 shadow-warm-diffused border border-warm-200/80 overflow-hidden"
    >
      <!-- Top Decorative Stationery Header / Stamp -->
      <div class="flex items-center justify-between pb-5 border-b border-warm-200/60">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-romantic-100 flex items-center justify-center text-romantic-600 ring-1 ring-romantic-200/50">
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

      <!-- Signature -->
      <div v-if="giftConfig.loveLetter.signature" class="pt-5 border-t border-warm-200/60 text-right">
        <p class="font-serif italic text-base text-romantic-800 font-medium">
          {{ giftConfig.loveLetter.signature }}
        </p>
      </div>
    </div>
  </section>
</template>
