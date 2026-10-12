export interface ReviewComment {
    id: string;
    userName: string;
    content: string;
    createdAt: string;
}

export interface ReviewPrideItem {
    id: string;
    workshopId: string;
    workshopTitle: string;
    authorName: string;
    authorImage?: string;
    rating: number;
    content: string;
    images: string[];
    likes: number;
    comments: ReviewComment[];
    category: string;
    createdAt: string;
    isBest?: boolean;
}

export const MOCK_REVIEWS: ReviewPrideItem[] = [
    {
        id: 'rev-1',
        workshopId: 'ws-1',
        workshopTitle: '성수동 감성 도자기 물레 체험',
        authorName: '도자기장인',
        authorImage: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?q=80&w=100&h=100&auto=format&fit=crop',
        rating: 5,
        content: '처음 해보는 물레 체험이었는데 너무 재밌었어요! 선생님이 친절하게 가르쳐주셔서 예쁜 그릇 만들었습니다. 성수동 데이트 코스로 강추해요!',
        images: [
            'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=1000&auto=format&fit=crop'
        ],
        likes: 124,
        category: '도예',
        createdAt: '2026-03-25',
        isBest: true,
        comments: [
            { id: 'c-1', userName: '핸드메이드러버', content: '우와 너무 예뻐요! 저도 가보고 싶네요.', createdAt: '2026-03-25' }
        ]
    },
    {
        id: 'rev-2',
        workshopId: 'ws-2',
        workshopTitle: '나만의 시그니처 향수 만들기',
        authorName: '향기로운하루',
        rating: 4.5,
        content: '내 취향에 딱 맞는 향수를 찾았어요. 다양한 베이스 노트를 시향해보고 직접 블렌딩하는 과정이 정말 힐링됐습니다.',
        images: [
            'https://images.unsplash.com/photo-1616948055599-96791e2b323a?q=80&w=1000&auto=format&fit=crop'
        ],
        likes: 85,
        category: '조향',
        createdAt: '2026-03-27',
        isBest: true,
        comments: []
    },
    {
        id: 'rev-3',
        workshopId: 'ws-3',
        workshopTitle: '프랑스 자수 원데이 클래스',
        authorName: '바늘꽃',
        rating: 5,
        content: '시간 가는 줄 모르고 집중해서 수놓았네요. 결과물도 너무 만족스럽고 에코백에 수놓으니 정말 특별해요.',
        images: [
            'https://images.unsplash.com/photo-1517260911058-0fcfd733702f?q=80&w=1000&auto=format&fit=crop'
        ],
        likes: 210,
        category: '자수',
        createdAt: '2026-03-28',
        isBest: true,
        comments: []
    },
    {
        id: 'rev-4',
        workshopId: 'ws-4',
        workshopTitle: '빈티지 가죽 카드지갑 만들기',
        authorName: '레더매니아',
        rating: 4,
        content: '가죽 질감이 너무 좋네요. 바느질하는 게 조금 힘들었지만 완성하고 나니 뿌듯합니다.',
        images: [
            'https://images.unsplash.com/photo-1624380570354-8ca376097726?q=80&w=1000&auto=format&fit=crop'
        ],
        likes: 42,
        category: '가죽공예',
        createdAt: '2026-03-29',
        comments: []
    }
];
