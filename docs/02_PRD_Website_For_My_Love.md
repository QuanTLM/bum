# PRODUCT REQUIREMENTS DOCUMENT (PRD)

> **Dự án:** Website For My Love  
> **Mã tài liệu:** DOC-02  
> **Phiên bản:** Draft v1.0  
> **Ngày:** 11/10/2026  
> **Nguồn:** Requirement Baseline v0.7 — MVP Scope đã phê duyệt; Proposed/TBD chưa được phê duyệt  
> **Trạng thái:** Draft — chưa ký duyệt tài liệu chi tiết  
> **Mục tiêu:** Các chức năng, tương tác, dữ liệu, trạng thái và điều kiện chất lượng sản phẩm.

**Quy ước trạng thái:** `Confirmed` = quyết định đã được người dùng xác nhận; `Proposed` = đề xuất chưa xác nhận; `Assumed` = giả định có nêu lý do; `Open Question/TBD` = cần làm rõ; `Out of Scope` = đã loại khỏi phạm vi; `Superseded` = thông tin đã được thay thế. Việc duyệt MVP **không** tự động duyệt các chi tiết Proposed/TBD.

## Mục lục

- **1.** Product Overview
- **2.** Product Vision
- **3.** Product Goals
- **4.** Target Users & Personas / Roles
- **5.** Product Scope
- **6.** MVP Definition
- **7.** Product Module Breakdown
- **8.** Feature Requirements
- **9.** Functional Requirements
- **10.** User Interactions
- **11.** Input / Output Requirements
- **12.** Data Requirements
- **13.** Permission & Access Rules
- **14.** Validation Rules
- **15.** Error Handling & Edge Cases
- **16.** Business-Driven Non-Functional Requirements
- **17.** Dependencies & Integrations
- **18.** Release Considerations
- **19.** Open Questions


## 1. Product Overview

**Vision (Proposed wording):** “A Little Universe For You” — một món quà tương tác dễ thương, hiện đại, nơi người nhận bước qua Opening, album ảnh, thư tình và lời kết trong một trang cuộn liên tục.

**Confirmed:** quà bất ngờ cho một người nhận chính; Vue; Modern Minimal; Mobile-first, **chỉ tối ưu điện thoại**; animation cân bằng; link không công bố; nội dung static; một bài nhạc, Lightbox, Reduced Motion.

**Business Objectives:** `BO-001` đến `BO-005` từ BRD; cách diễn đạt BO là Proposed.

## 2. Product Vision

**Proposed wording:** “A Little Universe For You” — một trải nghiệm yêu thương Modern Minimal, dùng ảnh, nhạc và lời nhắn trong hành trình cuộn trang. Tên này chưa được chọn làm tên dự án chính thức; tên dự án vẫn là Website For My Love.

## 3. Product Goals

Mục tiêu cấp nghiệp vụ được ánh xạ tới `BO-001`–`BO-005` trong BRD. Mục đích bất ngờ cho người yêu đã Confirmed; các cách diễn đạt Objective là Proposed. KPI số và ngưỡng đo TBD.

## 4. Target Users & Personas / Roles

| Actor | Các hành động | Permission / data |
| --- | --- | --- |
| Recipient | Mở link, Start, scroll, xem ảnh, Lightbox, điều khiển nhạc, đọc thư/lời kết | Không yêu cầu đăng nhập; link có thể chia sẻ |
| Creator | Chuẩn bị ảnh, xếp thứ tự, cập nhật nội dung trong source, duyệt thư/nhạc | Không có giao diện admin trong phạm vi đã phê duyệt |
| Browser/OS | Hỗ trợ media, sự kiện click/scroll, Reduced Motion | Môi trường ngoài, không phải business role |

## 5. Product Scope

| Epic | Feature ID | Feature Name | MVP | Confirmation |
| --- | --- | --- | --- | --- |
| EPIC-001 | FEAT-001 | Opening Experience | Yes | Approved scope; behavior có thể Proposed/TBD |
| EPIC-002 | FEAT-002 | Interactive Photo Gallery | Yes | Approved scope; behavior có thể Proposed/TBD |
| EPIC-001 | FEAT-003 | Love Letter | Yes | Approved scope; behavior có thể Proposed/TBD |
| EPIC-003 | FEAT-004 | Background Music | Yes | Approved scope; behavior có thể Proposed/TBD |
| EPIC-001 | FEAT-005 | Final Message | Yes | Approved scope; behavior có thể Proposed/TBD |

