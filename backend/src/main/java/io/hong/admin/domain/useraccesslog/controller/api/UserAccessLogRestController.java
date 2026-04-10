package io.hong.admin.domain.useraccesslog.controller.api;

import io.hong.admin.domain.useraccesslog.dto.request.SearchUserAccessLog;
import io.hong.admin.domain.useraccesslog.dto.response.UserAccessLogList;
import io.hong.admin.domain.useraccesslog.service.HUserAccessLogService;
import io.hong.admin.golbal.common.BaseResponse;
import io.hong.admin.golbal.common.page.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : io.hong.admin.domain.useraccesslog.controller.api
 * fileName       : UserAccessLogRestController
 * author         : home
 * date           : 2026-03-14
 * description    : 유저 접근 이력 관련 API
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-14        home       최초 생성
 * 2026-04-10        home       user-access-page 응답 수정
 */

@RestController
@RequestMapping("/api/admin/user-access")
@RequiredArgsConstructor
public class UserAccessLogRestController {

    private final HUserAccessLogService service;

    @GetMapping("/page")
    public ResponseEntity<BaseResponse<PageResponseDto<UserAccessLogList>>> findUserAccessLogPage(SearchUserAccessLog search) {
        PageResponseDto<UserAccessLogList> page = service.findUserAccessLogPage(search);
        BaseResponse<PageResponseDto<UserAccessLogList>> response = BaseResponse.ok(page);
        return ResponseEntity.ok().body(response);
    }
}
