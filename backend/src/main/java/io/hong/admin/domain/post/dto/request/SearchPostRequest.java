package io.hong.admin.domain.post.dto.request;

import io.hong.admin.golbal.common.page.PageRequestDto;
import lombok.Getter;
import lombok.Setter;

/**
 * packageName    : io.hong.admin.domain.post.dto.request
 * fileName       : SearchPostRequest
 * author         : note
 * date           : 2026-06-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-06-21        note       최초 생성
 */
@Getter @Setter
public class SearchPostRequest extends PageRequestDto {
    private String search;
    private Long boardId;
}
