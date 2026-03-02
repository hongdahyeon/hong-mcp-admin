package io.hong.admin.golbal.auth.dto.request;

/**
 * packageName    : io.hong.admin.golbal.auth.dto.request
 * fileName       : LoginRequest
 * author         : note
 * date           : 2026-03-03
 * description    : LoginRequest DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */
public record LoginRequest(String email, String password) {}
