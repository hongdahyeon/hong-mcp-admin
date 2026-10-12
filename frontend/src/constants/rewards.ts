// 쿠폰 스키마
export interface CouponItem {
    id: string;
    name: string;
    discountType: 'PERCENT' | 'AMOUNT';
    discountValue: number;
    minOrderAmount: number;
    validUntil: string;
    status: 'AVAILABLE' | 'USED' | 'EXPIRED';
}

// 포인트 스키마
export interface PointSummary {
    totalPoints: number;
    expiringThisMonth: number;
}

export interface PointHistoryItem {
    id: string;
    date: string;
    title: string;
    type: 'EARN' | 'USE' | 'EXPIRE';
    amount: number;
    balance: number;
}

// Mock 데이터
export const MOCK_POINT_SUMMARY: PointSummary = {
    totalPoints: 12500,
    expiringThisMonth: 1500
};

export const MOCK_COUPONS: CouponItem[] = [
    {
        id: 'cp-1001',
        name: '가입 환영 웰컴 쿠폰',
        discountType: 'AMOUNT',
        discountValue: 10000,
        minOrderAmount: 30000,
        validUntil: '2026-12-31',
        status: 'AVAILABLE'
    },
    {
        id: 'cp-1002',
        name: '봄맞이 얼리버드 공예 클래스 한정할인',
        discountType: 'PERCENT',
        discountValue: 15,
        minOrderAmount: 0,
        validUntil: '2026-04-30',
        status: 'AVAILABLE'
    },
    {
        id: 'cp-1003',
        name: '첫 리뷰 인증 감사 쿠폰',
        discountType: 'AMOUNT',
        discountValue: 5000,
        minOrderAmount: 20000,
        validUntil: '2026-05-15',
        status: 'AVAILABLE'
    },
    {
        id: 'cp-1004',
        name: 'VIP 전환 특별 혜택',
        discountType: 'PERCENT',
        discountValue: 30,
        minOrderAmount: 100000,
        validUntil: '2026-01-01',
        status: 'USED'
    }
];

export const MOCK_POINT_HISTORY: PointHistoryItem[] = [
    {
        id: 'ph-2001',
        date: '2026. 04. 05',
        title: '포토리뷰 작성 리워드 적립',
        type: 'EARN',
        amount: 2000,
        balance: 12500
    },
    {
        id: 'ph-2002',
        date: '2026. 03. 28',
        title: '[서촌 한옥 자수 클래스] 예약 결제 시 사용',
        type: 'USE',
        amount: -5000,
        balance: 10500
    },
    {
        id: 'ph-2003',
        date: '2026. 03. 25',
        title: '[서촌 한옥 자수 클래스] 결제 리워드 적립 (3%)',
        type: 'EARN',
        amount: 1350,
        balance: 15500
    },
    {
        id: 'ph-2004',
        date: '2026. 02. 28',
        title: '기간 만료 포인트 소멸',
        type: 'EXPIRE',
        amount: -800,
        balance: 14150
    },
    {
        id: 'ph-2005',
        date: '2026. 01. 10',
        title: '신규 회원가입 축하 포인트',
        type: 'EARN',
        amount: 5000,
        balance: 5000
    }
];
