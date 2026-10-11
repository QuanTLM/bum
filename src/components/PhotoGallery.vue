<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { giftConfig } from '@/config/giftData'
import PhotoLightbox from '@/components/PhotoLightbox.vue'
import { ImageOff, Heart, Eye } from '@lucide/vue'
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
const stackContainer = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

function openLightbox(index: number) {
  selectedPhotoIndex.value = index
  isLightboxOpen.value = true
}

function closeLightbox() {
  isLightboxOpen.value = false
}

function handleImageError(id: string) {
  failedImageIds.value.add(id)
}

onMounted(() => {
  if (prefersReducedMotion() || !stackContainer.value) return

  ctx = gsap.context(() => {
    const cardEls = gsap.utils.toArray<HTMLElement>('.photo-card')

    cardEls.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
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
    <!-- Section Title & Subtitle -->
    <div class="text-center mb-12 space-y-2.5">
      <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-romantic-100/80 text-romantic-700 text-xs font-medium ring-1 ring-romantic-200/60 shadow-sm">
        <Heart class="w-3.5 h-3.5 fill-romantic-500" />
        <span>Góc nhỏ đáng yêu</span>
      </div>
      <h2 class="font-serif text-3xl font-semibold text-romantic-900 tracking-tight">
        Những Khoảnh Khắc Của Em
      </h2>
      <p class="text-xs text-warm-700/80 max-w-xs mx-auto leading-relaxed font-light">
        Mỗi nụ cười của em đều là một khoảnh khắc làm lòng anh rung động.
      </p>
    </div>

    <!-- Beautiful Vertical Photo Stream with generous whitespace and zero overlap -->
    <div ref="stackContainer" class="relative pb-16 space-y-12 sm:space-y-16">
      <div
        v-for="(photo, index) in sortedPhotos"
        :key="photo.id"
        class="photo-card w-full flex items-center justify-center transform-gpu"
      >
        <!-- Polaroid-Style Art Card Container with Safe-Padding Corner Architecture -->
        <div
          tabindex="0"
          role="button"
          :aria-label="photo.caption || 'Xem ảnh ' + (index + 1)"
          @click="openLightbox(index)"
          @keydown.enter="openLightbox(index)"
          @keydown.space.prevent="openLightbox(index)"
          class="group relative w-full bg-white rounded-[2rem] p-4.5 sm:p-5 shadow-[0_20px_50px_-15px_rgba(46,43,42,0.22)] border border-warm-200 cursor-pointer transition-all duration-300 ease-smooth active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-romantic-500 overflow-hidden"
        >
          <!-- Card Top Bar: Generous Inset to prevent corner clipping (Fix lỗi ở góc) -->
          <div class="flex items-center justify-between px-3 pt-1 pb-3 text-xs text-warm-600 font-medium">
            <span class="font-mono text-[11px] tracking-wider uppercase text-romantic-700 font-semibold truncate max-w-[150px]">
              Khoảnh khắc #0{{ index + 1 }}
            </span>
            <div class="flex items-center gap-1 text-[11px] text-warm-500 font-sans shrink-0">
              <Eye class="w-3.5 h-3.5 text-romantic-500 opacity-80" />
              <span>Chạm để phóng to</span>
            </div>
          </div>

          <!-- Main Photo Container with 4:3 Aspect Frame -->
          <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-warm-100 border border-warm-200/60 shadow-inner">
            <!-- Broken image fallback -->
            <div
              v-if="failedImageIds.has(photo.id)"
              class="w-full h-full flex flex-col items-center justify-center p-4 text-center text-warm-800/50 bg-warm-200/50"
            >
              <ImageOff class="w-8 h-8 text-warm-400 mb-2" />
              <span class="text-[11px]">Hình ảnh đang cập nhật</span>
            </div>

            <!-- Crisp Real Image with gentle hover scale -->
            <img
              v-else
              :src="photo.url"
              :alt="photo.alt || photo.caption || 'Khoảnh khắc đáng yêu'"
              @error="handleImageError(photo.id)"
              class="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <!-- Card Bottom Caption -->
          <div class="pt-4 px-2 text-center space-y-1.5 min-h-[64px] flex flex-col justify-center">
            <p v-if="photo.caption" class="text-sm font-medium text-warm-900 leading-snug font-sans">
              {{ photo.caption }}
            </p>
            <div class="flex justify-center items-center gap-1.5 pt-0.5 text-romantic-500 text-xs">
              <Heart class="w-3 h-3 fill-romantic-500" />
              <span class="font-serif italic text-[11px] text-romantic-700/80">Điều làm anh rung động</span>
              <Heart class="w-3 h-3 fill-romantic-500" />
            </div>
          </div>
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
