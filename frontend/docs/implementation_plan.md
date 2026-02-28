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
