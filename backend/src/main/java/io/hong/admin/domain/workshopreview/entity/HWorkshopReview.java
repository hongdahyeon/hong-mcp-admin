package io.hong.admin.domain.workshopreview.entity;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.workshop.entity.HWorkshop;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * packageName    : io.hong.admin.domain.workshopreview.entity
 * fileName       : HWorkshopReview
 * author         : home
 * date           : 2026-03-04
 * description    : HWorkshopReview Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Entity @Table(name = "h_workshop_review")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HWorkshopReview extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    private HWorkshop workshop;
    
    @ManyToOne(fetch = FetchType.LAZY)
    private HUser user;
    
    @Column(nullable = false)
    private int rating = 0; // 1~5
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Builder
    public HWorkshopReview(HWorkshop workshop, HUser user, int rating, String content) {
        this.workshop = workshop;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
}
