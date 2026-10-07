package io.hong.admin.domain.post.controller;

import io.hong.admin.domain.post.dto.request.SearchPostRequest;
import io.hong.admin.domain.post.dto.response.PostListResponse;
import io.hong.admin.domain.post.service.HPostService;
import io.hong.admin.golbal.common.BaseResponse;
import io.hong.admin.golbal.common.page.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : io.hong.admin.domain.post.controller
 * fileName       : HPostRestController
 * author         : note
 * date           : 2026-06-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-06-21        note       최초 생성
 */
@RestController
@RequestMapping("/api/user/post")
@RequiredArgsConstructor
public class HPostRestController {

    private final HPostService service;

    @GetMapping("/page")
    public ResponseEntity findPostPage(SearchPostRequest search) {
        PageResponseDto<PostListResponse> page = service.findPostPage(search);
        BaseResponse<PageResponseDto<PostListResponse>> response = BaseResponse.ok(page);
        return ResponseEntity.ok().body(response);
    }
}
