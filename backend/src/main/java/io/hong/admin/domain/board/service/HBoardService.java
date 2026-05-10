package io.hong.admin.domain.board.service;

import io.hong.admin.domain.board.dto.request.SearchBoardRequest;
import io.hong.admin.domain.board.dto.response.BoardListResponse;
import io.hong.admin.domain.board.repository.HBoardRepository;
import io.hong.admin.golbal.common.page.PageResponseDto;
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

}
