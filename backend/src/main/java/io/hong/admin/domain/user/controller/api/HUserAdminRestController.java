package io.hong.admin.domain.user.controller.api;

import io.hong.admin.domain.user.dto.request.SearchUserRequest;
import io.hong.admin.domain.user.dto.response.UserListResponse;
import io.hong.admin.domain.user.service.HUserService;
import io.hong.admin.golbal.common.BaseResponse;
import io.hong.admin.golbal.common.page.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : io.hong.admin.domain.user.controller.api
 * fileName       : HUserAdminRestController
 * author         : note
 * date           : 2026-04-18
 * description    : Admin 권한 > 유저 API
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-04-18        note       최초 생성
 */

@RestController
@RequestMapping("/api/admin/user")
@RequiredArgsConstructor
public class HUserAdminRestController {

    private final HUserService service;

    @GetMapping("/page")
    public ResponseEntity<BaseResponse<PageResponseDto<UserListResponse>>> findUserAccessLogPage(SearchUserRequest search) {
        PageResponseDto<UserListResponse> page = service.findUserPage(search);
        BaseResponse<PageResponseDto<UserListResponse>> response = BaseResponse.ok(page);
        return ResponseEntity.ok().body(response);
    }
}
