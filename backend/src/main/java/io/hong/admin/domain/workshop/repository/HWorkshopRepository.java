package io.hong.admin.domain.workshop.repository;

import io.hong.admin.domain.workshop.dto.response.WorkshopListResponse;
import io.hong.admin.domain.workshop.entity.HWorkshop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * packageName    : io.hong.admin.domain.workshop.repository
 * fileName       : HWorkshopRepository
 * author         : home
 * date           : 2026-03-04
 * description    : HWorkshopRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
public interface HWorkshopRepository extends JpaRepository<HWorkshop, Long> {

    @Query(value = "" +
            "SELECT " +
            "new io.hong.admin.domain.workshop.dto.response.WorkshopListResponse(w) " +
            "FROM HWorkshop w ",
            countQuery = "SELECT count(w) FROM HWorkshop w" +
                    "")
    Page<WorkshopListResponse> findAllWorkshop(Pageable pageable);
}
