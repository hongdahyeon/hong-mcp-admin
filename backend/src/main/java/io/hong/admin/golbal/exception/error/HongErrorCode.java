package io.hong.admin.golbal.exception.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * packageName    : io.hong.admin.golbal.exception.error
 * fileName       : HongErrorCode
 * author         : home
 * date           : 2026-03-11
 * description    : ErrorCode 커스텀
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-11        home       최초 생성
 * 2026-03-15        home       기존 A003 삭제 및 [만료된 토큰] 에러 코드 추가
 */
@Getter
public enum HongErrorCode {
    // 공통
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C001", "서버 내부 오류입니다."),
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "C002", "잘못된 입력값입니다."),

    // 인증/인가
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "A001", "인증되지 않은 사용자입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "A002", "유효하지 않은 토큰입니다."),
    USER_NOT_FOUND_BY_TOKEN(HttpStatus.UNAUTHORIZED, "A003", "존재하지 않는 사용자 계정입니다."),
    AUTHENTICATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "A004", "인증 처리 중 오류가 발생했습니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "A005", "만료된 토큰입니다."),

    // 유저 상태 관련 (상세화)
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "존재하지 않는 사용자입니다."),
    PASSWORD_NOT_MATCH(HttpStatus.UNAUTHORIZED, "U002", "비밀번호가 일치하지 않습니다."),
    USER_DELETED(HttpStatus.FORBIDDEN, "U003", "탈퇴한 계정입니다."),
    USER_LOCKED(HttpStatus.FORBIDDEN, "U004", "계정이 잠겼습니다. 관리자에게 문의바랍니다."),
    USER_NOT_APPROVED(HttpStatus.FORBIDDEN, "U005", "현재 승인 대기 중인 계정입니다."),
    USER_FORBIDDEN(HttpStatus.FORBIDDEN, "U006", "비활성화된 계정입니다. 관리자에게 문의바랍니다."),
    PASSWORD_EXPIRED(HttpStatus.FORBIDDEN, "U007", "비밀번호가 만료되었습니다. 비밀번호를 변경해주세요."),
    USER_ID_DUPLICATE(HttpStatus.BAD_REQUEST, "U008", "이미 존재하는 이메일입니다."),
    USER_NAME_DUPLICATE(HttpStatus.BAD_REQUEST, "U008", "이미 존재하닌 이름입니다.");


    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

    HongErrorCode(HttpStatus httpStatus, String code, String message) {
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
    }
}
