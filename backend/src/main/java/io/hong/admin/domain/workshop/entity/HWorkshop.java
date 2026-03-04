package io.hong.admin.domain.workshop.entity;

import io.hong.admin.domain.adress.Address;
import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * packageName    : io.hong.admin.domain.workshop.entity
 * fileName       : HWorkshop
 * author         : note
 * date           : 2026-03-04
 * description    : HWorkshop Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Entity
@Table(name = "h_workshop")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HWorkshop extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id")
    private HUser host;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    // 주소 값 객체 적용!
    @Embedded
    private Address address;

    @Column(nullable = false)
    private boolean isApproved = false;

    @Column(nullable = false)
    private boolean isOpen = true;

    @Builder
    public HWorkshop(HUser host, String name, String description, Address address, boolean isApproved, boolean isOpen) {
        this.host = host;
        this.name = name;
        this.description = description;
        this.address = address;
        this.isApproved = isApproved;
        this.isOpen = isOpen;
    }
}
