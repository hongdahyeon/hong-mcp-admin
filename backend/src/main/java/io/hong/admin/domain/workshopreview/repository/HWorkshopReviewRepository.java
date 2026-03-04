package io.hong.admin.domain.workshopreview.repository;

import io.hong.admin.domain.workshopreview.entity.HWorkshopReview;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : io.hong.admin.domain.workshopreview.repository
 * fileName       : HWorkshopReviewRepository
 * author         : home
 * date           : 2026-03-04
 * description    : HWorkshopReviewRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
public interface HWorkshopReviewRepository extends JpaRepository<HWorkshopReview, Long> {
}
