package io.hong.admin.domain.workshopreservation.repository;

import io.hong.admin.domain.workshopreservation.entity.HWorkshopReservation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : io.hong.admin.domain.workshopreservation.repository
 * fileName       : HWorkshopReservationRepository
 * author         : home
 * date           : 2026-03-04
 * description    : HWorkshopReservationRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
public interface HWorkshopReservationRepository extends JpaRepository<HWorkshopReservation, Long> {
}
