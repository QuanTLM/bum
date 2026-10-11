<script setup lang="ts">
import OpeningHero from '@/components/OpeningHero.vue'
import PhotoGallery from '@/components/PhotoGallery.vue'
import LoveLetter from '@/components/LoveLetter.vue'
import FinalMessage from '@/components/FinalMessage.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'

function onExperienceStart() {
  console.log('Romantic experience started.')
}
</script>

<template>
  <!-- Mobile-optimized frame wrapper (DEC-015, DEC-036, NFR-001) -->
  <div class="min-h-screen bg-warm-100/60 flex justify-center selection:bg-romantic-200">
    <!-- Single-page continuous scroll container (DEC-012, BR-014) -->
    <main class="w-full max-w-mobile min-h-screen bg-warm-50 shadow-2xl relative flex flex-col">
      <!-- Floating Audio Player (FEAT-004) -->
      <AudioPlayer />

      <!-- Section 1: Opening Experience (FEAT-001) -->
      <OpeningHero @start="onExperienceStart" />

      <!-- Section 2: Interactive Photo Gallery (FEAT-002) -->
      <PhotoGallery />

      <!-- Section 3: Love Letter (FEAT-003) -->
      <LoveLetter />

      <!-- Section 4: Final Message (FEAT-005) -->
      <FinalMessage />
    </main>
  </div>
</template>
