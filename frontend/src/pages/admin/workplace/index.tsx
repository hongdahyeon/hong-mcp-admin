import React from 'react';
import AdminTable from '@/components/common/AdminTable';

const WorkplaceManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const totalPages = 5;

    const sampleWorkplaces = [
        { id: 1, name: '성수동 가죽공방', host: '김작가', category: '가죽 공예', status: 'APPROVED', date: '2024-03-10' },
        { id: 2, name: '연남동 도자기 클래스', host: '이선생', category: '도자 공예', status: 'PENDING', date: '2024-03-12' },
        { id: 3, name: '강남역 향수 만들기', host: '박조향', category: '향수/캔들', status: 'APPROVED', date: '2024-03-08' },
        { id: 4, name: '한남동 드로잉 카페', host: '최화백', category: '미술/회화', status: 'REJECTED', date: '2024-03-11' },
    ];

    const columns = [
        { header: '공방명', key: 'name', render: (wp: any) => <span className="text-sm font-black text-slate-900 dark:text-white">{wp.name}</span> },
        { header: '호스트', key: 'host', render: (wp: any) => <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{wp.host}</span> },
        { header: '카테고리', key: 'category', render: (wp: any) => <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{wp.category}</span> },
        {
            header: '상태',
            key: 'status',
            render: (wp: any) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-black ${wp.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    wp.status === 'PENDING' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                    {wp.status}
                </span>
            )
        },
        { header: '등록일', key: 'date', render: (wp: any) => <span className="text-sm font-medium text-slate-400">{wp.date}</span> },
        {
            header: '관리',
            key: 'actions',
            align: 'right' as const,
            render: () => (
                <div className="flex justify-end gap-3">
                    <button className="text-violet-600 hover:underline font-black text-xs">상세</button>
                    <button className="text-slate-400 hover:text-rose-600 transition-colors font-black text-xs">삭제</button>
                </div>
            )
        },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">공방 관리</h1>
                <div className="flex gap-2">
                    <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        카테고리 수정
                    </button>
                    <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                        새 공방 승인
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: '전체 공방', value: '1,240', color: 'text-violet-600' },
                    { label: '승인 대기', value: '12', color: 'text-amber-600' },
                    { label: '신규 가동', value: '45', color: 'text-emerald-600' },
                    { label: '신고/정지', value: '3', color: 'text-rose-600' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <AdminTable
                columns={columns}
                data={sampleWorkplaces}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
};

export default WorkplaceManagement;
