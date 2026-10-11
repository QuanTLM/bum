<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { giftConfig } from '@/config/giftData'
import { Volume2, VolumeX, AlertCircle, X } from '@lucide/vue'
import { prefersReducedMotion } from '@/utils/motion'
import gsap from 'gsap'

const { isPlaying, hasError, errorMessage, isUserInitiated, togglePlay, dismissError } = useAudioPlayer()

const eqBar1 = ref<HTMLElement | null>(null)
const eqBar2 = ref<HTMLElement | null>(null)
const eqBar3 = ref<HTMLElement | null>(null)

let eqTween: gsap.core.Tween | null = null

watch(
  isPlaying,
  (playing) => {
    eqTween?.kill()
    eqTween = null

    if (playing && !prefersReducedMotion()) {
      nextTick(() => {
        const bars = [eqBar1.value, eqBar2.value, eqBar3.value].filter(Boolean)
        if (bars.length) {
          eqTween = gsap.to(bars, {
            scaleY: () => gsap.utils.random(0.25, 1),
            duration: 0.35,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.1,
            transformOrigin: 'bottom',
          })
        }
      })
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  eqTween?.kill()
})
</script>

<template>
  <div>
    <!-- Floating Audio Control Pill (OQ-015, FEAT-004, high-end liquid glass) -->
    <transition
      enter-active-class="transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      enter-from-class="opacity-0 translate-y-[-10px] scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-[-10px] scale-95"
    >
      <div
        v-if="isUserInitiated"
        class="fixed top-4 right-4 z-40 flex items-center gap-2"
      >
        <button
          type="button"
          @click="togglePlay"
          :class="[
            'flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-xl border text-xs font-medium transition-[transform,background-color,border-color,box-shadow] duration-300 ease-smooth active:scale-95 cursor-pointer shadow-sm',
            isPlaying
              ? 'bg-romantic-100/85 border-romantic-200 text-romantic-900 shadow-romantic-soft ring-1 ring-romantic-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]'
              : 'bg-white/85 border-warm-200/80 text-warm-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]'
          ]"
          :aria-label="isPlaying ? 'Tạm dừng bài hát' : 'Phát bài hát'"
        >
          <!-- Music Icon -->
          <component
            :is="isPlaying ? Volume2 : VolumeX"
            class="w-3.5 h-3.5 text-romantic-600 transition-transform duration-200"
          />
          <span class="max-w-[100px] truncate tracking-tight text-[11px] font-sans">
            {{ giftConfig.audio.title || 'Nhạc nền' }}
          </span>

          <!-- Smooth GSAP Equalizer Bars (replaces CSS animate-pulse/bounce) -->
          <span
            v-if="isPlaying"
            class="flex items-end gap-[2px] h-3 ml-0.5"
            aria-hidden="true"
          >
            <span
              ref="eqBar1"
              class="w-[2px] h-3 bg-romantic-500 rounded-full origin-bottom"
            ></span>
            <span
              ref="eqBar2"
              class="w-[2px] h-3 bg-romantic-600 rounded-full origin-bottom"
            ></span>
            <span
              ref="eqBar3"
              class="w-[2px] h-3 bg-romantic-400 rounded-full origin-bottom"
            ></span>
          </span>
        </button>
      </div>
    </transition>

    <!-- Non-blocking Audio Error Banner (BR-032, US-008, AC-028..030) -->
    <transition
      enter-active-class="transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      enter-from-class="opacity-0 translate-y-[-20px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-20px]"
    >
      <div
        v-if="hasError"
        class="fixed top-16 left-4 right-4 z-40 max-w-mobile mx-auto bg-amber-50/95 border border-amber-200/80 text-amber-900 rounded-2xl p-3.5 shadow-warm-diffused backdrop-blur-md flex items-start gap-2.5 text-xs"
      >
        <AlertCircle class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div class="flex-1">
          <p class="font-medium text-amber-900">Thông báo âm thanh</p>
          <p class="text-amber-800/90 mt-0.5 leading-relaxed">{{ errorMessage }}</p>
        </div>
        <button
          type="button"
          @click="dismissError"
          class="text-amber-500 hover:text-amber-800 p-1 cursor-pointer transition-colors"
          aria-label="Đóng thông báo"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </transition>
  </div>
</template>
