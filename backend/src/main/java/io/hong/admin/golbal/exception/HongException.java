package io.hong.admin.golbal.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * packageName    : io.hong.admin.golbal.exception
 * fileName       : HongException
 * author         : home
 * date           : 2026-03-03
 * description    : HongException Class - 공통 예외 처리
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Getter
public class HongException extends Exception {

    private final HttpStatus httpStatus;

    public HongException() {
        this(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류입니다.");
    }

    public HongException(String message) {
        this(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }

    public HongException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
