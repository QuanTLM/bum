# BUSINESS REQUIREMENTS DOCUMENT (BRD)

> **Dự án:** Website For My Love  
> **Mã tài liệu:** DOC-01  
> **Phiên bản:** Draft v1.0  
> **Ngày:** 11/10/2026  
> **Nguồn:** Requirement Baseline v0.7 — MVP Scope đã phê duyệt; Proposed/TBD chưa được phê duyệt  
> **Trạng thái:** Draft — chưa ký duyệt tài liệu chi tiết  
> **Mục tiêu:** Tại sao xây dựng website và yêu cầu cấp nghiệp vụ cần đáp ứng.

**Quy ước trạng thái:** `Confirmed` = quyết định đã được người dùng xác nhận; `Proposed` = đề xuất chưa xác nhận; `Assumed` = giả định có nêu lý do; `Open Question/TBD` = cần làm rõ; `Out of Scope` = đã loại khỏi phạm vi; `Superseded` = thông tin đã được thay thế. Việc duyệt MVP **không** tự động duyệt các chi tiết Proposed/TBD.

## Mục lục

- **1.** Document Information & Version History
- **2.** Executive Summary
- **3.** Project Background & Business Context
- **4.** Business Problems & Opportunities
- **5.** Business Objectives
- **6.** Success Metrics / KPIs
- **7.** Stakeholders & User Roles
- **8.** Current Business Context / AS-IS
- **9.** Proposed Business Solution / TO-BE
- **10.** Business Scope
- **11.** In Scope / Out of Scope
- **12.** High-Level Business Requirements / Requirement Register
- **13.** Business Rules
- **14.** Business Constraints & Dependencies
- **15.** Business Assumptions
- **16.** Risks & Open Questions
- **17.** Requirement Traceability
- **18.** Approval / Validation Status
- **19.** Decision Log v0.7 — Full History
- **20.** Content Readiness Register


## 1. Document Information & Version History

| Version | Ngày | Baseline | Thay đổi | Approval |
| --- | --- | --- | --- | --- |
| Draft v1.0 | 11/10/2026 | v0.7 | Lần đầu tạo từ Discovery vòng 1–6 và MVP Scope đã duyệt | Draft; chỉ Scope MVP đã được duyệt |

## 2. Executive Summary

Website For My Love là món quà kỹ thuật số bất ngờ dành cho một người nhận chính. Trải nghiệm là **một trang cuộn liên tục**, **Modern Minimal**, tối ưu **điện thoại**, dùng **Vue**, tập trung vào Opening, Gallery ảnh kỷ niệm, Love Letter, một bài nhạc nền và Final Message. Người có đường link không công bố đều có thể mở website; **đây không phải cơ chế bảo mật**.

**MVP đã được phê duyệt:** `EPIC-001` Romantic Experience, `EPIC-002` Memories Experience, `EPIC-003` Music & Atmosphere; **5 Feature** `FEAT-001` đến `FEAT-005`. Phê duyệt không bao gồm chi tiết Proposed/TBD.


## 3. Project Background & Business Context

- **Bối cảnh Confirmed:** Người tạo muốn tặng website bất ngờ cho người yêu; đã có ảnh nhưng chưa có lời kể/thư và file nhạc chính thức.
- **AS-IS:** Chưa xác nhận có quy trình/sản phẩm hiện tại cần thay thế. Không suy diễn hành vi hiện tại.
- **Cơ hội (Proposed):** Tập hợp ảnh, thông điệp và âm nhạc trong trải nghiệm cá nhân hóa thay vì một tập hợp tài nguyên rời rạc.
- **Quy trình tạo nội dung ngoài website:** AI soạn nháp → Creator sửa/duyệt → cập nhật source code → kiểm tra bản phát hành. Đã Confirmed về trách nhiệm duyệt; cách triển khai cụ thể Proposed.


## 4. Business Problems & Opportunities

**Business Problem (Proposed):** Một món quà chỉ gồm lời chúc hoặc album thông thường có thể chưa tạo được cảm giác bất ngờ và hành trình khám phá. Không có khảo sát người dùng hay số liệu hiện trạng chứng minh nhận định này.

