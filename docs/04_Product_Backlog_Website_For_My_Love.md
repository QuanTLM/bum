# PRODUCT BACKLOG

> **Dự án:** Website For My Love  
> **Mã tài liệu:** DOC-04  
> **Phiên bản:** Draft v1.0  
> **Ngày:** 11/10/2026  
> **Nguồn:** Requirement Baseline v0.7 — MVP Scope đã phê duyệt; Proposed/TBD chưa được phê duyệt  
> **Trạng thái:** Draft — chưa ký duyệt tài liệu chi tiết  
> **Mục tiêu:** Danh sách Epic → Feature → User Story có thứ tự ưu tiên, dependencies, Acceptance References và trạng thái xác nhận.

**Quy ước trạng thái:** `Confirmed` = quyết định đã được người dùng xác nhận; `Proposed` = đề xuất chưa xác nhận; `Assumed` = giả định có nêu lý do; `Open Question/TBD` = cần làm rõ; `Out of Scope` = đã loại khỏi phạm vi; `Superseded` = thông tin đã được thay thế. Việc duyệt MVP **không** tự động duyệt các chi tiết Proposed/TBD.

## Mục lục

- **1.** Backlog Metadata & Rules
- **2.** Epic → Feature → Story Hierarchy
- **3.** Backlog Master Table
- **4.** Acceptance References & Dependencies
- **5.** Proposed Delivery Order
- **6.** Items Excluded or Awaiting Decision
- **7.** Change / Status Management
- **8.** Open Questions & Release Gate


## 1. Backlog Metadata & Rules

**MVP Scope đã duyệt:** 3 Epic / 5 Feature, các User Story phân rã là **Draft đề xuất**. Priority Must/Should ở dưới là phân loại PO đề xuất, chưa phê duyệt MoSCoW ở mức Story. `Effort = TBD`, `Target Release = MVP Draft / Gift Release gate` chỉ mang nghĩa giai đoạn logic, không có ngày.

**Cách đọc Status:** `Draft` = đặc tả chưa approved; `Not Ready` = còn quyết định thiết yếu; `Proposed` = phần đề xuất không nằm trong baseline Confirmed. Trường `Confirmation Status` thể hiện độ chắc của nội dung, không phải trạng thái công việc.


## 2. Epic → Feature → Story Hierarchy

### EPIC-001 — Romantic Experience

Opening, Love Letter, Final Message.

- **FEAT-001 Opening Experience**: US-001 Xem Hero và bắt đầu hành trình, US-009 Trải nghiệm với Reduced Motion.
- **FEAT-003 Love Letter**: US-004 Đọc Love Letter ở gần cuối, US-010 Chốt nội dung chính thức trước Gift Release.
- **FEAT-005 Final Message**: US-006 Xem Final Message.

### EPIC-002 — Memories Experience

Artistic Photo Gallery & Lightbox.

- **FEAT-002 Interactive Photo Gallery**: US-002 Khám phá Gallery nghệ thuật, US-003 Mở và điều hướng Lightbox, US-007 Cấu hình thứ tự ảnh thủ công.

### EPIC-003 — Music & Atmosphere

Một bài nhạc, điều khiển, hiển thị lỗi.

- **FEAT-004 Background Music**: US-005 Nghe và điều khiển bài nhạc nền, US-008 Tiếp tục trải nghiệm khi nhạc lỗi.


## 3. Backlog Master Table

**Bảng phẳng đầy đủ 16 cột**, thuận tiện copy sang trình xử lý Markdown/CSV. Mỗi mã PB là duy nhất; các ô trống được ghi `—`.

