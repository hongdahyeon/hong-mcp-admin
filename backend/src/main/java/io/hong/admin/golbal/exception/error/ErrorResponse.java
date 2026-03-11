package io.hong.admin.golbal.exception.error;

import lombok.Getter;

/**
 * packageName    : io.hong.admin.golbal.exception.error
 * fileName       : ErrorResponse
 * author         : home
 * date           : 2026-03-11
 * description    : 에러에 대한 응답 규격화
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-11        home       최초 생성
 */
public record ErrorResponse(
        String code,
        String message,
        int status
) {
    public static ErrorResponse of(HongErrorCode errorCode) {
        return new ErrorResponse(
            errorCode.getCode(),
            errorCode.getMessage(),
            errorCode.getHttpStatus().value()
        );
    }
}
