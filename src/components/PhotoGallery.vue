<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { giftConfig } from '@/config/giftData'
import type { PhotoItem } from '@/types/gift'
import PhotoLightbox from '@/components/PhotoLightbox.vue'
import { ImageOff } from '@lucide/vue'
import { prefersReducedMotion } from '@/utils/motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Sort strictly by displayOrder (DEC-034, US-007)
const sortedPhotos = computed(() => {
  return [...giftConfig.photos].sort((a, b) => a.displayOrder - b.displayOrder)
})

// Lightbox state
const isLightboxOpen = ref(false)
const selectedPhotoIndex = ref(0)
const failedImageIds = ref<Set<string>>(new Set())
const gallerySection = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

function openLightbox(index: number) {
  selectedPhotoIndex.value = index
  isLightboxOpen.value = true
}

function closeLightbox() {
  isLightboxOpen.value = false
}

function handleImageError(id: string) {
  // Graceful fallback for broken image (RULE-010, OQ-018)
  failedImageIds.value.add(id)
}

function getCardClasses(photo: PhotoItem) {
  switch (photo.sizeVariant) {
    case 'tall':
      return 'col-span-1 row-span-2 aspect-[3/4]'
    case 'wide':
      return 'col-span-2 aspect-[16/10]'
    case 'featured':
      return 'col-span-2 aspect-[4/5]'
    case 'normal':
    default:
      return 'col-span-1 aspect-square'
  }
}

onMounted(() => {
  if (prefersReducedMotion()) return

  ctx = gsap.context(() => {
    // Scroll reveal with GSAP ScrollTrigger.batch for 60fps performance (BR-022, DEC-025, 60fps skill)
    ScrollTrigger.batch('.gallery-card', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { y: 35, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: 'auto',
          }
        )
      },
    })
  }, gallerySection.value ?? undefined)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="gallery-section"
    ref="gallerySection"
    class="py-24 px-4 max-w-mobile mx-auto relative"
  >
    <!-- Section Title & Subtitle (Clean Modern Minimal, No Cluttered Eyebrow Pill) -->
    <div class="text-center mb-10 space-y-2.5">
      <h2 class="font-serif text-3xl font-semibold text-romantic-900 tracking-tight">
        Những Chuyến Đi Cùng Nhau
      </h2>
      <p class="text-xs text-warm-700/80 max-w-xs mx-auto leading-relaxed">
        Mỗi tấm hình là một mảnh ghép nhỏ lưu giữ nụ cười và kỷ niệm của chúng mình.
      </p>
    </div>

    <!-- Artistic Masonry / Grid with alternating sizes (DEC-029, FR-006) -->
    <div class="grid grid-cols-2 gap-3.5 auto-rows-[minmax(140px,auto)]">
      <div
        v-for="(photo, index) in sortedPhotos"
        :key="photo.id"
        tabindex="0"
        role="button"
        :aria-label="photo.caption || 'Xem ảnh ' + (index + 1)"
        @click="openLightbox(index)"
        @keydown.enter="openLightbox(index)"
        @keydown.space.prevent="openLightbox(index)"
        :class="[
          'gallery-card group relative rounded-2xl overflow-hidden cursor-pointer bg-warm-100 border border-warm-200/70 transition-transform duration-300 ease-smooth active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-romantic-500',
          getCardClasses(photo)
        ]"
      >
        <!-- Broken image placeholder (RULE-010, OQ-018) -->
        <div
          v-if="failedImageIds.has(photo.id)"
          class="w-full h-full flex flex-col items-center justify-center p-4 text-center text-warm-800/50 bg-warm-200/50"
        >
          <ImageOff class="w-8 h-8 text-warm-400 mb-2" />
          <span class="text-[11px]">Hình ảnh đang cập nhật</span>
        </div>

        <!-- Main Image with gentle hover scale (compositor-only) -->
        <img
          v-else
          :src="photo.url"
          :alt="photo.alt || photo.caption || 'Kỷ niệm'"
          @error="handleImageError(photo.id)"
          class="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
          loading="lazy"
        />

        <!-- Subtle gradient overlay with caption - revealed on hover/focus (Minimalist Anti-Clutter) -->
        <div
          v-if="photo.caption"
          class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 ease-smooth flex flex-col justify-end p-3.5 pointer-events-none"
        >
          <p class="text-white text-xs font-normal line-clamp-3 leading-snug drop-shadow-sm font-sans">
            {{ photo.caption }}
          </p>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <PhotoLightbox
      :photos="sortedPhotos"
      :initial-index="selectedPhotoIndex"
      :is-open="isLightboxOpen"
      @close="closeLightbox"
    />
  </section>
</template>
