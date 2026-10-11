# USER STORIES & ACCEPTANCE CRITERIA

> **Dự án:** Website For My Love  
> **Mã tài liệu:** DOC-05  
> **Phiên bản:** Draft v1.0  
> **Ngày:** 11/10/2026  
> **Nguồn:** Requirement Baseline v0.7 — MVP Scope đã phê duyệt; Proposed/TBD chưa được phê duyệt  
> **Trạng thái:** Draft — chưa ký duyệt tài liệu chi tiết  
> **Mục tiêu:** Đặc tả User Stories, Given/When/Then, kịch bản thử và Definition of Ready.

**Quy ước trạng thái:** `Confirmed` = quyết định đã được người dùng xác nhận; `Proposed` = đề xuất chưa xác nhận; `Assumed` = giả định có nêu lý do; `Open Question/TBD` = cần làm rõ; `Out of Scope` = đã loại khỏi phạm vi; `Superseded` = thông tin đã được thay thế. Việc duyệt MVP **không** tự động duyệt các chi tiết Proposed/TBD.

## Mục lục

- **1.** Epic & Feature Overview
- **2.** User Stories & Acceptance Criteria
- **3.** Cross-Story Business Rules & Edge Cases
- **4.** End-to-End Test Scenarios
- **5.** Dependencies, Open Questions & DoR
- **6.** Release Validation & Requirement Traceability


## 1. Epic & Feature Overview

| Epic ID | Name | Feature IDs | MVP |
| --- | --- | --- | --- |
| EPIC-001 | Romantic Experience | FEAT-001, FEAT-003, FEAT-005 | Approved |
| EPIC-002 | Memories Experience | FEAT-002 | Approved |
| EPIC-003 | Music & Atmosphere | FEAT-004 | Approved |

| Feature | Related Stories | Scope Approval |
| --- | --- | --- |
| FEAT-001 | US-001, US-009 | MVP Approved, AC Draft |
| FEAT-002 | US-002, US-003, US-007 | MVP Approved, AC Draft |
| FEAT-003 | US-004, US-010 | MVP Approved, AC Draft |
| FEAT-004 | US-005, US-008 | MVP Approved, AC Draft |
| FEAT-005 | US-006 | MVP Approved, AC Draft |

## 2. User Stories & Acceptance Criteria


### US-001 — Xem Hero và bắt đầu hành trình

**User Story Statement:** As a **Recipient**, I want to **thấy Hero có tên mình và bắt đầu trải nghiệm**, so that **cảm nhận món quà bất ngờ và vào hành trình**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-001 / FEAT-001 |
| Business Context | cảm nhận món quà bất ngờ và vào hành trình |
| Related BR / FR | BR-001, BR-003, BR-017, BR-027 / FR-001, FR-002, FR-003, FR-004 |
| Workflow | BP-001 |
| Preconditions | Link truy cập được, Hero có tên trong source |
| Main Scenario | Mở link → xem tên/Start → nhấn Start → bắt đầu cuộn hành trình. |
| Postconditions | Trải nghiệm started; yêu cầu phát nhạc |
| Dependencies | Tên người nhận trong source; FEAT-004 để yêu cầu nhạc |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed core; Proposed guard |
| Definition of Ready | Partial — FR-004 Proposed; UI review animation TBD |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-001 | Given website tải thành công; When Recipient truy cập; Then Hero hiển thị tên người nhận và nút Start | Derived from Confirmed |
| AC-002 | Given Opening đang hiển thị; When bấm Start; Then hành trình bắt đầu và trình duyệt được yêu cầu phát bài nhạc cấu hình | Derived from Confirmed |
| AC-003 | Given Opening xuất hiện; When animation chạy; Then thiết kế Opening nổi bật hơn animation tại các section nội dung (đánh giá UI); mức đo TBD | Derived from Confirmed; review qualitative |

**Test Scenarios**

- Bắt đầu bằng Start thành công.
- Trình duyệt từ chối audio (xem US-008).
- Người nhận nhấn Start nhiều lần — Proposed xử lý.

**Business Rules:** Áp dụng các RULE liên quan trong BRD.


### US-002 — Khám phá Gallery nghệ thuật

