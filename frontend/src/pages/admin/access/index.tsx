import React, { useState, useEffect } from 'react';
import AdminTable from '@/components/common/AdminTable';
import api from '@/api';
import { PageResponseDto, PageRequestDto } from '@/types/common';

interface UserAccessLogList {
    id: number;
    userId: number;
    userName: string;
    userEmail: string;
    ipAddress: string;
    userAgent: string;
    loginAt: string;
}

const AccessLog: React.FC = () => {
    const [logs, setLogs] = useState<UserAccessLogList[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const params: PageRequestDto = {
                page: currentPage,
                size: pageSize,
                search: search || undefined
            };
            const response = await api.get<PageResponseDto<UserAccessLogList>>('/api/admin/user-access/page', { params });
            const data = response.data;
            setLogs(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.pageNumber);
        } catch (error) {
            console.error('Failed to fetch access logs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [currentPage, pageSize, search]);

    const columns = [
        { header: '시간', key: 'loginAt', render: (log: UserAccessLogList) => <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{new Date(log.loginAt).toLocaleString()}</span> },
        {
            header: '사용자 정보',
            key: 'userName',
            render: (log: UserAccessLogList) => (
                <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{log.userName || `ID: ${log.userId}`}</span>
                    <span className="text-xs text-slate-500">{log.userEmail || '-'}</span>
                </div>
            )
        },
        { header: 'IP 주소', key: 'ipAddress', render: (log: UserAccessLogList) => <span className="text-sm font-medium text-slate-500">{log.ipAddress}</span> },
        { header: '접속 환경', key: 'userAgent', render: (log: UserAccessLogList) => <span className="text-sm font-medium text-slate-400 max-w-xs truncate block" title={log.userAgent}>{log.userAgent}</span> },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">접속 이력 관리</h1>
                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="검색어 입력..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1); // Reset page on search
                        }}
                        className="px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-sm outline-none focus:border-violet-500 text-slate-900 dark:text-white"
                    />
                    <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap">
                        로그 내보내기 (CSV)
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-400 font-medium">로딩 중...</div>
            ) : (
                <AdminTable
                    columns={columns}
                    data={logs}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setCurrentPage(1); // Reset page on size change
                    }}
                />
            )}
        </div>
    );
};

export default AccessLog;
