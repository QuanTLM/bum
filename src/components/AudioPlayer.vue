<script setup lang="ts">
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { giftConfig } from '@/config/giftData'
import { Volume2, VolumeX, AlertCircle, X } from '@lucide/vue'

const { isPlaying, hasError, errorMessage, isUserInitiated, togglePlay, dismissError } = useAudioPlayer()
</script>

<template>
  <div>
    <!-- Floating Audio Control (OQ-015, FEAT-004) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div
        v-if="isUserInitiated"
        class="fixed top-4 right-4 z-40 flex items-center gap-2"
      >
        <button
          type="button"
          @click="togglePlay"
          :class="[
            'flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md border shadow-sm text-xs font-medium transition-all duration-200 active:scale-95',
            isPlaying
              ? 'bg-romantic-100/90 border-romantic-300 text-romantic-800 shadow-romantic-200/50'
              : 'bg-white/90 border-warm-200 text-warm-800'
          ]"
          :aria-label="isPlaying ? 'Tạm dừng bài hát' : 'Phát bài hát'"
        >
          <!-- Music waves / Icon -->
          <component :is="isPlaying ? Volume2 : VolumeX" class="w-4 h-4 text-romantic-600" />
          <span class="max-w-[100px] truncate">{{ giftConfig.audio.title || 'Nhạc nền' }}</span>
          
          <!-- Subtle equalizer pulse indicator -->
          <span v-if="isPlaying" class="flex items-end gap-[2px] h-3 ml-1">
            <span class="w-[2px] h-2 bg-romantic-500 rounded-full animate-pulse"></span>
            <span class="w-[2px] h-3 bg-romantic-600 rounded-full animate-bounce"></span>
            <span class="w-[2px] h-1.5 bg-romantic-400 rounded-full animate-pulse"></span>
          </span>
        </button>
      </div>
    </transition>

    <!-- Non-blocking Audio Error Banner (BR-032, US-008, AC-028..030) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-[-20px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-20px]"
    >
      <div
        v-if="hasError"
        class="fixed top-16 left-4 right-4 z-40 max-w-mobile mx-auto bg-amber-50/95 border border-amber-200 text-amber-900 rounded-xl p-3 shadow-md backdrop-blur-md flex items-start gap-2.5 text-xs"
      >
        <AlertCircle class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div class="flex-1">
          <p class="font-medium text-amber-900">Thông báo âm thanh</p>
          <p class="text-amber-700 mt-0.5 leading-relaxed">{{ errorMessage }}</p>
        </div>
        <button
          type="button"
          @click="dismissError"
          class="text-amber-500 hover:text-amber-800 p-1"
          aria-label="Đóng thông báo"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </transition>
  </div>
</template>
