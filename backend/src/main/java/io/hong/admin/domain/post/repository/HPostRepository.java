package io.hong.admin.domain.post.repository;

import io.hong.admin.domain.post.dto.response.PostListResponse;
import io.hong.admin.domain.post.entity.HPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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

    @Query(value = "" +
            "SELECT " +
            "new io.hong.admin.domain.post.dto.response.PostListResponse(p) " +
            "FROM HPost p ",
            countQuery = "SELECT count(p) FROM HPost p" +
                    "")
    Page<PostListResponse> findAllPost(Pageable pageable);
}
