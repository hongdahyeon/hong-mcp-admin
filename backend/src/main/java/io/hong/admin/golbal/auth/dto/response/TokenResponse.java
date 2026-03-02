package io.hong.admin.golbal.auth.dto.response;

/**
 * packageName    : io.hong.admin.golbal.auth.dto.response
 * fileName       : TokenResponse
 * author         : note
 * date           : 2026-03-03
 * description    : TokenResponse DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */
public record TokenResponse(String accessToken, String refreshToken, String username) {
}
