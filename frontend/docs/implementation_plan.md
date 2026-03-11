# Implementation Plan

---

# Plan 01.
# 프론트엔드 기본 구조 설계 및 적용

React (Vite) + TypeScript 설정을 점검하고, 프로젝트 규모에 맞는 체계적인 폴더 구조와 **라우팅(React Router)** 기반의 아키텍처를 구축합니다.

## 제안 사항 및 설계 계획

1. **TypeScript 전환**:
    - `typescript`, `tslib`, `@types/node` 등 필수 패키지 설치
    - `tsconfig.json` 및 `tsconfig.app.json`, `tsconfig.node.json` 설정 파일 생성
    - `src/vite-env.d.ts` 파일 추가
    - 기존 `.jsx` 파일을 `.tsx`로 변환 (`App.tsx`, `main.tsx`)
2. **폴더 구조 자동화**: `src/` 하위에 다음과 같은 폴더를 생성합니다:
    - `api/`: API 호출 로직 (Axios 인스턴스 등)
    - `components/`: 재사용 가능한 UI 컴포넌트 (`common/`, `layout/`)
    - `hooks/`: 커스텀 Hook
    - `pages/`: 라우팅되는 페이지 컴포넌트
    - `routes/`: 라우터 설정 및 경로 매핑 (URL ↔ Component)
    - `store/`: 전역 상태 관리 (Zustand/Redux 등)
    - `types/`: 공통 TypeScript 인터페이스 및 타입 정의
    - `utils/`: 유틸리티 함수 및 상수

## 검증 계획

### 자동화 테스트
- `npm run build`를 통한 TypeScript 타입 체크 및 빌드 성공 여 확인

### 수동 검증
- `npm run dev`를 통한 로컬 개발 환경에서의 정상 실행 확인

---

# Plan 02.
# Tailwind CSS 및 의존성 설치

**Tailwind CSS**와 **React Router**, **Lucide React**를 프로젝트에 도입하여 스타일링 및 라우팅 기반을 마련합니다.

## 제안 사항 및 설계 계획

1. **Tailwind CSS 및 의존성 설치**:
    - `tailwindcss`, `postcss`, `autoprefixer` 설치 및 초기화
    - `react-router-dom`, `lucide-react` (아이콘용) 설치

2. **기본 레이아웃 및 라우팅 구현**:
    - `src/components/layout/`: `Header`, `Footer`, `MainLayout` 컴포넌트 생성
    - `src/pages/home/`: 기본 홈 페이지 생성
    - `src/routes/`: `AppRouter.tsx`를 통한 경로 매핑

3. **컴포넌트 상세 설계 (Header)**:
    - 상단 메뉴 및 호버 시 드롭다운 바 구현
    - 우측 사용자 아이콘 및 드롭다운 메뉴 (Login/Logout 분기 처리)

## 검증 계획

### 자동화 테스트
- `npm run build`를 통한 빌드 성공 여 확인

### 수동 검증
- `npm run dev`를 통한 개발 서버 실행
- 헤더 컴포넌트의 렌더링 및 드롭다운 메뉴 호버 동작 확인
- 라우팅을 통한 페이지 이동 테스트

---

# Plan 03.
# 기본 레이아웃 및 라우팅 구현

**Tailwind CSS**와 **React Router**를 도입하여 표준적인 어드민 플랫폼 레이아웃(Header, Body, Footer)을 구축합니다.

## 제안 사항 및 설계 계획

1. **기본 레이아웃 및 라우팅 구현**:
    - `src/components/layout/`: `Header`, `Footer`, `MainLayout` 컴포넌트 생성
    - `src/pages/home/`: 기본 홈 페이지 생성
    - `src/routes/`: `AppRouter.tsx`를 통한 경로 매핑

2. **컴포넌트 상세 설계 (Header)**:
    - 상단 메뉴 및 호버 시 드롭다운 바 구현
    - 우측 사용자 아이콘 및 드롭다운 메뉴 (Login/Logout 분기 처리)

## 검증 계획

### 자동화 테스트
- `npm run build`를 통한 빌드 성공 여 확인

### 수동 검증
- `npm run dev`를 통한 개발 서버 실행
- 헤더 컴포넌트의 렌더링 및 드롭다운 메뉴 호버 동작 확인
- 라우팅을 통한 페이지 이동 테스트
---

# Plan 04.
# 공방 관리 서비스 전환 및 CraftDay 브랜딩

기존 어드민 대시보드 구조를 '원데이 클래스 공방 플랫폼' 테마인 **CraftDay**로 전환하고, 사용자 중심의 칸반 보드 레이아웃을 적용합니다.

## 제안 사항 및 설계 계획

1. **워크숍 칸반 보드**:
    - 서울, 경기, 부산, 제주 등 지역별 컬럼 생성 및 수평 스크롤 레이아웃 적용
    - 고해상도 이미지, 별점, 가격, 작가 정보가 포함된 프리미엄 카드 디자인
2. **브랜딩 일원화**:
    - Pretendard 폰트 전역 적용 및 Violet (violet-600) 메인 컬러 시스템 구축
    - Header, Footer에 'CraftDay' 로고 및 슬로건 반영
3. **사용자 경험(UX) 개선**:
    - 로그인 전/후 헤더 메뉴 동적 전환 (드롭다운 통합)
    - 로그인 페이지 내 '둘러보기' 기능 추가로 비회원 접근성 향상