**Giá trị dự kiến:** trải nghiệm giàu cảm xúc, lưu giữ kỷ niệm, thể hiện lời nhắn đặc biệt, mang không khí bằng âm nhạc nhưng không cản trở trải nghiệm khi âm thanh lỗi.


## 5. Business Objectives

| ID | Objective (cách diễn đạt đề xuất) | Trạng thái | Đo lường dự kiến |
| --- | --- | --- | --- |
| BO-001 | Tạo món quà số bất ngờ, có tính cá nhân hóa | Proposed wording từ mục đích Confirmed | Người nhận truy cập và hoàn thành trải nghiệm; phương pháp đo TBD |
| BO-002 | Gợi lại kỷ niệm thông qua album ảnh tương tác | Proposed wording từ Feature Confirmed | Gallery và Lightbox sử dụng được; mục tiêu định lượng TBD |
| BO-003 | Truyền tải thông điệp tình cảm qua thư và lời kết | Proposed wording từ Feature Confirmed | Thư và lời nhắn chính thức được duyệt, hiển thị đúng |
| BO-004 | Tạo bầu không khí nhờ nhạc và chuyển động | Proposed wording từ Feature Confirmed | Nhạc hoạt động hoặc báo lỗi không chặn hành trình; KPI định lượng TBD |
| BO-005 | Ưu tiên trải nghiệm cho điện thoại và người cần giảm chuyển động | Proposed wording từ Constraint Confirmed | Có kiểm thử theo thiết bị mục tiêu; thiết bị/ngưỡng TBD |

## 6. Success Metrics / KPIs

**Chưa có KPI định lượng được người dùng phê duyệt.** Bảng dưới là *Proposed* để hoàn thiện BRD, không được xem như mục tiêu số đã cam kết.

| Chỉ số / phép kiểm | Mục đích | Giá trị đích | Status |
| --- | --- | --- | --- |
| Trải nghiệm chính hoàn thành | Opening → Gallery → Love Letter → Final Message | TBD | Proposed |
| Gallery xem được trên mobile mục tiêu | Ảnh và Lightbox hoạt động | Danh sách thiết bị TBD | Proposed |
| Xử lý lỗi âm thanh | Nhạc lỗi không chặn và có trạng thái lỗi | Pass/Fail theo AC | Dựa trên Confirmed |
| Reduced Motion | Hỗ trợ thiết lập OS/browser | Pass/Fail theo AC | Dựa trên Confirmed |
| Độ mượt/hiệu năng | Đảm bảo mức cảm nhận mượt | FPS/Core Web Vitals TBD | Open Question |
| Hoàn thiện nội dung Gift Release | Không thiếu thư/lời kết/nhạc chính thức | Điều kiện bắt buộc | Confirmed |

## 7. Stakeholders & User Roles

| Vai trò | Trách nhiệm | Trạng thái |
| --- | --- | --- |
| Creator | Người tạo website, chọn/thứ tự ảnh, cung cấp tên người nhận, duyệt nội dung và nhạc; chỉnh source trực tiếp | Confirmed ở cấp vai trò/ngữ cảnh |
| Recipient | Người yêu — mở link, Start, cuộn, xem ảnh, điều khiển nhạc và đọc thư | Confirmed |
| Browser/OS | Môi trường thực thi: chính sách âm thanh, mạng, chế độ Reduced Motion | Không phải vai trò nghiệp vụ / external dependency |

## 8. Current Business Context / AS-IS

Chưa có quy trình vận hành AS-IS được cung cấp. Không tạo sơ đồ AS-IS hư cấu. Hiện đã có một bộ ảnh dự kiến 10–30 ảnh, chưa có thư/lời kể/nhạc chính thức.


## 9. Proposed Business Solution / TO-BE

