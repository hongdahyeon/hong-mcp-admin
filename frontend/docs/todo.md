# TODO

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

---
*Last Updated: 2026-03-21*
