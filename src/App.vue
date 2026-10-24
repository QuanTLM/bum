<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import PixelHeartBackground from '@/components/PixelHeartBackground.vue'
import PixelClawMachine from '@/components/PixelClawMachine.vue'
import PrizeRevealModal from '@/components/PrizeRevealModal.vue'
import PixelLoveLetterModal from '@/components/PixelLoveLetterModal.vue'
import { clawConfig } from '@/config/clawConfig'
import { useClawMachine, type ClawDirection } from '@/composables/useClawMachine'
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import type { ClawPrize } from '@/types/claw'
import {
  isSfxMuted,
  playMoveTick,
  setSfxMuted,
  setSfxVolume,
} from '@/utils/pixelAudio'

const {
  turnsLeft,
  caughtIndex,
  clawX,
  clawZ,
  phase,
  boxes,
  nearestBox,
  activeBox,
  activePrize,
  caughtHistory,
  lastTurnDelta,
  turnDeltaTick,
  isEnvelopeVisible,
  isLetterOpen,
  moveClaw,
  startGrab,
  completeGrabAnimation,
  closePrizeModal,
  openLoveLetter,
  closeLoveLetter,
  resetGame,
} = useClawMachine(clawConfig)

const {
  startPlayback,
  togglePlay,
  isPlaying,
  volume,
  changeVolume,
  setVolume,
} = useAudioPlayer()

const muted = ref(isSfxMuted())
const previousVolumeBeforeMute = ref(0.7)
const replayModalPrize = ref<ClawPrize | null>(null)

const volumePercent = computed(() =>
  muted.value ? 0 : Math.round(volume.value * 100)
)

const displayedModalPrize = computed<ClawPrize | null>(() => {
  if (phase.value === 'modal' && activePrize.value) {
    return activePrize.value
  }
  return replayModalPrize.value
})

const isReplayModal = computed(() =>
  Boolean(replayModalPrize.value && phase.value !== 'modal')
)

function handleMove(direction: ClawDirection) {
  moveClaw(direction)
}

function handleGrab() {
  startGrab()
}

function handleGrabAnimationComplete() {
  completeGrabAnimation()
}

function handleModalClose() {
  if (replayModalPrize.value && phase.value !== 'modal') {
    replayModalPrize.value = null
    return
  }
  closePrizeModal()
}

function handleSelectHistoryPrize(prize: ClawPrize) {
  if (phase.value === 'grabbing') return
  replayModalPrize.value = prize
}

function handleToggleSound() {
  const nextMuted = !muted.value
  muted.value = nextMuted
  setSfxMuted(nextMuted)

  if (nextMuted) {
    previousVolumeBeforeMute.value = volume.value > 0 ? volume.value : 0.7
    if (isPlaying.value) {
      togglePlay()
    }
  } else {
    const restored =
      volume.value > 0 ? volume.value : previousVolumeBeforeMute.value
    setVolume(restored)
    setSfxVolume(restored)
    if (!isPlaying.value) {
      startPlayback(false)
    }
    playMoveTick()
  }
}

function handleVolumeStep(delta: number) {
  if (muted.value && delta > 0) {
    muted.value = false
    setSfxMuted(false)
  }

  const nextVol = changeVolume(delta)
  setSfxVolume(nextVol)

  if (nextVol <= 0) {
    muted.value = true
    setSfxMuted(true)
    if (isPlaying.value) {
      togglePlay()
    }
  } else {
    muted.value = false
    setSfxMuted(false)
    if (!isPlaying.value) {
      startPlayback(false)
    }
    playMoveTick()
  }
}

let autoPlayTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  setSfxVolume(volume.value)
  autoPlayTimer = setTimeout(async () => {
    const ok = await startPlayback(true)
    if (!ok) {
      const resumeOnTouch = async () => {
        if (!isPlaying.value && !muted.value) {
          await startPlayback(false)
        }
        window.removeEventListener('pointerdown', resumeOnTouch)
        window.removeEventListener('touchstart', resumeOnTouch)
      }
      window.addEventListener('pointerdown', resumeOnTouch, {
        once: true,
        passive: true,
      })
      window.addEventListener('touchstart', resumeOnTouch, {
        once: true,
        passive: true,
      })
    }
  }, 600)
})

onUnmounted(() => {
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer)
  }
})
</script>

