package io.hong.admin.domain.workshop.dto.request;

import io.hong.admin.golbal.common.page.PageRequestDto;
import lombok.Getter;
import lombok.Setter;

/**
 * packageName    : io.hong.admin.domain.board.dto.request
 * fileName       : SearchWorkshopRequest
 * author         : note
 * date           : 2026-05-04
 * description    : 공방 유형 요청
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-05-04        note       최초 생성
 */

@Getter @Setter
public class SearchWorkshopRequest extends PageRequestDto {
    private String search;
}