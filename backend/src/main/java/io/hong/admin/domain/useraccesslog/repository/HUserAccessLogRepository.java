package io.hong.admin.domain.useraccesslog.repository;

import io.hong.admin.domain.useraccesslog.dto.response.UserAccessLogList;
import io.hong.admin.domain.useraccesslog.entity.HUserAccessLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * packageName    : io.hong.admin.domain.useraccesslog.repository
 * fileName       : HUserAccessLogRepository
 * author         : home
 * date           : 2026-03-04
 * description    : HUserAccessLogRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 * 2026-03-14        home       유저 접근 이력 조회 페이징 쿼리 추가 + 유저 정보
 */
public interface HUserAccessLogRepository extends JpaRepository<HUserAccessLog, Long> {

    @Query(value = "" +
            "SELECT " +
                "new io.hong.admin.domain.useraccesslog.dto.response.UserAccessLogList(" +
                "l.id, l.ipAddress, l.userAgent, l.loginAt, u.id, u.username, u.email) " +
              "FROM HUserAccessLog l " +
              "JOIN HUser u ON l.userId = u.id",
            countQuery = "SELECT count(l) FROM HUserAccessLog l" +
    "") // 카운트 쿼리 최적화
    Page<UserAccessLogList> findAllWithUserInfo(Pageable pageable);
}