## 검증 계획
- 모든 브랜딩 텍스트의 'CraftDay' 일치 여부 확인
- 지역별 워크숍 필터링 및 렌더링 정상 동작 확인

---

# Plan 05.
# 인증(Auth) 인프라 및 보안 강화

JWT 기반의 인증 시스템을 구축하고, API 요청 시 보안성을 확보하며 예외적인 페이지 접근에 대한 처리를 구현합니다.

## 제안 사항 및 설계 계획

1. **Axios 인터셉터**:
    - 모든 요청 헤더에 `Authorization: Bearer <token>` 자동 주입
    - 401 Unauthorized 발생 시 자동 세션 만료 알림 및 로그인 페이지 리다이렉트
2. **인증 서비스 (`authService`)**:
    - `localStorage`를 활용한 토큰 및 유저 정보 관리 로직 캡슐화
3. **에러 핸들링**:
    - 정의되지 않은 경로 접근 시 전용 404 (`NotFound`) 페이지 노출

## 검증 계획
- 로그아웃 후 보호된 API 요청 시 401 처리 여부 확인
- 잘못된 URL 입력 시 404 페이지 정상 노출 여부 확인

---

# Plan 06.
# 회원가입(Signup) 기능 구현

사용자가 직접 계정을 생성할 수 있는 회원가입 플로우를 구현하며, 실시간 유효성 검사와 API 연동을 처리합니다.

## 제안 사항 및 설계 계획

1. **API 연동 (`auth.ts`)**:
    - `/api/auth-user/check-email`, `/api/auth-user/check-username` 중복 확인 API 연동
    - `/api/auth-user/roles` API를 통한 가입 가능 역할군 동적 로드
    - `/api/auth-user/signup` API를 통한 최종 가입 데이터 송신
2. **회원가입 UI (`Signup`)**:
    - 이메일, 사용자명, 비밀번호, 비밀번호 확인, 역할 선택 필드 구성
    - 각 필드별 실시간 유효성 메시지 및 중복 체크 결과 피드백
3. **네비게이션**:
    - 가입 성공 시 로그인 페이지로 자동 이동 및 환영 메시지 노출

## 검증 계획
- 중복된 이메일/ID로 가입 시도 시 에러 메시지 노출 확인
- 비밀번호 불일치 시 가입 버튼 비활성화 여부 확인
- 가입 성공 후 실제 로그인 가능 여부 테스트

---

# Plan 07.
# 폰트 및 테마 최적화 (Tailwind CSS v4)

프로젝트의 시각적 완성도를 높이기 위해 **Pretendard Variable** 폰트를 적용하고, Tailwind CSS v4의 `@theme` 기능을 활용하여 테마 설정을 최적화합니다.

## 제안 사항 및 설계 계획

1. **폰트 시스템 업데이트**:
    - `index.css`에서 `:root` 설정 대신 Tailwind CSS v4의 `@theme` 블록 사용
    - `Pretendard Variable`을 최우선 순위로 지정하여 현대적인 타이포그래피 구현
    - 시스템 폰트 폴백(fallback) 구성을 통해 다양한 환경에서의 안정성 확보

2. **디자인 시스템 연동**:
    - `--font-sans` 변수를 통해 프로젝트 전반에 일관된 폰트 스타일 적용

## 검증 계획

### 수동 검증
- 브라우저 개발자 도구를 통해 `body`에 `font-family: var(--font-sans)`가 정상적으로 적용되는지 확인
- 한글 및 영문 텍스트의 가독성 및 렌더링 상태 점검

---

# Plan 08.
# 전역 예외 처리 최적화 (ErrorResponse / HongErrorCode 연동)

백엔드에서 발생하는 `HongException`이 `HongErrorCode`를 통해 구조화된 `ErrorResponse`를 반환하도록 변경됨에 따라, 프론트엔드 Axios 인터셉터를 이에 맞춰 최적화합니다.

## 제안 사항 및 설계 계획

1. **상세 에러 구조 대응**:
    - `ErrorResponse` 구조(`code`, `message`, `status`)에 맞춰 응답 데이터를 파싱합니다.
    - 단순히 메시지만 보여주는 것이 아니라, 필요 시 에러 코드(`code`)를 활용한 분기 처리가 가능하도록 기반을 마련합니다.

2. **Axios Response Interceptor 고도화**:
    - `data.message`가 존재할 경우 최우선적으로 사용자에게 노출합니다.
    - **401 에러 세분화**: 단순히 `status === 401`인 경우 세션 만료로 처리하지 않고, `code`가 `A001`(Unauthorized), `A002`(Invalid Token) 등 인증 시스템 관련 에러인 경우에만 로그아웃 처리를 수행합니다. `U002`(Password Not Match)와 같은 비즈니스 예외는 메시지만 노출합니다.
    - 에러 코드와 함께 로그를 남겨 디버깅 편의성을 향상시킵니다.


## 검증 계획

### 수동 검증
- 존재하지 않는 계정(`USER_NOT_FOUND`) 또는 비밀번호 불일치(`PASSWORD_NOT_MATCH`) 시 백엔드에서 내려주는 각기 다른 `message`가 정확히 노출되는지 확인합니다.
- 중복된 이메일/이름 가입 시도 시 `BAD_REQUEST(400)` 상태와 함께 구체적인 에러 메시지가 표시되는지 확인합니다.



