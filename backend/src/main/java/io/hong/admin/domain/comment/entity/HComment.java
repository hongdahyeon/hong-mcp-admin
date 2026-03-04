package io.hong.admin.domain.comment.entity;

import io.hong.admin.domain.post.entity.HPost;
import io.hong.admin.golbal.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * packageName    : io.hong.admin.domain.comment.entity
 * fileName       : HComment
 * author         : home
 * date           : 2026-03-04
 * description    : HComment Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
@Entity
@Table(name = "h_comment")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private HPost post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private HComment parent; // 대댓글용 셀프 참조
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    
    @Column(nullable = false)
    private boolean isDeleted = false;

    @Builder
    public HComment(HPost post, HComment parent, String content, boolean isDeleted) {
        this.post = post;
        this.parent = parent;
        this.content = content;
        this.isDeleted = isDeleted;
    }
}
