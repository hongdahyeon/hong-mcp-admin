package io.hong.admin.domain.useraccesslog.repository;

import io.hong.admin.domain.useraccesslog.entity.HUserAccessLog;
import org.springframework.data.jpa.repository.JpaRepository;

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
 */
public interface HUserAccessLogRepository extends JpaRepository<HUserAccessLog, Long> {
}
