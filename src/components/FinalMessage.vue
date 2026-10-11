<script setup lang="ts">
import { onMounted } from 'vue'
import { giftConfig } from '@/config/giftData'
import { Heart, Sparkles } from '@lucide/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  // Subtle and gentle ending animation (DEC-022, FR-022)
  gsap.fromTo(
    '#final-message-content',
    { scale: 0.95, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#final-message-section',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  )
})
</script>

<template>
  <section
    id="final-message-section"
    class="py-20 px-6 max-w-mobile mx-auto text-center relative overflow-hidden"
  >
    <!-- Background subtle soft halo -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="w-64 h-64 bg-romantic-200/50 rounded-full blur-3xl"></div>
    </div>

    <!-- Final Message Content (DATA-004, FR-021, FR-022) -->
    <div id="final-message-content" class="relative z-10 flex flex-col items-center space-y-6">
      <!-- Floating heart icon -->
      <div class="w-14 h-14 rounded-full bg-romantic-100 flex items-center justify-center text-romantic-600 shadow-md shadow-romantic-200/40">
        <Heart class="w-7 h-7 fill-romantic-500 text-romantic-600 animate-pulse" />
      </div>

      <!-- Main Headline -->
      <h2 class="font-serif text-2xl sm:text-3xl font-bold text-romantic-900 leading-snug tracking-tight">
        {{ giftConfig.finalMessage.headline }}
      </h2>

      <!-- Subheadline -->
      <p v-if="giftConfig.finalMessage.subheadline" class="text-sm text-warm-800/80 font-light max-w-xs leading-relaxed">
        {{ giftConfig.finalMessage.subheadline }}
      </p>

      <!-- Closing thought -->
      <div v-if="giftConfig.finalMessage.closingThought" class="pt-4 flex items-center justify-center gap-2 text-xs font-serif italic text-romantic-700/80">
        <Sparkles class="w-3.5 h-3.5 text-romantic-500" />
        <span>{{ giftConfig.finalMessage.closingThought }}</span>
        <Sparkles class="w-3.5 h-3.5 text-romantic-500" />
      </div>

      <!-- Footer copyright / gentle credits -->
      <div class="pt-12 text-[11px] font-mono text-warm-800/40">
        Made with love for {{ giftConfig.recipientName }} • Forever & Always
      </div>
    </div>
  </section>
</template>
