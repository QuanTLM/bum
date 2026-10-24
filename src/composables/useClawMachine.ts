import { computed, ref } from 'vue'
import { clawConfig } from '@/config/clawConfig'
import type { ClawMachineConfig, ClawPrize, GiftBoxItem } from '@/types/claw'

export type ClawDirection = 'left' | 'right' | 'in' | 'out'
export type ClawPhase = 'idle' | 'grabbing' | 'modal' | 'completed'

export interface GrabTargetResult {
  box: GiftBoxItem
  prize: ClawPrize
}

const MIN_X = 14
const MAX_X = 86
const MIN_Z = 0
const MAX_Z = 1

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function useClawMachine(customConfig: ClawMachineConfig = clawConfig) {
  const turnsLeft = ref<number>(customConfig.initialTurns)
  const caughtIndex = ref<number>(0)
  const clawX = ref<number>(50)
  const clawZ = ref<number>(0.5)
  const phase = ref<ClawPhase>('idle')

  const boxes = ref<GiftBoxItem[]>(
    customConfig.giftBoxes.map((b) => ({ ...b, grabbed: Boolean(b.grabbed) }))
  )

  const activeBox = ref<GiftBoxItem | null>(null)
  const activePrize = ref<ClawPrize | null>(null)
  const caughtHistory = ref<ClawPrize[]>([])
  const lastTurnDelta = ref<-1 | 0 | 1>(0)
  const turnDeltaTick = ref<number>(0)

  const isEnvelopeVisible = ref<boolean>(false)
  const isLetterOpen = ref<boolean>(false)

  const availableBoxes = computed(() =>
    boxes.value.filter((box) => !box.grabbed)
  )

  const availableBoxesCount = computed(() => availableBoxes.value.length)

  /**
   * Finds the nearest available gift box in 2.5D (x, z) space.
   * Weighting z*45 balances the 0..1 depth axis against the 14..86 horizontal percentage axis.
   */
  const nearestBox = computed<GiftBoxItem | null>(() => {
    const candidates = availableBoxes.value
    if (candidates.length === 0) return null

    let best = candidates[0]
    let bestDist = Infinity

    for (const candidate of candidates) {
      const dx = candidate.x - clawX.value
      const dz = (candidate.z - clawZ.value) * 45
      const distSq = dx * dx + dz * dz
      if (distSq < bestDist) {
        bestDist = distSq
        best = candidate
      }
    }

    return best
  })

  function moveClaw(direction: ClawDirection, step?: number) {
    if (phase.value !== 'idle') return

    switch (direction) {
      case 'left': {
        const delta = step ?? 4.5
        clawX.value = Number(clamp(clawX.value - delta, MIN_X, MAX_X).toFixed(2))
        break
      }
      case 'right': {
        const delta = step ?? 4.5
        clawX.value = Number(clamp(clawX.value + delta, MIN_X, MAX_X).toFixed(2))
        break
      }
      case 'in': {
        const delta = step ?? 0.08
        clawZ.value = Number(clamp(clawZ.value + delta, MIN_Z, MAX_Z).toFixed(3))
        break
      }
      case 'out': {
        const delta = step ?? 0.08
        clawZ.value = Number(clamp(clawZ.value - delta, MIN_Z, MAX_Z).toFixed(3))
        break
      }
    }
  }

  function startGrab(): GrabTargetResult | null {
    if (phase.value !== 'idle') return null
    if (turnsLeft.value <= 0) return null
    if (caughtIndex.value >= customConfig.prizes.length) return null

    const targetBox = nearestBox.value
    if (!targetBox) return null

    const prize = customConfig.prizes[caughtIndex.value]
    if (!prize) return null

    // Deduct 1 turn for pressing Grab
    turnsLeft.value = Math.max(0, turnsLeft.value - 1)
    lastTurnDelta.value = 0

    // Snap claw gently to the target box's 2.5D coordinates so the grab looks pinpoint accurate
    clawX.value = targetBox.x
    clawZ.value = targetBox.z

    activeBox.value = targetBox
    activePrize.value = prize
    phase.value = 'grabbing'

    return { box: targetBox, prize }
  }

  function completeGrabAnimation() {
    if (phase.value !== 'grabbing' || !activePrize.value || !activeBox.value) {
      return
    }

    // Mark box as grabbed
    const boxRecord = boxes.value.find((b) => b.id === activeBox.value?.id)
    if (boxRecord) {
      boxRecord.grabbed = true
    }

    // Apply prize turnDelta (-1 for Prize 2, +1 for Prize 4)
    const delta = activePrize.value.turnDelta
    lastTurnDelta.value = delta
    if (delta !== 0) {
      turnsLeft.value = Math.max(0, turnsLeft.value + delta)
      turnDeltaTick.value += 1
    }

    caughtHistory.value.push(activePrize.value)
    caughtIndex.value += 1
    phase.value = 'modal'
  }

  function closePrizeModal() {
    if (phase.value !== 'modal') return

    const finishedAllPrizes =
      caughtIndex.value >= customConfig.prizes.length || turnsLeft.value <= 0

    activeBox.value = null
    activePrize.value = null

    if (finishedAllPrizes) {
      phase.value = 'completed'
      isEnvelopeVisible.value = true
    } else {
      phase.value = 'idle'
    }
  }

  function openLoveLetter() {
    isLetterOpen.value = true
  }

  function closeLoveLetter() {
    isLetterOpen.value = false
  }

  function resetGame() {
    turnsLeft.value = customConfig.initialTurns
    caughtIndex.value = 0
    clawX.value = 50
    clawZ.value = 0.5
    phase.value = 'idle'
    activeBox.value = null
    activePrize.value = null
    caughtHistory.value = []
    lastTurnDelta.value = 0
    isEnvelopeVisible.value = false
    isLetterOpen.value = false
    boxes.value = customConfig.giftBoxes.map((b) => ({
      ...b,
      grabbed: false,
    }))
  }

  return {
    turnsLeft,
    caughtIndex,
    clawX,
    clawZ,
    phase,
    boxes,
    availableBoxes,
    availableBoxesCount,
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
  }
}
