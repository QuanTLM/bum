import type { GiftConfig } from '@/types/gift'

/**
 * ============================================================================
 * CẤU HÌNH DỮ LIỆU TĨNH CHO "WEBSITE FOR MY CRUSH" (COURTING & FLIRTING THEME)
 * ============================================================================
 * Tông điệu: Tinh tế, ngọt ngào, rung cảm chân thành dành cho người đang tìm hiểu.
 * ============================================================================
 */

export const giftConfig: GiftConfig = {
  // --- 1. HERO & OPENING (FEAT-001) ---
  recipientName: 'Bé Bum',
  heroTagline: 'Một chút ngọt ngào dành riêng cho cô gái khiến lòng anh xao xuyến',
  startButtonText: 'Khám phá điều đặc biệt ✨',

  // --- 2. ALBUM ẢNH KỶ NIỆM (FEAT-002, US-002, US-007) ---
  photos: [
    {
      id: 'photo-1',
      url: '/photos/475124442_598512766134363_2223938753045837867_n.jpg',
      caption: 'Nụ cười rạng rỡ và ánh mắt trong trẻo làm tim anh lỡ một nhịp',
      alt: 'Nụ cười tỏa nắng của em',
      aspect: 'portrait',
      sizeVariant: 'featured',
      displayOrder: 1,
    },
    {
      id: 'photo-2',
      url: '/photos/516378540_716223201029985_1347435443947679046_n.jpg',
      caption: 'Chỉ cần nhìn thấy em, một ngày bình thường cũng bỗng hóa dịu dàng',
      alt: 'Khoảnh khắc dịu dàng',
      aspect: 'portrait',
      sizeVariant: 'tall',
      displayOrder: 2,
    },
    {
      id: 'photo-3',
      url: '/photos/638148963_893061560012814_2213834542886861538_n.jpg',
      caption: 'Mỗi lần được trò chuyện cùng em là một lần thấy mình thật may mắn',
      alt: 'Nụ cười xinh xắn',
      aspect: 'landscape',
      sizeVariant: 'wide',
      displayOrder: 3,
    },
    {
      id: 'photo-4',
      url: '/photos/644295841_901228289196141_838026222082313906_n.jpg',
      caption: 'Có một cô gái nhỏ luôn mang lại năng lượng tích cực cho những người xung quanh',
      alt: 'Cô gái đáng yêu',
      aspect: 'square',
      sizeVariant: 'normal',
      displayOrder: 4,
    },
    {
      id: 'photo-5',
      url: '/photos/494259938_666830245969281_5523388864940736100_n.jpg',
      caption: 'Thích nét mặt đáng yêu này, thích cả những câu chuyện vu vơ của em',
      alt: 'Góc đáng yêu của em',
      aspect: 'portrait',
      sizeVariant: 'tall',
      displayOrder: 5,
    },
    {
      id: 'photo-6',
      url: '/photos/505406645_695741886411450_3087407453953589280_n.jpg',
      caption: 'Hy vọng những hành trình sắp tới, anh sẽ có cơ hội được đồng hành cùng em',
      alt: 'Nụ cười tỏa sáng',
      aspect: 'landscape',
      sizeVariant: 'wide',
      displayOrder: 6,
    },
    {
      id: 'photo-7',
      url: '/photos/frame_001.png',
      caption: 'Mong em luôn rạng rỡ như thế này, vì em xứng đáng với mọi điều ngọt ngào nhất',
      alt: 'Khoảnh khắc tuyệt đẹp',
      aspect: 'portrait',
      sizeVariant: 'featured',
      displayOrder: 7,
    },
  ],

  // --- 3. BỨC THƯ TÂM SỰ (FEAT-003, US-004) ---
  loveLetter: {
    title: 'Gửi cô gái làm lòng anh rung động',
    greeting: 'Chào em, cô gái đáng yêu,',
    paragraphs: [
      'Có những cuộc gặp gỡ vốn dĩ rất tình cờ, nhưng lại mang đến những rung cảm thật khó tả. Từ những câu chuyện vu vơ mỗi ngày, tiếng cười giòn tan đến ánh mắt rạng rỡ của em, tất cả đều đang dần trở thành niềm vui nhỏ mà anh luôn mong đợi.',
      'Anh nhận ra mình hay mỉm cười vu vơ mỗi khi nghĩ về em. Anh muốn được lắng nghe em nhiều hơn, được hiểu thêm về thế giới của em, và cùng em chia sẻ những điều giản dị nhất trong cuộc sống.',
      'Hy vọng trang web nhỏ này sẽ mang đến cho em một chút bất ngờ và niềm vui. Nếu em không phiền, cho anh cơ hội được quan tâm và bước gần hơn vào thế giới của em nhé?',
    ],
    signature: 'Từ người luôn dõi theo em ✨',
    date: 'Gửi gắm sự chân thành',
  },

  // --- 4. LỜI KẾT (FEAT-005, US-006) ---
  finalMessage: {
    headline: 'Cảm ơn em đã xuất hiện và làm một ngày của anh tươi sáng hơn',
    subheadline: 'Mong rằng mỗi ngày trôi qua đều đem đến cho em thật nhiều niềm vui và nụ cười.',
    closingThought: 'Bật mí nhỏ: Anh thích em nhiều hơn một chút mỗi ngày rồi đấy!',
    heartIcon: true,
  },

  // --- 5. BÀI NHẠC NỀN (FEAT-004, US-005, US-008) ---
  audio: {
    src: '/audio/FDownload.app-1407685890836410-(320kbps).mp3',
    title: 'Giai điệu dành cho em',
    artist: 'For My Crush',
    loop: true,
  },
}
