package io.hong.admin.domain.userpoint.entity;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * packageName    : io.hong.admin.domain.userpoint.entity
 * fileName       : HUserPoint
 * author         : home
 * date           : 2026-03-04
 * description    : HUserPoint Entity
 *                  - HUser 1:1 관계
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Entity
@Table(name = "h_user_point")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HUserPoint extends BaseEntity {

    @Id
    @Column(name = "user_id")
    private Long userId; // HUser의 PK를 PK로 사용 (1:1 관계)

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // @Id로 지정된 컬럼에 매핑
    @JoinColumn(name = "user_id")
    private HUser user;

    @Column(nullable = false)
    private Long balance = 0L; // 현재 보유 잔액

    @Builder
    public HUserPoint(HUser user, Long balance) {
        this.user = user;
        this.balance = balance != null ? balance : 0L;
    }

    // 잔액 업데이트 편의 메서드
    public void addPoint(Long amount) {
        this.balance += amount;
    }

    public void usePoint(Long amount) {
        if (this.balance < amount) {
            throw new IllegalArgumentException("잔액이 부족합니다.");
        }
        this.balance -= amount;
    }
}