**Ngoài phạm vi được xác nhận:** Timeline ngày tháng; tối ưu riêng tablet/desktop. **Ngoài 5 Feature đã được duyệt (chưa là Out of Scope vĩnh viễn):** CMS, account, multi-track playlist, 3D scene, mini-game, Replay.

## 6. MVP Definition

**Approved:** `EPIC-001` Romantic Experience (`FEAT-001`, `FEAT-003`, `FEAT-005`); `EPIC-002` Memories Experience (`FEAT-002`); `EPIC-003` Music & Atmosphere (`FEAT-004`). Cross-cutting Confirmed: static source data, link unlisted, mobile-only optimization, Reduced Motion, audio error nonblocking. Chi tiết Proposed/TBD vẫn mở. Gift Release cần nội dung và nhạc chính thức.

## 7. Product Module Breakdown

| Feature ID | Name | Epic | BR IDs | FR IDs | Workflow | Stories |
| --- | --- | --- | --- | --- | --- | --- |
| FEAT-001 | Opening Experience | EPIC-001 | BR-001, BR-003, BR-007, BR-008, BR-014, BR-017, BR-027, BR-033, BR-034 | FR-001–004, FR-027 | BP-001, BP-008 | US-001, US-009 |
| FEAT-002 | Interactive Photo Gallery | EPIC-002 | BR-004, BR-016, BR-018, BR-022, BR-023, BR-025, BR-026, BR-031, BR-033, BR-034 | FR-005–011, FR-025, FR-027 | BP-002, BP-003, BP-008 | US-002, US-003, US-007, US-009 |
| FEAT-003 | Love Letter | EPIC-001 | BR-005, BR-009, BR-019, BR-024, BR-028, BR-029, BR-030, BR-034 | FR-012–015, FR-027 | BP-004, BP-007, BP-008 | US-004, US-009, US-010 |
| FEAT-004 | Background Music | EPIC-003 | BR-006, BR-012, BR-015, BR-029, BR-030, BR-032 | FR-016–020, FR-026 | BP-005, BP-007 | US-005, US-008, US-010 |
| FEAT-005 | Final Message | EPIC-001 | BR-020, BR-024, BR-027, BR-028, BR-030, BR-034 | FR-021–024, FR-027 | BP-006, BP-007, BP-008 | US-006, US-009, US-010 |

## 8. Feature Requirements

### FEAT-001 — Opening Experience

| Thuộc tính | Đặc tả / trạng thái |
| --- | --- |
| Business Value | Tạo ấn tượng bất ngờ |
| Actor | Recipient |
| Preconditions | Truy cập link và Hero tải được |
| Input | Tên người nhận cấu hình; Start |
| Main Behavior / Output | Hero xuất hiện; sau Start yêu cầu phát nhạc và bước vào hành trình |
| Rules & Error Cases | Không tự cho rằng Start bị disable/lặp; nếu audio fail vẫn tiếp tục (BR-032) |
| Dependencies | FEAT-004; nguồn text |
| Priority / MVP | Must — PO đề xuất / Yes — MVP Approved |
| References | BR-001, BR-003, BR-007, BR-008, BR-014, BR-017, BR-027, BR-033, BR-034; FR-001–004, FR-027; BP-001, BP-008; US-001, US-009 |
| Confirmation | Phạm vi Feature Confirmed; chi tiết có chữ Proposed/TBD phải giữ trạng thái đó |
**Lưu ý nghiệp vụ:** Opening đậm chất Modern Minimal và nổi bật; trigger audio sau Start.


### FEAT-002 — Interactive Photo Gallery

| Thuộc tính | Đặc tả / trạng thái |
| --- | --- |
| Business Value | Gợi lại kỷ niệm |
| Actor | Recipient |
| Preconditions | Gallery có dữ liệu ảnh khả dụng |
| Input | Bộ ảnh trong source, thứ tự thủ công; scroll/tap |
| Main Behavior / Output | Bố cục ảnh nghệ thuật, animation theo scroll, Lightbox trước/sau/đóng |
| Rules & Error Cases | Ảnh lỗi, ảnh đầu/cuối, khôi phục cuộn sau Lightbox chưa chốt |
| Dependencies | FEAT-001 và nội dung ảnh |
| Priority / MVP | Must — PO đề xuất / Yes — MVP Approved |
| References | BR-004, BR-016, BR-018, BR-022, BR-023, BR-025, BR-026, BR-031, BR-033, BR-034; FR-005–011, FR-025, FR-027; BP-002, BP-003, BP-008; US-002, US-003, US-007, US-009 |
| Confirmation | Phạm vi Feature Confirmed; chi tiết có chữ Proposed/TBD phải giữ trạng thái đó |
**Lưu ý nghiệp vụ:** Không Timeline ngày tháng; số 10–30 là dự kiến.


