package io.hong.admin.golbal.exception;

import io.hong.admin.golbal.exception.error.HongErrorCode;
import lombok.Getter;

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
 * 2026-03-11        home       HongErrorCode 이용으로 변경
 */

@Getter
public class HongException extends Exception {

    private final HongErrorCode hongErrorCode;

    public HongException(HongErrorCode hongErrorCode) {
        super(hongErrorCode.getMessage());
        this.hongErrorCode = hongErrorCode;
    }

    public HongException(HongErrorCode hongErrorCode, String message) {
        super(message);
        this.hongErrorCode = hongErrorCode;
    }
}
