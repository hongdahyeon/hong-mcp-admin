# 🖼️ Frontend: Hong MCP Admin Client

이 프로젝트는 Vite + React + TypeScript 기반으로 구축된 어드민 관리 플랫폼의 프론트엔드 서비스입니다.

## 🛠️ 주요 기술 스택
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Next step: CSS Framework selection)
- **API Client**: Axios

---

## 🚀 실행 가이드

### 1-1. 패키지 설치
최초 실행 시 또는 의존성 변경 시 실행합니다.
```bash
npm install
npm install -D @vitejs/plugin-react-swc
npm install -D @types/node # vite.config.ts에서 path 모듈을 사용하기 위해 필요
npm install react-router-dom @types/react-router-dom # 라우팅을 위해 필요
```

### 1-2. tailwind css 설치
```bash
npm install -D tailwindcss postcss autoprefixer
npm install react-router-dom lucide-react
npm install -D @tailwindcss/postcss
npx tailwindcss init -p # 설정 파일(postcss.config.js 등) 생성
```


### 2. 개발 서버 구동
로컬 환경에서 개발 서버를 실행합니다.
```bash
npm run dev
```
- 접속 주소: [http://localhost:5173](http://localhost:5173)

### 3. 빌드 및 배포
프로덕션용 정적 파일을 생성합니다.
```bash
npm run build
```
- 생성 위치: `dist/`

---

## 📂 프로젝트 구조
상세 설명은 [docs/about_frontend.md](./docs/about_frontend.md)를 참조하세요.

```text
src/
├── api/        # API 호출 로직
├── components/ # 공통 및 레이아웃 컴포넌트 (작은 단위)
├── hooks/      # 커스텀 React Hooks
├── pages/      # 전체 페이지 컴포넌트 (목적지)
├── routes/     # URL 경로 및 라우터 설정 (길잡이)
├── store/      # 상태 관리
├── types/      # TypeScript 타입 정의
└── utils/      # 유틸리티 함수
```

## 📝 개발 규칙
- **확장자**: 모든 새로운 파일은 `.tsx` (컴포넌트) 또는 `.ts` (일반 로직) 확장자를 사용합니다.
- **경로 별칭**: 절대 경로 별칭 `@/`를 사용합니다. (예: `import Button from '@/components/common/Button'`)
- **계층 구조 활용**:
    - `routes/`: 한 곳에서 모든 URL 경로를 관리하며 권한 및 레이아웃을 결정합니다. (설정 중심)
    - `pages/`: 실제 URL과 매핑되는 큰 페이지 단위입니다. 데이터 페칭 로직이 주로 위치합니다. (조립 중심)
    - `components/`: 페이지 내에서 반복되거나 기능별로 쪼개진 작은 단위들입니다. (기능 중심)
- **통신**: 백엔드 API와의 통신 규약은 백엔드 정의를 따릅니다.
