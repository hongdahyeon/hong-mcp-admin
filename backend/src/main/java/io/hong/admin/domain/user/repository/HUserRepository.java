package io.hong.admin.domain.user.repository;

import io.hong.admin.domain.user.dto.response.UserListResponse;
import io.hong.admin.domain.user.entity.HUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * packageName    : io.hong.admin.domain.user.repository
 * fileName       : HUserRepository
 * author         : home
 * date           : 2026-03-03
 * description    : HUserRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 * 2026-04-18        note       {findAllUser} 추가
 */
public interface HUserRepository extends JpaRepository<HUser, Long> {
    Optional<HUser> findByEmail(String email);
    Optional<HUser> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    HUser getHUserById(Long id);

    @Query(value = "" +
            "SELECT " +
            "new io.hong.admin.domain.user.dto.response.UserListResponse(u) " +
            "FROM HUser u ",
            countQuery = "SELECT count(u) FROM HUser u" +
                    "") // 카운트 쿼리 최적화
    Page<UserListResponse> findAllUser(Pageable pageable);
}
