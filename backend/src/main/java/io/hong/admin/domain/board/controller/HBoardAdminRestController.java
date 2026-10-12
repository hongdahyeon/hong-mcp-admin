package io.hong.admin.domain.board.controller;

import io.hong.admin.domain.board.dto.request.ChangeBoardRequest;
import io.hong.admin.domain.board.dto.request.SaveBoardRequest;
import io.hong.admin.domain.board.dto.request.SearchBoardRequest;
import io.hong.admin.domain.board.dto.response.BoardListResponse;
import io.hong.admin.domain.board.enumcd.BoardCode;
import io.hong.admin.domain.board.service.HBoardService;
import io.hong.admin.golbal.common.BaseResponse;
import io.hong.admin.golbal.common.page.PageResponseDto;
import io.hong.admin.golbal.exception.HongException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * packageName    : io.hong.admin.domain.board.controller
 * fileName       : HBoardAdminRestController
 * author         : note
 * date           : 2026-05-11
 * description    : 게시판 관련 API
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-05-11        note       최초 생성
 * 2026-05-14        note       게시판 코드 조회 API 추가
 * 2026-05-23        note       게시판 생성 API 추가
 * 2026-05-23        note       게시판 수정 API 추가
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

    @GetMapping("/codes")
    public ResponseEntity<BaseResponse<BoardCode[]>> findUserRoles() {
        BoardCode[] values = BoardCode.values();
        BaseResponse<BoardCode[]> response = BaseResponse.ok(values);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<BaseResponse<Long>> saveBoard(@RequestBody SaveBoardRequest request) {
        Long uid = service.saveBoard(request);
        BaseResponse<Long> response = BaseResponse.ok(uid);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<Long>> changeBoard(@PathVariable Long id, @RequestBody ChangeBoardRequest request) throws HongException {
        Long uid = service.changeBoard(id, request);
        BaseResponse<Long> response = BaseResponse.ok(uid);
        return ResponseEntity.ok(response);
    }
}
