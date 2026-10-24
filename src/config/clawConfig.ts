import type { ClawMachineConfig } from '@/types/claw'

/**
 * ============================================================================
 * ⭐ FILE CẤU HÌNH DUY NHẤT DÀNH CHO ANH QUÂN (PIXEL CLAW MACHINE CONFIG) ⭐
 * ============================================================================
 * Bạn có thể chỉnh sửa tên quà, hình ảnh món quà (Món 1, 3, 5), lời nhắn khi
 * trúng thưởng và nội dung Bức Thư Cuối Cùng ngay tại đây.
 * ============================================================================
 */
export const clawConfig: ClawMachineConfig = {
  recipientName: 'Bé Bum',
  senderName: 'Anh Quân',
  machineTitle: 'LOVE CLAW 8-BIT',
  machineSubtitle: 'Tiệm Gắp Quà Trái Tim Của Anh Quân 💖',
  initialTurns: 5,

  // --- KỊCH BẢN 5 MÓN QUÀ THEO ĐÚNG THỨ TỰ LƯỢT GẮP (5 -> 4 -> 2 -> 1 -> 1 -> 0) ---
  prizes: [
    {
      id: 'prize-1',
      order: 1,
      kind: 'gift',
      badgeText: 'MÓN QUÀ ĐẦU TIÊN #1 🎁',
      title: 'Hộp Quà Ngọt Ngào Số 1',
      subtitle: 'Khởi đầu may mắn quá nè!',
      description:
        'Chúc mừng em đã gắp trúng món quà đầu tiên! Đưa màn hình này cho anh Quân để nhận ngay món quà xinh xắn số 1 ngoài đời nhé ✨',
      imageUrl: '/photos/475124442_598512766134363_2223938753045837867_n.jpg',
      turnDelta: 0,
      palette: 'strawberry',
    },
    {
      id: 'prize-2',
      order: 2,
      kind: 'kiss_penalty',
      badgeText: 'HỘP QUÀ TINH NGHỊCH #2 💋',
      title: 'Thơm Anh Quân 1 Cái!',
      subtitle: 'Á à! Bắt quả tang hộp quà đặc biệt!',
      description:
        'Hộp quà này yêu cầu em phải thơm anh Quân 1 cái thật kêu mới được chơi tiếp nha! Đã thế còn bị "phạt yêu" trừ thêm 1 lượt gắp nữa cơ 😝💞',
      turnDelta: -1,
      turnDeltaLabel: '-1 LƯỢT GẮP 💔',
      palette: 'berry',
    },
    {
      id: 'prize-3',
      order: 3,
      kind: 'gift',
      badgeText: 'MÓN QUÀ BẤT NGỜ #3 🎀',
      title: 'Hộp Quà Yêu Thương Số 2',
      subtitle: 'Tay nghề gắp quà đỉnh chóp luôn!',
      description:
        'Thêm một món quà siêu đáng yêu nữa vào giỏ của em rồi! Nhớ giữ kỹ phiếu quà này để anh Quân trao tận tay nha 💝',
      imageUrl: '/photos/516378540_716223201029985_1347435443947679046_n.jpg',
      turnDelta: 0,
      palette: 'rose',
    },
    {
      id: 'prize-4',
      order: 4,
      kind: 'kiss_bonus',
      badgeText: 'PHẦN THƯỞNG CỨU NGUY #4 😘',
      title: 'Được Anh Quân Thơm 1 Cái + Thêm 1 Lượt Gắp!',
      subtitle: 'Tưởng hết lượt rồi chứ gì? Bất ngờ chưa!',
      description:
        'Vì em quá đáng yêu nên anh Quân tặng ngay cho em 1 cái thơm ấm áp kèm thêm +1 LƯỢT GẮP ĐẶC BIỆT để rinh nốt món quà cuối cùng nè! 💖✨',
      turnDelta: 1,
      turnDeltaLabel: '+1 LƯỢT GẮP 💖',
      palette: 'blossom',
    },
    {
      id: 'prize-5',
      order: 5,
      kind: 'gift',
      badgeText: 'MÓN QUÀ ĐẶC BIỆT CUỐI CÙNG #5 👑',
      title: 'Hộp Quà Trùm Cuối Siêu To',
      subtitle: 'Hoàn thành xuất sắc cả 5 món quà!',
      description:
        'Lượt thưởng cuối cùng đã mang về món quà đặc biệt nhất! Đóng cửa sổ này lại nhé, vẫn còn một bí mật nhỏ đang đợi em đó... 💌',
      imageUrl: '/photos/frame_001.png',
      turnDelta: 0,
      palette: 'peach',
    },
  ],

  // --- 15 HỘP QUÀ PIXEL XẾP TRONG LỒNG KÍNH 2.5D (TỌA ĐỘ X NGANG & Z CHIỀU SÂU) ---
  giftBoxes: [
    // Lớp sâu bên trong (Back row: z từ 0.72 -> 0.96)
    {
      id: 'box-01',
      x: 19,
      z: 0.92,
      tilt: -4,
      palette: 'strawberry',
      boxColor: '#ff7eb6',
      ribbonColor: '#fff0f6',
      accentColor: '#ff3d8b',
    },
    {
      id: 'box-02',
      x: 34,
      z: 0.86,
      tilt: 5,
      palette: 'vanilla',
      boxColor: '#ffe3ec',
      ribbonColor: '#ff4d94',
      accentColor: '#ff85b3',
    },
    {
      id: 'box-03',
      x: 50,
      z: 0.94,
      tilt: -3,
      palette: 'rose',
      boxColor: '#ff5c9e',
      ribbonColor: '#fff5b8',
      accentColor: '#d92672',
    },
    {
      id: 'box-04',
      x: 66,
      z: 0.84,
      tilt: 4,
      palette: 'peach',
      boxColor: '#ff9ebb',
      ribbonColor: '#ffffff',
      accentColor: '#ff4d88',
    },
    {
      id: 'box-05',
      x: 81,
      z: 0.9,
      tilt: -6,
      palette: 'berry',
      boxColor: '#f0488c',
      ribbonColor: '#ffd6e7',
      accentColor: '#b81d5c',
    },

    // Lớp giữa (Middle row: z từ 0.36 -> 0.65)
    {
      id: 'box-06',
      x: 24,
      z: 0.58,
      tilt: 4,
      palette: 'blossom',
      boxColor: '#ffb3d1',
      ribbonColor: '#e62e7a',
      accentColor: '#ff66a3',
    },
    {
      id: 'box-07',
      x: 40,
      z: 0.48,
      tilt: -5,
      palette: 'strawberry',
      boxColor: '#ff6ba9',
      ribbonColor: '#fff8cc',
      accentColor: '#e02472',
    },
    {
      id: 'box-08',
      x: 54,
      z: 0.56,
      tilt: 3,
      palette: 'vanilla',
      boxColor: '#ffd9e8',
      ribbonColor: '#ff3385',
      accentColor: '#ff80b3',
    },
    {
      id: 'box-09',
      x: 69,
      z: 0.46,
      tilt: -4,
      palette: 'rose',
      boxColor: '#ff4d94',
      ribbonColor: '#ffffff',
      accentColor: '#c71560',
    },
    {
      id: 'box-10',
      x: 83,
      z: 0.54,
      tilt: 5,
      palette: 'peach',
      boxColor: '#ffa6c9',
      ribbonColor: '#ff2e7e',
      accentColor: '#ff5c9e',
    },

    // Lớp ngoài gần mặt kính (Front row: z từ 0.05 -> 0.28)
    {
      id: 'box-11',
      x: 18,
      z: 0.18,
      tilt: -3,
      palette: 'berry',
      boxColor: '#ff529a',
      ribbonColor: '#fff0f5',
      accentColor: '#c91865',
    },
    {
      id: 'box-12',
      x: 33,
      z: 0.1,
      tilt: 4,
      palette: 'blossom',
      boxColor: '#ffc2dc',
      ribbonColor: '#ff2a7f',
      accentColor: '#ff70a8',
    },
    {
      id: 'box-13',
      x: 49,
      z: 0.16,
      tilt: -2,
      palette: 'strawberry',
      boxColor: '#ff3d8b',
      ribbonColor: '#fff3b0',
      accentColor: '#b80f57',
    },
    {
      id: 'box-14',
      x: 64,
      z: 0.08,
      tilt: 5,
      palette: 'vanilla',
      boxColor: '#ffe0ee',
      ribbonColor: '#ff3385',
      accentColor: '#ff7ab0',
    },
    {
      id: 'box-15',
      x: 79,
      z: 0.15,
      tilt: -4,
      palette: 'rose',
      boxColor: '#ff66a6',
      ribbonColor: '#ffffff',
      accentColor: '#d11968',
    },
  ],

  // --- BỨC THƯ TÂM SỰ HIỆN RA SAU KHI ĐÓNG MODAL MÓN QUÀ CUỐI CÙNG ---
  loveLetter: {
    envelopeBadge: 'Mật thư từ Anh Quân 💌',
    envelopePrompt: 'Chạm vào phong bì trái tim để mở lời nhắn nhé!',
    title: 'Gửi Cô Gái Nhỏ Của Anh 💖',
    greeting: 'Chào em, cô gái vừa "phá đảo" chiếc máy gắp quà này,',
    paragraphs: [
      'Anh đã chuẩn bị chiếc máy gắp quà pixel màu hồng này với 15 hộp quà nhỏ, nhưng thật ra dù em có điều khiển cần gắp đi đâu thì mọi phần thưởng ngọt ngào nhất cũng đều đã được định sẵn là dành riêng cho em.',
      'Từ những món quà bất ngờ, những cái thơm "phạt yêu" lấy đi 1 lượt cho hồi hộp, đến lượt cộng thêm vào phút chót — anh chỉ muốn nhìn thấy nụ cười rạng rỡ của em qua từng lần mở hộp.',
      'Cảm ơn em vì đã luôn đáng yêu và mang đến thật nhiều niềm vui mỗi ngày. Bây giờ thì đưa màn hình này cho anh Quân để nhận đủ cả quà thật lẫn những cái thơm vừa trúng thưởng nhé!',
    ],
    signature: 'Thương em thật nhiều — Anh Quân 💕',
    dateNote: 'Gửi ngàn trái tim pixel đến em',
  },

  // --- NHẠC NỀN ---
  audio: {
    src: '/audio/FDownload.app-1407685890836410-(320kbps).mp3',
    title: 'Giai điệu ngọt ngào',
    artist: 'Anh Quân dành tặng em',
    loop: true,
  },
}
