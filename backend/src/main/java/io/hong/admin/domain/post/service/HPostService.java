package io.hong.admin.domain.post.service;

import io.hong.admin.domain.post.repository.HPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : io.hong.admin.domain.post.service
 * fileName       : HPostService
 * author         : note
 * date           : 2026-06-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-06-21        note       최초 생성
 */

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HPostService {

    private final HPostRepository repository;
}
