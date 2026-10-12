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
 * 2026-05-10        note       게시판 코드 추가, description 추가
 */

@Getter
public enum BoardCode {

    NOTICE("공지사항"),
    FREE("자유게시판"),
    QNA("qna"),
    FAQ("faq"),
    TERMS("이용약관"),
    PRIVACY("개인정보처리방침");

    private String description;

    private BoardCode(String description) {
        this.description = description;
    }
}
