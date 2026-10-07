package io.hong.admin.domain.board.service;

import io.hong.admin.domain.board.dto.request.ChangeBoardRequest;
import io.hong.admin.domain.board.dto.request.SaveBoardRequest;
import io.hong.admin.domain.board.dto.request.SearchBoardRequest;
import io.hong.admin.domain.board.dto.response.BoardListResponse;
import io.hong.admin.domain.board.entity.HBoard;
import io.hong.admin.domain.board.enumcd.BoardCode;
import io.hong.admin.domain.board.repository.HBoardRepository;
import io.hong.admin.golbal.common.page.PageResponseDto;
import io.hong.admin.golbal.exception.HongException;
import io.hong.admin.golbal.exception.error.HongErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : io.hong.admin.domain.board.service
 * fileName       : HBoardService
 * author         : note
 * date           : 2026-05-11
 * description    : HBoard 서비스
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-05-11        note       최초 생성 (findBoardPage 초기 생성)
 */

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HBoardService {

    private final HBoardRepository boardRepository;

    public PageResponseDto<BoardListResponse> findBoardPage(SearchBoardRequest search) {
        Pageable pageable = search.toPageable(Sort.by("id").descending());
        Page<BoardListResponse> userPage = boardRepository.findAllBoard(pageable);
        return new PageResponseDto<>(userPage);
    }


    @Transactional(readOnly = false)
    public Long saveBoard(SaveBoardRequest request) {
        HBoard bean = HBoard.builder()
                .code(BoardCode.valueOf(request.code()))
                .name(request.name())
                .isUsed(request.isUsed())
                .isDeleted(false)
                .build();
        HBoard boardId = boardRepository.save(bean);
        return boardId.getId();
    }

    @Transactional(readOnly = false)
    public Long changeBoard(Long id, ChangeBoardRequest request) throws HongException {
        HBoard board = boardRepository.findById(id)
                .orElseThrow(() -> new HongException(HongErrorCode.BOARD_NOT_FOUND));
        board.update(request.name(), request.isUsed());
        return id;
    }
}
