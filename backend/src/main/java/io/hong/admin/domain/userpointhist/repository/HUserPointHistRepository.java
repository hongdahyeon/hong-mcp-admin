package io.hong.admin.domain.userpointhist.repository;

import io.hong.admin.domain.userpointhist.entity.HUserPointHist;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : io.hong.admin.domain.userpointhist.repository
 * fileName       : HUserPointHistRepository
 * author         : note
 * date           : 2026-03-04
 * description    : HUserPointHistRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
public interface HUserPointHistRepository extends JpaRepository<HUserPointHist, Long> {
}