1. Người nhận mở link không công bố.
2. Opening hiển thị tên người nhận và Start; sau Start hệ thống yêu cầu phát một bài nhạc.
3. Người nhận cuộn xem Gallery nghệ thuật; chạm ảnh để mở Lightbox có Previous/Next/Close.
4. Người nhận cuộn đến Love Letter gần cuối, sau đó Final Message ở section riêng.
5. Khi âm thanh lỗi, website tiếp tục hoạt động và hiển thị trạng thái lỗi.
6. Animation phản hồi cài đặt Reduced Motion của thiết bị.

**Lưu ý:** Cấu trúc điều hướng trên đây là Confirmed ở cấp cao; cách xử lý ranh giới ảnh, retry nhạc và mức giảm motion là Proposed/TBD.


## 10. Business Scope

| Mảng | Trong MVP đã duyệt | Ghi chú |
| --- | --- | --- |
| Romantic Experience | FEAT-001 / FEAT-003 / FEAT-005 | Hero, thư, lời kết |
| Memories Experience | FEAT-002 | Gallery nghệ thuật, Lightbox |
| Music & Atmosphere | FEAT-004 | Một bài nhạc, điều khiển, trạng thái lỗi |
| Cross-cutting | Mobile-only optimization, Reduced Motion, nội dung static | Áp dụng các Feature liên quan |

## 11. In Scope / Out of Scope

**In Scope (MVP Approved):** một trang scroll; Opening Hero/tên/Start; 10–30 ảnh dự kiến trong Gallery bố cục nghệ thuật; animation theo scroll; Lightbox có đóng/trước/sau; Love Letter gần cuối; Final Message tiếp sau; một bài nhạc xuyên suốt với điều khiển và thông báo lỗi; thiết kế tối ưu điện thoại; Reduced Motion; source content; nội dung/nhạc chính thức trước Gift Release.

**Out of Scope (Confirmed):** Timeline ngày tháng (`BR-021`); tối ưu thiết kế riêng cho tablet/desktop (`BR-033`, không có nghĩa cấm truy cập).

**Proposed Out of Scope (chưa xác nhận riêng):** CMS/admin, tài khoản, mini-game, playlist nhiều bài, website nhiều trang, scene 3D phức tạp, nút Replay. Chúng không nằm trong 5 Feature MVP đã duyệt; nếu phát sinh phải qua change control.


## 12. High-Level Business Requirements / Requirement Register

