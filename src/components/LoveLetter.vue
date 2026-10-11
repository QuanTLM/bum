<script setup lang="ts">
import { onMounted } from 'vue'
import { giftConfig } from '@/config/giftData'
import { Mail, Heart } from '@lucide/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  // Subtle reveal for the Love Letter (AC-013)
  gsap.fromTo(
    '#love-letter-card',
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#love-letter-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  )
})
</script>

<template>
  <section
    id="love-letter-section"
    class="py-16 px-4 max-w-mobile mx-auto relative"
  >
    <!-- Section Badge -->
    <div class="text-center mb-6">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-romantic-100 text-romantic-700 text-xs font-medium">
        <Mail class="w-3.5 h-3.5" />
        <span>Bức thư cho em</span>
      </div>
    </div>

    <!-- Letter Stationery Card in Modern Minimal Aesthetic -->
    <div
      id="love-letter-card"
      class="relative bg-white rounded-3xl p-7 shadow-xl shadow-warm-200/50 border border-warm-200/70 overflow-hidden"
    >
      <!-- Top Decorative Accent / Stamp -->
      <div class="flex items-center justify-between pb-5 border-b border-warm-100">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-romantic-100 flex items-center justify-center text-romantic-600">
            <Heart class="w-4 h-4 fill-romantic-500" />
          </div>
          <span class="font-serif italic text-warm-800/80 text-sm">A letter from my heart</span>
        </div>
        <span v-if="giftConfig.loveLetter.date" class="text-[11px] font-mono text-warm-800/40">
          {{ giftConfig.loveLetter.date }}
        </span>
      </div>

      <!-- Letter Content (DATA-003, FR-014) -->
      <div class="py-6 space-y-4">
        <!-- Title or Greeting -->
        <h3 v-if="giftConfig.loveLetter.title" class="font-serif text-xl font-semibold text-romantic-900">
          {{ giftConfig.loveLetter.title }}
        </h3>
        <p v-if="giftConfig.loveLetter.greeting" class="font-serif italic text-base text-warm-800">
          {{ giftConfig.loveLetter.greeting }}
        </p>

        <!-- Paragraphs -->
        <div class="space-y-3.5 text-sm leading-relaxed text-warm-800/90 font-light font-sans">
          <p
            v-for="(para, idx) in giftConfig.loveLetter.paragraphs"
            :key="idx"
            class="first-letter:text-xl first-letter:font-serif first-letter:text-romantic-800"
          >
            {{ para }}
          </p>
        </div>
      </div>

      <!-- Signature -->
      <div v-if="giftConfig.loveLetter.signature" class="pt-4 border-t border-warm-100 text-right">
        <p class="font-serif italic text-base text-romantic-800 font-medium">
          {{ giftConfig.loveLetter.signature }}
        </p>
      </div>
    </div>
  </section>
</template>
