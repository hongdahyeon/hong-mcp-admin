# TODO (todo)

## 1. 프론트엔드 기본 구조 설계 및 적용 
- [x] 프론트엔드 기본 구조 설계 및 적용
- [x] `docs/todo.md` 및 `docs/implementation_plan.md` 작성
- [x] TypeScript 관련 설정 점검 및 보완 (tsconfig.json 등)
- [x] 폴더 구조 설계 및 `implementation_plan.md` 업데이트
- [x] 사용자 승인 및 일괄 반영
- [x] `docs/about_frontend.md` 작성 및 설명 추가

## 2. Tailwind CSS 및 의존성 설치
- [x] `tailwindcss`, `postcss`, `autoprefixer` 설치 및 설정
- [x] `react-router-dom`, `lucide-react` 설치

## 3. 기본 레이아웃 및 라우팅 구현
- [x] `src/components/layout/` (Header, Footer, MainLayout) 구현
- [x] `src/pages/home/` 기본 페이지 구현
- [x] `src/routes/AppRouter.tsx` 설정 및 `main.tsx` 연동

## 4. 공방 관리 서비스 전환 (CraftDay 브랜딩)
- [x] 메인 화면 워크숍 칸반 보드 레이아웃 구현 (지역별 분류)
- [x] 프리미엄 워크숍 카드 디자인 및 샘플 데이터 적용
- [x] 전체 폰트 Pretendard 적용 및 바이올렛 테마 강화
- [x] 서비스 명칭 'CraftDay (크래프트데이)' 공식 적용 (Header, Footer, Home)

## 5. 인증(Auth) 및 보안 인프라 구축
- [x] Axios Interceptor를 통한 JWT (Bearer Token) 자동 주입 및 401 에러 처리
- [x] `authService` 구현 (Login, Logout, Token 관리)
- [x] 로그인 (`/login`) 및 로그아웃 (`/logout`) 페이지 구현
- [x] 커스텀 404 에러 페이지 (`NotFound`) 구현 및 라우팅 연결

## 6. 회원가입(Signup) 기능 구현
- [x] `auth.ts` API 연동 (중복 체크, 역할 조회, 가입 신청) - API 경로 `/api/auth-user`로 최신화
- [x] `Signup` 페이지 UI 구현 및 유효성 검사 로직 적용
- [x] `AppRouter` 및 Header/Login 페이지 내 회원가입 경로 연동
- [x] 최종 테스트 및 예외 처리 (API 에러 핸들링 등)
- [x] 이메일 기반 ID 로그인 체계 UI 반영 및 용어 정리 (username -> 이름/닉네임)

## 7. 폰트 및 테마 최적화 (Tailwind CSS v4)
- [x] Tailwind CSS v4 `@theme` 블록을 사용한 폰트 설정 (index.css)
- [x] Pretendard Variable 폰트 우선 순위 적용 및 최적화
- [ ] 디자인 시스템 변수 점검 및 브라우저 렌더링 확인

## 8. 전역 예외 처리 최적화 (ErrorResponse / HongErrorCode 연동)
- [x] `api/index.ts` 내 `ErrorResponse` (code, message) 처리 인터셉터 고도화
- [x] 401 (Unauthorized) 에러 세분화 (비밀번호 불일치 vs 세션 만료)
- [x] 비즈니스 로직 에러 코드별 사용자 피드백 테스트
- [x] 페이지별 중복 alert 제거 및 `[object Object]` 출력 방지 로직 적용

## 9. CI/CD 파이프라인 구축 (Jenkinsfile)
- [x] Java 25 / React 빌드 대응 Jenkinsfile 작성
- [x] Gatekeeper 전략 (자동 머지 및 동기화 감지) 구현
- [x] 텔레그램 알림 시스템 연동

## 10. 레이아웃 고도화 및 테마 시스템 구축
- [x] 전역 테마 시스템 [ThemeProvider], [ThemeContext] 구축 및 다크 모드(Dark/Light) 지원
- [x] Tailwind CSS v4 기반 다크 모드 스타일링 적용 (Home, Header, Footer, Login, Signup)
- [x] 메인 레이아웃 너비 제약 (`max-w-[1440px]`) 및 반응형 최적화
- [x] 로그인 페이지 '아이디 기억하기' (`localStorage`: `HONG_CRAFT_DAY`) 기능 구현