### FEAT-003 — Love Letter

| Thuộc tính | Đặc tả / trạng thái |
| --- | --- |
| Business Value | Chuyển tải lời yêu thương |
| Actor | Recipient |
| Preconditions | Người nhận cuộn đến gần cuối |
| Input | Thư đã cấu hình; nội dung có thể placeholder khi Dev |
| Main Behavior / Output | Thư xuất hiện khi scroll tới section riêng |
| Rules & Error Cases | Không dùng thư chưa duyệt cho Gift Release; mức reduced animation TBD |
| Dependencies | Content approval; FEAT-005 thứ tự |
| Priority / MVP | Must — PO đề xuất / Yes — MVP Approved |
| References | BR-005, BR-009, BR-019, BR-024, BR-028, BR-029, BR-030, BR-034; FR-012–015, FR-027; BP-004, BP-007, BP-008; US-004, US-009, US-010 |
| Confirmation | Phạm vi Feature Confirmed; chi tiết có chữ Proposed/TBD phải giữ trạng thái đó |
**Lưu ý nghiệp vụ:** Giọng văn dễ thương, ngọt ngào; sau Gallery và trước Final.


### FEAT-004 — Background Music

| Thuộc tính | Đặc tả / trạng thái |
| --- | --- |
| Business Value | Tạo không khí, vẫn chủ động và chịu lỗi |
| Actor | Recipient |
| Preconditions | Người dùng đã tương tác Start |
| Input | Một audio source, Start, nút điều khiển |
| Main Behavior / Output | Phát một bài nhạc nếu browser cho phép; có điều khiển; báo lỗi và không chặn |
| Rules & Error Cases | Pause vs mute, retry, khi hết track TBD; không chặn trải nghiệm |
| Dependencies | FEAT-001; file chính thức trước Gift Release |
| Priority / MVP | Must — PO đề xuất / Yes — MVP Approved |
| References | BR-006, BR-012, BR-015, BR-029, BR-030, BR-032; FR-016–020, FR-026; BP-005, BP-007; US-005, US-008, US-010 |
| Confirmation | Phạm vi Feature Confirmed; chi tiết có chữ Proposed/TBD phải giữ trạng thái đó |
**Lưu ý nghiệp vụ:** Không khẳng định autoplay thành công; không dùng API streaming chưa xác nhận.


### FEAT-005 — Final Message

| Thuộc tính | Đặc tả / trạng thái |
| --- | --- |
| Business Value | Khép lại hành trình |
| Actor | Recipient |
| Preconditions | Người dùng cuộn qua Love Letter |
| Input | Lời nhắn đã cấu hình |
| Main Behavior / Output | Hiển thị section Final Message riêng sau thư với animation nhẹ |
| Rules & Error Cases | Replay chỉ Proposed; nội dung tạm không dùng cho Gift Release |
| Dependencies | FEAT-003; content approval |
| Priority / MVP | Must — PO đề xuất / Yes — MVP Approved |
| References | BR-020, BR-024, BR-027, BR-028, BR-030, BR-034; FR-021–024, FR-027; BP-006, BP-007, BP-008; US-006, US-009, US-010 |
| Confirmation | Phạm vi Feature Confirmed; chi tiết có chữ Proposed/TBD phải giữ trạng thái đó |
**Lưu ý nghiệp vụ:** Lời nhắn cuối thể hiện giọng dễ thương, ngọt ngào.

## 9. Functional Requirements

