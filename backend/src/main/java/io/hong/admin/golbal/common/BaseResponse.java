package io.hong.admin.golbal.common;

/**
 * packageName    : io.hong.admin.golbal.common
 * fileName       : BaseResponse
 * author         : note
 * date           : 2026-04-03
 * description    : 공통 응답 DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-04-03        note       최초 생성
 */

public record BaseResponse<T> (
        String message,
        T data
) {
    private static String EMPTY_MESSAGE = "메시지가 없습니다.";

    public static <T> BaseResponse<T> ok(String message, T data) {
        return new BaseResponse<>(message, data);
    }

    public static <T> BaseResponse<T> ok(T data) {
        return new BaseResponse<>(EMPTY_MESSAGE, data);
    }
}
