package io.hong.admin.golbal.common.page;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * packageName    : io.hong.admin.golbal.common.page
 * fileName       : PageResponseDto
 * author         : home
 * date           : 2026-03-14
 * description    : 공통 페이징 응답 DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-14        home       최초 생성
 */
@Getter
public class PageResponseDto<T> {

    private final List<T> content;      // 실제 데이터 리스트
    private final int pageNumber;       // 현재 페이지 번호
    private final int pageSize;         // 페이지 크기
    private final long totalElements;   // 전체 데이터 개수
    private final  int totalPages;       // 전체 페이지 수

    public PageResponseDto(Page<T> page) {
        this.content = page.getContent();
        this.pageNumber = page.getNumber() + 1; // 다시 1부터 시작하도록 보정
        this.pageSize = page.getSize();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
    }
}