| BR ID | Requirement Name | Description | Business Rationale | Priority (PO đề xuất) | Related BO | Source / Confirmation Status |
| --- | --- | --- | --- | --- | --- | --- |
| BR-001 | Món quà bất ngờ | Website là món quà bất ngờ cho người yêu | Đảm bảo món quà bất ngờ, cá nhân hóa và cách truy cập đúng mong muốn. | Must | BO-001 | DEC-004 — Confirmed |
| BR-002 | Truy cập qua link | Truy cập qua link không công bố; ai có link đều xem được | Đảm bảo món quà bất ngờ, cá nhân hóa và cách truy cập đúng mong muốn. | Must | BO-001 | DEC-014 — Confirmed |
| BR-003 | Opening | Opening tạo ấn tượng | Đảm bảo món quà bất ngờ, cá nhân hóa và cách truy cập đúng mong muốn. | Must | BO-001 | DEC-006 — Confirmed |
| BR-004 | Photo Gallery | Hiển thị ảnh kỷ niệm bằng Photo Gallery, không có Timeline | Giúp người nhận khám phá hình ảnh kỷ niệm dễ dàng, đúng thứ tự. | Must | BO-002 | DEC-024 — Confirmed |
| BR-005 | Love Letter | Có Love Letter/lời nhắn tình cảm | Đảm bảo thư và lời kết truyền tải thông điệp rõ ràng. | Must | BO-003 | DEC-006 — Confirmed |
| BR-006 | Music & Atmosphere | Có nhạc và hiệu ứng không khí | Tạo không khí và hiệu ứng mà không cản trở trải nghiệm. | Must | BO-004 | DEC-006 — Confirmed |
| BR-007 | Modern Minimal | Phong cách Modern Minimal | Đảm bảo món quà bất ngờ, cá nhân hóa và cách truy cập đúng mong muốn. | Must | BO-001 | DEC-007 — Confirmed |
| BR-008 | Animation mượt | Animation đẹp, mượt; ngưỡng đo còn TBD | Tạo không khí và hiệu ứng mà không cản trở trải nghiệm. | Must | BO-004 | DEC-003 — Confirmed cấp cao |
| BR-009 | Static content | Nội dung cố định, cấu hình trong source code | Đảm bảo món quà bất ngờ, cá nhân hóa và cách truy cập đúng mong muốn. | Must | BO-001 | DEC-008 — Confirmed |
| BR-010 | Cốt truyện cảm xúc | Có cốt truyện cảm xúc theo trình tự | Đảm bảo thư và lời kết truyền tải thông điệp rõ ràng. | Should | BO-003 | DEC-010 — Proposed |
| BR-011 | Mobile-first | Mobile-first | Bảo đảm phạm vi trải nghiệm trên điện thoại và hỗ trợ cài đặt giảm chuyển động. | Must | BO-005 | DEC-015 — Confirmed |
| BR-012 | Audio control | Có điều khiển bật/tắt hoặc tạm dừng nhạc; cách cụ thể chưa chốt | Tạo không khí và hiệu ứng mà không cản trở trải nghiệm. | Must | BO-004 | DEC-021 — Confirmed cấp cao |
| BR-013 | Reduced Motion | Hỗ trợ Reduced Motion theo cài đặt hệ điều hành/trình duyệt | Bảo đảm phạm vi trải nghiệm trên điện thoại và hỗ trợ cài đặt giảm chuyển động. | Must | BO-005 | DEC-037 — Confirmed |
| BR-014 | Single-page scroll | Trải nghiệm trong một trang cuộn liên tục | Đảm bảo món quà bất ngờ, cá nhân hóa và cách truy cập đúng mong muốn. | Must | BO-001 | DEC-012 — Confirmed |
| BR-015 | Nhạc xuyên suốt | Một bài nhạc bắt đầu sau Start và chạy xuyên suốt hành trình | Tạo không khí và hiệu ứng mà không cản trở trải nghiệm. | Must | BO-004 | DEC-016 — Confirmed cấp cao |
| BR-016 | Ảnh người tạo cung cấp | Dùng bộ ảnh do người tạo cung cấp | Giúp người nhận khám phá hình ảnh kỷ niệm dễ dàng, đúng thứ tự. | Must | BO-002 | DEC-013 — Confirmed |
| BR-017 | Hero & Start | Hero có tên người nhận và nút Start | Đảm bảo món quà bất ngờ, cá nhân hóa và cách truy cập đúng mong muốn. | Must | BO-001 | DEC-017 — Confirmed |
| BR-018 | Quy mô album dự kiến | Dự kiến 10–30 ảnh; không phải giới hạn kỹ thuật cứng | Giúp người nhận khám phá hình ảnh kỷ niệm dễ dàng, đúng thứ tự. | Must | BO-002 | DEC-019 — Confirmed ước lượng |
| BR-019 | Thư gần cuối | Love Letter xuất hiện khi cuộn đến gần cuối trang | Đảm bảo thư và lời kết truyền tải thông điệp rõ ràng. | Must | BO-003 | DEC-020 — Confirmed |
| BR-020 | Final Message | Final Message có animation nhẹ | Đảm bảo thư và lời kết truyền tải thông điệp rõ ràng. | Must | BO-003 | DEC-022 — Confirmed |
| BR-021 | Loại Timeline | Không triển khai Timeline ngày tháng | Giúp người nhận khám phá hình ảnh kỷ niệm dễ dàng, đúng thứ tự. | Won’t | BO-002 | DEC-024 — Out of Scope |
| BR-022 | Scroll image reveal | Gallery có animation xuất hiện theo scroll | Giúp người nhận khám phá hình ảnh kỷ niệm dễ dàng, đúng thứ tự. | Must | BO-002 | DEC-025 — Confirmed |
| BR-023 | Xem ảnh lớn | Có thể mở ảnh lớn | Giúp người nhận khám phá hình ảnh kỷ niệm dễ dàng, đúng thứ tự. | Must | BO-002 | DEC-025 — Confirmed |
| BR-024 | Tách hai section | Love Letter và Final Message là hai phần riêng theo thứ tự đó | Đảm bảo thư và lời kết truyền tải thông điệp rõ ràng. | Must | BO-003 | DEC-027 — Confirmed |
| BR-025 | Gallery nghệ thuật | Gallery nghệ thuật với ảnh có kích thước xen kẽ | Giúp người nhận khám phá hình ảnh kỷ niệm dễ dàng, đúng thứ tự. | Must | BO-002 | DEC-029 — Confirmed |
| BR-026 | Lightbox navigation | Lightbox có đóng và chuyển ảnh trước/sau | Giúp người nhận khám phá hình ảnh kỷ niệm dễ dàng, đúng thứ tự. | Must | BO-002 | DEC-030 — Confirmed |
| BR-027 | Animation cân bằng | Opening có animation nổi bật; phần sau tinh tế | Tạo không khí và hiệu ứng mà không cản trở trải nghiệm. | Must | BO-004 | DEC-031 — Confirmed |
| BR-028 | Giọng văn dễ thương | Lời kể và thư tình có giọng văn dễ thương, ngọt ngào | Đảm bảo thư và lời kết truyền tải thông điệp rõ ràng. | Must | BO-003 | DEC-032 — Confirmed |
| BR-029 | Placeholder trong Dev | Được dùng nội dung/nhạc thử khi phát triển | Đảm bảo món quà bất ngờ, cá nhân hóa và cách truy cập đúng mong muốn. | Should | BO-001 | DEC-033 — Confirmed |
| BR-030 | Official Gift Content | Trước khi tặng phải có nội dung và nhạc chính thức | Đảm bảo món quà bất ngờ, cá nhân hóa và cách truy cập đúng mong muốn. | Must | BO-001 | DEC-033 — Confirmed |
| BR-031 | Thứ tự ảnh thủ công | Thứ tự ảnh Gallery được sắp thủ công trong source code | Giúp người nhận khám phá hình ảnh kỷ niệm dễ dàng, đúng thứ tự. | Must | BO-002 | DEC-034 — Confirmed |
| BR-032 | Lỗi nhạc không chặn | Lỗi nhạc không chặn hành trình và phải hiển thị trạng thái lỗi | Tạo không khí và hiệu ứng mà không cản trở trải nghiệm. | Must | BO-004 | DEC-035 — Confirmed |
| BR-033 | Chỉ tối ưu điện thoại | Chỉ tối ưu trải nghiệm điện thoại; không tối ưu riêng tablet/desktop | Bảo đảm phạm vi trải nghiệm trên điện thoại và hỗ trợ cài đặt giảm chuyển động. | Must | BO-005 | DEC-036 — Confirmed |
| BR-034 | Motion setting | Animation phản hồi cài đặt Reduced Motion của hệ điều hành/trình duyệt | Bảo đảm phạm vi trải nghiệm trên điện thoại và hỗ trợ cài đặt giảm chuyển động. | Must | BO-005 | DEC-037 — Confirmed |