| FR ID | Feature / Applies To | Functional Requirement | Confirmation |
| --- | --- | --- | --- |
| FR-001 | FEAT-001 | Hiển thị Hero, tên người nhận và nút Start | Confirmed |
| FR-002 | FEAT-001 | Khi Start được kích hoạt, bắt đầu trải nghiệm và yêu cầu phát nhạc | Confirmed |
| FR-003 | FEAT-001 | Opening có animation nổi bật hơn phần còn lại | Confirmed — mức định tính |
| FR-004 | FEAT-001 | Ngăn kích hoạt Start lặp gây lỗi / hiển thị trạng thái đã bắt đầu | Proposed |
| FR-005 | FEAT-002 | Hiển thị Photo Gallery, không Timeline ngày tháng | Confirmed |
| FR-006 | FEAT-002 | Bố cục nghệ thuật, kích thước ảnh xen kẽ | Confirmed |
| FR-007 | FEAT-002 | Ảnh xuất hiện bằng animation theo scroll | Confirmed |
| FR-008 | FEAT-002 | Chạm/click ảnh mở Lightbox | Confirmed |
| FR-009 | FEAT-002 | Lightbox có đóng và điều hướng ảnh trước/sau | Confirmed |
| FR-010 | FEAT-002 | Đóng Lightbox quay về vị trí cuộn trước đó | Proposed |
| FR-011 | FEAT-002 | Lightbox không vượt ranh giới đầu/cuối (không vòng lặp) | Proposed |
| FR-012 | FEAT-003 | Love Letter là section riêng gần cuối trang | Confirmed |
| FR-013 | FEAT-003 | Hiển thị thư khi cuộn đến section bằng animation | Confirmed |
| FR-014 | FEAT-003 | Nội dung thư theo phong cách dễ thương, ngọt ngào | Confirmed |
| FR-015 | FEAT-003 | Có thể thay placeholder bằng nội dung được duyệt trong source trước Gift Release | Confirmed — quy trình nội dung, không phải CMS |
| FR-016 | FEAT-004 | Yêu cầu phát một bài nhạc khi người nhận bấm Start | Confirmed |
| FR-017 | FEAT-004 | Nhạc chạy xuyên các section nếu không bị gián đoạn | Confirmed cấp cao |
| FR-018 | FEAT-004 | Có điều khiển bật/tắt hoặc tạm dừng nhạc | Confirmed cấp cao |
| FR-019 | FEAT-004 | Điều khiển Pause/Resume hoặc Mute/Unmute với phản hồi trạng thái cụ thể | Proposed — chọn cơ chế TBD |
| FR-020 | FEAT-004 | Nhạc lỗi không chặn nội dung | Confirmed theo DEC-035 |
| FR-021 | FEAT-005 | Final Message nằm sau Love Letter, thành section riêng | Confirmed |
| FR-022 | FEAT-005 | Hiển thị Final Message với animation nhẹ | Confirmed |
| FR-023 | FEAT-005 | Nội dung kết dễ thương, ngọt ngào | Confirmed |
| FR-024 | FEAT-005 | Thêm nút xem lại từ đầu | Proposed — không thuộc phạm vi MVP đã duyệt |
| FR-025 | FEAT-002 | Gallery và điều hướng ảnh dùng thứ tự ảnh cấu hình trong source | Confirmed |
| FR-026 | FEAT-004 | Nếu nhạc phát/tải lỗi, hiển thị trạng thái lỗi, tiếp tục hành trình | Confirmed |
| FR-027 | FEAT-001 (cross-cutting FEAT-002/003/005) | Animation phản hồi Reduced Motion từ hệ điều hành/trình duyệt | Confirmed cấp cao; chi tiết giảm TBD |

## 10. User Interactions

- **Primary navigation:** một trang scroll liên tục, có Start ở Opening; thứ tự logic Opening → Gallery → Love Letter → Final Message. Music hoạt động xuyên trải nghiệm.
- **Gallery:** ảnh xuất hiện theo scroll; chạm để mở ảnh lớn; Lightbox có Previous/Next/Close. Thứ tự ảnh lấy từ cấu hình source.
- **Motion:** Opening nổi bật; section sau tinh tế; chế độ Reduced Motion phải được tôn trọng (cách giảm từng hiệu ứng TBD).
- **Audio:** chỉ yêu cầu phát sau Start; audio error hiển thị trạng thái và không chặn.
- **Not Confirmed:** swipe, Escape, vị trí nút âm thanh, cơ chế Pause/Resume hay Mute/Unmute, Replay.

## 11. Input / Output Requirements

**Inputs:** recipientName (Creator), photos[] với thứ tự thủ công, loveLetterText, finalMessageText, audioSource, Reduce Motion từ OS/browser. **Outputs:** Opening, Gallery/Lightbox, âm thanh/trạng thái lỗi, Love Letter và Final Message. Schema/định dạng/lỗi input chi tiết là Proposed/TBD; không mặc định có database/API.

## 12. Data Requirements

