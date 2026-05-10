package io.hong.admin.domain.board.controller.api;

import io.hong.admin.domain.board.dto.request.SearchBoardRequest;
import io.hong.admin.domain.board.dto.response.BoardListResponse;
import io.hong.admin.domain.board.service.HBoardService;
import io.hong.admin.golbal.common.BaseResponse;
import io.hong.admin.golbal.common.page.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : io.hong.admin.domain.board.controller.api
 * fileName       : HBoardAdminRestController
 * author         : note
 * date           : 2026-05-11
 * description    : 게시판 관련 API
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-05-11        note       최초 생성
 */

@RestController
@RequestMapping("/api/admin/board")
@RequiredArgsConstructor
public class HBoardAdminRestController {

    private final HBoardService service;

    @GetMapping("/page")
    public ResponseEntity<BaseResponse<PageResponseDto<BoardListResponse>>> findBoardPage(SearchBoardRequest search) {
        PageResponseDto<BoardListResponse> page = service.findBoardPage(search);
        BaseResponse<PageResponseDto<BoardListResponse>> response = BaseResponse.ok(page);
        return ResponseEntity.ok().body(response);
    }

}