**User Story Statement:** As a **Recipient**, I want to **cuộn xem những ảnh kỷ niệm với bố cục nghệ thuật**, so that **khám phá các khoảnh khắc đáng nhớ**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-002 / FEAT-002 |
| Business Context | khám phá các khoảnh khắc đáng nhớ |
| Related BR / FR | BR-004, BR-016, BR-018, BR-022, BR-025 / FR-005, FR-006, FR-007 |
| Workflow | BP-002 |
| Preconditions | Gallery có bộ ảnh cấu hình |
| Main Scenario | Cuộn vào Gallery → xem ảnh theo bố cục xen kẽ → tiếp tục scroll. |
| Postconditions | Ảnh có thể khám phá |
| Dependencies | Ảnh nguồn; thứ tự ảnh theo US-007 |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed core |
| Definition of Ready | Partial — thiết bị và ranh giới animation TBD |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-004 | Given Gallery có dữ liệu ảnh; When cuộn đến Gallery; Then ảnh hiển thị bố cục nghệ thuật với kích thước xen kẽ | Derived from Confirmed |
| AC-005 | Given thứ tự cấu hình A,B,C; When Gallery hiển thị; Then ảnh được hiển thị theo thứ tự A,B,C | Derived from Confirmed |
| AC-006 | Given cuộn tới ảnh; When ảnh vào vùng hiển thị; Then animation theo scroll được kích hoạt khi Reduced Motion không yêu cầu giảm | Derived from Confirmed |
| AC-007 | Given Gallery 10–30 ảnh dự kiến; When khám phá trên điện thoại mục tiêu; Then người nhận cuộn xem được Gallery; thiết bị mục tiêu TBD | Draft — test environment TBD |

**Test Scenarios**

- Cuộn Gallery với ảnh đã tải.
- Kiểm tra đúng thứ tự ảnh và kích thước bố cục.
- Ảnh bị thiếu/lỗi tải — OQ-018.

**Business Rules:** RULE-002, RULE-003.


### US-003 — Mở và điều hướng Lightbox

**User Story Statement:** As a **Recipient**, I want to **mở ảnh lớn và xem ảnh trước/sau**, so that **xem rõ từng kỷ niệm**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-002 / FEAT-002 |
| Business Context | xem rõ từng kỷ niệm |
| Related BR / FR | BR-023, BR-026, BR-031 / FR-008–011, FR-025 |
| Workflow | BP-003 |
| Preconditions | Gallery có ảnh đã render |
| Main Scenario | Tap ảnh → Lightbox → Next/Previous → Close. |
| Postconditions | Lightbox đóng hoặc ảnh đang xem thay đổi |
| Dependencies | US-002, US-007 |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed core; proposed edge |
| Definition of Ready | Partial — OQ-016/017 còn mở |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-008 | Given một ảnh trong Gallery; When Recipient chạm ảnh; Then Lightbox mở ảnh lớn tương ứng | Derived from Confirmed |
| AC-009 | Given Lightbox đang xem B trong A,B,C; When chọn Next; Then xem C | Derived from Confirmed |
| AC-010 | Given Lightbox đang xem B trong A,B,C; When chọn Previous; Then xem A | Derived from Confirmed |
| AC-011 | Given Lightbox đang mở; When chọn Close; Then Lightbox đóng | Derived from Confirmed |
| AC-012 | Given đang ở ảnh cuối; When chọn Next; Then không chuyển vượt ranh giới | Proposed — OQ-016 |

**Test Scenarios**

- Mở/đóng ảnh.
- Next/Previous ở ảnh giữa.
- Ảnh đầu/cuối — OQ-016.
- Swipe / Escape — OQ-017.

**Business Rules:** RULE-003.


### US-004 — Đọc Love Letter ở gần cuối

**User Story Statement:** As a **Recipient**, I want to **đọc bức thư khi cuộn gần cuối hành trình**, so that **cảm nhận thông điệp yêu thương**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-001 / FEAT-003 |
| Business Context | cảm nhận thông điệp yêu thương |
| Related BR / FR | BR-005, BR-019, BR-024, BR-028, BR-030 / FR-012–015 |
| Workflow | BP-004 |
| Preconditions | Section thư có nội dung cấu hình |
| Main Scenario | Cuộn gần cuối → Love Letter xuất hiện → đọc nội dung. |
| Postconditions | Thư được hiển thị |
| Dependencies | Nội dung Creator duyệt; US-010 |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed core; motion detail proposed |
| Definition of Ready | Partial — nội dung chính thức TBD trước Gift Release |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-013 | Given Recipient chưa đến Love Letter; When cuộn tới section gần cuối; Then thư xuất hiện với animation phù hợp chế độ motion | Derived from Confirmed |
| AC-014 | Given nội dung thư đã được duyệt; When xem Love Letter; Then hiển thị đúng nội dung được cấu hình | Derived from Confirmed release rule |
| AC-015 | Given Reduced Motion bật; When section thư xuất hiện; Then nội dung vẫn đọc được không phụ thuộc animation kéo dài | Proposed specific behavior |

