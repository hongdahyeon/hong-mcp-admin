package io.hong.admin.golbal.auth.dto.request;

/**
 * packageName    : io.hong.admin.golbal.auth.dto.request
 * fileName       : ReissueRequest
 * author         : home
 * date           : 2026-03-14
 * description    : 재발급 요청 시 필요한 정보를 담는 Record
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-14        home       최초 생성
 */
public record ReissueRequest(
        String refreshToken
) {}