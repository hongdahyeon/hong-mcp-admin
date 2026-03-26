import { Workshop } from '@/types/workshop';

export const REGIONS = ['서울', '경기/인천', '부산/경상', '제주/강원'];
export const CATEGORIES = ['공예', '도예', '목공', '미술', '향수/캔들', '음악', '요리'];

export const MOCK_WORKSHOPS: Workshop[] = [
    { id: '1', title: '서촌 한옥에서 즐기는 전통 자수 클래스', region: '서울', category: '공예', price: '45,000', rating: 4.9, reviews: 124, instructor: '김연우 명인', imageUrl: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '2', title: '망원동 감성 가득한 세라믹 페인팅', region: '서울', category: '도예', price: '38,000', rating: 4.8, reviews: 89, instructor: '스튜디오 소담', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '3', title: '판교 숲속 공방 목공 입문 클래스', region: '경기/인천', category: '목공', price: '65,000', rating: 4.7, reviews: 56, instructor: '우든 핸즈', imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '4', title: '송도 센트럴파크 야경 유화 그리기', region: '경기/인천', category: '미술', price: '42,000', rating: 4.9, reviews: 210, instructor: '그리다 예술원', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '5', title: '해운대 바다를 닮은 레진 아트 클래스', region: '부산/경상', category: '공예', price: '50,000', rating: 4.6, reviews: 45, instructor: '부산 바다 공방', imageUrl: 'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '6', title: '애월 바다 담은 감성 캔들 만들기', region: '제주/강원', category: '향수/캔들', price: '35,000', rating: 5.0, reviews: 32, instructor: '제주 향기', imageUrl: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=400&h=300&auto=format&fit=crop' },
];