**Test Scenarios**

- Hiển thị thư khi cuộn.
- Thay nội dung được duyệt.
- Reduced Motion — hành vi cụ thể TBD.

**Business Rules:** RULE-004, RULE-006.


### US-005 — Nghe và điều khiển bài nhạc nền

**User Story Statement:** As a **Recipient**, I want to **bắt đầu và điều khiển bài nhạc khi trải nghiệm**, so that **có không khí phù hợp mà vẫn chủ động**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-003 / FEAT-004 |
| Business Context | có không khí phù hợp mà vẫn chủ động |
| Related BR / FR | BR-006, BR-012, BR-015 / FR-016–019 |
| Workflow | BP-005 |
| Preconditions | Có audio source; người nhận bấm Start |
| Main Scenario | Start → trình duyệt phát một bài nhạc → người dùng điều khiển nếu muốn. |
| Postconditions | Audio chơi hoặc phản hồi state; lỗi qua US-008 |
| Dependencies | US-001; file nhạc thử/official; OQ-015/OQ-021 |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed core; controls details TBD |
| Definition of Ready | Not Ready — loại điều khiển và end-of-track TBD |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-016 | Given chưa bấm Start; When Opening hiển thị; Then không tự yêu cầu phát nhạc | Derived from Confirmed Start trigger |
| AC-017 | Given Recipient bấm Start và file hợp lệ; When phát thành công; Then một bài nhạc cấu hình bắt đầu phát | Derived from Confirmed |
| AC-018 | Given nhạc đang phát; When chuyển giữa các section; Then nhạc không tự khởi động lại do cuộn section | Draft interpretation of xuyên suốt |
| AC-019 | Given file nhạc không tải; When phát được yêu cầu; Then hiển thị trạng thái lỗi và tiếp tục website | Derived from Confirmed |
| AC-020 | Given nhạc đang phát; When sử dụng nút điều khiển; Then trạng thái âm thanh thay đổi phù hợp cơ chế được chọn (TBD) | Confirmed high-level; details TBD |

**Test Scenarios**

- Start phát nhạc hợp lệ.
- Thao tác điều khiển audio — OQ-015.
- Nhạc hết bài — OQ-021.
- Chuyển section không reset playback.

**Business Rules:** RULE-005.


### US-006 — Xem Final Message

**User Story Statement:** As a **Recipient**, I want to **đọc lời nhắn kết sau bức thư**, so that **kết thúc hành trình với cảm xúc trọn vẹn**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-001 / FEAT-005 |
| Business Context | kết thúc hành trình với cảm xúc trọn vẹn |
| Related BR / FR | BR-020, BR-024, BR-027, BR-028 / FR-021–024 |
| Workflow | BP-006 |
| Preconditions | Section thư đứng trước Final |
| Main Scenario | Sau thư → cuộn tới Final Message → đọc lời kết. |
| Postconditions | Người nhận nhìn thấy phần kết |
| Dependencies | US-004; nội dung Final Message đã duyệt |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed core; replay Proposed excluded |
| Definition of Ready | Partial — wording thực TBD; FR-024 ngoài MVP |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-021 | Given đã cuộn qua Love Letter; When đến Final Message; Then lời nhắn cuối được hiển thị ở section riêng | Derived from Confirmed |
| AC-022 | Given Final Message xuất hiện; When animation chạy; Then hiệu ứng nhẹ và hợp thiết kế đã duyệt | Derived from Confirmed; review qualitative |

**Test Scenarios**

- Đến Final Message sau thư.
- Nội dung chính thức hiển thị.
- Không yêu cầu Replay trong MVP.

**Business Rules:** RULE-004.


### US-007 — Cấu hình thứ tự ảnh thủ công

