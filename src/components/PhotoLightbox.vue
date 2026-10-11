<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { PhotoItem } from '@/types/gift'
import { X, ChevronLeft, ChevronRight } from '@lucide/vue'

const props = defineProps<{
  photos: PhotoItem[]
  initialIndex: number
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const currentIndex = ref(props.initialIndex)

watch(
  () => props.initialIndex,
  (val) => {
    currentIndex.value = val
  }
)

const currentPhoto = computed(() => props.photos[currentIndex.value])
const isFirst = computed(() => currentIndex.value === 0)
const isLast = computed(() => currentIndex.value === props.photos.length - 1)

// Navigation stopping at boundaries (RULE-009, OQ-016)
function prevPhoto() {
  if (!isFirst.value) {
    currentIndex.value--
  }
}

function nextPhoto() {
  if (!isLast.value) {
    currentIndex.value++
  }
}

function handleClose() {
  emit('close')
}

// Touch swipe gestures for mobile (OQ-017)
const touchStartX = ref(0)
const touchEndX = ref(0)
const minSwipeDistance = 45

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.changedTouches[0].screenX
}

function onTouchEnd(e: TouchEvent) {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipeGesture()
}

function handleSwipeGesture() {
  const diff = touchEndX.value - touchStartX.value
  if (Math.abs(diff) < minSwipeDistance) return

  if (diff > 0) {
    // Swiped right -> Previous
    prevPhoto()
  } else {
    // Swiped left -> Next
    nextPhoto()
  }
}

// Keyboard navigation
function onKeyDown(e: KeyboardEvent) {
  if (!props.isOpen) return
  if (e.key === 'Escape') handleClose()
  if (e.key === 'ArrowLeft') prevPhoto()
  if (e.key === 'ArrowRight') nextPhoto()
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen && currentPhoto"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md px-4 py-8 touch-none select-none"
        @click.self="handleClose"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        role="dialog"
        aria-modal="true"
        aria-label="Xem ảnh lớn"
      >
        <!-- Top bar: counter & close button -->
        <div class="absolute top-4 inset-x-4 max-w-mobile mx-auto flex items-center justify-between text-white/80 z-20">
          <span class="text-xs font-mono tracking-widest bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
            {{ currentIndex + 1 }} / {{ photos.length }}
          </span>

          <button
            type="button"
            @click="handleClose"
            class="p-2 rounded-full bg-white/10 text-white/90 hover:bg-white/20 active:scale-90 transition-all cursor-pointer"
            aria-label="Đóng ảnh"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Main Photo container -->
        <div class="relative max-w-mobile w-full flex flex-col items-center">
          <div class="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
            <img
              :key="currentPhoto.id"
              :src="currentPhoto.url"
              :alt="currentPhoto.alt || currentPhoto.caption || 'Kỷ niệm'"
              class="max-w-full max-h-[70vh] object-contain rounded-2xl transition-all duration-300"
              loading="lazy"
            />
          </div>

          <!-- Caption underneath -->
          <div v-if="currentPhoto.caption" class="mt-4 px-3 text-center">
            <p class="text-sm font-light text-white/90 leading-relaxed font-sans">
              {{ currentPhoto.caption }}
            </p>
          </div>
        </div>

        <!-- Navigation Buttons: Left/Right (Disabled at boundaries per RULE-009) -->
        <button
          type="button"
          @click="prevPhoto"
          :disabled="isFirst"
          :class="[
            'absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full text-white backdrop-blur-md transition-all z-20 cursor-pointer',
            isFirst
              ? 'opacity-20 cursor-not-allowed bg-white/5'
              : 'opacity-85 hover:opacity-100 bg-white/15 active:scale-90'
          ]"
          aria-label="Ảnh trước"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>

        <button
          type="button"
          @click="nextPhoto"
          :disabled="isLast"
          :class="[
            'absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full text-white backdrop-blur-md transition-all z-20 cursor-pointer',
            isLast
              ? 'opacity-20 cursor-not-allowed bg-white/5'
              : 'opacity-85 hover:opacity-100 bg-white/15 active:scale-90'
          ]"
          aria-label="Ảnh kế tiếp"
        >
          <ChevronRight class="w-6 h-6" />
        </button>
      </div>
    </transition>
  </teleport>
</template>
