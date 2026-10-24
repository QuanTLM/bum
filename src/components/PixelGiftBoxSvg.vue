<script setup lang="ts">
withDefaults(
  defineProps<{
    boxColor?: string
    ribbonColor?: string
    accentColor?: string
    size?: number
    highlighted?: boolean
  }>(),
  {
    boxColor: '#ff6ba9',
    ribbonColor: '#fff0f6',
    accentColor: '#d92672',
    size: 46,
    highlighted: false,
  }
)
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center select-none transition-transform duration-200"
    :class="highlighted ? 'scale-110 z-30' : ''"
  >
    <!-- Target Highlight Ring when Claw is aimed near this box -->
    <div
      v-if="highlighted"
      class="absolute -inset-1.5 rounded-lg border-2 border-[#ffe47a] bg-pink-200/30 animate-pulse pointer-events-none"
      style="box-shadow: 0 0 12px rgba(255, 228, 122, 0.9)"
    />

    <svg
      :width="size"
      :height="size"
      viewBox="0 0 16 16"
      shape-rendering="crispEdges"
      class="pixelated drop-shadow-[0_3px_0_rgba(89,18,52,0.45)]"
    >
      <!-- Ribbon Bow Top -->
      <path
        d="M4 1h3v1h2V1h3v2h-1v1H5V3H4V1z"
        fill="#6e0f3a"
      />
      <rect x="5" y="2" width="2" height="1" :fill="ribbonColor" />
      <rect x="9" y="2" width="2" height="1" :fill="ribbonColor" />
      <rect x="7" y="2" width="2" height="2" :fill="accentColor" />

      <!-- Box Lid Outer Outline -->
      <rect x="1" y="4" width="14" height="4" fill="#6e0f3a" />
      <!-- Box Lid Fill -->
      <rect x="2" y="5" width="12" height="2" :fill="boxColor" />
      <!-- Lid Highlight -->
      <rect x="2" y="5" width="4" height="1" fill="#ffffff" fill-opacity="0.45" />
      <!-- Lid Center Ribbon -->
      <rect x="7" y="4" width="2" height="4" :fill="ribbonColor" />

      <!-- Box Body Outer Outline -->
      <rect x="2" y="8" width="12" height="7" fill="#6e0f3a" />
      <!-- Box Body Fill -->
      <rect x="3" y="8" width="10" height="6" :fill="boxColor" />
      <!-- Box Body Bottom Shade -->
      <rect x="3" y="13" width="10" height="1" :fill="accentColor" />

      <!-- Horizontal & Vertical Ribbons on Body -->
      <rect x="3" y="10" width="10" height="2" :fill="ribbonColor" />
      <rect x="7" y="8" width="2" height="6" :fill="ribbonColor" />

      <!-- Cute Tiny Pixel Heart Center Seal -->
      <rect x="6" y="9" width="1" height="1" fill="#ff2e7e" />
      <rect x="9" y="9" width="1" height="1" fill="#ff2e7e" />
      <rect x="6" y="10" width="4" height="1" fill="#ff2e7e" />
      <rect x="7" y="11" width="2" height="1" fill="#ff2e7e" />
    </svg>
  </div>
</template>
