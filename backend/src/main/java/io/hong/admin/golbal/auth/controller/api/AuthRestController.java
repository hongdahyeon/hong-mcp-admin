package io.hong.admin.golbal.auth.controller.api;

import io.hong.admin.golbal.auth.dto.request.LoginRequest;
import io.hong.admin.golbal.auth.dto.response.TokenResponse;
import io.hong.admin.golbal.auth.service.AuthService;
import io.hong.admin.golbal.exception.HongException;
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
 * author         : note
 * date           : 2026-03-03
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
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
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest) throws HongException {
        log.info("로그인 시도: {}", loginRequest.email());

        // 1. AuthService를 통해 로그인 로직 수행 (비밀번호 체크 및 토큰 생성 포함)
        TokenResponse tokenResponse = authService.login(loginRequest);

        // 2. 성공 시 200 OK와 함께 AccessToken, RefreshToken, Username 반환
        return ResponseEntity.ok(tokenResponse);
    }
}
