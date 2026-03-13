import React from 'react';
import AdminTable from '@/components/common/AdminTable';

const AccessLog: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const totalPages = 10;

    const sampleLogs = [
        { id: 1, user: 'admin@craftday.com', action: 'LOGIN', ip: '192.168.0.1', device: 'Windows / Chrome', time: '2024-03-13 18:30:45' },
        { id: 2, user: 'user1@gmail.com', action: 'RESOURCE_ACCESS', detail: '/api/v1/workshops', ip: '1.2.3.4', device: 'iPhone / Safari', time: '2024-03-13 18:25:21' },
        { id: 3, user: 'host1@naver.com', action: 'WORKSHOP_UPDATE', detail: 'ID: 104', ip: '210.10.20.30', device: 'MacBook / Edge', time: '2024-03-13 18:15:10' },
        { id: 4, user: 'admin@craftday.com', action: 'USER_BLOCK', detail: 'ID: 882', ip: '192.168.0.1', device: 'Windows / Chrome', time: '2024-03-13 17:50:00' },
    ];

    const columns = [
        { header: '시간', key: 'time', render: (log: any) => <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{log.time}</span> },
        { header: '사용자', key: 'user', render: (log: any) => <span className="text-sm font-black text-slate-900 dark:text-white">{log.user}</span> },
        {
            header: '활동',
            key: 'action',
            render: (log: any) => (
                <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-tight ${log.action === 'LOGIN' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    log.action === 'USER_BLOCK' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                    {log.action}
                </span>
            )
        },
        { header: '상세 내용', key: 'detail', render: (log: any) => <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{log.detail || '-'}</span> },
        { header: 'IP 주소', key: 'ip', render: (log: any) => <span className="text-sm font-medium text-slate-500">{log.ip}</span> },
        { header: '접속 환경', key: 'device', render: (log: any) => <span className="text-sm font-medium text-slate-400">{log.device}</span> },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">접속 이력 관리</h1>
                <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    로그 내보내기 (CSV)
                </button>
            </div>

            <AdminTable
                columns={columns}
                data={sampleLogs}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
};

export default AccessLog;