| Backlog ID | Epic ID | Feature ID | User Story ID | Item Type | Title | Description | Business Value | Priority | MVP | Dependencies | Effort | Status | Target Release | Acceptance Reference | Confirmation Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PB-001 | EPIC-001 | — | — | Epic | Romantic Experience | Opening, Love Letter, Final Message | Giá trị tổng thể theo BO liên quan | Must | Yes | — | TBD | Draft | MVP Draft | — | MVP Scope Approved; decomposition Draft |
| PB-002 | EPIC-002 | — | — | Epic | Memories Experience | Artistic Photo Gallery & Lightbox | Giá trị tổng thể theo BO liên quan | Must | Yes | — | TBD | Draft | MVP Draft | — | MVP Scope Approved; decomposition Draft |
| PB-003 | EPIC-003 | — | — | Epic | Music & Atmosphere | Một bài nhạc, điều khiển, hiển thị lỗi | Giá trị tổng thể theo BO liên quan | Must | Yes | — | TBD | Draft | MVP Draft | — | MVP Scope Approved; decomposition Draft |
| PB-004 | EPIC-001 | FEAT-001 | — | Feature | Opening Experience | Các FR FR-001–004, FR-027 | Gây bất ngờ và khởi động trải nghiệm | Must | Yes | Tên người nhận; phối hợp FEAT-004 | TBD | Draft | MVP Draft | US/AC theo traceability | Feature Scope Approved; details Mixed |
| PB-005 | EPIC-002 | FEAT-002 | — | Feature | Interactive Photo Gallery | Các FR FR-005–011, FR-025, FR-027 | Lưu giữ và khám phá kỷ niệm | Must | Yes | Ảnh nguồn; thứ tự cấu hình | TBD | Draft | MVP Draft | US/AC theo traceability | Feature Scope Approved; details Mixed |
| PB-006 | EPIC-001 | FEAT-003 | — | Feature | Love Letter | Các FR FR-012–015, FR-027 | Gửi thông điệp tình cảm | Must | Yes | Thư đã duyệt trước Gift Release | TBD | Draft | MVP Draft | US/AC theo traceability | Feature Scope Approved; details Mixed |
| PB-007 | EPIC-003 | FEAT-004 | — | Feature | Background Music | Các FR FR-016–020, FR-026 | Tạo không khí không gián đoạn | Must | Yes | FEAT-001; file nhạc | TBD | Draft | MVP Draft | US/AC theo traceability | Feature Scope Approved; details Mixed |
| PB-008 | EPIC-001 | FEAT-005 | — | Feature | Final Message | Các FR FR-021–024, FR-027 | Khép lại trải nghiệm | Must | Yes | FEAT-003; lời kết đã duyệt | TBD | Draft | MVP Draft | US/AC theo traceability | Feature Scope Approved; details Mixed |
| PB-009 | EPIC-001 | FEAT-001 | US-001 | Story | Xem Hero và bắt đầu hành trình | As Recipient, I want thấy Hero có tên mình và bắt đầu trải nghiệm | cảm nhận món quà bất ngờ và vào hành trình | Must | Yes | Tên người nhận trong source; FEAT-004 để yêu cầu nhạc | TBD | Draft | MVP Draft | AC-001–003 | Confirmed core; Proposed guard |
| PB-010 | EPIC-002 | FEAT-002 | US-002 | Story | Khám phá Gallery nghệ thuật | As Recipient, I want cuộn xem những ảnh kỷ niệm với bố cục nghệ thuật | khám phá các khoảnh khắc đáng nhớ | Must | Yes | Ảnh nguồn; thứ tự ảnh theo US-007 | TBD | Draft | MVP Draft | AC-004–007 | Confirmed core |
| PB-011 | EPIC-002 | FEAT-002 | US-003 | Story | Mở và điều hướng Lightbox | As Recipient, I want mở ảnh lớn và xem ảnh trước/sau | xem rõ từng kỷ niệm | Must | Yes | US-002, US-007 | TBD | Draft | MVP Draft | AC-008–012 | Confirmed core; proposed edge |
| PB-012 | EPIC-001 | FEAT-003 | US-004 | Story | Đọc Love Letter ở gần cuối | As Recipient, I want đọc bức thư khi cuộn gần cuối hành trình | cảm nhận thông điệp yêu thương | Must | Yes | Nội dung Creator duyệt; US-010 | TBD | Draft | MVP Draft | AC-013–015 | Confirmed core; motion detail proposed |
| PB-013 | EPIC-003 | FEAT-004 | US-005 | Story | Nghe và điều khiển bài nhạc nền | As Recipient, I want bắt đầu và điều khiển bài nhạc khi trải nghiệm | có không khí phù hợp mà vẫn chủ động | Must | Yes | US-001; file nhạc thử/official; OQ-015/OQ-021 | TBD | Not Ready | MVP Draft | AC-016–020 | Confirmed core; controls details TBD |
| PB-014 | EPIC-001 | FEAT-005 | US-006 | Story | Xem Final Message | As Recipient, I want đọc lời nhắn kết sau bức thư | kết thúc hành trình với cảm xúc trọn vẹn | Must | Yes | US-004; nội dung Final Message đã duyệt | TBD | Draft | MVP Draft | AC-021–022 | Confirmed core; replay Proposed excluded |
| PB-015 | EPIC-002 | FEAT-002 | US-007 | Story | Cấu hình thứ tự ảnh thủ công | As Creator, I want định thứ tự hiển thị ảnh trong source code | kiểm soát thứ tự kỷ niệm được kể | Must | Yes | Danh sách ảnh thực tế | TBD | Draft | MVP Draft | AC-025–027 | Confirmed requirement; implementation detail TBD |
| PB-016 | EPIC-003 | FEAT-004 | US-008 | Story | Tiếp tục trải nghiệm khi nhạc lỗi | As Recipient, I want tiếp tục xem website và biết khi nhạc gặp lỗi | không bị mất trải nghiệm vì lỗi âm thanh | Must | Yes | US-001; US-005 | TBD | Draft | MVP Draft | AC-028–030 | Confirmed |
| PB-017 | EPIC-001 | FEAT-001 | US-009 | Story | Trải nghiệm với Reduced Motion | As Recipient, I want đọc và tương tác khi thiết bị bật Reduced Motion | không bị buộc xem các chuyển động gây khó chịu | Must | Yes | FEAT-001/002/003/005; OS/browser support | TBD | Draft | MVP Draft | AC-023–024 | Confirmed principle; specific fallback proposed |
| PB-018 | EPIC-001 | FEAT-003 | US-010 | Story | Chốt nội dung chính thức trước Gift Release | As Creator, I want duyệt lời kể, thư, lời kết và bổ sung nhạc chính thức vào website | đảm bảo món quà tặng không chứa nội dung tạm | Must | Yes | Ảnh thật, tên người nhận, nội dung AI được duyệt, file nhạc chính thức | TBD | Draft | MVP Draft; Gift Release gate | AC-031–034 | Confirmed release rule; không tạo CMS |

