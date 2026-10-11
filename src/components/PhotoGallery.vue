<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { giftConfig } from '@/config/giftData'
import type { PhotoItem } from '@/types/gift'
import PhotoLightbox from '@/components/PhotoLightbox.vue'
import { Camera, ImageOff, Heart } from '@lucide/vue'
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
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  // Scroll reveal with GSAP ScrollTrigger (BR-022, DEC-025)
  const cards = document.querySelectorAll('.gallery-card')
  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  })
})
</script>

<template>
  <section id="gallery-section" class="py-16 px-4 max-w-mobile mx-auto">
    <!-- Section Title & Subtitle -->
    <div class="text-center mb-10 space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-romantic-100 text-romantic-700 text-xs font-medium">
        <Camera class="w-3.5 h-3.5" />
        <span>Khoảnh khắc kỷ niệm</span>
      </div>
      <h2 class="font-serif text-3xl font-semibold text-romantic-900">
        Những Chuyến Đi Cùng Nhau
      </h2>
      <p class="text-xs text-warm-800/70 max-w-xs mx-auto">
        Mỗi tấm hình là một mảnh ghép nhỏ lưu giữ nụ cười và kỷ niệm của chúng mình.
      </p>
    </div>

    <!-- Artistic Masonry / Grid with alternating sizes (DEC-029, FR-006) -->
    <div class="grid grid-cols-2 gap-3.5 auto-rows-[minmax(140px,auto)]">
      <div
        v-for="(photo, index) in sortedPhotos"
        :key="photo.id"
        @click="openLightbox(index)"
        :class="[
          'gallery-card group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm bg-warm-100 border border-warm-200/60 transition-transform duration-300 active:scale-[0.98]',
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

        <!-- Main Image -->
        <img
          v-else
          :src="photo.url"
          :alt="photo.alt || photo.caption || 'Kỷ niệm'"
          @error="handleImageError(photo.id)"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <!-- Subtle gradient overlay with caption on hover/tap -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 transition-opacity flex flex-col justify-end p-3">
          <div class="flex items-center gap-1 text-white/90 text-[10px] font-mono mb-0.5">
            <Heart class="w-2.5 h-2.5 fill-romantic-400 text-romantic-400" />
            <span>#{{ index + 1 }}</span>
          </div>
          <p v-if="photo.caption" class="text-white text-xs font-normal line-clamp-2 leading-snug drop-shadow-sm font-sans">
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
