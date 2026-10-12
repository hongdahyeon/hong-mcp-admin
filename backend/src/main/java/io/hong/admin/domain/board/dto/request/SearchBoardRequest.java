package io.hong.admin.domain.board.dto.request;

import io.hong.admin.golbal.common.page.PageRequestDto;
import lombok.Getter;
import lombok.Setter;

/**
 * packageName    : io.hong.admin.domain.board.dto.request
 * fileName       : SearchBoardRequest
 * author         : note
 * date           : 2026-05-04
 * description    : 게시판 유형 요청
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-05-04        note       최초 생성
 */

@Getter @Setter
public class SearchBoardRequest extends PageRequestDto {
    private String search;
}