## 13. Business Rules

| Rule ID | Quy tắc | Status | BR liên quan |
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

## 14. Business Constraints & Dependencies

- **Technology Confirmed:** Vue; thư viện animation cụ thể chưa chọn.
- **Access Confirmed:** link không công bố nhưng có thể chia sẻ; bảo mật bằng mật khẩu chưa được yêu cầu.
- **Design Confirmed:** Modern Minimal, animation cân bằng (Opening nổi bật), chỉ tối ưu mobile.
- **Content dependencies:** `CONTENT-001` bộ ảnh; `CONTENT-004` thư chưa duyệt; `CONTENT-005` file nhạc chính thức chưa có; `CONTENT-006` tên người nhận chưa được cung cấp trong Discovery.
- **External environment:** autoplay và tải âm thanh phụ thuộc trình duyệt; Reduced Motion phụ thuộc OS/browser.
- **Delivery:** effort, ngân sách, ngày phát hành, host/domain, danh sách trình duyệt và độ mượt định lượng đều **TBD**.


## 15. Business Assumptions

| Assumption | Cơ sở | Ảnh hưởng / cách xử lý |
| --- | --- | --- |
| ASS-001: Creator trực tiếp sửa source hoặc nhờ Dev cập nhật | Nội dung static Confirmed | Assumed; không tạo CMS |
| ASS-002: Có file ảnh đủ chất lượng để hiển thị | Đã có ảnh nhưng chưa được bàn giao | Assumed; kiểm tra nội dung trước Gift Release |
| ASS-003: Luồng bắt đầu chỉ yêu cầu phát nhạc sau Start | DEC-016 Confirmed | Khi trình duyệt từ chối: áp dụng BR-032 |
| ASS-004: Nội dung chữ AI đề xuất không tự động được phát hành | DEC-026, DEC-033 Confirmed | Creator kiểm duyệt trước release |

