import React, { useState, useEffect } from 'react';
import { Search, RotateCw, MapPin, Shield, CheckCircle, XCircle, Eye, EyeOff, Info } from 'lucide-react';
import AdminTable from '@/components/common/AdminTable';
import { adminService } from '@/api/admin';
import { WorkshopListResponse, SearchWorkshopRequest } from '@/types/workshop';

const WorkplaceManagement: React.FC = () => {
    // 1. State Management
    const [workplaces, setWorkplaces] = useState<WorkshopListResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedSearch, setAppliedSearch] = useState('');
    const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopListResponse | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // 2. Fetch Data from API
    const fetchWorkplaces = async () => {
        setLoading(true);
        try {
            const params: SearchWorkshopRequest = {
                page: currentPage,
                size: pageSize,
                search: appliedSearch || undefined
            };

            const data = await adminService.findWorkshopPage(params);
            const { content, totalPages, totalElements, pageNumber } = data;

            setWorkplaces(content || []);
            setTotalPages(totalPages || 1);
            setTotalElements(totalElements || 0);
            setCurrentPage(pageNumber || 1);
        } catch (error) {
            console.error('Failed to fetch workshops:', error);
        } finally {
            setLoading(false);
        }
    };

    // 3. Effect: Trigger fetch when page size, current page, or search changes
    useEffect(() => {
        fetchWorkplaces();
    }, [currentPage, pageSize, appliedSearch]);

    // 4. Handlers
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setAppliedSearch(searchQuery);
        setCurrentPage(1); // Reset to page 1 on new search
    };

    const handleRefresh = () => {
        fetchWorkplaces();
    };

    const handleOpenDetail = (workshop: WorkshopListResponse) => {
        setSelectedWorkshop(workshop);
        setIsDetailOpen(true);
    };

    // Helper: format address string
    const formatAddressShort = (address: any) => {
        if (!address) return '-';
        return `${address.city} ${address.district}`;
    };

    // 5. Columns Configuration for AdminTable
    const columns = [
        {
            header: 'ID',
            key: 'id',
            render: (wp: WorkshopListResponse) => (
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">#{wp.id}</span>
            )
        },
        {
            header: '공방 정보',
            key: 'name',
            render: (wp: WorkshopListResponse) => (
                <div className="flex flex-col max-w-[240px]">
                    <span className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{wp.name}</span>
                    <span className="text-xs font-medium text-slate-400 line-clamp-1">{wp.description || '설명이 없습니다.'}</span>
                </div>
            )
        },
        {
            header: '호스트',
            key: 'host',
            render: (wp: WorkshopListResponse) => (
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{wp.hUser?.username || '-'}</span>
                    <span className="text-xs font-medium text-slate-400">{wp.hUser?.email || '-'}</span>
                </div>
            )
        },
        {
            header: '지역',
            key: 'address',
            render: (wp: WorkshopListResponse) => (
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-sm font-medium">{formatAddressShort(wp.address)}</span>
                </div>
            )
        },
        {
            header: '승인 상태',
            key: 'isApproved',
            render: (wp: WorkshopListResponse) => (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${wp.isApproved ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                    {wp.isApproved ? 'APPROVED' : 'PENDING'}
                </span>
            )
        },
        {
            header: '공개 여부',
            key: 'isOpen',
            render: (wp: WorkshopListResponse) => (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${wp.isOpen ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'}`}>
                    {wp.isOpen ? 'OPEN' : 'CLOSED'}
                </span>
            )
        },
        {
            header: '관리',
            key: 'actions',
            align: 'right' as const,
            render: (wp: WorkshopListResponse) => (
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => handleOpenDetail(wp)}
                        className="text-violet-600 hover:text-violet-700 font-black text-xs hover:underline flex items-center gap-1"
                    >
                        <Info size={14} /> 상세
                    </button>
                </div>
            )
        },
    ];

    // Stats config
    const stats = [
        { label: '전체 공방', value: totalElements.toLocaleString(), color: 'text-violet-600' },
        { label: '승인 대기 (현재 페이지)', value: workplaces.filter(w => !w.isApproved).length.toString(), color: 'text-amber-600' },
        { label: '공개 공방 (현재 페이지)', value: workplaces.filter(w => w.isOpen).length.toString(), color: 'text-emerald-600' },
        { label: '비공개 공방 (현재 페이지)', value: workplaces.filter(w => !w.isOpen).length.toString(), color: 'text-slate-500' },
    ];

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        공방 관리
                        <span className="text-sm font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                            전체 {totalElements}개
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 font-medium">공방 신청 내역과 활성화된 공방 상태를 모니터링합니다.</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        onClick={handleRefresh}
                        className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-violet-600 transition-all shadow-sm active:scale-95"
                        title="새로고침"
                    >
                        <RotateCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filter Section */}
            <div className="mb-6">
                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="공방명으로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-none text-sm font-bold shadow-sm"
                    />
                    {searchQuery !== appliedSearch && (
                        <span className="absolute ml-3 text-[10px] font-black text-amber-500 animate-pulse self-center">
                            Enter를 눌러 검색
                        </span>
                    )}
                </form>
            </div>

            {/* Table Section */}
            <div className={loading ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
                <AdminTable
                    columns={columns}
                    data={workplaces}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {/* todo: Workshop Detail Modal */}
        </div>
    );
};

export default WorkplaceManagement;