<template>
  <div
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-between overflow-x-hidden py-1.5"
  >
    <!-- Animated Pink Pixel Heart & Sparkle Background -->
    <PixelHeartBackground />

    <!-- Top Compact Mobile Status Bar with Volume Controls -->
    <header
      class="relative z-20 w-full max-w-[410px] px-2.5 pt-1 pb-2 flex items-center justify-between gap-1.5"
    >
      <div
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fff0f6]/95 border-2 border-[#8c1449] shadow-[0_2px_0_#8c1449] shrink-0"
      >
        <span class="text-xs">🎀</span>
        <span class="font-pixel text-base leading-none font-bold text-[#8c1449]">
          {{ clawConfig.recipientName }}
        </span>
      </div>

      <div class="flex items-center gap-1.5">
        <!-- Re-open Love Letter button if all 5 gifts are completed -->
        <button
          v-if="phase === 'completed'"
          type="button"
          class="arcade-btn px-2 py-1 rounded-full bg-[#ffe47a] border-2 border-[#8c1449] shadow-[0_2px_0_#8c1449] font-pixel text-sm font-bold text-[#8c1449] flex items-center gap-1"
          @click="isEnvelopeVisible = true"
        >
          <span>💌 Thư</span>
        </button>

        <!-- Pixel Volume Control Capsule (- / % / + & Mute) -->
        <div
          class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#fff0f6]/95 border-2 border-[#8c1449] shadow-[0_2px_0_#8c1449]"
          role="group"
          aria-label="Điều chỉnh âm lượng"
        >
          <!-- Mute / Unmute Toggle -->
          <button
            type="button"
            :aria-label="muted ? 'Bật âm thanh' : 'Tắt âm thanh'"
            class="arcade-btn w-6 h-6 rounded-full bg-[#ffd6e7] border border-[#8c1449] flex items-center justify-center text-xs"
            @click="handleToggleSound"
          >
            <span>
              {{
                muted || volumePercent === 0
                  ? '🔇'
                  : volumePercent < 50
                    ? '🔉'
                    : '🔊'
              }}
            </span>
          </button>

          <!-- Volume Down (-) -->
          <button
            type="button"
            aria-label="Giảm âm lượng"
            :disabled="muted || volumePercent <= 0"
            class="arcade-btn w-6 h-6 rounded-full bg-[#ff7eb6] text-white border border-[#8c1449] font-pixel text-base leading-none font-bold flex items-center justify-center disabled:opacity-40"
            @click="handleVolumeStep(-0.1)"
          >
            -
          </button>

          <!-- Volume Percentage Readout -->
          <span
            class="font-pixel text-sm leading-none font-bold text-[#8c1449] min-w-[34px] text-center"
          >
            {{ volumePercent }}%
          </span>

          <!-- Volume Up (+) -->
          <button
            type="button"
            aria-label="Tăng âm lượng"
            :disabled="!muted && volumePercent >= 100"
            class="arcade-btn w-6 h-6 rounded-full bg-[#ff4d94] text-white border border-[#8c1449] font-pixel text-base leading-none font-bold flex items-center justify-center disabled:opacity-40"
            @click="handleVolumeStep(0.1)"
          >
            +
          </button>
        </div>
      </div>
    </header>

    <!-- Main 2.5D Pixel Claw Machine Cabinet -->
    <main class="relative z-10 w-full flex-1 flex items-center justify-center">
      <PixelClawMachine
        :machine-title="clawConfig.machineTitle"
        :machine-subtitle="clawConfig.machineSubtitle"
        :turns-left="turnsLeft"
        :caught-count="caughtIndex"
        :total-prizes="clawConfig.prizes.length"
        :claw-x="clawX"
        :claw-z="clawZ"
        :phase="phase"
        :boxes="boxes"
        :nearest-box-id="nearestBox?.id ?? null"
        :active-box="activeBox"
        :last-turn-delta="lastTurnDelta"
        :turn-delta-tick="turnDeltaTick"
        :caught-history="caughtHistory"
        @move="handleMove"
        @grab="handleGrab"
        @grab-animation-complete="handleGrabAnimationComplete"
        @select-history-prize="handleSelectHistoryPrize"
      />
    </main>

    <!-- Prize Reveal Modal (with smooth GSAP box-shake & pop-open animation) -->
    <PrizeRevealModal
      :prize="displayedModalPrize"
      :turns-left="turnsLeft"
      :is-replay-view="isReplayModal"
      @close="handleModalClose"
    />

    <!-- Final Interactive Pixel Love Letter Envelope & Unfolded Message -->
    <PixelLoveLetterModal
      :visible="isEnvelopeVisible"
      :is-letter-open="isLetterOpen"
      :letter="clawConfig.loveLetter"
      :caught-prizes="caughtHistory"
      @open-letter="openLoveLetter"
      @close-letter="closeLoveLetter"
      @replay-game="resetGame"
    />
  </div>
</template>
