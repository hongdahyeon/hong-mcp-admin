package io.hong.admin.domain.post.dto.response;

import io.hong.admin.domain.board.entity.HBoard;
import io.hong.admin.domain.post.entity.HPost;

/**
 * packageName    : io.hong.admin.domain.post.dto.response
 * fileName       : PostListResponse
 * author         : note
 * date           : 2026-06-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-06-21        note       최초 생성
 */
public record PostListResponse(
        Long id,
        HBoard hBoard,
        String boardName,
        String title,
        String content,
        int viewCount
) {

    public PostListResponse(HPost hPost) {
        this(
          hPost.getId(),
          hPost.getBoard(), hPost.getBoard().getName(),
          hPost.getTitle(), hPost.getContent(),
          hPost.getViewCount()
        );
    }
}
