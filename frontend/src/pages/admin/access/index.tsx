import React, { useState, useEffect } from 'react';
import { RotateCw, Search } from 'lucide-react';
import AdminTable from '@/components/common/AdminTable';
import api from '@/api';
import { PageResponseDto, PageRequestDto, BaseResponse } from '@/types/common';

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
            const response = await api.get<BaseResponse<PageResponseDto<UserAccessLogList>>>('/api/admin/user-access/page', { params });
            const data = response.data.data;
            setLogs(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.pageNumber);
        } catch (error) {
            console.error('Failed to fetch access logs', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchLogs();
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        접속 이력 관리
                        <span className="text-sm font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                            시스템 로그
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 font-medium">사용자의 로그인 및 서비스 접근 이력을 확인합니다.</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        onClick={handleRefresh}
                        className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-violet-600 transition-all shadow-sm active:scale-95"
                        title="새로고침"
                    >
                        <RotateCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <div className="relative group flex-1 md:flex-none">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="사용자 검색..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full md:w-64 pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-none text-sm font-bold shadow-sm"
                        />
                    </div>
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
