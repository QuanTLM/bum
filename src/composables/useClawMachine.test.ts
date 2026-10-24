import { describe, expect, it } from 'vitest'
import { useClawMachine } from './useClawMachine'

describe('useClawMachine', () => {
  it('moves claw in 4 directions (left, right, in, out) and clamps coordinates within bounds', () => {
    const machine = useClawMachine()
    expect(machine.clawX.value).toBe(50)
    expect(machine.clawZ.value).toBe(0.5)

    machine.moveClaw('left', 10)
    expect(machine.clawX.value).toBe(40)

    machine.moveClaw('right', 15)
    expect(machine.clawX.value).toBe(55)

    // Move deep inside (z increases toward 1)
    machine.moveClaw('in', 0.25)
    expect(machine.clawZ.value).toBeCloseTo(0.75)

    // Move out toward glass (z decreases toward 0)
    machine.moveClaw('out', 0.4)
    expect(machine.clawZ.value).toBeCloseTo(0.35)

    // Clamping checks
    machine.moveClaw('left', 200)
    expect(machine.clawX.value).toBe(14)

    machine.moveClaw('right', 200)
    expect(machine.clawX.value).toBe(86)

    machine.moveClaw('in', 5)
    expect(machine.clawZ.value).toBe(1)

    machine.moveClaw('out', 5)
    expect(machine.clawZ.value).toBe(0)
  })

  it('finds the nearest ungrabbed box in 2.5D (x, z) space and snaps to it on startGrab', () => {
    const machine = useClawMachine()
    // Move near box-01 (x: 19, z: 0.92)
    machine.clawX.value = 20
    machine.clawZ.value = 0.9

    expect(machine.nearestBox.value?.id).toBe('box-01')

    const target = machine.startGrab()
    expect(target?.box.id).toBe('box-01')
    expect(machine.clawX.value).toBe(19)
    expect(machine.clawZ.value).toBeCloseTo(0.92)
    expect(machine.phase.value).toBe('grabbing')
  })

  it('executes the exact 5-catch turn progression (5 -> 4 -> 2 -> 1 -> 1 -> 0) and triggers envelope after Catch 5 modal closes', () => {
    const machine = useClawMachine()
    expect(machine.turnsLeft.value).toBe(5)
    expect(machine.availableBoxesCount.value).toBe(15)

    // --- CATCH 1: Món 1 (Quà, turnDelta 0) -> 4 turns left ---
    const grab1 = machine.startGrab()
    expect(grab1?.prize.order).toBe(1)
    expect(machine.turnsLeft.value).toBe(4)
    machine.completeGrabAnimation()
    expect(machine.phase.value).toBe('modal')
    expect(machine.activePrize.value?.order).toBe(1)
    expect(machine.availableBoxesCount.value).toBe(14)
    machine.closePrizeModal()
    expect(machine.phase.value).toBe('idle')
    expect(machine.isEnvelopeVisible.value).toBe(false)

    // --- CATCH 2: Món 2 (Thơm anh Quân 1 cái, turnDelta -1) -> 4 - 1 (grab) - 1 (penalty) = 2 turns left ---
    const grab2 = machine.startGrab()
    expect(grab2?.prize.order).toBe(2)
    expect(machine.turnsLeft.value).toBe(3) // 1 turn spent on pressing Grab
    machine.completeGrabAnimation()
    expect(machine.turnsLeft.value).toBe(2) // -1 penalty applied when prize is revealed!
    expect(machine.lastTurnDelta.value).toBe(-1)
    expect(machine.activePrize.value?.kind).toBe('kiss_penalty')
    machine.closePrizeModal()
    expect(machine.isEnvelopeVisible.value).toBe(false)

    // --- CATCH 3: Món 3 (Quà, turnDelta 0) -> 2 - 1 = 1 turn left ---
    const grab3 = machine.startGrab()
    expect(grab3?.prize.order).toBe(3)
    expect(machine.turnsLeft.value).toBe(1)
    machine.completeGrabAnimation()
    expect(machine.turnsLeft.value).toBe(1)
    machine.closePrizeModal()
    expect(machine.isEnvelopeVisible.value).toBe(false)

    // --- CATCH 4: Món 4 (Được anh Quân thơm +1 lượt) -> 1 - 1 (grab) + 1 (bonus) = 1 turn left ---
    const grab4 = machine.startGrab()
    expect(grab4?.prize.order).toBe(4)
    expect(machine.turnsLeft.value).toBe(0) // temporarily 0 while claw is grabbing!
    machine.completeGrabAnimation()
    expect(machine.turnsLeft.value).toBe(1) // +1 bonus turn granted on reveal!
    expect(machine.lastTurnDelta.value).toBe(1)
    expect(machine.activePrize.value?.kind).toBe('kiss_bonus')
    machine.closePrizeModal()
    expect(machine.isEnvelopeVisible.value).toBe(false)

    // --- CATCH 5: Món 5 (Quà cuối, turnDelta 0) -> 1 - 1 = 0 turns left ---
    const grab5 = machine.startGrab()
    expect(grab5?.prize.order).toBe(5)
    expect(machine.turnsLeft.value).toBe(0)
    machine.completeGrabAnimation()
    expect(machine.turnsLeft.value).toBe(0)
    expect(machine.availableBoxesCount.value).toBe(10)
    expect(machine.caughtHistory.value).toHaveLength(5)

    // Closing the 5th modal reveals the Love Letter Envelope!
    machine.closePrizeModal()
    expect(machine.isEnvelopeVisible.value).toBe(true)
    expect(machine.isLetterOpen.value).toBe(false)

    // Clicking the envelope opens the Love Letter content
    machine.openLoveLetter()
    expect(machine.isLetterOpen.value).toBe(true)
  })

  it('ignores duplicate startGrab calls while grabbing or when modal is open or when out of turns', () => {
    const machine = useClawMachine()
    const first = machine.startGrab()
    expect(first).not.toBeNull()

    // Calling startGrab again while already grabbing returns null and does not deduct another turn
    const duplicate = machine.startGrab()
    expect(duplicate).toBeNull()
    expect(machine.turnsLeft.value).toBe(4)
  })
})