| Data ID | Data | Source / owner | Input validation / trạng thái | Đầu ra |
| --- | --- | --- | --- | --- |
| DATA-001 | recipientName | Creator, cấu hình source | Giá trị thực chưa cung cấp; encoding/escape Proposed | Text trong Hero |
| DATA-002 | photos[] với displayOrder | Creator, source code | 10–30 ảnh dự kiến; đường dẫn và thứ tự do Creator cung cấp | Gallery/Lightbox cùng thứ tự |
| DATA-003 | loveLetterText | AI đề xuất, Creator duyệt rồi cấu hình | Nội dung chưa có; dùng placeholder khi Dev | Section Love Letter |
| DATA-004 | finalMessageText | Creator duyệt, cấu hình source | Nội dung chưa có; kiểm duyệt trước release | Final Message |
| DATA-005 | audioSource (1 bài) | Creator cung cấp | Chưa có file chính thức; nhạc thử được phép Dev | Audio và trạng thái lỗi |
| DATA-006 | prefersReducedMotion | Thiết lập OS/browser | Giá trị môi trường, không cần user nhập | Animation phù hợp |

**Data Storage:** source code/static assets Confirmed. Không suy ra backend, database, CMS, authentication, analytics, API. Cấu trúc thư mục, CDN, image format và schema JSON/TS là **TBD**.

## 13. Permission & Access Rules

- **Recipient:** không có yêu cầu tài khoản hoặc quyền theo vai trò; mở link là xem được nếu site có thể truy cập.
- **Creator:** quản lý nội dung bằng sửa source qua quy trình phát triển; không xây dựng UI chỉnh sửa nội dung chỉ từ nhu cầu này.
- **Privacy caveat:** không công bố link **không bảo vệ** ảnh, thư và nhạc trước người được chuyển tiếp link. Password, indexing-control, token hết hạn chỉ là Proposed nếu tương lai cần bảo mật.

## 14. Validation Rules

| Rule ID | Điều kiện | Status |
| --- | --- | --- |
| RULE-001 | Link không công bố; người có link truy cập được, không có cơ chế xác thực đã được yêu cầu | Confirmed |
| RULE-002 | Nội dung website cố định trong source; không yêu cầu dữ liệu timeline ngày tháng | Confirmed |
| RULE-003 | Gallery theo thứ tự cấu hình thủ công; số lượng 10–30 chỉ là dự kiến | Confirmed |
| RULE-004 | Love Letter đứng trước Final Message, mỗi phần là một section | Confirmed |
| RULE-005 | Một bài nhạc bắt đầu sau Start, có điều khiển người nhận; nhạc lỗi vẫn tiếp tục và báo trạng thái | Confirmed cấp cao |
| RULE-006 | Trước Gift Release phải có nội dung đã được chốt và nhạc chính thức; khi Dev có thể dùng placeholder | Confirmed |
| RULE-007 | Animation điều chỉnh theo Reduced Motion của OS/browser | Confirmed cấp cao |
| RULE-008 | Tối ưu sản phẩm cho điện thoại, không cần thiết kế riêng tablet/desktop | Confirmed |
| RULE-009 | Chuyển ảnh tới đầu/cuối thì dừng, không vòng lặp | Proposed |
| RULE-010 | Nếu ảnh lỗi, giữ bố cục và thông báo/placeholder phù hợp | Proposed |

## 15. Error Handling & Edge Cases

| Đối tượng | Các trạng thái (Proposed nếu chưa xác nhận) | Exception / xử lý |
| --- | --- | --- |
| Opening | initial → started (Proposed model) | Kích hoạt Start lặp: OQ-024 |
| Lightbox | closed → open → closed (Proposed model) | First/last behavior OQ-016; swipe/Escape OQ-017 |
| Music | idle → playing / paused-or-muted / error (Proposed model) | Error => hiện trạng thái và vẫn cuộn; điều khiển OQ-015; hết track OQ-021 |
| Gallery image | loading → loaded / failed (Proposed model) | Ảnh lỗi: OQ-018 |
| Motion | normal / reduced (Proposed model) | Mapping chính xác hiệu ứng khi reduced: OQ-023 |
| Content release | development placeholder → approved content (Proposed model) | Không Gift Release nếu thư/lời kể/lời kết/nhạc chưa chính thức |

## 16. Business-Driven Non-Functional Requirements

