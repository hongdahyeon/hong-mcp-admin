package io.hong.admin.domain.board.repository;

import io.hong.admin.domain.board.dto.response.BoardListResponse;
import io.hong.admin.domain.board.entity.HBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * packageName    : io.hong.admin.domain.board.repository
 * fileName       : HBoardRepository
 * author         : home
 * date           : 2026-03-04
 * description    : HBoardRepository Interface
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 * 2026-05-11        note       {findAllBoard} 추가
 */
public interface HBoardRepository extends JpaRepository<HBoard, Long> {


    @Query(value = "" +
            "SELECT " +
            "new io.hong.admin.domain.board.dto.response.BoardListResponse(b) " +
            "FROM HBoard b ",
            countQuery = "SELECT count(b) FROM HBoard b" +
            "")
    Page<BoardListResponse> findAllBoard(Pageable pageable);
}