## 11. 인증 정보 관리 최적화 및 UI 개선
- [x] 인증 응답(`TokenResponse`) 구조 개선 (role, refreshToken 포함)
- [x] `authService` 내 `localStorage` 저장 방식 단일 객체(`AUTH_DATA`)로 통합 리팩토링
- [x] `Footer` 컴포넌트 내 '공방 등록하기' 링크 추가 및 인증 상태별 라우팅 구현
- [x] `Header` 컴포넌트 내 네비게이션 및 메가 메뉴 폰트 크기 확대 (가독성 개선)
- [x] 어드민(`ROLE_ADMIN`) 전용 '시스템 관리' 메뉴 구성 및 조건부 렌더링 구현
- [x] 어드민 관리 페이지 프로토타입 4종(사용자, 공방, 접속 이력, 결제 정보) 구현 및 라우팅 연결
- [x] `AdminTable` 공통 컴포넌트 데이터 페이징(Page Size Selector 포함: 5, 10, 50, 100) 및 UI 구현
- [x] UI 가이드라인 (`ui_look.md`) 최신화

## 12. 데이터 연동 고도화 (페이징 및 공통 타입)
- [x] `PageRequestDto`, `PageResponseDto` 공통 타입 정의 (`types/common.ts`)
- [x] Axios 인터셉터 내 `AUTH_DATA` JSON 파싱 로직 수정 및 토큰 주입 정상화
- [x] 접속 이력(`AccessLog`) 페이지 실데이터 연동 및 페이징 적용
- [x] 모든 목록성 API 요청 시 공통 페이징 파라미터(`PageRequestDto`) 사용하도록 구조 개선
- [x] UI 가이드라인(`ui_look.md`) 내 페이징 연동 패턴 문서화

## 13. 토큰 재발급 (Token Reissue) 플로우 구현
- [x] `authService.reissue` API 호출 메서드 추가
- [x] 401 에러 및 `A006`(토큰 만료) 발생 시 자동 재발급 로직 (Silent Refresh) 구현
- [x] 대기 중인 요청 재시도 처리

## 14. 장바구니 및 관심(하트) 기능 구현
- [x] 장바구니 및 관심(하트) 전역 상태(`CartContext`) 구현
- [x] 헤더 내 장바구니/하트 버튼 및 배지(카운트) UI 추가
- [x] 헤더 드롭다운 미리보기(최근 4-5개) 및 '더보기' 버튼 구현
- [x] 장바구니/관심 목록 전체 보기 페이지(`Cart`, `Favorites`) 및 라우팅 추가
- [x] 홈 화면 워크숍 카드 내 장바구니/하트 클릭 연동

## 15. 공방 리스트 페이지 구현 및 필터 검색 기능
- [x] 홈 화면 각 지역 섹션에 '자세히 보기 >' 버튼 추가 및 이동 연동
- [x] 공방 리스트 페이지(`/workshops`) 레이아웃 구현 (카드 리스트 형태)
- [x] 상세 검색 필터 구현 (공방명, 지역, 카테고리, 가격, 별점/후기 개수 등)
- [x] 검색 필터 기반 실시간 필터링 또는 검색 결과 처리
- [x] 장바구니/관심 추가 기능 통합

## 16. 공방 상세 페이지 구현
- [x] 공방 상세 페이지(`/workshops/:id`) 레이아웃 및 컴포넌트 구현
- [x] 홈, 리스트, 장바구니 등 모든 카드에서 상세 페이지 이동 연동
- [x] 공방 상세 정보(소개, 커리큘럼, 강사 프로필, 후기 등) 표시
- [x] 하단 고정 예약 바(Price + 장바구니/찜) 구현
- [x] 관련 클래스 추천 섹션 추가 (옵션)

## 17. 공방 등록 및 관리 기능 구현
- [x] 공방 등록 페이지(`/workshops/manage/new`) 구현 (이미지, 상세 정보 등 입력 폼)
- [x] 내 공방 관리 페이지(`/workshops/manage`) 구현 (등록한 공방 목록 및 관리)
- [x] 헤더 사용자 메뉴에 '공방 관리' 메뉴 추가 및 연동
- [x] 등록 폼 유효성 검사 및 데이터 처리 (Mock 연동)
- [x] 내 공방 수정 및 삭제 기능 추가 (Mock UI)

## 18. 예약 시스템(모달 팝업) 구현
- [x] 공방 상세 페이지 내 '예약하기' 버튼 연동
- [x] 날짜 선택 UI (캘린더 형태) 구현
- [x] 시간 선택 UI (타임 슬롯) 구현
- [x] 인원 수 선택 (카운터) 기능 구현
- [x] 예약 요약 및 최종 확인 버튼 추가
- [x] 예약 완료 후 상태 처리 (Mock 알림 등)
- [x] 연도/월 이동 네비게이션 및 오늘 기준 지난 날짜/시간 선택 제한 로직 추가

## 19. 공방 예약 관리 시스템 구현 (관리자용)
- [ ] 내 공방 관리 페이지(`Manage.tsx`)에 '예약 내역' 버튼 추가
- [ ] 예약 관리 페이지(`Reservations.tsx`) 레이아웃 및 리스트 구현
- [ ] 예약 승인(확정) 기능 구현
- [ ] 예약 반려(거절) 및 사유 입력 모달 구현
- [ ] 승인/반려 상태에 따른 UI/UX 피드백 적용
- [ ] 예약 내역 Mock 데이터 연동 및 상태 관리

