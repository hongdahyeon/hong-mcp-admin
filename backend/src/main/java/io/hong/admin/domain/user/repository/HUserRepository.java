package io.hong.admin.domain.user.repository;

import io.hong.admin.domain.user.entity.HUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * packageName    : io.hong.admin.domain.user.repository
 * fileName       : HUserRepository
 * author         : note
 * date           : 2026-03-03
 * description    : HUserRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */
public interface HUserRepository extends JpaRepository<HUser, Long> {
    Optional<HUser> findByEmail(String email);
    Optional<HUser> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
