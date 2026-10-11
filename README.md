# 💖 Website For My Love

Món quà kỹ thuật số bất ngờ dành tặng người yêu — một trang cuộn liên tục (single-page continuous scroll), phong cách **Modern Minimal**, tối ưu cho thiết bị di động, xây dựng bằng **Vue 3**, **Vite**, **TypeScript**, **Tailwind CSS**, và **GSAP**.

Dự án được khởi tạo và tuân thủ chặt chẽ theo bộ tài liệu yêu cầu trong thư mục `docs/`:
- `01_BRD_Website_For_My_Love.md`
- `02_PRD_Website_For_My_Love.md`
- `03_Business_Workflow_Website_For_My_Love.md`
- `04_Product_Backlog_Website_For_My_Love.md`
- `05_User_Stories_AC_Website_For_My_Love.md`

---

## 🛠️ Yêu cầu & Môi trường

- **Node.js**: v22.x LTS (đã cài đặt và kích hoạt qua NVM: `.nvmrc`)
- **Package Manager**: npm

---

## 🚀 Khởi chạy dự án

### 1. Kích hoạt môi trường (nếu dùng NVM)
```bash
nvm use 22
```

### 2. Cài đặt thư viện (nếu clone mới)
```bash
npm install
```

### 3. Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập: `http://localhost:3000` (hoặc link mạng nội bộ hiển thị trên terminal để xem trực tiếp trên điện thoại cùng mạng Wi-Fi).

### 4. Build sản phẩm (Production)
```bash
npm run build
```
Bản build tĩnh sẵn sàng được tạo trong thư mục `dist/`.

---

## 📂 Cấu trúc thư mục

```
bum/
├── docs/                     # Toàn bộ tài liệu nghiệp vụ (BRD, PRD, Workflow, Backlog, US/AC)
├── public/
│   ├── audio/                # Chứa file nhạc nền chính thức (.mp3)
│   ├── photos/               # Chứa các file ảnh kỷ niệm (10-30 ảnh)
│   └── heart.svg             # Favicon
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── OpeningHero.vue   # FEAT-001: Màn hình mở đầu ấn tượng, nút Bắt đầu
│   │   ├── PhotoGallery.vue  # FEAT-002: Album ảnh bố cục nghệ thuật, scroll reveal
│   │   ├── PhotoLightbox.vue # FEAT-002: Xem ảnh phóng to, vuốt touch swipe, chặn ranh giới
│   │   ├── LoveLetter.vue    # FEAT-003: Bức thư tình cảm phong cách stationery
│   │   ├── FinalMessage.vue  # FEAT-005: Lời kết lắng đọng và hiệu ứng kết thúc
│   │   └── AudioPlayer.vue   # FEAT-004: Nút điều khiển nhạc nổi, thông báo lỗi không chặn
│   ├── composables/
│   │   └── useAudioPlayer.ts # Quản lý trạng thái và luồng phát âm thanh
│   ├── config/
│   │   └── giftData.ts       # ⭐ FILE CẤU HÌNH TĨNH DUY NHẤT DÀNH CHO CREATOR
│   ├── types/
│   │   └── gift.ts           # Định nghĩa Type / Schema chuẩn
│   ├── App.vue               # Khung cuộn liên tục tối ưu cho mobile
│   ├── main.ts               # Entry point
│   └── style.css             # Tailwind CSS & hỗ trợ prefers-reduced-motion
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 📝 Hướng dẫn Creator cập nhật nội dung trước khi tặng (Gift Release Gate)

Theo quy định **RULE-006** và **US-010**: Trước khi gửi tặng chính thức, Creator chỉ cần cập nhật nội dung tại file:
👉 **`src/config/giftData.ts`**

1. **Tên người nhận (DATA-001)**: Đổi `recipientName` thành tên người yêu.
2. **Ảnh kỷ niệm (DATA-002, US-007)**:
   - Thêm ảnh vào `public/photos/`.
   - Cập nhật danh sách `photos` với đường dẫn và `displayOrder` để sắp xếp thứ tự hiển thị.
3. **Thư tình (DATA-003)**: Cập nhật các đoạn văn bản trong `loveLetter.paragraphs`.
4. **Lời kết (DATA-004)**: Cập nhật `finalMessage.headline` và `subheadline`.
5. **Nhạc nền (DATA-005)**:
   - Thêm file `.mp3` vào `public/audio/`.
   - Cập nhật `audio.src` trỏ tới `/audio/ten_file.mp3`.

---

## ✨ Tính năng nổi bật & Tiêu chuẩn kỹ thuật

- **Mobile-First & Modern Minimal**: Khung nhìn tối ưu chuyên biệt cho trải nghiệm trên smartphone (`DEC-015`, `DEC-036`).
- **Chạm vuốt thông minh (Touch Gestures)**: Lightbox hỗ trợ vuốt trái/phải trên màn hình cảm ứng để chuyển ảnh và dừng ở ranh giới đầu/cuối (`RULE-009`, `OQ-016`, `OQ-017`).
- **Trải nghiệm âm thanh bền vững (Non-blocking Audio)**: Tự động yêu cầu phát nhạc sau khi bấm Bắt đầu; nếu trình duyệt chặn âm thanh hoặc file lỗi, hệ thống hiển thị thông báo nhẹ nhàng và không làm gián đoạn việc cuộn xem ảnh (`BR-032`, `US-008`).
- **Hỗ trợ Reduced Motion**: Tự động tắt/giảm các hiệu ứng chuyển động nếu người dùng bật chế độ `prefers-reduced-motion` trong cài đặt thiết bị (`DEC-037`, `RULE-007`, `US-009`).
