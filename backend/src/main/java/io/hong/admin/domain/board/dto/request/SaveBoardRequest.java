package io.hong.admin.domain.board.dto.request;

/**
 * packageName    : io.hong.admin.domain.board.dto.request
 * fileName       : SaveBoardRequest
 * author         : note
 * date           : 2026-05-12
 * description    : 게시판 생성 DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-05-12        note       최초 생성
 */

public record SaveBoardRequest(
        String code,
        String name,
        boolean isUsed
) {
}
