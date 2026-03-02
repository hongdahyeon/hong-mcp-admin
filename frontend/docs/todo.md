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
