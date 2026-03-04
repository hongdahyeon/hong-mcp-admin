package io.hong.admin.domain.board.repository;

import io.hong.admin.domain.board.entity.HBoard;
import org.springframework.data.jpa.repository.JpaRepository;

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
 */
public interface HBoardRepository extends JpaRepository<HBoard, Long> {
}
