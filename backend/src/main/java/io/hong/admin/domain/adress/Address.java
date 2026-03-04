package io.hong.admin.domain.adress;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * packageName    : io.hong.admin.domain.adress
 * fileName       : Address
 * author         : home
 * date           : 2026-03-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {

    @Column(nullable = false)
    private String city;        // 시 (예: 서울특별시, 경기도)

    @Column(nullable = false)
    private String district;    // 구/군 (예: 강남구, 용인시 수지구)

    @Column(nullable = false)
    private String neighborhood; // 동/읍/면 (예: 역삼동, 풍덕천동)

    private String detail;      // 상세 주소 (예: 홍길동 빌딩 3층)

    private String zipcode;    // 우편번호

    @Builder
    public Address(String city, String district, String neighborhood, String detail, String zipcode) {
        this.city = city;
        this.district = district;
        this.neighborhood = neighborhood;
        this.detail = detail;
        this.zipcode = zipcode;
    }
}
