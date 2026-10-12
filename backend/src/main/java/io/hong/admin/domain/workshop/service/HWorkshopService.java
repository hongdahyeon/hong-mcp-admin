package io.hong.admin.domain.workshop.service;

import io.hong.admin.domain.workshop.dto.request.SearchWorkshopRequest;
import io.hong.admin.domain.workshop.dto.response.WorkshopListResponse;
import io.hong.admin.domain.workshop.repository.HWorkshopRepository;
import io.hong.admin.golbal.common.page.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : io.hong.admin.domain.workshop.service
 * fileName       : HWorkshopService
 * author         : note
 * date           : 2026-07-29
 * description    : HWorkshop 서비스
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-07-29        note       최초 생성
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HWorkshopService {

    private final HWorkshopRepository workshopRepository;

    public PageResponseDto<WorkshopListResponse> findWorkshopPage(SearchWorkshopRequest search) {
        Pageable pageable = search.toPageable(Sort.by("id").descending());
        Page<WorkshopListResponse> userPage = workshopRepository.findAllWorkshop(pageable);
        return new PageResponseDto<>(userPage);
    }
}
