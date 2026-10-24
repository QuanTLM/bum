<script setup lang="ts">
interface FloatingHeart {
  id: number
  left: string
  size: number
  duration: string
  delay: string
  driftX: string
  color: string
}

interface TwinkleStar {
  id: number
  left: string
  top: string
  size: number
  duration: string
  delay: string
  color: string
}

const hearts: FloatingHeart[] = [
  { id: 1, left: '6%', size: 18, duration: '8.5s', delay: '0s', driftX: '16px', color: '#FF2E7E' },
  { id: 2, left: '15%', size: 14, duration: '10.2s', delay: '-2.4s', driftX: '-18px', color: '#FF6BA9' },
  { id: 3, left: '24%', size: 22, duration: '9.4s', delay: '-4.8s', driftX: '14px', color: '#FF4D94' },
  { id: 4, left: '34%', size: 15, duration: '11.1s', delay: '-1.3s', driftX: '-12px', color: '#FF85B3' },
  { id: 5, left: '46%', size: 20, duration: '8.8s', delay: '-5.6s', driftX: '20px', color: '#FF2E7E' },
  { id: 6, left: '57%', size: 16, duration: '10.6s', delay: '-3.1s', driftX: '-15px', color: '#FF5C9E' },
  { id: 7, left: '68%', size: 24, duration: '9.1s', delay: '-6.5s', driftX: '12px', color: '#FF3385' },
  { id: 8, left: '77%', size: 14, duration: '11.4s', delay: '-2.0s', driftX: '-16px', color: '#FF7EB6' },
  { id: 9, left: '86%', size: 19, duration: '8.9s', delay: '-4.2s', driftX: '15px', color: '#FF2E7E' },
  { id: 10, left: '93%', size: 15, duration: '10.0s', delay: '-7.1s', driftX: '-14px', color: '#FF529A' },
  { id: 11, left: '11%', size: 20, duration: '9.8s', delay: '-5.0s', driftX: '18px', color: '#FF4D94' },
  { id: 12, left: '62%', size: 17, duration: '8.3s', delay: '-1.8s', driftX: '-20px', color: '#FF2E7E' },
]

const stars: TwinkleStar[] = [
  { id: 1, left: '9%', top: '10%', size: 12, duration: '2.1s', delay: '0s', color: '#FFF6B3' },
  { id: 2, left: '22%', top: '18%', size: 10, duration: '1.8s', delay: '-0.6s', color: '#FFFFFF' },
  { id: 3, left: '38%', top: '8%', size: 14, duration: '2.5s', delay: '-1.2s', color: '#FFE47A' },
  { id: 4, left: '54%', top: '14%', size: 11, duration: '1.9s', delay: '-0.3s', color: '#FFFFFF' },
  { id: 5, left: '72%', top: '9%', size: 13, duration: '2.3s', delay: '-0.9s', color: '#FFF6B3' },
  { id: 6, left: '88%', top: '16%', size: 11, duration: '2.0s', delay: '-1.5s', color: '#FFFFFF' },
  { id: 7, left: '14%', top: '38%', size: 10, duration: '2.4s', delay: '-0.4s', color: '#FFE47A' },
  { id: 8, left: '85%', top: '34%', size: 12, duration: '1.7s', delay: '-1.1s', color: '#FFF6B3' },
  { id: 9, left: '7%', top: '65%', size: 12, duration: '2.2s', delay: '-0.8s', color: '#FFFFFF' },
  { id: 10, left: '91%', top: '62%', size: 13, duration: '2.6s', delay: '-0.2s', color: '#FFE47A' },
]
</script>

<template>
  <div
    class="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    aria-hidden="true"
  >
    <!-- Dreamy Pink Arcade Sky Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#ffb6d5] via-[#ffd1e6] to-[#ffeaf3]"
    />

    <!-- Subtle Pixel Grid Texture -->
    <div
      class="absolute inset-0 opacity-25"
      style="
        background-image:
          linear-gradient(to right, rgba(255, 77, 148, 0.16) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 77, 148, 0.16) 1px, transparent 1px);
        background-size: 16px 16px;
      "
    />

    <!-- Soft Glowing Aura Behind the Machine -->
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-pink-400/25 blur-3xl"
    />

    <!-- Pixel Art Clouds -->
    <div
      class="absolute top-[7%] left-[4%] opacity-75 animate-cloud-drift"
      style="--cloud-dur: 19s"
    >
      <svg width="96" height="42" viewBox="0 0 24 11" shape-rendering="crispEdges">
        <path
          d="M7 2h6v2h4v2h4v3H3V6h2V4h2V2z"
          fill="#fff5f9"
        />
        <path
          d="M3 8h18v1H3z"
          fill="#ffc2dc"
        />
      </svg>
    </div>

    <div
      class="absolute top-[13%] right-[5%] opacity-70 animate-cloud-drift"
      style="--cloud-dur: 23s"
    >
      <svg width="84" height="36" viewBox="0 0 24 11" shape-rendering="crispEdges">
        <path
          d="M6 3h7v2h5v3H4V5h2V3z"
          fill="#fff5f9"
        />
        <path
          d="M4 8h14v1H4z"
          fill="#ffc2dc"
        />
      </svg>
    </div>

    <!-- Twinkling 8-bit Stars -->
    <div
      v-for="star in stars"
      :key="`star-${star.id}`"
      class="absolute animate-twinkle-pixel"
      :style="{
        left: star.left,
        top: star.top,
        '--twinkle-dur': star.duration,
        '--twinkle-delay': star.delay,
      }"
    >
      <svg
        :width="star.size"
        :height="star.size"
        viewBox="0 0 7 7"
        shape-rendering="crispEdges"
      >
        <path
          d="M3 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"
          :fill="star.color"
        />
        <rect x="3" y="2" width="1" height="1" fill="#ffffff" />
      </svg>
    </div>

    <!-- Floating Pixel Hearts Rising Upward -->
    <div
      v-for="heart in hearts"
      :key="`heart-${heart.id}`"
      class="absolute bottom-0 animate-float-pixel"
      :style="{
        left: heart.left,
        '--float-dur': heart.duration,
        '--float-delay': heart.delay,
        '--drift-x': heart.driftX,
      }"
    >
      <svg
        :width="heart.size"
        :height="heart.size"
        viewBox="0 0 11 10"
        shape-rendering="crispEdges"
      >
        <!-- Pixel Outline -->
        <path
          d="M2 0h2v1h1v1h1V1h1V0h2v1h1v1h1v3h-1v1H9v1H8v1H7v1H6v1H5V9H4V8H3V7H2V6H1V5H0V2h1V1h1V0z"
          fill="#8c1449"
        />
        <!-- Pixel Heart Fill -->
        <path
          d="M2 1h2v1h1v1h1V2h1V1h2v1h1v3H9v1H8v1H7v1H6v1H5V8H4V7H3V6H2V5H1V2h1V1z"
          :fill="heart.color"
        />
        <!-- Pixel Specular Highlight -->
        <rect x="2" y="2" width="2" height="1" fill="#fff0f6" />
        <rect x="2" y="3" width="1" height="1" fill="#fff0f6" />
      </svg>
    </div>

    <!-- Bottom Arcade Checkerboard Horizon Trim -->
    <div
      class="absolute bottom-0 inset-x-0 h-10 opacity-35"
      style="
        background-image: conic-gradient(
          #ff7eb6 90deg,
          #ffe0ee 90deg 180deg,
          #ff7eb6 180deg 270deg,
          #ffe0ee 270deg
        );
        background-size: 20px 20px;
      "
    />
  </div>
</template>
