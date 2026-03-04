package io.hong.admin.domain.payment.enumcd;

import lombok.Getter;

/**
 * packageName    : io.hong.admin.domain.payment.enumcd
 * fileName       : PaymentStatus
 * author         : home
 * date           : 2026-03-04
 * description    : PaymentStatus Enum
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Getter
public enum PaymentStatus {

    READY, PAID, CANCEL;

    private PaymentStatus() {
    }
}
