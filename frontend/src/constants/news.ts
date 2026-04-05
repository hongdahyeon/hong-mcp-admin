export interface WorkshopNewsItem {
    id: string;
    title: string;
    summary: string;
    content: string;
    category: '이벤트' | '신규 오픈' | '클래스 소식' | '공지사항';
    author: string;
    thumbnail: string;
    date: string;
    viewCount: number;
    isFeatured?: boolean;
}

export const MOCK_NEWS: WorkshopNewsItem[] = [
    {
        id: 'news-1',
        category: '이벤트',
        title: '봄맞이 자수 클래스 20% 특별 할인',
        summary: '따뜻한 봄을 맞아 4월 한 달간 모든 자수 클래스 수강료를 20% 할인합니다.',
        content: `안녕하세요! 김연우 명인의 서촌 한옥 전통 자수 클래스입니다.

꽃 피는 봄을 맞이하여, 저희 워크숍을 아껴주시는 모든 분들을 위해 아주 특별한 봄맞이 이벤트를 준비했습니다. 
4월 내에 예약하시는 모든 분들께 수강료 20% 할인 혜택을 드립니다.

- 기간: 2026. 4. 1 - 2026. 4. 30 (예약일 기준)
- 대상: 모든 정규 및 원데이 클래스 수강생
- 적용 방법: 예약 결제 페이지에서 자동 할인 적용

따뜻한 햇살 아래, 고즈넉한 한옥에서 차 한 잔과 함께 나만의 아름다운 작품을 수놓아보세요. 여러분의 많은 관심과 참여를 기다립니다!`,
        author: '김연우 명인',
        thumbnail: 'https://picsum.photos/seed/craft1/800/600',
        date: '2026. 04. 01',
        viewCount: 1042,
        isFeatured: true
    },
    {
        id: 'news-2',
        category: '신규 오픈',
        title: '나만의 시그니처 봄 향수 원데이 클래스 오픈',
        summary: '향기로운하루에서 다가오는 봄에 딱 맞는 새로운 향수 블렌딩 클래스를 선보입니다.',
        content: `새로운 계절, 봄에 어울리는 싱그러운 향기를 찾아보세요. 향기로운 하루 기획 클래스! 나만의 취향이 담긴 퍼스널 향수를 디렉터와 함께 찾아가는 특별한 클래스입니다.`,
        author: '향기로운하루',
        thumbnail: 'https://picsum.photos/seed/perfume/800/600',
        date: '2026. 04. 03',
        viewCount: 541
    },
    {
        id: 'news-3',
        category: '클래스 소식',
        title: '물레 클래스 흙 페이스트 리뉴얼 안내',
        summary: '더욱 부드럽고 다루기 쉬운 고급 흙 페이스트로 물레 클래스 재료가 전면 교체되었습니다.',
        content: `부드러운 질감을 원하시던 수강생분들의 피드백을 수렴하여 최고급 재료로 리뉴얼하였습니다. 더 아름다운 도자기를 빚어보세요.`,
        author: '스튜디오 소담',
        thumbnail: 'https://picsum.photos/seed/pottery/800/600',
        date: '2026. 03. 28',
        viewCount: 320
    },
    {
        id: 'news-4',
        category: '공지사항',
        title: '망원동 공방 오프라인 주차장 이용 안내',
        summary: '공방 방문 시 건물 뒤편 무료 주차장 이용이 가능하게 되었습니다.',
        content: `주차 불편을 겪으셨던 분들을 위해 공방 전용 주차공간 3대를 확보했습니다. 클래스 예약 시 차량 방문 여부를 메모해주시면 쾌적하게 이용 가능합니다.`,
        author: '레더매니아',
        thumbnail: 'https://picsum.photos/seed/parking/800/600',
        date: '2026. 03. 20',
        viewCount: 89
    }
];
