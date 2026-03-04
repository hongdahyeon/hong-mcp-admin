package io.hong.admin.domain.post.entity;

import io.hong.admin.domain.board.entity.HBoard;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * packageName    : io.hong.admin.domain.post.entity
 * fileName       : HPost
 * author         : note
 * date           : 2026-03-04
 * description    : HPost Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
@Entity
@Table(name = "h_post")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HPost extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private HBoard board;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    
    @Column(nullable = false)
    private int viewCount = 0;

    @Builder
    public HPost(HBoard board, String title, String content, int viewCount) {
        this.board = board;
        this.title = title;
        this.content = content;
        this.viewCount = viewCount;
    }
}