**User Story Statement:** As a **Creator**, I want to **định thứ tự hiển thị ảnh trong source code**, so that **kiểm soát thứ tự kỷ niệm được kể**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-002 / FEAT-002 |
| Business Context | kiểm soát thứ tự kỷ niệm được kể |
| Related BR / FR | BR-009, BR-018, BR-031 / FR-025 |
| Workflow | BP-002, BP-007 |
| Preconditions | Creator có tập ảnh và quyền cập nhật source |
| Main Scenario | Creator đặt danh sách ảnh và thứ tự trong source → phát hành build có thứ tự mong muốn. |
| Postconditions | Build phản ánh thứ tự source |
| Dependencies | Danh sách ảnh thực tế |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed requirement; implementation detail TBD |
| Definition of Ready | Partial — cấu trúc file config TBD |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-025 | Given Creator cấu hình danh sách ảnh A,B,C; When website được build/run; Then Gallery hiển thị đúng A,B,C | Derived from Confirmed |
| AC-026 | Given Creator đổi thứ tự thành C,A,B trong source; When phiên bản mới được sử dụng; Then Gallery và điều hướng ảnh phản ánh thứ tự C,A,B | Derived from Confirmed |
| AC-027 | Given dữ liệu ảnh chưa đầy đủ; When kiểm tra build; Then hành vi ảnh thiếu phải được xác định trước triển khai (TBD) | Open Question — OQ-018 |

**Test Scenarios**

- Cấu hình thứ tự A,B,C.
- Thay source thành C,A,B.
- Ảnh bị thiếu/lỗi — OQ-018.

**Business Rules:** RULE-002, RULE-003.


### US-008 — Tiếp tục trải nghiệm khi nhạc lỗi

**User Story Statement:** As a **Recipient**, I want to **tiếp tục xem website và biết khi nhạc gặp lỗi**, so that **không bị mất trải nghiệm vì lỗi âm thanh**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-003 / FEAT-004 |
| Business Context | không bị mất trải nghiệm vì lỗi âm thanh |
| Related BR / FR | BR-032 / FR-020, FR-026 |
| Workflow | BP-005 |
| Preconditions | Yêu cầu phát audio và xảy ra lỗi |
| Main Scenario | Audio không tải/phát → trạng thái lỗi hiển thị → người nhận tiếp tục website. |
| Postconditions | Nội dung tiếp tục, trạng thái lỗi rõ |
| Dependencies | US-001; US-005 |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed |
| Definition of Ready | Partial — câu chữ báo lỗi và thử lại TBD |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-028 | Given phát nhạc thất bại; When lỗi được phát hiện; Then hiện trạng thái lỗi âm thanh | Derived from Confirmed |
| AC-029 | Given âm thanh lỗi; When Recipient cuộn hoặc mở ảnh; Then vẫn có thể tiếp tục hành trình | Derived from Confirmed |
| AC-030 | Given trạng thái lỗi nhạc đang hiển thị; When người nhận muốn thử lại; Then hành vi retry chưa được chốt | Open Question — retry TBD |

**Test Scenarios**

- Audio error hiển thị trạng thái.
- Vẫn scroll/xem ảnh khi audio lỗi.
- Retry audio chỉ khi được duyệt.

**Business Rules:** RULE-005.


### US-009 — Trải nghiệm với Reduced Motion

**User Story Statement:** As a **Recipient**, I want to **đọc và tương tác khi thiết bị bật Reduced Motion**, so that **không bị buộc xem các chuyển động gây khó chịu**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-001 / FEAT-001 |
| Business Context | không bị buộc xem các chuyển động gây khó chịu |
| Related BR / FR | BR-013, BR-034 / FR-027 |
| Workflow | BP-008 |
| Preconditions | Có hỗ trợ đọc motion setting |
| Main Scenario | Trang đọc motion preference → chọn biến thể animation phù hợp → nội dung vẫn hiển thị. |
| Postconditions | Biến thể motion phù hợp được áp dụng |
| Dependencies | FEAT-001/002/003/005; OS/browser support |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed principle; specific fallback proposed |
| Definition of Ready | Partial — mức giảm theo loại hiệu ứng TBD |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-023 | Given thiết bị đặt Reduced Motion; When website tải; Then website nhận biết cài đặt motion của OS/browser | Derived from Confirmed |
| AC-024 | Given Reduced Motion đang bật; When cuộn/chạm; Then nội dung chính vẫn xem và sử dụng được trong khi hiệu ứng trang trí được giảm | Proposed detailed fallback |

