package io.hong.admin.domain.comment.repository;

import io.hong.admin.domain.comment.entity.HComment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : io.hong.admin.domain.comment.repository
 * fileName       : HCommentRepository
 * author         : note
 * date           : 2026-03-04
 * description    : HCommentRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
public interface HCommentRepository extends JpaRepository<HComment, Long> {
}
