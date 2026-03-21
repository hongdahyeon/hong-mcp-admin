package io.hong.admin.golbal.exception;

import io.hong.admin.golbal.exception.error.ErrorResponse;
import io.hong.admin.golbal.exception.error.HongErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * packageName    : io.hong.admin.golbal.exception
 * fileName       : GlobalRestException
 * author         : home
 * date           : 2026-03-03
 * description    : GlobalRestException Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 * 2026-03-11        home       오타 수정, 위치 이동
 */

@RestControllerAdvice
public class GlobalRestException {

    @ExceptionHandler(HongException.class)
    public ResponseEntity<ErrorResponse> hongException(HongException e) {
        return ResponseEntity
                    .status(e.getHongErrorCode().getHttpStatus())
                    .body(ErrorResponse.of(e.getHongErrorCode()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> exception(Exception e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(HongErrorCode.INTERNAL_SERVER_ERROR));
    }
}
