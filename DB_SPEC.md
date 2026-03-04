# 📊 MCP Admin Platform Database Specification

본 문서는 `io.hong.admin` 프로젝트의 엔티티 구조와 데이터베이스 스키마 정의를 담고 있습니다. 모든 엔티티는 `BaseEntity`를 상속받아 생성/수정 정보를 공통으로 관리합니다.

---

## 1. User Domain (사용자 및 인증)

### [HUser] 사용자 마스터
- **역할**: 시스템 전체 사용자 계정 관리 및 상태 제어
- **상태값**:
  - `isApproved`: 호스트 승인 여부
  - `isLocked`: 계정 잠금 여부
  - `isDeleted`: 탈퇴 여부
  - `isEnabled`: 활성화 여부

### [HUserToken] 리프레시 토큰
- **역할**: JWT 재발급을 위한 토큰 관리 (Shared PK with HUser)

### [HUserAccessLog] 접속 로그
- **역할**: 보안 감사를 위한 유저 접속 IP 및 환경 기록

---

## 2. Point & Payment Domain (자산 및 결제)

### [HUserPoint] 포인트 잔액
- **역할**: 유저별 실시간 가용 포인트 관리 (1:1 관계)

### [HUserPointHist] 포인트 이력
- **역할**: 포인트 가감 내역 및 최종 잔액(Result Balance) 스냅샷 기록

### [HPayment] 결제 기록
- **역할**: 외부 결제 연동 및 포인트 충전 내역 추적

---

## 3. Workshop Domain (공방 운영)

### [HWorkshop] 공방 정보
- **특징**: `Address` 값 객체(Embedded)를 사용하여 시/구/동 단위 검색 최적화
- **관계**: `HUser(Host)` 와 N:1 관계

### [HWorkshopTimetable] 운영 시간
- **특징**: `DayOfWeek` Enum을 이용한 요일별 예약 슬롯 관리

### [HWorkshopReservation] 예약 시스템
- **상태**: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`

### [HWorkshopReview] 후기
- **역할**: 평점(1~5) 및 텍스트 후기 관리

---

## 4. Board Domain (커뮤니티)

### [HBoard] 게시판 마스터
- **역할**: 게시판 코드(`BoardCode`)별 권한 및 사용 여부 관리

### [HPost] 게시글
- **특징**: 게시판별 게시글 저장, 조회수 관리

### [HComment] 댓글
- **특징**: `parent_id`를 통한 대댓글 셀프 참조 구조 지원

---

## 🛠 공통 규격 (Audit)
모든 엔티티(AccessLog 등 일부 제외)는 다음을 포함합니다:
- `createdAt`: 생성 일시
- `createdBy`: 생성자 ID
- `updatedAt`: 수정 일시
- `updatedBy`: 수정자 ID