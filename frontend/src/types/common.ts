/**
 * 공통 페이징 요청 DTO
 * 모든 목록성(페이징) API 요청에서 공통으로 사용됩니다.
 */
export interface PageRequestDto {
    page: number;
    size: number;
    search?: string;
}

/**
 * 공통 페이징 응답 DTO 베이스 구조
 * 모든 목록성(페이징) API에서 공통으로 사용됩니다.
 */
export interface PageResponseDto<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}