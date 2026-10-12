package io.hong.admin.domain.board.dto.response;

import io.hong.admin.domain.board.entity.HBoard;
import io.hong.admin.domain.board.enumcd.BoardCode;

/**
 * packageName    : io.hong.admin.domain.board.dto.response
 * fileName       : BoardListResponse
 * author         : note
 * date           : 2026-05-04
 * description    : 게시판 목록 조회
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-05-04        note       최초 생성
 */
public record BoardListResponse(
        Long id,
        BoardCode boardCode,
        String boardCodeDescription,
        String name,
        boolean isUsed,
        boolean isDeleted
) {
    public BoardListResponse(HBoard hBoard) {
        this(
                hBoard.getId(),
                hBoard.getCode(), hBoard.getCode().getDescription(),
                hBoard.getName(),
                hBoard.isUsed(), hBoard.isDeleted()
        );
    }
}
