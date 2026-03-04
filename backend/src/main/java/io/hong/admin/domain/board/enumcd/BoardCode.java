package io.hong.admin.domain.board.enumcd;

import lombok.Getter;

/**
 * packageName    : io.hong.admin.domain.board.enumcd
 * fileName       : BoardCode
 * author         : home
 * date           : 2026-03-04
 * description    : BoardCode Enum
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Getter
public enum BoardCode {

    NOTICE,
    FREE,
    QNA,
    FAQ;

    private BoardCode() {
    }
}
