package io.hong.admin.domain.workshoptimetable.repository;

import io.hong.admin.domain.workshoptimetable.entity.HWorkshopTimetable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : io.hong.admin.domain.workshoptimetable.repository
 * fileName       : HWorkshopTimetableRepository
 * author         : home
 * date           : 2026-03-04
 * description    : HWorkshopTimetableRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
public interface HWorkshopTimetableRepository extends JpaRepository<HWorkshopTimetable, Long> {
}