## 4. Acceptance References & Dependencies

| Story ID | Feature | FR Mapping | AC References | Business Dependencies | DoR |
| --- | --- | --- | --- | --- | --- |
| US-001 | FEAT-001 | FR-001, FR-002, FR-003, FR-004 | AC-001–003 | Tên người nhận trong source; FEAT-004 để yêu cầu nhạc | Partial — FR-004 Proposed; UI review animation TBD |
| US-002 | FEAT-002 | FR-005, FR-006, FR-007 | AC-004–007 | Ảnh nguồn; thứ tự ảnh theo US-007 | Partial — thiết bị và ranh giới animation TBD |
| US-003 | FEAT-002 | FR-008–011, FR-025 | AC-008–012 | US-002, US-007 | Partial — OQ-016/017 còn mở |
| US-004 | FEAT-003 | FR-012–015 | AC-013–015 | Nội dung Creator duyệt; US-010 | Partial — nội dung chính thức TBD trước Gift Release |
| US-005 | FEAT-004 | FR-016–019 | AC-016–020 | US-001; file nhạc thử/official; OQ-015/OQ-021 | Not Ready — loại điều khiển và end-of-track TBD |
| US-006 | FEAT-005 | FR-021–024 | AC-021–022 | US-004; nội dung Final Message đã duyệt | Partial — wording thực TBD; FR-024 ngoài MVP |
| US-007 | FEAT-002 | FR-025 | AC-025–027 | Danh sách ảnh thực tế | Partial — cấu trúc file config TBD |
| US-008 | FEAT-004 | FR-020, FR-026 | AC-028–030 | US-001; US-005 | Partial — câu chữ báo lỗi và thử lại TBD |
| US-009 | FEAT-001 | FR-027 | AC-023–024 | FEAT-001/002/003/005; OS/browser support | Partial — mức giảm theo loại hiệu ứng TBD |
| US-010 | FEAT-003 | FR-015 (primary); liên quan FEAT-004/005 | AC-031–034 | Ảnh thật, tên người nhận, nội dung AI được duyệt, file nhạc chính thức | Partial — input chưa có, Release Gate Confirmed |

## 5. Proposed Delivery Order

1. **Foundation & FEAT-001:** static content contract, Hero, Start, base mobile layout.
2. **FEAT-002:** Gallery/artistic layout, fixed order, Lightbox; kiểm soát tải ảnh.
3. **FEAT-003 & FEAT-005:** thư và phần kết, placeholder phục vụ Dev.
4. **FEAT-004:** audio start, controls, error (kết nối FEAT-001).
5. **Cross-cutting:** Reduced Motion, mobile verification và các exception.
6. **Gift Release gate:** thay nội dung/nhạc chính thức, Creator duyệt; QA theo AC sau khi chốt OQ thiết yếu.

Trình tự trên là **Proposed**, không phải thời gian Sprint hoặc effort.


## 6. Items Excluded or Awaiting Decision

| ID | Hạng mục | Status / xử lý |
| --- | --- | --- |
| BR-021 | Timeline theo ngày tháng | Out of Scope — Confirmed |
| FR-024 | Replay Experience | Proposed, không vào 5 Feature MVP như yêu cầu triển khai |
| FR-011 | Lightbox dừng tại ảnh đầu/cuối | Proposed — OQ-016 |
| FR-019 | Pause/Resume hay Mute/Unmute | Proposed — OQ-015 |
| NFR-005 | Lazy load/ảnh responsive | Proposed kỹ thuật |
| CMS / account / playlist / 3D | Bên ngoài 5 Feature đã duyệt | Không tạo công việc kỹ thuật khi chưa có thay đổi phạm vi |

## 7. Change / Status Management

- **Backlog là Draft, không gán story thành Ready khi vẫn thiếu điều kiện nghiệp vụ trong DoR.**
- Một yêu cầu mới phải được thêm mã BR/FR/US/AC/PB riêng hoặc chỉnh mapping có impact assessment.
- MoSCoW chi tiết và sprint/effort chỉ được chốt sau review PO/Dev/QA.
- Khi Story nghiệm thu, cần dẫn chứng kết quả AC; phần AC đánh dấu Proposed không được tính là điều kiện chính thức trước khi được duyệt.


## 8. Open Questions & Release Gate

| OQ | Vấn đề | Ảnh hưởng | Status | Hành động tiếp theo |
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

**Gift Release gate Confirmed:** Creator phải có nội dung chữ và file nhạc chính thức. Các checklist QA khác được đề xuất và cần phê duyệt trước khi dùng làm tiêu chí bắt buộc.
