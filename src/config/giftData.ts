import type { GiftConfig } from '@/types/gift'

/**
 * ============================================================================
 * CẤU HÌNH DỮ LIỆU TĨNH CHO "WEBSITE FOR MY LOVE" (STATIC DATA CONFIG)
 * ============================================================================
 * Dữ liệu kỷ niệm thực tế kết hợp toàn bộ ảnh và nhạc nền từ Creator.
 * ============================================================================
 */

export const giftConfig: GiftConfig = {
  // --- 1. HERO & OPENING (FEAT-001) ---
  recipientName: 'Em Yêu',
  heroTagline: 'Mỗi khoảnh khắc bên em đều là một kỷ niệm vô giá',
  startButtonText: 'Bắt đầu hành trình',

  // --- 2. ALBUM ẢNH KỶ NIỆM (FEAT-002, US-002, US-007) ---
  photos: [
    {
      id: 'photo-1',
      url: '/photos/475124442_598512766134363_2223938753045837867_n.jpg',
      caption: 'Nụ cười ngọt ngào và ánh mắt dịu dàng của em',
      alt: 'Khoảnh khắc ngọt ngào của em',
      aspect: 'portrait',
      sizeVariant: 'featured',
      displayOrder: 1,
    },
    {
      id: 'photo-2',
      url: '/photos/516378540_716223201029985_1347435443947679046_n.jpg',
      caption: 'Những ngày bình yên nhất là những ngày có em bên cạnh',
      alt: 'Bình yên bên nhau',
      aspect: 'portrait',
      sizeVariant: 'tall',
      displayOrder: 2,
    },
    {
      id: 'photo-3',
      url: '/photos/638148963_893061560012814_2213834542886861538_n.jpg',
      caption: 'Từng chuyến đi đều đong đầy nụ cười và niềm hạnh phúc',
      alt: 'Chuyến đi kỷ niệm',
      aspect: 'landscape',
      sizeVariant: 'wide',
      displayOrder: 3,
    },
    {
      id: 'photo-4',
      url: '/photos/644295841_901228289196141_838026222082313906_n.jpg',
      caption: 'Cảm ơn em vì đã luôn là điều tuyệt vời nhất của anh',
      alt: 'Khoảnh khắc tuyệt vời',
      aspect: 'square',
      sizeVariant: 'normal',
      displayOrder: 4,
    },
    {
      id: 'photo-5',
      url: '/photos/494259938_666830245969281_5523388864940736100_n.jpg',
      caption: 'Mỗi kỷ niệm bên em là một thước phim đẹp đẽ',
      alt: 'Thước phim kỷ niệm',
      aspect: 'portrait',
      sizeVariant: 'tall',
      displayOrder: 5,
    },
    {
      id: 'photo-6',
      url: '/photos/505406645_695741886411450_3087407453953589280_n.jpg',
      caption: 'Nguyện cùng em đi qua bao mùa xuân hạ thu đông',
      alt: 'Cùng nhau đi qua năm tháng',
      aspect: 'landscape',
      sizeVariant: 'wide',
      displayOrder: 6,
    },
    {
      id: 'photo-7',
      url: '/photos/frame_001.png',
      caption: 'Mỗi ánh nhìn, mỗi nụ cười đều là tình yêu',
      alt: 'Khung hình kỷ niệm tuyệt đẹp',
      aspect: 'portrait',
      sizeVariant: 'featured',
      displayOrder: 7,
    },
  ],

  // --- 3. BỨC THƯ TÌNH CẢM (FEAT-003, US-004) ---
  loveLetter: {
    title: 'Gửi em, người anh yêu',
    greeting: 'Em thương,',
    paragraphs: [
      'Có những ngày bình thường bỗng trở nên thật đặc biệt chỉ vì có em xuất hiện. Từ những câu chuyện vu vơ mỗi tối, tiếng cười giòn tan khi cùng ăn món em thích, đến những cái nắm tay thật chặt khi đi qua dòng người tấp nập.',
      'Anh luôn biết ơn từng khoảnh khắc nhỏ bé mà chúng mình đã cùng nhau sẻ chia. Dù thời gian có trôi đi thật nhanh, tình cảm này vẫn nguyên vẹn và ngày một đong đầy hơn.',
      'Cảm ơn em đã luôn là ánh sáng dịu dàng, là chốn bình yên nhất mà anh luôn muốn tìm về sau những bộn bề của cuộc sống.',
    ],
    signature: 'Yêu em thật nhiều ❤️',
    date: 'Mãi mãi bên nhau',
  },

  // --- 4. LỜI KẾT (FEAT-005, US-006) ---
  finalMessage: {
    headline: 'You are my today and all of my tomorrows',
    subheadline: 'Hành trình này sẽ luôn tiếp tục cùng em.',
    closingThought: 'Cảm ơn em đã bước vào thế giới của anh.',
    heartIcon: true,
  },

  // --- 5. BÀI NHẠC NỀN (FEAT-004, US-005, US-008) ---
  audio: {
    src: '/audio/FDownload.app-1407685890836410-(320kbps).mp3',
    title: 'Giai điệu tình yêu',
    artist: 'For My Love',
    loop: true,
  },
}
