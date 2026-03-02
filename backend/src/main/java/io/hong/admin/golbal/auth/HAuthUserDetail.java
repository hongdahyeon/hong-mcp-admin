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
 * author         : note
 * date           : 2026-03-03
 * description    : HAuthUser Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
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

    // 정적 팩토리 메서드: 엔티티를 레코드로 변환
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
                Collections.singleton(
                        new SimpleGrantedAuthority(user.getRole().getAuthority())
                )
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
