package io.hong.admin.golbal.auth;

import io.hong.admin.domain.user.entity.HUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

/**
 * packageName    : io.hong.admin.domain.user.dto.response
 * fileName       : HAuthUserDetail
 * author         : home
 * date           : 2026-03-03
 * description    : HAuthUser Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 * 2026-03-11        home       JWT 필터용 생성자 추가 > 기본 값들만 세팅
 */
public record HAuthUserDetail(
        Long userId,
        String email,
        String username,
        boolean isApproved,
        boolean isLocked,
        boolean isDeleted,
        boolean isEnabled,
        LocalDateTime lastPasswordChangedDate,
        Collection<? extends GrantedAuthority> authorities
) implements UserDetails {

    // 1. [로그인/DB조회용] 모든 정보를 다 채울 때
    public static HAuthUserDetail from(HUser user) {
        return new HAuthUserDetail(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.isApproved(),
                user.isLocked(),
                user.isDeleted(),
                user.isEnabled(),
                user.getLastPasswordChangedDate(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRole().getAuthority()))
        );
    }

    // 2. [JWT 필터용] DB 조회 없이 토큰 정보만으로 가볍게 만들 때
    public static HAuthUserDetail of(Long userId, String email, String role) {
        return new HAuthUserDetail(
                userId,
                email,
                null,           // username은 토큰에 없으므로 null
                true,                   // 인증 단계는 통과시키기 위해 true 세팅
                false,                  // isLocked (false가 잠기지 않음)
                false,                  // isDeleted
                true,                   // isEnabled
                LocalDateTime.now(),    // 만료 체크 통과를 위해 현재 시간
                Collections.singleton(new SimpleGrantedAuthority(role))
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !isDeleted;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    /**
     * 비밀번호 만료 체크 (90일)
     */
    @Override
    public boolean isCredentialsNonExpired() {
        // 현재 시간으로부터 90일 전보다 마지막 변경일이 이후여야 함
        return lastPasswordChangedDate.isAfter(LocalDateTime.now().minusDays(90));
    }

    @Override
    public boolean isEnabled() {
        // 승인되었고, 삭제되지 않았으며, 활성화 상태여야 함
        return isApproved && !isDeleted && isEnabled;
    }
}
