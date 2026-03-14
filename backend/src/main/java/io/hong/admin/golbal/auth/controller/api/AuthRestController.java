package io.hong.admin.golbal.auth.controller.api;

import io.hong.admin.golbal.auth.dto.request.LoginRequest;
import io.hong.admin.golbal.auth.dto.request.ReissueRequest;
import io.hong.admin.golbal.auth.dto.response.TokenResponse;
import io.hong.admin.golbal.auth.service.AuthService;
import io.hong.admin.golbal.exception.HongException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : io.hong.admin.golbal.auth.controller.api
 * fileName       : AuthRestController
 * author         : home
 * date           : 2026-03-03
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 * 2026-03-15        home       토큰 재발급 시도 프로세스 추가
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthRestController {

    private final AuthService authService;

    /**
     * FE의 login: async (email, password) 호출을 받는 지점
     */
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(
            @RequestBody LoginRequest loginRequest,
            HttpServletRequest req
    ) throws HongException {
        log.info("로그인 시도: {}", loginRequest.email());
        TokenResponse tokenResponse = authService.login(loginRequest, req);
        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenResponse> reissue(
            @RequestBody ReissueRequest reissueRequest,
            HttpServletRequest req
    ) throws HongException {
        log.info("토큰 재발급 시도");
        TokenResponse tokenResponse = authService.reissue(reissueRequest, req);
        return ResponseEntity.ok(tokenResponse);
    }
}
