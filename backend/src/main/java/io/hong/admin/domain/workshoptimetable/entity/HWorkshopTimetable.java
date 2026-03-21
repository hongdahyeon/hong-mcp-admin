package io.hong.admin.domain.workshoptimetable.entity;

import io.hong.admin.domain.workshop.entity.HWorkshop;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;

/**
 * packageName    : io.hong.admin.domain.workshoptimetable.entity
 * fileName       : HWorkshopTimetable
 * author         : home
 * date           : 2026-03-04
 * description    : HWorkshopTimetable Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Entity
@Table(name = "h_workshop_timetable")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HWorkshopTimetable extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workshop_id")
    private HWorkshop workshop;
    
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;
    
    private int slotInterval; // 분 단위 (예: 60)

    @Builder
    public HWorkshopTimetable(HWorkshop workshop, DayOfWeek dayOfWeek, LocalTime startTime, LocalTime endTime, int slotInterval) {
        this.workshop = workshop;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.slotInterval = slotInterval;
    }
}
