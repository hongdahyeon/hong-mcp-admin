import { Workshop } from '@/types/workshop';

export const REGIONS = ['서울', '경기/인천', '부산/경상', '제주/강원'];
export const CATEGORIES = ['공예', '도예', '목공', '미술', '향수/캔들', '음악', '요리'];

export const MOCK_WORKSHOPS: Workshop[] = [
    { 
        id: '1', 
        title: '서촌 한옥에서 즐기는 전통 자수 클래스', 
        region: '서울', 
        category: '공예', 
        price: '45,000', 
        rating: 4.9, 
        reviews: 124, 
        instructor: '김연우 명인', 
        imageUrl: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=400&h=300&auto=format&fit=crop',
        description: '30년 경력의 명인과 함께 고즈넉한 한옥에서 우리 전통 자수의 아름다움을 느껴보세요. 기초 한땀부터 정교한 도안까지 차근차근 배울 수 있습니다.',
        curriculum: ['기초 실 꿰기 및 매듭법', '직선과 곡선 표현하기', '꽃잎 도안 자수 놓기', '마무리 및 소품 제작'],
        instructorBio: '국가 무형문화재 전수교육조교 역임. 전통 자수의 현대적 해석을 연구하는 자수 예술가입니다.'
    },
    { 
        id: '2', 
        title: '망원동 감성 가득한 세라믹 페인팅', 
        region: '서울', 
        category: '도예', 
        price: '38,000', 
        rating: 4.8, 
        reviews: 89, 
        instructor: '스튜디오 소담', 
        imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&h=300&auto=format&fit=crop',
        description: '세상에 단 하나뿐인 나만의 그릇을 만들어보세요. 다양한 패턴과 색감을 활용해 평범한 세라믹에 생동감을 불어넣는 힐링 클래스입니다.',
        curriculum: ['세라믹 페인팅 기초 이론', '스케치 및 도안 구성', '채색 기법 실습', '가마 소성 및 마무리'],
        instructorBio: '일상의 소중함을 빚는 도예 스튜디오입니다. 누구나 쉽게 즐길 수 있는 도자 예술을 지향합니다.'
    },
    { 
        id: '3', 
        title: '판교 숲속 공방 목공 입문 클래스', 
        region: '경기/인천', 
        category: '목공', 
        price: '65,000', 
        rating: 4.7, 
        reviews: 56, 
        instructor: '우든 핸즈', 
        imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=400&h=300&auto=format&fit=crop',
        description: '도심 속 숲속 공방에서 나무의 숨결을 느끼며나만의 가구를 만들어보세요. 초보자도 안심하고 사용할 수 있는 도구 사용법부터 알려드립니다.',
        curriculum: ['목재의 종류와 특성 이해', '수공구 및 전동공구 사용법', '결합 방식(조인트) 실습', '오일 마감 및 완성'],
        instructorBio: '나무와 함께하는 삶을 꿈꾸는 목공 작가 그룹입니다. 자연 친화적인 가구 제작을 고집합니다.'
    },
    { 
        id: '4', 
        title: '송도 센트럴파크 야경 유화 그리기', 
        region: '경기/인천', 
        category: '미술', 
        price: '42,000', 
        rating: 4.9, 
        reviews: 210, 
        instructor: '그리다 예술원', 
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&h=300&auto=format&fit=crop',
        description: '화려한 송도의 야경을 캔버스 위에 담아보세요. 유화 특유의 질감과 색채를 활용해 깊이 있는 야경 표현법을 배우는 시간입니다.',
        curriculum: ['유화 재료의 이해', '야경 색채 배합법', '레이어링 기법 실습', '하이라이트 표현 및 마무리'],
        instructorBio: '정통 유화를 기반으로 현대적인 감각을 더한 미술 교육 기관입니다.'
    },
    { 
        id: '5', 
        title: '해운대 바다를 닮은 레진 아트 클래스', 
        region: '부산/경상', 
        category: '공예', 
        price: '50,000', 
        rating: 4.6, 
        reviews: 45, 
        instructor: '부산 바다 공방', 
        imageUrl: 'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?q=80&w=400&h=300&auto=format&fit=crop',
        description: '해운대의 푸른 바다를 작은 프레임 안에 가두어보세요. 투명한 레진과 파도 표현 기법을 통해 바다 감성 소품을 제작합니다.',
        curriculum: ['레진 아트 기초 및 주의사항', '조색제 활용법', '파도 무늬 표현(Cell) 기법', '코팅 및 완성'],
        instructorBio: '바다의 아름다움을 예술로 승화시키는 부산 로컬 공방입니다.'
    },
    { 
        id: '6', 
        title: '애월 바다 담은 감성 캔들 만들기', 
        region: '제주/강원', 
        category: '향수/캔들', 
        price: '35,000', 
        rating: 5.0, 
        reviews: 32, 
        instructor: '제주 향기', 
        imageUrl: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=400&h=300&auto=format&fit=crop',
        description: '제주의 짙은 향기를 담은 감성 캔들을 제작합니다. 천연 왁스와 제주 야생화 드라이플라워를 활용한 캔들 메이킹 클래스입니다.',
        curriculum: ['왁스의 종류와 향료 선택', '심지 고정 및 왁스 녹이기', '드라이플라워 데코레이션', '포장 및 관리법'],
        instructorBio: '제주의 자연에서 영감을 받아 향기를 빚는 향기 디자이너입니다.'
    },
];
