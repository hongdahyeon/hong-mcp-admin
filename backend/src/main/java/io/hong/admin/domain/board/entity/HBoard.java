package io.hong.admin.domain.board.entity;

import io.hong.admin.domain.board.enumcd.BoardCode;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * packageName    : io.hong.admin.domain.board.entity
 * fileName       : HBoard
 * author         : note
 * date           : 2026-03-04
 * description    : HBoard Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
@Entity
@Table(name = "h_board")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HBoard extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BoardCode code; // NOTICE, FREE, QNA, FAQ
    
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean isUsed = true;

    @Column(nullable = false)
    private boolean isDeleted = false;

    @Builder
    public HBoard(BoardCode code, String name, boolean isUsed, boolean isDeleted) {
        this.code = code;
        this.name = name;
        this.isUsed = isUsed;
        this.isDeleted = isDeleted;
    }
}
