// 등록된 카드 스키마
export interface PaymentMethodItem {
    id: string;
    cardName: string; // 예: 현대카드, 신한카드
    cardNumberMasked: string; // 예: **** **** **** 1234
    cardType: 'CREDIT' | 'CHECK';
    brand: 'VISA' | 'MASTER' | 'UNIONPAY' | 'LOCAL';
    isDefault: boolean;
    theme: 'violet' | 'slate' | 'rose' | 'emerald'; // 카드 UI용 테마 색상
}

// 결제 내역 스키마
export interface PaymentHistoryItem {
    id: string;
    transactionId: string;
    productName: string;
    amount: number;
    transactionDate: string;
    status: 'COMPLETED' | 'REFUNDED' | 'PARTIAL_REFUND';
    paymentMethodId: string; // 어떤 카드로 결제했는지 참조
}

export const MOCK_PAYMENT_METHODS: PaymentMethodItem[] = [
    {
        id: 'pm-001',
        cardName: '현대카드 M3',
        cardNumberMasked: '**** **** **** 8821',
        cardType: 'CREDIT',
        brand: 'VISA',
        isDefault: true,
        theme: 'violet'
    },
    {
        id: 'pm-002',
        cardName: '신한 Deep Dream',
        cardNumberMasked: '**** **** **** 0495',
        cardType: 'CHECK',
        brand: 'MASTER',
        isDefault: false,
        theme: 'slate'
    },
    {
        id: 'pm-003',
        cardName: '카카오뱅크 프렌즈',
        cardNumberMasked: '**** **** **** 3311',
        cardType: 'CHECK',
        brand: 'LOCAL',
        isDefault: false,
        theme: 'rose'
    }
];

export const MOCK_PAYMENT_HISTORY: PaymentHistoryItem[] = [
    {
        id: 'ph-001',
        transactionId: 'TX-20260405-998',
        productName: '[서촌] 감성 터지는 한옥 은반지 클래스',
        amount: 55000,
        transactionDate: '2026. 04. 05 14:30',
        status: 'COMPLETED',
        paymentMethodId: 'pm-001'
    },
    {
        id: 'ph-002',
        transactionId: 'TX-20260321-102',
        productName: '[강남] 나만의 수제 향수 만들기',
        amount: 45000,
        transactionDate: '2026. 03. 21 11:15',
        status: 'REFUNDED',
        paymentMethodId: 'pm-002'
    },
    {
        id: 'ph-003',
        transactionId: 'TX-20260310-505',
        productName: '천연 가죽 여권 케이스 제작',
        amount: 85000,
        transactionDate: '2026. 03. 10 18:20',
        status: 'COMPLETED',
        paymentMethodId: 'pm-001'
    },
    {
        id: 'ph-004',
        transactionId: 'TX-20260214-777',
        productName: '[성수] 레진아트 키링 만들기 원데이',
        amount: 35000,
        transactionDate: '2026. 02. 14 15:00',
        status: 'PARTIAL_REFUND',
        paymentMethodId: 'pm-003'
    }
];