**Test Scenarios**

- Reduced Motion On.
- Reduced Motion Off.
- Nội dung chính vẫn truy cập được.

**Business Rules:** RULE-007.


### US-010 — Chốt nội dung chính thức trước Gift Release

**User Story Statement:** As a **Creator**, I want to **duyệt lời kể, thư, lời kết và bổ sung nhạc chính thức vào website**, so that **đảm bảo món quà tặng không chứa nội dung tạm**.

| Field | Specification |
| --- | --- |
| Epic / Feature | EPIC-001 / FEAT-003 |
| Business Context | đảm bảo món quà tặng không chứa nội dung tạm |
| Related BR / FR | BR-009, BR-028–030 / FR-015 (primary); liên quan FEAT-004/005 |
| Workflow | BP-007 |
| Preconditions | Có bản nháp và người phụ trách duyệt |
| Main Scenario | AI đề xuất chữ → Creator chỉnh sửa/duyệt → cấu hình nội dung và nhạc chính thức → kiểm tra Release Gate. |
| Postconditions | Content gate đạt hoặc chặn Gift Release |
| Dependencies | Ảnh thật, tên người nhận, nội dung AI được duyệt, file nhạc chính thức |
| Priority (PO đề xuất) | Must |
| Confirmation Status | Confirmed release rule; không tạo CMS |
| Definition of Ready | Partial — input chưa có, Release Gate Confirmed |

**Acceptance Criteria (Given / When / Then)**

| AC ID | Given / When / Then | Status |
| --- | --- | --- |
| AC-031 | Given đang ở môi trường phát triển; When chưa có thư/nhạc thật; Then được sử dụng placeholder/nhạc thử hợp lệ | Derived from Confirmed |
| AC-032 | Given chuẩn bị Gift Release; When nội dung thư/lời kể/lời kết chưa được Creator duyệt; Then Release Gate chưa đạt | Derived from Confirmed |
| AC-033 | Given chuẩn bị Gift Release; When chưa có nhạc chính thức; Then Release Gate chưa đạt | Derived from Confirmed |
| AC-034 | Given nội dung và nhạc đã chính thức; When Creator kiểm tra bản build; Then nội dung đã cấu hình phải phản ánh bản đã duyệt; checklist kiểm thử cụ thể Proposed | Derived from Confirmed; QA detail Proposed |

**Test Scenarios**

- Dev dùng placeholder.
- Chặn Gift Release khi thiếu nhạc thật.
- Chặn Gift Release khi thư chưa duyệt.
- Đối chiếu nội dung bản tặng.

**Business Rules:** RULE-002.


## 3. Cross-Story Business Rules & Edge Cases

| Rule ID | Business Rule | Confirmation | Related BR |
| --- | --- | --- | --- |
| RULE-001 | Link không công bố; người có link truy cập được, không có cơ chế xác thực đã được yêu cầu | Confirmed | BR-002 |
| RULE-002 | Nội dung website cố định trong source; không yêu cầu dữ liệu timeline ngày tháng | Confirmed | BR-004, BR-009, BR-021 |
| RULE-003 | Gallery theo thứ tự cấu hình thủ công; số lượng 10–30 chỉ là dự kiến | Confirmed | BR-018, BR-031 |
| RULE-004 | Love Letter đứng trước Final Message, mỗi phần là một section | Confirmed | BR-019, BR-024 |
| RULE-005 | Một bài nhạc bắt đầu sau Start, có điều khiển người nhận; nhạc lỗi vẫn tiếp tục và báo trạng thái | Confirmed cấp cao | BR-012, BR-015, BR-032 |
| RULE-006 | Trước Gift Release phải có nội dung đã được chốt và nhạc chính thức; khi Dev có thể dùng placeholder | Confirmed | BR-029, BR-030 |
| RULE-007 | Animation điều chỉnh theo Reduced Motion của OS/browser | Confirmed cấp cao | BR-013, BR-034 |
| RULE-008 | Tối ưu sản phẩm cho điện thoại, không cần thiết kế riêng tablet/desktop | Confirmed | BR-033 |
| RULE-009 | Chuyển ảnh tới đầu/cuối thì dừng, không vòng lặp | Proposed | FR-011 |
| RULE-010 | Nếu ảnh lỗi, giữ bố cục và thông báo/placeholder phù hợp | Proposed | OQ-018 |