## 20. 내 예약 관리 페이지 구현 (사용자용)
- [x] 내 예약 관리 페이지 (`/my/reservations`) 레이아웃 및 리스트 구현
- [x] 헤더 '예약 내역' 및 사용자 메뉴 '예약 내역 확인' 링크 연결
- [x] 예약 상태(대기, 확정, 반려) 표시 및 상세 내역(일시, 인원, 금액) 확인 기능
- [x] 예약 취소 기능 (대기 중일 경우) 추가 (옵션)
- [x] Mock 데이터 또는 API 연동을 통한 예약 내역 표시

## 21. 커뮤니티 > 찐 후기 자랑 페이지 구현
- [x] 찐 후기 자랑 페이지 (`/community/reviews`) 레이아웃 구현 (피드/갤러리 형태)
- [x] 베스트 후기 상단 고정 및 카테고리 필터링 기능
- [x] 후기 상세 보기 (모달 또는 페이지) 및 댓글 UI 구현
- [x] 후기 작성 팝업/페이지 연동 (이미지 업로드 포함 UI)
- [x] 헤더 '커뮤니티 > 찐 후기 자랑' 링크 연결

## 22. 커뮤니티 > 후기 작성 폼 및 기능 구현
- [x] 내 예약 내역 중 상태가 확정된(CONFIRMED) 공방 리스트 조회 및 선택 모달 구현
- [x] 후기 작성 폼 레이아웃 (`/community/reviews/write` 또는 모달) 구현
- [x] 별점(Rating) 선택 UI 컴포넌트 추가
- [x] 사진(이미지) 업로드 및 미리보기 UI 구현
- [x] 텍스트 에디터(또는 확장된 textarea) 형태의 후기 작성란 구현
- [x] 폼 유효성 검사 및 작성 완료 후 커뮤니티 피드 연동 상태 관리

## 23. 커뮤니티 > 공방 소식 페이지 구현
- [x] 공방 소식 전용 Mock 데이터 (`constants/news.ts`) 구성
- [x] `/community/news` 라우팅 추가 및 `Header.tsx` 링크 연결
- [x] 공방 소식 리스트 화면(블로그/매거진 레이아웃) 구현 및 필터 기능 추가
- [x] 소식 클릭 시 상세 보기(모달 또는 별도 페이지) 뷰 구현

## 24. 커뮤니티 > 작가님 인터뷰 페이지 구현
- [x] 인터뷰 전용 Mock 데이터 (`constants/interviews.ts`) 구성
- [x] `/community/interviews` 라우팅 추가 및 `Header.tsx` 링크 연결
- [x] 작가님 인터뷰 리스트 화면 페이지 구현 (Q&A 스타일 또는 에디토리얼 레이아웃)
- [x] 매거진 스타일의 상세 보기 모달 구현

## 25. 예약/결제 > 쿠폰/포인트 기능 추가
- [x] 쿠폰 및 포인트 Mock 데이터 구성 (`constants/rewards.ts`)
- [x] `/my/coupons` 라우팅 등록 및 Header 메뉴 연동
- [x] 내 적립금 관리 대시보드 및 쿠폰 리스트 UI 개발
- [x] 포인트 내역 조회용 탭(Tab) 화면 기능 구현

## 26. 헤더 '예약/결제' 메뉴 구조 개편
- [x] `Header.tsx` 드롭다운 메뉴 항목에서 '예약/결제' 그룹 완전히 제거
- [x] 헤더 우측 다크모드 버튼 옆 단일 '예약 관리' 아이콘 및 하위 드롭다운 뷰 구성
- [x] 모바일/태블릿 등 작은 화면에서의 레이아웃 깨짐(Overflow) 방지 디자인

## 27. 예약/결제 > 결제 관리 페이지 구현
- [x] 결제 수단 및 거래 내역 Mock 데이터 구성 (`constants/payments.ts`)
- [x] `/my/payments` 라우팅 등록 및 Header 아이콘 드롭다운 메뉴 링크 연결
- [x] 등록된 결제 수단(카드) 관리 UI 컴포넌트 개발
- [x] 결제/환불 건별 상세 내역 이력(History) 테이블 구현

## 28. 내 결제 수단 CRUD 관리 기능 구현
- [x] 정적 데이터를 `useState`로 승급하여 상태 변경(화면 갱신) 적용
- [x] 기본 결제 수단(별표) 변경 및 항목 삭제(Delete) 로직 구현
- [x] 카드 신규 등록 및 기존 항목 수정을 대응하는 동적 모달(Modal) 컴포넌트 제작

---
*Last Updated: 2026-04-09*
