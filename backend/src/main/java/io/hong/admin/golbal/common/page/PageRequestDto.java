package io.hong.admin.golbal.common.page;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * packageName    : io.hong.admin.golbal.common.page
 * fileName       : PageRequestDto
 * author         : home
 * date           : 2026-03-14
 * description    : 공통 페이지 정보 요청 DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-14        home       최초 생성
 */

@Getter @Setter
public class PageRequestDto {

    private int page = 1;      // 클라이언트는 보통 1부터 시작
    private int size = 10;     // 한 페이지당 데이터 개수

    // JPA의 Pageable 객체로 변환 (JPA는 페이지가 0부터 시작함에 주의)
    public Pageable toPageable() {
        return PageRequest.of(page <= 0 ? 0 : page - 1, size);
    }

    // 정렬이 필요한 경우를 위한 확장 버전
    public Pageable toPageable(Sort sort) {
        return PageRequest.of(page <= 0 ? 0 : page - 1, size, sort);
    }
}
