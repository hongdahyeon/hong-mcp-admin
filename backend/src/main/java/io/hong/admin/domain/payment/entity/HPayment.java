package io.hong.admin.domain.payment.entity;

import io.hong.admin.domain.payment.enumcd.PaymentStatus;
import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * packageName    : io.hong.admin.domain.payment.entity
 * fileName       : HPayment
 * author         : home
 * date           : 2026-03-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Entity @Table(name = "h_payment")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HPayment extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private HUser user;

    private String merchantUid;

    private Long amount;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // READY, PAID, CANCEL

    @Builder
    public HPayment(HUser user, String merchantUid, Long amount, PaymentStatus status) {
        this.user = user;
        this.merchantUid = merchantUid;
        this.amount = amount;
        this.status = status;
    }
}
