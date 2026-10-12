package io.hong.admin.domain.board.dto.request;

/**
 * packageName    : io.hong.admin.domain.board.dto.request
 * fileName       : ChangeBoardRequest
 * author         : note
 * date           : 2026-05-12
 * description    : 게시판 생성 DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-06-05        note       최초 생성
 */

public record ChangeBoardRequest(
        String name,
        boolean isUsed
) {
}
