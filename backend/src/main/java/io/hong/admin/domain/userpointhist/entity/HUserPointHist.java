package io.hong.admin.domain.userpointhist.entity;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * packageName    : io.hong.admin.domain.userpointhist.entity
 * fileName       : HUserPointHist
 * author         : note
 * date           : 2026-03-04
 * description    : HUserPointHist Entity
 *                  - HUser의 Point 사용 이력
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
@Entity
@Table(name = "h_user_point_hist")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HUserPointHist extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private HUser user;

    @Column(nullable = false)
    private Long amount; // 변동 금액 (증가는 +, 감소는 -)

    @Column(nullable = false)
    private Long resultBalance; // 변동 후 최종 잔액 (데이터 검증용)

    @Column(nullable = false)
    private String description; // 사유 (예: 공방 예약 결제, 포인트 충전 등)

    @Builder
    public HUserPointHist(HUser user, Long amount, Long resultBalance, String description) {
        this.user = user;
        this.amount = amount;
        this.resultBalance = resultBalance;
        this.description = description;
    }
}