## 16. Risks & Open Questions

| Risk | Khả năng ảnh hưởng | Biện pháp (Proposed) |
| --- | --- | --- |
| RISK-001: Chưa có nhạc chính thức | Chặn Gift Release | Chuẩn bị nhạc và xác nhận quyền sử dụng |
| RISK-002: Chưa duyệt nội dung chữ | Chặn Gift Release | Soạn/duyệt theo CONTENT Register |
| RISK-003: 10–30 ảnh nặng | Tải chậm/giật trên mobile | Thử nghiệm tối ưu ảnh, chưa khóa kỹ thuật |
| RISK-004: Link bị chia sẻ lại | Người ngoài có thể xem nội dung cá nhân | Tránh nội dung nhạy cảm, cân nhắc biện pháp bảo vệ nếu yêu cầu đổi |
| RISK-005: Chưa có ngưỡng NFR | Khó kết luận đạt/chưa đạt | Chốt thiết bị và tiêu chí trước QA |

| OQ | Nội dung | Ảnh hưởng | Trạng thái | Hành động tiếp theo |
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

## 17. Requirement Traceability

| BO | BR đại diện | Feature | Workflow | Story |
| --- | --- | --- | --- | --- |
| BO-001 | BR-001/002/003/017 | FEAT-001 | BP-001 | US-001 |
| BO-002 | BR-004/022/023/025/026/031 | FEAT-002 | BP-002/BP-003 | US-002/003/007 |
| BO-003 | BR-005/019/020/024/028 | FEAT-003/005 | BP-004/BP-006 | US-004/006/010 |
| BO-004 | BR-006/012/015/032 | FEAT-004 | BP-005 | US-005/008 |
| BO-005 | BR-011/013/033/034 | FEAT-001, cross-cutting | BP-008 | US-009 |

## 18. Approval / Validation Status

- **MVP Scope v0.7:** **Approved** bởi người dùng, bao gồm 3 Epic và 5 Feature, các quyết định Confirmed và điều kiện nội dung/nhạc trước Gift Release.
- **BRD Draft v1.0:** **Not Approved** — được soạn để review.
- **Tất cả Proposed/TBD:** giữ nguyên trạng thái chưa duyệt; không nâng cấp trạng thái do việc phê duyệt MVP.
- **Người duyệt cuối:** Creator/PO (tên cụ thể TBD); Ngày duyệt tài liệu: TBD.

**Change control:** khi BR thay đổi, cập nhật đồng thời `02_PRD`, `03_Business_Workflow`, `04_Product_Backlog`, `05_User_Stories_AC` qua mapping ID.

## 19. Decision Log v0.7 — Full History

