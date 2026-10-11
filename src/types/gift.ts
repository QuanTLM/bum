/**
 * Data contracts and types for Website For My Love
 * Traceability: DATA-001 to DATA-006, DEC-019, DEC-029, DEC-034
 */

export type PhotoAspect = 'portrait' | 'landscape' | 'square' | 'wide'
export type PhotoSizeVariant = 'normal' | 'tall' | 'wide' | 'featured'

export interface PhotoItem {
  id: string
  url: string
  caption?: string
  alt?: string
  aspect?: PhotoAspect
  sizeVariant?: PhotoSizeVariant
  /** Thứ tự hiển thị do Creator chỉ định thủ công (DEC-034, US-007) */
  displayOrder: number
}

export interface LoveLetterConfig {
  title?: string
  greeting?: string
  paragraphs: string[]
  signature?: string
  date?: string
}

export interface FinalMessageConfig {
  headline: string
  subheadline?: string
  closingThought?: string
  heartIcon?: boolean
}

export interface AudioConfig {
  /** Đường dẫn file audio (hỗ trợ file cục bộ trong /audio/ hoặc URL hợp lệ) */
  src: string
  title?: string
  artist?: string
  /** Mặc định true theo OQ-021 */
  loop?: boolean
}

export interface GiftConfig {
  /** Tên người nhận hiển thị tại Hero (DATA-001, FR-001) */
  recipientName: string
  heroTagline?: string
  startButtonText?: string

  /** Danh sách ảnh kỷ niệm (DATA-002, FEAT-002) */
  photos: PhotoItem[]

  /** Bức thư tình cảm gần cuối trang (DATA-003, FEAT-003) */
  loveLetter: LoveLetterConfig

  /** Lời kết ở section riêng cuối trang (DATA-004, FEAT-005) */
  finalMessage: FinalMessageConfig

  /** Cấu hình bài nhạc nền (DATA-005, FEAT-004) */
  audio: AudioConfig
}
