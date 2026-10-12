package io.hong.admin.domain.post.service;

import io.hong.admin.domain.post.dto.request.SearchPostRequest;
import io.hong.admin.domain.post.dto.response.PostListResponse;
import io.hong.admin.domain.post.repository.HPostRepository;
import io.hong.admin.golbal.common.page.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : io.hong.admin.domain.post.service
 * fileName       : HPostService
 * author         : note
 * date           : 2026-06-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-06-21        note       최초 생성
 */

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HPostService {

    private final HPostRepository postRepository;

    public PageResponseDto<PostListResponse> findPostPage(SearchPostRequest search) {
        Pageable pageable = search.toPageable(Sort.by("id").descending());
        Page<PostListResponse> userPage = postRepository.findAllPost(pageable);
        return new PageResponseDto<>(userPage);
    }
}
