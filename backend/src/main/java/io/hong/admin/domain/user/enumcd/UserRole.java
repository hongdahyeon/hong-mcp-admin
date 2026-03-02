package io.hong.admin.domain.user.enumcd;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

/**
 * packageName    : io.hong.admin.domain.user.enumcd
 * fileName       : UserRole
 * author         : note
 * date           : 2026-03-03
 * description    : UserRole Enum
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Getter
@RequiredArgsConstructor
public enum UserRole {
    USER("일반 유저", "ROLE_USER", List.of("/api/user/**", "/api/bookings/**")),
    HOST("공방 주인", "ROLE_HOST", List.of("/api/host/**", "/api/workshops/manage/**")),
    ADMIN("시스템 관리자", "ROLE_ADMIN", List.of("/api/admin/**", "/api/settings/**"));

    private final String description;
    private final String authority;
    private final List<String> matchers;

    // String 배열로 변환해서 시큐리티에 넘겨주기 위한 편의 메소드
    public String[] getMatchersArray() {
        return matchers.toArray(String[]::new);
    }
}
