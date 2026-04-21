package io.hong.admin.domain.useraccesslog.dto.request;

import io.hong.admin.golbal.common.page.PageRequestDto;
import lombok.Getter;
import lombok.Setter;

/**
 * packageName    : io.hong.admin.domain.useraccesslog.dto.request
 * fileName       : SearchUserAccessLogRequest
 * author         : home
 * date           : 2026-03-14
 * description    : 유저 접근 이력 조회 요청 DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-14        home       최초 생성
 * 2026-04-22        note       클래스명 변경
 */

@Getter @Setter
public class SearchUserAccessLogRequest extends PageRequestDto {
    private String search;
}