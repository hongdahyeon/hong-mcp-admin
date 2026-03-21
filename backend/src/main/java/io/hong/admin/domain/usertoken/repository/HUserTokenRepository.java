package io.hong.admin.domain.usertoken.repository;

import io.hong.admin.domain.usertoken.entity.HUserToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * packageName    : io.hong.admin.domain.usertoken.repository
 * fileName       : HUserTokenRepository
 * author         : home
 * date           : 2026-03-03
 * description    : HUserTokenRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */
public interface HUserTokenRepository extends JpaRepository<HUserToken, Long> {
    Optional<HUserToken> findByRefreshToken(String refreshToken);
    void deleteByUserId(Long userId);
}
