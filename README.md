# 🚀 Hong MCP Admin Platform (v1.1.0)

### Last updated: 2026-06-07

Java 25의 최신 기능과 Spring Boot 4.0, React를 활용한 차세대 어드민 관리 플랫폼입니다. 백엔드와 프론트엔드가 완전히 분리된 **Separation Architecture**로 설계되었습니다.

---

## 🛠 1. 프로젝트 구성 및 환경 설정

### **기술 스택 (Tech Stack)**

- **Backend:** Java 25 (OpenJDK 25.0.2), Spring Boot 4.0.3, Spring Data JPA
- **Frontend:** React 18+, Vite (Build Tool), TypeScript + SWC
- **Database:** H2 (Development)
- **Communication:** REST API (Axios)

### **핵심 설정 사항**

- **Java 25 최적화:** `build.gradle` 내 `java.toolchain` 설정을 통해 시스템의 JDK 17과 별개로 Java 25 환경을 고립시킴
- **Virtual Threads:** Spring Boot 설정을 통해 Java 25의 가상 스레드 기능을 활성화하여 고성능 비동기 처리 준비
- **CORS 설정:** 프론트엔드(포트 5173)와 백엔드(포트 8080) 간 통신을 위해 `WebConfig` 클래스에서 교차 출처 리소스 공유 허용

---

## 🚀 2. 서버 구동 방법 (How to Run)

본 프로젝트는 각각 독립된 터미널에서 백엔드와 프론트엔드를 실행해야 합니다.

### **[Terminal 1] Backend (Spring Boot)**

1. `cd backend`
2. `.\gradlew.bat bootRun` (Windows PowerShell) 또는 IntelliJ Gradle 탭에서 `bootRun` 실행

- **Access URL:** http://localhost:8080
- **Check:** 터미널에 `Tomcat started on port(s): 8080` 메시지 확인
- 만약 backend 패키지를 인식하지 못하면, 아래와 같이 진행
  (1) backend 하위에 build.gradle 파일 찾고 우클릭
  (2) Link Gradle Project 혹은 Import Gradle Project 클릭

### **[Terminal 2] Frontend (React)**

1. `cd frontend`
2. `npm install` (초기 1회)
3. `npm run dev`

- **Access URL:** http://localhost:5173
- **Check:** Vite 개발 서버 기동 및 브라우저 접속 확인

---

## 📂 3. 프로젝트 구조 (Project Structure)

```text
hong-mcp-admin/
├── backend/            # Spring Boot API 서버
│   ├── src/            # Java 25 소스 및 리소스 (io.hong.admin)
│   └── build.gradle    # 백엔드 의존성 및 Java 25 설정
├── frontend/           # React 클라이언트 (Vite)
│   ├── src/            # 애플리케이션 소스 코드
│   │   ├── api/        # API 호출 및 공통 Axios 설정
│   │   ├── components/ # 공통 및 레이아웃 컴포넌트
│   │   ├── hooks/      # 커스텀 React Hooks
│   │   ├── pages/      # 라우팅 페이지 컴포넌트
│   │   ├── store/      # 전역 상태 관리 (Zustand 등)
│   │   ├── types/      # TypeScript 타입 및 인터페이스
│   │   └── utils/      # 공통 유틸리티 및 상수
│   ├── docs/           # 프로젝트 문서 (rules, todo, plan 등)
│   ├── App.tsx         # 메인 앱 컴포넌트
│   ├── main.tsx        # 진입점 파일
│   └── package.json    # 프론트엔드 의존성 관리
├── .gitignore          # .idea, node_modules, build 등 제외 설정
└── README.md           # 통합 가이드 문서 (v1)
```
