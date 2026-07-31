package io.hong.admin.domain.workshop.dto.response;

import io.hong.admin.domain.address.Address;
import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.workshop.entity.HWorkshop;

/**
 * packageName    : io.hong.admin.domain.workshop.dto.response
 * fileName       : WorkshopListResponse
 * author         : note
 * date           : 2026-07-29
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-07-29        note       최초 생성
 */
public record WorkshopListResponse(
        Long id,
        HUser hUser,
        String name,
        String description,
        Address address,
        boolean isApproved,
        boolean isOpen
) {
    public WorkshopListResponse(HWorkshop hWorkshop) {
        this(
          hWorkshop.getId(),
          hWorkshop.getHost(), hWorkshop.getName(), hWorkshop.getDescription(),
          hWorkshop.getAddress(),
          hWorkshop.isApproved(), hWorkshop.isOpen()
        );
    }
}
