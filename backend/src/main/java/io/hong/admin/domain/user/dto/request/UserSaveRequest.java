package io.hong.admin.domain.user.dto.request;

/**
 * packageName    : io.hong.admin.domain.user.dto.request
 * fileName       : UserSaveRequest
 * author         : note
 * date           : 2026-03-03
 * description    : UserSaveRequest Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

public record UserSaveRequest(
        String email,
        String username,
        String password,
        String role
) {
}
