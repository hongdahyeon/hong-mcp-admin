package io.hong.admin.domain.user.dto.response;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.user.enumcd.UserRole;

import java.time.LocalDateTime;

/**
 * packageName    : io.hong.admin.domain.user.dto.response
 * fileName       : UserListResponse
 * author         : note
 * date           : 2026-04-18
 * description    : 유저 정보 목록 응답
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-04-18        note       최초 생성
 */
public record UserListResponse(
        Long id,
        String email,
        String username,
        UserRole role,
        boolean isApproved,
        boolean isLocked,
        boolean isDeleted,
        boolean isEnabled,
        LocalDateTime lastPasswordChangedDate
) {

    public UserListResponse(HUser hUser) {
        this(
                hUser.getId(),
                hUser.getEmail(), hUser.getUsername(), hUser.getRole(),
                hUser.isApproved(), hUser.isLocked(), hUser.isDeleted(), hUser.isEnabled(),
                hUser.getLastPasswordChangedDate()
        );
    }
}
