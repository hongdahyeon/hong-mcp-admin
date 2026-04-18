package io.hong.admin.domain.user.dto.request;

import io.hong.admin.golbal.common.page.PageRequestDto;
import lombok.Getter;
import lombok.Setter;

/**
 * packageName    : io.hong.admin.domain.user.dto.request
 * fileName       : UserSearchRequest
 * author         : note
 * date           : 2026-04-18
 * description    : 유저 조회 요청 dto
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-04-18        note       최초 생성
 */
@Getter @Setter
public class SearchUserRequest extends PageRequestDto {
    private String search;
}