## 4. End-to-End Test Scenarios

| E2E ID | Scenario | Expected Result | Status |
| --- | --- | --- | --- |
| E2E-001 | Mở link → Start → Gallery → Thư → Lời kết | Đọc được đầy đủ hành trình | Confirmed flow; chi tiết AC Draft |
| E2E-002 | Nhạc lỗi khi Start → cuộn Gallery → mở ảnh | Có trạng thái nhạc lỗi; web vẫn dùng được | Confirmed |
| E2E-003 | Cấu hình 3 ảnh A,B,C và mở Lightbox ảnh B | Next là C, Previous là A | Confirmed |
| E2E-004 | Reduced Motion từ OS bật | Website phản hồi motion setting | Confirmed principle; animation detail TBD |
| E2E-005 | Dev chưa có thư/nhạc chính thức | Có thể dùng placeholder/nhạc thử | Confirmed |
| E2E-006 | Gift Release thiếu thư hoặc file nhạc chính thức | Không đạt Content Release Gate | Confirmed |
| E2E-007 | Xem trên tablet/desktop | Không yêu cầu layout tối ưu riêng; không suy ra cấm truy cập | Confirmed scope boundary |

## 5. Dependencies, Open Questions & DoR

| OQ | Nội dung | Ảnh hưởng | Status | Hành động tiếp theo |
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

**Definition of Ready chung (Proposed workflow):** có actor, business value, input/output, AC kiểm chứng, source/permission, xử lý ngoại lệ liên quan, và các quyết định quan trọng không còn TBD. Đây là tiêu chí đề xuất để PO/Dev/QA thống nhất.

**Readiness:** `US-005` Not Ready vì OQ-015/021; `US-003` Partial vì OQ-016; các Story khác Draft/Partial. Không có Story nào được gắn nhãn Approved AC chỉ do duyệt MVP Scope.


## 6. Release Validation & Requirement Traceability

| Story | Feature | Related BRs | Related FRs | BP | AC IDs |
| --- | --- | --- | --- | --- | --- |
| US-001 | FEAT-001 | BR-001, BR-003, BR-017, BR-027 | FR-001, FR-002, FR-003, FR-004 | BP-001 | AC-001–003 |
| US-002 | FEAT-002 | BR-004, BR-016, BR-018, BR-022, BR-025 | FR-005, FR-006, FR-007 | BP-002 | AC-004–007 |
| US-003 | FEAT-002 | BR-023, BR-026, BR-031 | FR-008–011, FR-025 | BP-003 | AC-008–012 |
| US-004 | FEAT-003 | BR-005, BR-019, BR-024, BR-028, BR-030 | FR-012–015 | BP-004 | AC-013–015 |
| US-005 | FEAT-004 | BR-006, BR-012, BR-015 | FR-016–019 | BP-005 | AC-016–020 |
| US-006 | FEAT-005 | BR-020, BR-024, BR-027, BR-028 | FR-021–024 | BP-006 | AC-021–022 |
| US-007 | FEAT-002 | BR-009, BR-018, BR-031 | FR-025 | BP-002, BP-007 | AC-025–027 |
| US-008 | FEAT-004 | BR-032 | FR-020, FR-026 | BP-005 | AC-028–030 |
| US-009 | FEAT-001 | BR-013, BR-034 | FR-027 | BP-008 | AC-023–024 |
| US-010 | FEAT-003 | BR-009, BR-028–030 | FR-015 (primary); liên quan FEAT-004/005 | BP-007 | AC-031–034 |

**Release Gate Confirmed:** nội dung chữ và file nhạc chính thức đã được Creator duyệt/sẵn sàng. **Proposed QA checks:** không còn placeholder, kiểm tra đường dẫn ảnh, kiểm thử mobile, quyền sử dụng media, và rà soát các AC Must trước khi tặng.

**Change control:** mọi AC Proposed phải được xác nhận riêng trước khi trở thành tiêu chí nghiệm thu bắt buộc; khi chỉnh FR/BR phải đánh giá cập nhật AC, Workflow và PB.