| NFR ID | Yêu cầu | Status | Tiêu chí kiểm tra / TBD |
| --- | --- | --- | --- |
| NFR-001 | Ưu tiên giao diện mobile | Confirmed | Kích thước và thiết bị kiểm thử: TBD |
| NFR-002 | Animation đẹp, mượt | Confirmed — định tính | Ngưỡng đo FPS, tốc độ tải, phương pháp đo: TBD |
| NFR-003 | Tối ưu riêng tablet/desktop | Ngoài phạm vi tối ưu đã chọn | Không chủ động chặn thiết bị lớn |
| NFR-004 | Phản hồi prefers-reduced-motion của thiết bị | Confirmed | Cách giảm từng animation: Proposed/TBD |
| NFR-005 | Tối ưu tải ảnh (lazy load, responsive images, v.v.) | Proposed | Không khóa giải pháp kỹ thuật trước thiết kế |
| NFR-006 | Lỗi âm thanh không chặn trải nghiệm và có trạng thái lỗi | Confirmed | Nội dung thông báo cụ thể: TBD |
| NFR-007 | Link không công bố nhưng không yêu cầu xác thực | Confirmed | Link có thể được chia sẻ lại; không đảm bảo bảo mật |

## 17. Dependencies & Integrations

**Confirmed:** Vue; client-side browser, source data/assets; OS/browser prefers-reduced-motion; một file nhạc chính thức trước Gift Release. **Proposed tech stack, chưa được chọn:** GSAP/ScrollTrigger, Motion for Vue, Lenis, Three.js, các tối ưu hình ảnh. Không đưa chúng vào Acceptance Criteria như công nghệ bắt buộc.

**Dependencies:** Start → audio; Gallery order → Lightbox; Love Letter → Final Message; Reduced Motion → mọi animation; Content approval → Gift Release. Hosting, domain, CDN và cơ chế deploy là **TBD**.

## 18. Release Considerations

**Development Draft:** được phép sử dụng placeholder và nhạc thử được phép sử dụng.

**Gift Release (Confirmed rule):** thư/lời kể/lời nhắn và nhạc phải là bản chính thức được Creator duyệt. **Proposed quality checks:** không còn placeholder, kiểm tra ảnh/đường dẫn, kiểm thử mobile, đối chiếu AC Must, quyền dùng nhạc.

**Definition of Ready (Story-level):** Actor, behavior, business value, dependencies, AC kiểm chứng, nguồn dữ liệu/ngoại lệ cần thiết được làm rõ. `US-005` chưa Ready nếu chưa chốt loại điều khiển; `US-003` chưa Ready hoàn toàn nếu chưa chốt ranh giới ảnh.

## 19. Open Questions

| OQ | Vấn đề | Tác động | Status | Hành động tiếp theo |
| --- | --- | --- | --- | --- |
| OQ-015 | Cơ chế điều khiển audio: Pause/Resume hay Mute/Unmute? | FEAT-004; US-005 | Open Question | Chốt trước DoR US-005 |
| OQ-016 | Lightbox có lặp từ cuối về đầu? | FEAT-002; US-003 | Proposed không lặp | Chốt trước DoR US-003 |
| OQ-017 | Lightbox có hỗ trợ vuốt trên mobile/Escape? | FEAT-002; US-003 | Proposed có | Không chặn Draft |
| OQ-018 | Ảnh tải lỗi/ảnh sai định dạng hiển thị thế nào? | FEAT-002; US-002 | Proposed placeholder lỗi | Chốt trước QA |
| OQ-019 | Thiết bị mobile, trình duyệt và viewport kiểm thử? | NFR-001 | TBD | Chốt trước QA |
| OQ-020 | Ngưỡng định lượng cho độ mượt/tốc độ tải? | NFR-002 | TBD | Chốt trước QA |
| OQ-021 | Khi bài nhạc kết thúc: dừng hay lặp? | FEAT-004; US-005 | Proposed lặp | Chốt trước DoR US-005 |
| OQ-022 | Tên người nhận, ảnh thực tế, nội dung đã duyệt, file nhạc chính thức? | Gift Release | TBD — chưa sẵn sàng | Bắt buộc trước Gift Release |
| OQ-023 | Reduced Motion chính xác giảm những hiệu ứng nào? | FR-027; US-009 | Proposed giản lược hiệu ứng trang trí | Chốt trước QA |
| OQ-024 | Nếu nhấn Start nhiều lần, có bắt đầu/phát nhạc trùng không? | FR-004; US-001 | Proposed khóa sự kiện trùng | Không chặn Draft |

**Traceability:** BRD `BR` → PRD `FEAT/FR` → Workflow `BP` → `US/AC` → Backlog `PB`; chi tiết trong các tài liệu tương ứng. Mọi đề xuất mới phải qua phê duyệt, không tự chuyển thành Confirmed.

