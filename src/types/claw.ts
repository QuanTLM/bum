export type PrizeKind = 'gift' | 'kiss_penalty' | 'kiss_bonus'

export type BoxPaletteVariant =
  | 'strawberry'
  | 'rose'
  | 'peach'
  | 'berry'
  | 'vanilla'
  | 'blossom'

export interface ClawPrize {
  id: string
  order: 1 | 2 | 3 | 4 | 5
  kind: PrizeKind
  badgeText: string
  title: string
  subtitle: string
  description: string
  /** Optional photo or illustration URL for the gift */
  imageUrl?: string
  /** Extra turn adjustment applied when this prize is caught (-1, 0, or +1) */
  turnDelta: -1 | 0 | 1
  turnDeltaLabel?: string
  palette: BoxPaletteVariant
}

export interface GiftBoxItem {
  id: string
  /** Horizontal position in cabinet percentage (14 to 86) */
  x: number
  /** 2.5D Depth in cabinet: 0 = front (closest to glass), 0.5 = middle, 1 = back (deepest inside) */
  z: number
  /** Visual tilt in degrees (-8 to 8) for natural arcade pile look */
  tilt: number
  palette: BoxPaletteVariant
  ribbonColor: string
  boxColor: string
  accentColor: string
  grabbed?: boolean
}

export interface ClawLoveLetterConfig {
  envelopeBadge: string
  envelopePrompt: string
  title: string
  greeting: string
  paragraphs: string[]
  signature: string
  dateNote: string
}

export interface ClawAudioConfig {
  src: string
  title: string
  artist: string
  loop: boolean
}

export interface ClawMachineConfig {
  recipientName: string
  senderName: string
  machineTitle: string
  machineSubtitle: string
  initialTurns: number
  prizes: ClawPrize[]
  giftBoxes: GiftBoxItem[]
  loveLetter: ClawLoveLetterConfig
  audio: ClawAudioConfig
}
