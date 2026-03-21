import React from 'react';
import AdminTable from '@/components/common/AdminTable';

const PaymentManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const totalPages = 4;

    const samplePayments = [
        { id: 1, orderId: 'ORD-20240313-001', user: 'user1@gmail.com', items: '성수동 가죽공방 - 명함지갑', amount: '45,000원', method: '신용카드', status: 'COMPLETED', time: '2024-03-13 15:20' },
        { id: 2, orderId: 'ORD-20240313-002', user: 'user2@daum.net', items: '강남역 향수 만들기 클래스', amount: '68,000원', method: '카카오페이', status: 'REFUNDED', time: '2024-03-13 16:45' },
        { id: 3, orderId: 'ORD-20240313-003', user: 'user3@naver.com', items: '연남동 도자기 기초 4주', amount: '180,000원', method: '가상계좌', status: 'WAITING', time: '2024-03-13 17:10' },
        { id: 4, orderId: 'ORD-20240313-004', user: 'user4@gmail.com', items: '드로잉 카페 2인 패키지', amount: '32,000원', method: '신용카드', status: 'COMPLETED', time: '2024-03-13 18:05' },
    ];

    const columns = [
        { header: '주문번호', key: 'orderId', render: (p: any) => <span className="text-sm font-bold text-slate-500 whitespace-nowrap">{p.orderId}</span> },
        { header: '사용자', key: 'user', render: (p: any) => <span className="text-sm font-black text-slate-900 dark:text-white">{p.user}</span> },
        { header: '상품명', key: 'items', render: (p: any) => <span className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1">{p.items}</span> },
        { header: '결제금액', key: 'amount', render: (p: any) => <span className="text-sm font-black text-violet-600 dark:text-violet-400">{p.amount}</span> },
        { header: '결제수단', key: 'method', render: (p: any) => <span className="text-sm font-medium text-slate-500">{p.method}</span> },
        {
            header: '상태',
            key: 'status',
            render: (p: any) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-black ${p.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    p.status === 'REFUNDED' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                        'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                    {p.status}
                </span>
            )
        },
        { header: '일시', key: 'time', render: (p: any) => <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{p.time}</span> },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">결제 정보 관리</h1>
                <div className="flex gap-4 items-center">
                    <span className="text-sm font-bold text-slate-500">오늘 매출: <span className="text-violet-600 text-lg font-black">₩325,000</span></span>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                        정산 리포트 생성
                    </button>
                </div>
            </div>

            <AdminTable
                columns={columns}
                data={samplePayments}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
};

export default PaymentManagement;
