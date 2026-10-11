import type { GiftConfig } from '@/types/gift'

/**
 * ============================================================================
 * CẤU HÌNH DỮ LIỆU TĨNH CHO "WEBSITE FOR MY LOVE" (STATIC DATA CONFIG)
 * ============================================================================
 * Hướng dẫn dành cho Creator (US-007, US-010, RULE-006):
 * 1. Trong giai đoạn phát triển (Dev), dữ liệu dưới đây sử dụng placeholder mẫu.
 * 2. Trước khi tặng (Gift Release Gate - AC-031..034):
 *    - Cập nhật `recipientName` thành tên người nhận thực tế (DATA-001).
 *    - Đặt các file ảnh kỷ niệm (10-30 ảnh) vào thư mục `public/photos/` và
 *      cập nhật mảng `photos` với thứ tự `displayOrder` mong muốn (DEC-034).
 *    - Cập nhật nội dung bức thư `loveLetter` đã được Creator duyệt (DATA-003).
 *    - Cập nhật lời kết `finalMessage` (DATA-004).
 *    - Đặt file nhạc chính thức (.mp3) vào `public/audio/` và cập nhật `audio.src` (DATA-005).
 * ============================================================================
 */

export const giftConfig: GiftConfig = {
  // --- 1. HERO & OPENING (FEAT-001) ---
  recipientName: 'Em Yêu', // Thay bằng tên hoặc biệt danh người nhận thực tế
  heroTagline: 'Mỗi khoảnh khắc bên em đều là một kỷ niệm vô giá',
  startButtonText: 'Bắt đầu hành trình',

  // --- 2. ALBUM ẢNH KỶ NIỆM (FEAT-002, US-002, US-007) ---
  // Thứ tự hiển thị hiển thị chính xác theo trường displayOrder (DEC-034)
  // Bố cục nghệ thuật kết hợp các sizeVariant: 'normal', 'tall', 'wide', 'featured' (DEC-029)
  photos: [
    {
      id: 'photo-1',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop',
      caption: 'Lần đầu tiên chúng mình cùng ngắm hoàng hôn bên bờ biển',
      alt: 'Khoảnh khắc hoàng hôn',
      aspect: 'portrait',
      sizeVariant: 'tall',
      displayOrder: 1,
    },
    {
      id: 'photo-2',
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop',
      caption: 'Buổi chiều cà phê yên bình và nụ cười rạng rỡ của em',
      alt: 'Nụ cười dịu dàng',
      aspect: 'square',
      sizeVariant: 'normal',
      displayOrder: 2,
    },
    {
      id: 'photo-3',
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
      caption: 'Chuyến đi xa đầu tiên cùng nhau dưới bầu trời đầy nắng',
      alt: 'Chuyến dã ngoại mùa thu',
      aspect: 'landscape',
      sizeVariant: 'wide',
      displayOrder: 3,
    },
    {
      id: 'photo-4',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop',
      caption: 'Cái nắm tay ấm áp giữa những ngày mùa đông lạnh giá',
      alt: 'Nắm tay qua từng con phố',
      aspect: 'portrait',
      sizeVariant: 'featured',
      displayOrder: 4,
    },
    {
      id: 'photo-5',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
      caption: 'Ánh mắt em nhìn anh, ngọt ngào hơn tất cả những điều dịu dàng nhất',
      alt: 'Khoảnh khắc ngọt ngào',
      aspect: 'square',
      sizeVariant: 'normal',
      displayOrder: 5,
    },
    {
      id: 'photo-6',
      url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop',
      caption: 'Từng bước chân đi qua, anh biết mình đã tìm thấy bình yên',
      alt: 'Cùng nhau dạo bước',
      aspect: 'landscape',
      sizeVariant: 'normal',
      displayOrder: 6,
    },
  ],

  // --- 3. BỨC THƯ TÌNH YÊU (FEAT-003, US-004) ---
  loveLetter: {
    title: 'Gửi người anh thương,',
    greeting: 'Em à,',
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
    // Trong Dev: Sử dụng file mp3 placeholder hoặc mẫu. Trước Gift Release: đặt file vào /public/audio/song.mp3
    src: 'https://assets.mixkit.co/music/preview/mixkit-romantic-moment-1111.mp3',
    title: 'Romantic Melody',
    artist: 'For My Love',
    loop: true, // Lặp lại khi hết bài theo quyết định grill-me (OQ-021)
  },
}
