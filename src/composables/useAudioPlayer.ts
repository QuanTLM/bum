import { ref, readonly } from 'vue'
import { clawConfig } from '@/config/clawConfig'

const isPlaying = ref(false)
const isLoaded = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const isUserInitiated = ref(false)
const volume = ref(0.7)

let audioElement: HTMLAudioElement | null = null

function clampVolume(val: number): number {
  return Math.min(1, Math.max(0, Number(val.toFixed(2))))
}

function initAudio() {
  if (typeof window === 'undefined' || audioElement) return

  audioElement = new Audio(clawConfig.audio.src)
  audioElement.loop = clawConfig.audio.loop ?? true
  audioElement.preload = 'auto'
  audioElement.volume = volume.value

  audioElement.addEventListener('canplaythrough', () => {
    isLoaded.value = true
  })

  audioElement.addEventListener('play', () => {
    isPlaying.value = true
    hasError.value = false
  })

  audioElement.addEventListener('pause', () => {
    isPlaying.value = false
  })

  audioElement.addEventListener('error', (e) => {
    isPlaying.value = false
    hasError.value = true
    errorMessage.value = 'Không thể phát bài hát nền. Trải nghiệm vẫn tiếp tục bình thường!'
    console.warn('Audio playback error (non-blocking per BR-032):', e)
  })
}

function setVolume(nextVolume: number) {
  volume.value = clampVolume(nextVolume)
  if (audioElement) {
    audioElement.volume = volume.value
  }
}

function changeVolume(delta: number): number {
  setVolume(volume.value + delta)
  return volume.value
}

async function startPlayback(isAutoAttempt: boolean = false): Promise<boolean> {
  initAudio()
  isUserInitiated.value = true
  if (!audioElement) return false

  try {
    audioElement.volume = volume.value
    await audioElement.play()
    isPlaying.value = true
    hasError.value = false
    return true
  } catch (err: any) {
    console.warn('Autoplay prevented or audio source failed (BR-032, US-008):', err)
    if (!isAutoAttempt) {
      hasError.value = true
      errorMessage.value = 'Âm thanh bị chặn bởi trình duyệt hoặc mạng. Bấm nút nhạc để thử lại!'
    }
    isPlaying.value = false
    return false
  }
}

function togglePlay() {
  initAudio()
  if (!audioElement) return

  if (isPlaying.value) {
    audioElement.pause()
  } else {
    audioElement.volume = volume.value
    audioElement.play().catch((err) => {
      hasError.value = true
      errorMessage.value = 'Không thể phát nhạc. Vui lòng thử lại sau.'
      console.warn('Audio play toggle failed:', err)
    })
  }
}

function dismissError() {
  hasError.value = false
}

export function useAudioPlayer() {
  return {
    isPlaying: readonly(isPlaying),
    isLoaded: readonly(isLoaded),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),
    isUserInitiated: readonly(isUserInitiated),
    volume: readonly(volume),
    setVolume,
    changeVolume,
    startPlayback,
    togglePlay,
    dismissError,
  }
}
