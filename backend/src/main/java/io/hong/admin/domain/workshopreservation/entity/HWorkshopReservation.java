package io.hong.admin.domain.workshopreservation.entity;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.workshop.entity.HWorkshop;
import io.hong.admin.domain.workshopreservation.enumcd.ReservationStatus;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * packageName    : io.hong.admin.domain.workshopreservation.entity
 * fileName       : HWorkshopReservation
 * author         : home
 * date           : 2026-03-04
 * description    : HWorkshopReservation Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Entity @Table(name = "h_workshop_reservation")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HWorkshopReservation extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private HWorkshop workshop;

    @ManyToOne(fetch = FetchType.LAZY)
    private HUser user;

    private LocalDate reservedDate;

    private LocalTime reservedTime;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status; // PENDING, CONFIRMED, CANCELLED, COMPLETED

    @Builder
    public HWorkshopReservation(HWorkshop workshop, HUser user, LocalDate reservedDate, LocalTime reservedTime, ReservationStatus status) {
        this.workshop = workshop;
        this.user = user;
        this.reservedDate = reservedDate;
        this.reservedTime = reservedTime;
        this.status = status;
    }
}
