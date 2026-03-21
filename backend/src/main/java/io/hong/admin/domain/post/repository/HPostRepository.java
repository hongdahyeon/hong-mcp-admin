package io.hong.admin.domain.post.repository;

import io.hong.admin.domain.post.entity.HPost;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : io.hong.admin.domain.post.repository
 * fileName       : HPostRepository
 * author         : home
 * date           : 2026-03-04
 * description    : HPostRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
public interface HPostRepository extends JpaRepository<HPost, Long> {
}
