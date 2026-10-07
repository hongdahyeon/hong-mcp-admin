package io.hong.admin.domain.user.dto.request;

/**
 * packageName    : io.hong.admin.domain.user.dto.request
 * fileName       : UpdateUserFlagRequest
 * author         : note
 * date           : 2026-07-29
 * description    : 유저 정보 변경 > 승인여부, 삭제여부, 활
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-07-29        note       최초 생성
 */
public record UpdateUserFlagRequest(
        String type,
        boolean value,
        String email
) {
}
