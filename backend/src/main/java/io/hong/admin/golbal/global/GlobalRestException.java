package io.hong.admin.golbal.global;

import io.hong.admin.golbal.exception.HongException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * packageName    : io.hong.admin.golbal.global
 * fileName       : GlobalRestException
 * author         : home
 * date           : 2026-03-03
 * description    : GlobalRestException Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@RestControllerAdvice
public class GlobalRestException {

    @ExceptionHandler(HongException.class)
    public ResponseEntity<String> hongExeption(HongException e) {
        return ResponseEntity
                    .status(e.getHttpStatus())
                    .body(e.getMessage());
    }
}