| Decision ID | Nội dung | Status |
| --- | --- | --- |
| DEC-001 | Xây dựng website dành tặng người yêu | Confirmed |
| DEC-002 | Sử dụng Vue | Confirmed |
| DEC-003 | Ưu tiên UI hiện đại và animation mượt | Confirmed |
| DEC-004 | Mục đích làm món quà bất ngờ | Confirmed |
| DEC-005 | Truy cập bằng link riêng | Confirmed |
| DEC-006 | Ưu tiên Opening, Gallery, Love Letter, Music | Confirmed |
| DEC-007 | Phong cách Modern Minimal | Confirmed |
| DEC-008 | Nội dung tĩnh trong source code | Confirmed |
| DEC-009 | Loại CMS khỏi MVP | Proposed Out of Scope |
| DEC-010 | Storytelling có cốt truyện cảm xúc rõ rệt | Proposed |
| DEC-011 | Thư đặt ở gần cuối trải nghiệm | Confirmed qua DEC-020 |
| DEC-012 | Một trang cuộn liên tục | Confirmed |
| DEC-013 | Đã có ảnh, chưa có lời kể/thư | Confirmed — nội dung |
| DEC-014 | Link không công bố; bất kỳ người có link đều có thể xem | Confirmed |
| DEC-015 | Mobile-first | Confirmed; làm rõ DEC-036 |
| DEC-016 | Sau Start, nhạc chạy xuyên suốt | Confirmed |
| DEC-017 | Hero + tên người nhận + Start | Confirmed |
| DEC-018 | Kết hợp Timeline + Album | Superseded bởi DEC-024 |
| DEC-019 | Dự kiến 10–30 ảnh | Confirmed — dự kiến |
| DEC-020 | Thư xuất hiện khi cuộn tới gần cuối | Confirmed |
| DEC-021 | Một bài nhạc, có nút điều khiển | Confirmed |
| DEC-022 | Lời kết và animation nhẹ | Confirmed |
| DEC-023 | Ghi chú không có Timeline | Resolved bằng DEC-024 |
| DEC-024 | Chỉ Photo Gallery, không Timeline ngày tháng | Confirmed |
| DEC-025 | Ảnh animate theo scroll và mở xem lớn | Confirmed |
| DEC-026 | AI đề xuất lời kể/thư, người tạo duyệt | Confirmed — quy trình nội dung |
| DEC-027 | Love Letter và Final Message là 2 section riêng | Confirmed |
| DEC-028 | Chưa có file nhạc, sẽ chuẩn bị sau | Confirmed — trạng thái nội dung |
| DEC-029 | Gallery nghệ thuật với kích thước ảnh xen kẽ | Confirmed |
| DEC-030 | Lightbox đóng và chuyển trước/sau | Confirmed |
| DEC-031 | Opening animation nổi bật, phần khác tinh tế | Confirmed |
| DEC-032 | Giọng văn dễ thương, ngọt ngào | Confirmed |
| DEC-033 | Placeholder/nhạc thử khi phát triển; nội dung và nhạc chính thức trước khi tặng | Confirmed |
| DEC-034 | Thứ tự ảnh do Creator sắp trong source code | Confirmed |
| DEC-035 | Nhạc lỗi vẫn tiếp tục trải nghiệm và báo lỗi | Confirmed |
| DEC-036 | Chỉ tối ưu điện thoại | Confirmed |
| DEC-037 | Hỗ trợ Reduced Motion theo cài đặt OS/browser | Confirmed |

Các ID `DEC-018` và `DEC-023` chỉ giữ để bảo toàn lịch sử; không phải yêu cầu hiện hành. `DEC-009/010` không được nâng trạng thái do duyệt MVP.

## 20. Content Readiness Register

| Content ID | Nội dung | Status |
| --- | --- | --- |
| CONTENT-001 | Bộ ảnh dự kiến 10–30 | Confirmed — ảnh có sẵn; số lượng dự kiến |
| CONTENT-002 | AI soạn lời kể và thư; Creator là người duyệt | Confirmed |
| CONTENT-003 | Bản lời kể chính thức chưa được duyệt | Open Question |
| CONTENT-004 | Bản Love Letter và lời kết chính thức chưa duyệt | Open Question |
| CONTENT-005 | File nhạc chính thức chưa có | Confirmed — hiện trạng |
| CONTENT-006 | Tên người nhận trong Hero chưa được cung cấp | Open Question |
