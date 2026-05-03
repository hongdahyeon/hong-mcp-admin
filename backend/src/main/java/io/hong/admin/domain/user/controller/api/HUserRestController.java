package io.hong.admin.domain.user.controller.api;

import io.hong.admin.domain.user.dto.response.UserViewResponse;
import io.hong.admin.domain.user.service.HUserService;
import io.hong.admin.golbal.auth.HAuthUserDetail;
import io.hong.admin.golbal.common.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : io.hong.admin.domain.user.controller.api
 * fileName       : HUserRestController
 * author         : note
 * date           : 2026-04-29
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-04-29        note       최초 생성
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class HUserRestController {

    private final HUserService hUserService;

    @GetMapping("/me")
    public ResponseEntity<BaseResponse<UserViewResponse>> findUserView(
            @AuthenticationPrincipal HAuthUserDetail userDetail
    ) {
        UserViewResponse userView = hUserService.findUserView(userDetail.getUserId());
        BaseResponse<UserViewResponse> response = BaseResponse.ok(userView);
        return ResponseEntity.ok(response);
    }
}
