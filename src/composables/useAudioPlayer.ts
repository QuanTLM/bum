import { ref, readonly } from 'vue'
import { giftConfig } from '@/config/giftData'

const isPlaying = ref(false)
const isLoaded = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const isUserInitiated = ref(false)

let audioElement: HTMLAudioElement | null = null

function initAudio() {
  if (typeof window === 'undefined' || audioElement) return

  audioElement = new Audio(giftConfig.audio.src)
  audioElement.loop = giftConfig.audio.loop ?? true
  audioElement.preload = 'auto'

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

async function startPlayback(isAutoAttempt: boolean = false): Promise<boolean> {
  initAudio()
  isUserInitiated.value = true
  if (!audioElement) return false

  try {
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
    startPlayback,
    togglePlay,
    dismissError,
  }
}
