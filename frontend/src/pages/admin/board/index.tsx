import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCw, ClipboardList, CheckCircle2, XCircle, Trash2, Edit2, Eye } from 'lucide-react';
import AdminTable from '@/components/common/AdminTable';
import { adminService } from '@/api/admin';
import { BoardListResponse, SearchBoardRequest } from '@/types/board';
import BoardCreateModal from './components/BoardCreateModal';
import BoardEditModal from './components/BoardEditModal';
import { useLanguage } from '@/hooks/LanguageContext';

const BoardManagement: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    // 1. 상태 관리
    const [boards, setBoards] = useState<BoardListResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedSearch, setAppliedSearch] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState<BoardListResponse | null>(null);

    // 2. 데이터 페칭 로직
    const fetchBoards = async () => {
        setLoading(true);
        try {
            const params: SearchBoardRequest = {
                page: currentPage,
                size: pageSize,
                search: appliedSearch || undefined
            };

            const data = await adminService.findBoardPage(params);
            const { content, totalPages, totalElements, pageNumber } = data;

            setBoards(content);
            setTotalPages(totalPages);
            setTotalElements(totalElements);
            setCurrentPage(pageNumber);
        } catch (error) {
            console.error('Failed to fetch boards:', error);
        } finally {
            setLoading(false);
        }
    };

    // 3. Effect: 페이지, 사이즈, 검색어 변경 시 호출
    useEffect(() => {
        fetchBoards();
    }, [currentPage, pageSize, appliedSearch]);

    // 4. 이벤트 핸들러
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setAppliedSearch(searchQuery);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        fetchBoards();
    };

    // 5. 테이블 컬럼 정의
    const columns = [
        {
            header: 'ID',
            key: 'id',
            render: (board: BoardListResponse) => (
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">#{board.id}</span>
            )
        },
        {
            header: t('admin.board.code'),
            key: 'boardCode',
            render: (board: BoardListResponse) => (
                <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{board.boardCode}</span>
                    <span className="text-[10px] font-medium text-slate-400">{board.boardCodeDescription}</span>
                </div>
            )
        },
        {
            header: t('admin.board.name'),
            key: 'name',
            render: (board: BoardListResponse) => (
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{board.name}</span>
            )
        },
        {
            header: t('common.labels.status'),
            key: 'status',
            render: (board: BoardListResponse) => (
                <div className="flex gap-2">
                    {/* 사용 여부 */}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 ${board.isUsed ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                        {board.isUsed ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                        {board.isUsed ? 'ACTIVE' : 'INACTIVE'}
                    </span>

                    {/* 삭제 여부 */}
                    {board.isDeleted && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-600 dark:bg-rose-900/30 flex items-center gap-1">
                            <Trash2 size={10} /> DELETED
                        </span>
                    )}
                </div>
            )
        },
        {
            header: t('common.labels.actions'),
            key: 'actions',
            align: 'right' as const,
            render: (board: BoardListResponse) => (
                <div className="flex justify-end gap-2">
                    <button 
                        onClick={() => {
                            setSelectedBoard(board);
                            setIsEditModalOpen(true);
                        }}
                        className="text-slate-400 hover:text-emerald-600 transition-colors font-black text-xs px-3 py-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg flex items-center gap-1"
                    >
                        <Edit2 size={12} />
                        {t('common.buttons.edit')}
                    </button>
                    <button 
                        onClick={() => navigate(`/admin/post?boardId=${board.id}`, { state: { boardName: board.name } })}
                        className="text-slate-400 hover:text-violet-600 transition-colors font-black text-xs p-2 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg flex items-center justify-center"
                        title={t('admin.board.viewPosts')}
                    >
                        <Eye size={14} />
                    </button>
                </div>
            )
        },
    ];

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        {t('admin.board.title')}
                        <span className="text-sm font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                            {t('common.labels.totalCount', { count: totalElements })}
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 font-medium">{t('admin.board.manageDesc')}</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        onClick={handleRefresh}
                        className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-violet-600 transition-all shadow-sm active:scale-95"
                        title={t('common.buttons.refresh')}
                    >
                        <RotateCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-black transition-all shadow-lg shadow-violet-200 dark:shadow-none active:scale-95 text-sm"
                    >
                        <ClipboardList size={18} />
                        {t('admin.board.create')}
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="mb-6">
                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder={t('admin.board.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-none text-sm font-bold shadow-sm"
                    />
                    {searchQuery !== appliedSearch && (
                        <span className="absolute ml-3 text-[10px] font-black text-amber-500 animate-pulse">
                            {t('common.labels.pressEnterToSearch')}
                        </span>
                    )}
                </form>
            </div>

            {/* Table Section */}
            <div className={loading ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
                <AdminTable
                    columns={columns}
                    data={boards}
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

            {/* Creation Modal */}
            <BoardCreateModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onSuccess={fetchBoards}
            />

            {/* Edit Modal */}
            <BoardEditModal 
                isOpen={isEditModalOpen} 
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedBoard(null);
                }} 
                onSuccess={fetchBoards}
                board={selectedBoard}
            />
        </div>
    );
};

export default BoardManagement;
