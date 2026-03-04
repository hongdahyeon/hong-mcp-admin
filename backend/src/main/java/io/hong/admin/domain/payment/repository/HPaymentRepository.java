package io.hong.admin.domain.payment.repository;

import io.hong.admin.domain.payment.entity.HPayment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : io.hong.admin.domain.payment.repository
 * fileName       : HPaymentRepository
 * author         : home
 * date           : 2026-03-04
 * description    : HPaymentRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
public interface HPaymentRepository extends JpaRepository<HPayment, Long> {
}
