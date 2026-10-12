/**
 * 🏠 공통 주소(Address) DTO
 * 백엔드의 Address 엔티티와 구조를 맞춥니다.
 */
export interface Address {
    city: string;          // 시 (예: 서울특별시, 경기도)
    district: string;      // 구/군 (예: 강남구, 용인시 수지구)
    neighborhood: string;  // 동/읍/면 (예: 역삼동, 풍덕천동)
    detail?: string;       // 상세 주소 (예: 홍길동 빌딩 3층)
    zipcode?: string;      // 우편번호
}
