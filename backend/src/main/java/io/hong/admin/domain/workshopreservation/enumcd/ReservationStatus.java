package io.hong.admin.domain.workshopreservation.enumcd;

import lombok.Getter;

/**
 * packageName    : io.hong.admin.domain.workshopreservation.enumcd
 * fileName       : ReservationStatus
 * author         : home
 * date           : 2026-03-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Getter
public enum ReservationStatus {

    PENDING, CONFIRMED, CANCELLED, COMPLETED;

    private ReservationStatus() {
    }
}
