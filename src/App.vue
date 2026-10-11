<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import OpeningHero from '@/components/OpeningHero.vue'
import PhotoGallery from '@/components/PhotoGallery.vue'
import LoveLetter from '@/components/LoveLetter.vue'
import FinalMessage from '@/components/FinalMessage.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import RomanticParticles from '@/components/RomanticParticles.vue'
import { useAudioPlayer } from '@/composables/useAudioPlayer'

const { startPlayback, isPlaying } = useAudioPlayer()

let autoPlayTimer: ReturnType<typeof setTimeout> | null = null

function onExperienceStart() {
  console.log('Romantic experience started.')
}

onMounted(() => {
  // Autoplay background music after 1s (User requirement)
  autoPlayTimer = setTimeout(async () => {
    const success = await startPlayback(true)
    if (!success) {
      // If browser policy blocks unprompted audio, resume immediately on very first touch/click
      const resumeOnInteract = async () => {
        if (!isPlaying.value) {
          await startPlayback(false)
        }
        window.removeEventListener('pointerdown', resumeOnInteract)
        window.removeEventListener('touchstart', resumeOnInteract)
      }
      window.addEventListener('pointerdown', resumeOnInteract, { once: true, passive: true })
      window.addEventListener('touchstart', resumeOnInteract, { once: true, passive: true })
    }
  }, 1000)
})

onUnmounted(() => {
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer)
    autoPlayTimer = null
  }
})
</script>

<template>
  <!-- Mobile-optimized frame wrapper (DEC-015, DEC-036, NFR-001) -->
  <div class="min-h-[100dvh] bg-warm-100/70 flex justify-center selection:bg-romantic-200">
    <!-- Floating romantic petals & interactive touch-heart burst canvas -->
    <RomanticParticles />

    <!-- Single-page continuous scroll container (DEC-012, BR-014) -->
    <main class="w-full max-w-mobile min-h-[100dvh] bg-warm-50 shadow-2xl relative flex flex-col overflow-x-hidden">
      <!-- Fixed film-grain noise texture overlay (high-end visual design) -->
      <div class="grain-overlay" aria-hidden="true"></div>

      <!-- Floating Audio Player (FEAT-004) -->
      <AudioPlayer />

      <!-- Section 1: Opening Experience (FEAT-001) -->
      <OpeningHero @start="onExperienceStart" />

      <!-- Subtle transition separator 1 -->
      <div class="w-full flex justify-center py-4" aria-hidden="true">
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-romantic-200 to-transparent"></div>
      </div>

      <!-- Section 2: Interactive Photo Gallery (FEAT-002) -->
      <PhotoGallery />

      <!-- Subtle transition separator 2 -->
      <div class="w-full flex justify-center py-4" aria-hidden="true">
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-warm-300 to-transparent"></div>
      </div>

      <!-- Section 3: Love Letter (FEAT-003) -->
      <LoveLetter />

      <!-- Subtle transition separator 3 -->
      <div class="w-full flex justify-center py-4" aria-hidden="true">
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-romantic-200 to-transparent"></div>
      </div>

      <!-- Section 4: Final Message (FEAT-005) -->
      <FinalMessage />
    </main>
  </div>
</template>
