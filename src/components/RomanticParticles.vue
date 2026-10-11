<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { prefersReducedMotion } from '@/utils/motion'

interface Petal {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  rotation: number
  rotationSpeed: number
  opacity: number
  swayAngle: number
  swaySpeed: number
  color: string
}

interface HeartParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  scale: number
  opacity: number
  rotation: number
  color: string
  life: number
  maxLife: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId: number | null = null
let width = 0
let height = 0
let petals: Petal[] = []
let hearts: HeartParticle[] = []

const petalColors = [
  'rgba(244, 191, 201, 0.75)', // romantic-300
  'rgba(233, 146, 162, 0.70)', // romantic-400
  'rgba(217, 101, 122, 0.65)', // romantic-500
  'rgba(252, 238, 241, 0.85)', // romantic-100
]

const heartColors = [
  '#C2485E', // romantic-600
  '#D9657A', // romantic-500
  '#E992A2', // romantic-400
  '#F4BFC9', // romantic-300
]

function createPetal(initialY?: number): Petal {
  return {
    x: Math.random() * width,
    y: initialY !== undefined ? initialY : -20 - Math.random() * 50,
    size: 9 + Math.random() * 8,
    speedY: 0.8 + Math.random() * 1.2,
    speedX: -0.4 + Math.random() * 0.8,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.03,
    opacity: 0.4 + Math.random() * 0.45,
    swayAngle: Math.random() * Math.PI * 2,
    swaySpeed: 0.02 + Math.random() * 0.02,
    color: petalColors[Math.floor(Math.random() * petalColors.length)],
  }
}

function spawnHeartBurst(clientX: number, clientY: number) {
  if (prefersReducedMotion()) return
  const count = 7
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
    const speed = 1.5 + Math.random() * 2.5
    hearts.push({
      x: clientX,
      y: clientY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.8, // bias upward
      size: 10 + Math.random() * 8,
      scale: 1,
      opacity: 0.95,
      rotation: (Math.random() - 0.5) * 0.4,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      life: 0,
      maxLife: 35 + Math.random() * 20,
    })
  }
}

function handlePointerDown(e: MouseEvent | TouchEvent) {
  let clientX = 0
  let clientY = 0
  if ('touches' in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else if ('clientX' in e) {
    clientX = (e as MouseEvent).clientX
    clientY = (e as MouseEvent).clientY
  }
  spawnHeartBurst(clientX, clientY)
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.fillStyle = p.color
  ctx.globalAlpha = p.opacity

  // Draw natural curved rose petal shape
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size)
  ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0)
  ctx.fill()

  ctx.restore()
}

function drawHeart(ctx: CanvasRenderingContext2D, h: HeartParticle) {
  ctx.save()
  ctx.translate(h.x, h.y)
  ctx.rotate(h.rotation)
  ctx.scale(h.scale, h.scale)
  ctx.fillStyle = h.color
  ctx.globalAlpha = h.opacity

  // Standard heart curve
  const s = h.size / 2
  ctx.beginPath()
  ctx.moveTo(0, s * 0.4)
  ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.6, 0, s * 1.4)
  ctx.bezierCurveTo(s * 1.2, s * 0.6, s, -s * 0.5, 0, s * 0.4)
  ctx.fill()

  ctx.restore()
}

function render() {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  // 1. Update and draw petals
  for (let i = 0; i < petals.length; i++) {
    const p = petals[i]
    p.swayAngle += p.swaySpeed
    p.x += p.speedX + Math.sin(p.swayAngle) * 0.8
    p.y += p.speedY
    p.rotation += p.rotationSpeed

    if (p.y > height + 25 || p.x < -30 || p.x > width + 30) {
      petals[i] = createPetal(-20)
    }

    drawPetal(ctx, p)
  }

  // 2. Update and draw hearts
  for (let i = hearts.length - 1; i >= 0; i--) {
    const h = hearts[i]
    h.life++
    h.x += h.vx
    h.y += h.vy
    h.vy += 0.04 // slight gravity
    h.vx *= 0.98 // friction
    const progress = h.life / h.maxLife
    h.opacity = Math.max(0, 1 - progress)
    h.scale = Math.max(0.2, 1 - progress * 0.4)

    if (h.life >= h.maxLife) {
      hearts.splice(i, 1)
    } else {
      drawHeart(ctx, h)
    }
  }

  animId = requestAnimationFrame(render)
}

function initCanvas() {
  if (!canvasRef.value || typeof window === 'undefined') return
  const canvas = canvasRef.value
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = window.innerWidth
  height = window.innerHeight

  canvas.width = width * dpr
  canvas.height = height * dpr
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
  }

  // Populate initial petals spread across screen
  const maxPetals = width < 640 ? 22 : 35
  petals = []
  for (let i = 0; i < maxPetals; i++) {
    petals.push(createPetal(Math.random() * height))
  }
}

function onVisibilityChange() {
  if (document.hidden) {
    if (animId) {
      cancelAnimationFrame(animId)
      animId = null
    }
  } else if (!prefersReducedMotion() && !animId) {
    animId = requestAnimationFrame(render)
  }
}

onMounted(() => {
  if (prefersReducedMotion()) return

  initCanvas()
  animId = requestAnimationFrame(render)

  window.addEventListener('resize', initCanvas, { passive: true })
  window.addEventListener('pointerdown', handlePointerDown, { passive: true })
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  if (animId) {
    cancelAnimationFrame(animId)
    animId = null
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', initCanvas)
    window.removeEventListener('pointerdown', handlePointerDown)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 w-full h-full pointer-events-none z-[15]"
    aria-hidden="true"
  ></canvas>
</template>
