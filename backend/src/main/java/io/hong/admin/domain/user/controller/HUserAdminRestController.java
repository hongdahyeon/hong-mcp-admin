package io.hong.admin.domain.user.controller;

import io.hong.admin.domain.user.dto.request.SearchUserRequest;
import io.hong.admin.domain.user.dto.request.UpdateUserFlagRequest;
import io.hong.admin.domain.user.dto.response.UserListResponse;
import io.hong.admin.domain.user.service.HUserService;
import io.hong.admin.golbal.common.BaseResponse;
import io.hong.admin.golbal.common.page.PageResponseDto;
import io.hong.admin.golbal.exception.HongException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * packageName    : io.hong.admin.domain.user.controller
 * fileName       : HUserAdminRestController
 * author         : note
 * date           : 2026-04-18
 * description    : Admin 권한 > 유저 API
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-04-18        note       최초 생성
 * 2026-07-29        note       flag 정보 변경
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

    @PutMapping("/flag-change")
    public ResponseEntity<BaseResponse<String>> changeUserFlag(@RequestBody UpdateUserFlagRequest request) throws HongException {
        String message = service.changeUserFlag(request);
        BaseResponse<String> response = BaseResponse.ok(message);
        return ResponseEntity.ok().body(response);
    }
}
