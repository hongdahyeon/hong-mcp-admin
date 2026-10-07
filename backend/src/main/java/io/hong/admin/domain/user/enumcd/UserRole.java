package io.hong.admin.domain.user.enumcd;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * packageName    : io.hong.admin.domain.user.enumcd
 * fileName       : UserRole
 * author         : home
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
    USER("일반 유저", "ROLE_USER", Paths.USER),
    HOST("공방 주인", "ROLE_HOST", Paths.HOST),
    ADMIN("시스템 관리자", "ROLE_ADMIN", Paths.ADMIN);

    private final String description;
    private final String authority;
    private final List<String> matchers;

    private static class Paths {
        static final List<String> USER = List.of("/api/user/**", "/api/bookings/**");
        static final List<String> HOST = List.of("/api/host/**", "/api/workshops/manage/**");
        static final List<String> ADMIN = List.of("/api/admin/**", "/api/settings/**");
    }

    public String[] getMatchersArray() {
        return matchers.toArray(String[]::new);
    }
}