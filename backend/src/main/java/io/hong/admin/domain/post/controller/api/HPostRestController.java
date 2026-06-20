package io.hong.admin.domain.post.controller.api;

import io.hong.admin.domain.post.service.HPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : io.hong.admin.domain.post.controller.api
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
}
