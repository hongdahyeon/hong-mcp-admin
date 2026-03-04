package io.hong.admin.domain.userpoint.repository;

import io.hong.admin.domain.userpoint.entity.HUserPoint;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : io.hong.admin.domain.userpoint.repository
 * fileName       : HUserPointRepository
 * author         : note
 * date           : 2026-03-04
 * description    : HUserPointRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
public interface HUserPointRepository extends JpaRepository<HUserPoint, Long> {
}
