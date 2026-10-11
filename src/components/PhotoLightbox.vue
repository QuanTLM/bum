<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { PhotoItem } from '@/types/gift'
import { X, ChevronLeft, ChevronRight } from '@lucide/vue'
import { prefersReducedMotion } from '@/utils/motion'
import gsap from 'gsap'

interface LightboxProps {
  photos: PhotoItem[]
  initialIndex: number
  isOpen: boolean
}

const props = defineProps<LightboxProps>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const currentIndex = ref(props.initialIndex)
const imageContainer = ref<HTMLElement | null>(null)

watch(
  () => props.initialIndex,
  (val) => {
    currentIndex.value = val
  }
)

// Preload adjacent photos for instant zero-latency rendering on mobile
watch(
  currentIndex,
  (idx) => {
    if (typeof window === 'undefined') return
    if (props.photos[idx + 1]) {
      const nextImg = new Image()
      nextImg.src = props.photos[idx + 1].url
    }
    if (props.photos[idx - 1]) {
      const prevImg = new Image()
      prevImg.src = props.photos[idx - 1].url
    }
  },
  { immediate: true }
)

// Body scroll lock on open (Review Focus item 3, US-003)
watch(
  () => props.isOpen,
  (isOpen) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    }
    if (isOpen) {
      dragX.value = 0
      isAnimating.value = false
    }
  },
  { immediate: true }
)

const currentPhoto = computed(() => props.photos[currentIndex.value])
const isFirst = computed(() => currentIndex.value === 0)
const isLast = computed(() => currentIndex.value === props.photos.length - 1)

// Navigation stopping at boundaries (RULE-009, OQ-016)
function prevPhoto() {
  if (!isFirst.value) {
    navigateWithSlide(-1)
  }
}

function nextPhoto() {
  if (!isLast.value) {
    navigateWithSlide(1)
  }
}

function handleClose() {
  emit('close')
}

// -------------------------------------------------------------
// Interactive 60fps Native Touch Drag & Spring Physics
// -------------------------------------------------------------
const touchStartX = ref(0)
const touchStartY = ref(0)
const dragX = ref(0)
const isDragging = ref(false)
const isAnimating = ref(false)

function onTouchStart(e: TouchEvent) {
  if (isAnimating.value || e.touches.length !== 1) return
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  isDragging.value = true
  dragX.value = 0
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value || isAnimating.value || e.touches.length !== 1) return
  const currentX = e.touches[0].clientX
  const currentY = e.touches[0].clientY

  let diffX = currentX - touchStartX.value
  const diffY = Math.abs(currentY - touchStartY.value)

  // Ignore accidental vertical scroll movements
  if (diffY > Math.abs(diffX) && Math.abs(diffX) < 12) {
    return
  }

  // Rubber-band resistance at boundaries
  if ((isFirst.value && diffX > 0) || (isLast.value && diffX < 0)) {
    diffX *= 0.25
  }

  dragX.value = diffX
}

function onTouchEnd() {
  if (!isDragging.value || isAnimating.value) return
  isDragging.value = false

  const threshold = 50
  if (dragX.value < -threshold && !isLast.value) {
    // Swiped left sufficiently -> Next photo
    navigateWithSlide(1)
  } else if (dragX.value > threshold && !isFirst.value) {
    // Swiped right sufficiently -> Previous photo
    navigateWithSlide(-1)
  } else {
    // Spring back to center smoothly
    if (prefersReducedMotion() || !imageContainer.value) {
      dragX.value = 0
      return
    }
    isAnimating.value = true
    gsap.to(imageContainer.value, {
      x: 0,
      opacity: 1,
      duration: 0.35,
      ease: 'elastic.out(1, 0.75)',
      onComplete: () => {
        dragX.value = 0
        isAnimating.value = false
      },
    })
  }
}

function navigateWithSlide(direction: number) {
  if (isAnimating.value) return

  if (prefersReducedMotion() || !imageContainer.value) {
    if (direction > 0 && !isLast.value) currentIndex.value++
    if (direction < 0 && !isFirst.value) currentIndex.value--
    dragX.value = 0
    return
  }

  isAnimating.value = true
  const flyOutX = direction > 0 ? -window.innerWidth * 0.45 : window.innerWidth * 0.45

  // 1. Slide current photo out fluidly
  gsap.to(imageContainer.value, {
    x: flyOutX,
    opacity: 0.2,
    duration: 0.22,
    ease: 'power2.in',
    onComplete: () => {
      // 2. Change photo index
      if (direction > 0) currentIndex.value++
      else currentIndex.value--

      // 3. Slide new photo in from the other side
      const flyInX = direction > 0 ? window.innerWidth * 0.45 : -window.innerWidth * 0.45
      gsap.fromTo(
        imageContainer.value,
        { x: flyInX, opacity: 0.2 },
        {
          x: 0,
          opacity: 1,
          duration: 0.36,
          ease: 'power3.out',
          onComplete: () => {
            dragX.value = 0
            isAnimating.value = false
          },
        }
      )
    },
  })
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
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen && currentPhoto"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md px-4 py-8 touch-none select-none"
        @click.self="handleClose"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        role="dialog"
        aria-modal="true"
        aria-label="Xem ảnh lớn"
      >
        <!-- Top bar: counter & close button -->
        <div class="absolute top-4 inset-x-4 max-w-mobile mx-auto flex items-center justify-between text-white/80 z-20">
          <span class="text-xs font-mono tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/10 shadow-sm">
            {{ currentIndex + 1 }} / {{ photos.length }}
          </span>

          <button
            type="button"
            @click="handleClose"
            class="p-2.5 rounded-full bg-white/10 text-white/90 hover:bg-white/20 active:scale-90 transition-[transform,opacity,background-color] duration-200 ease-smooth cursor-pointer"
            aria-label="Đóng ảnh"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Main Photo container with real-time gesture translate -->
        <div
          ref="imageContainer"
          :style="{
            transform: isDragging ? `translate3d(${dragX}px, 0, 0)` : undefined,
            transition: isDragging ? 'none' : undefined,
          }"
          class="relative max-w-mobile w-full flex flex-col items-center transform-gpu will-change-transform"
        >
          <div class="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
            <img
              :src="currentPhoto.url"
              :alt="currentPhoto.alt || currentPhoto.caption || 'Kỷ niệm'"
              class="max-w-full max-h-[70vh] object-contain rounded-2xl select-none"
              loading="eager"
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
            'absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full text-white backdrop-blur-md transition-[transform,opacity,background-color] duration-200 ease-smooth z-20 cursor-pointer',
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
            'absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full text-white backdrop-blur-md transition-[transform,opacity,background-color] duration-200 ease-smooth z-20 cursor-pointer',
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
