package io.hong.admin.domain.workshop.controller;

import io.hong.admin.domain.workshop.dto.request.SearchWorkshopRequest;
import io.hong.admin.domain.workshop.dto.response.WorkshopListResponse;
import io.hong.admin.domain.workshop.service.HWorkshopService;
import io.hong.admin.golbal.common.BaseResponse;
import io.hong.admin.golbal.common.page.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : io.hong.admin.domain.workshop.controller
 * fileName       : HWorkshopAdminRestController
 * author         : note
 * date           : 2026-07-29
 * description    : 공방 관련 API
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-07-29        note       최초 생성
 * 2026-07-29        note       공방 관련 페이징 API 추가
 */
@RestController
@RequestMapping("/api/admin/workshop")
@RequiredArgsConstructor
public class HWorkshopAdminRestController {

    private final HWorkshopService service;

    @GetMapping("/page")
    public ResponseEntity<BaseResponse<PageResponseDto<WorkshopListResponse>>> findBoardPage(SearchWorkshopRequest search) {
        PageResponseDto<WorkshopListResponse> page = service.findWorkshopPage(search);
        BaseResponse<PageResponseDto<WorkshopListResponse>> response = BaseResponse.ok(page);
        return ResponseEntity.ok().body(response);
    }
}
