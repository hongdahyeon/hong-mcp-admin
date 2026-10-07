import React, { useState, useEffect } from 'react';
import { Search, RotateCw, UserPlus, Shield, Lock, BellOff, Trash2, CheckCircle2 } from 'lucide-react';
import AdminTable from '@/components/common/AdminTable';
import { adminService } from '@/api/admin';
import { UserListResponse, SearchUserRequest } from '@/types/user';
import UserCreateModal from './components/UserCreateModal';

const UserManagement: React.FC = () => {
    // 1. 상태 관리
    const [users, setUsers] = useState<UserListResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedSearch, setAppliedSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. 데이터 페칭 로직
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const params: SearchUserRequest = {
                page: currentPage,
                size: pageSize,
                search: appliedSearch || undefined
            };

            const data = await adminService.findUserPage(params);
            const { content, totalPages, totalElements, pageNumber } = data;

            setUsers(content);
            setTotalPages(totalPages);
            setTotalElements(totalElements);
            setCurrentPage(pageNumber); // 서버 보정값 반영
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    // 3. Effect: 페이지, 사이즈, 검색어 변경 시 호출
    useEffect(() => {
        fetchUsers();
    }, [currentPage, pageSize, appliedSearch]);

    // 4. 이벤트 핸들러
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setAppliedSearch(searchQuery);
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    const handleRefresh = () => {
        fetchUsers();
    };

    const handleToggleFlag = async (user: UserListResponse, type: 'approved' | 'locked' | 'enabled', newValue: boolean) => {
        const actionText = type === 'enabled'
            ? (newValue ? '활성화' : '비활성화')
            : type === 'approved'
                ? (newValue ? '승인' : '미승인')
                : (newValue ? '잠금' : '잠금 해제');

        if (!window.confirm(`${user.username}님의 상태를 ${actionText} 상태로 변경하시겠습니까?`)) {
            return;
        }

        try {
            const message = await adminService.changeUserFlag({
                type,
                value: newValue,
                email: user.email
            });
            alert(message || '상태가 변경되었습니다.');
            fetchUsers();
        } catch (error) {
            console.error('Failed to change user flag:', error);
            alert('상태 변경 중 오류가 발생했습니다.');
        }
    };

    // 5. 테이블 컬럼 정의
    const columns = [
        {
            header: 'ID',
            key: 'id',
            render: (user: UserListResponse) => (
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">#{user.id}</span>
            )
        },
        {
            header: '사용자 정보',
            key: 'userInfo',
            render: (user: UserListResponse) => (
                <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{user.username}</span>
                    <span className="text-xs font-medium text-slate-400">{user.email}</span>
                </div>
            )
        },
        {
            header: '권한',
            key: 'role',
            render: (user: UserListResponse) => (
                <div className="flex items-center gap-1.5">
                    <Shield size={12} className={user.role === 'ROLE_ADMIN' ? 'text-rose-500' : user.role === 'ROLE_HOST' ? 'text-amber-500' : 'text-violet-500'} />
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-tight ${user.role === 'ROLE_ADMIN' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                        user.role === 'ROLE_HOST' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                            'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
                        }`}>
                        {user.role.replace('ROLE_', '')}
                    </span>
                </div>
            )
        },
        {
            header: '상태',
            key: 'status',
            render: (user: UserListResponse) => (
                <div className="flex flex-wrap gap-1.5">
                    {/* 활성화 여부 */}
                    <button
                        onClick={() => handleToggleFlag(user, 'enabled', !user.isEnabled)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-all hover:scale-105 active:scale-95 ${
                            user.isEnabled 
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50' 
                            : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        title={user.isEnabled ? '클릭하여 비활성화' : '클릭하여 활성화'}
                    >
                        {user.isEnabled ? 'ACTIVE' : 'DISABLED'}
                    </button>

                    {/* 승인 여부 */}
                    <button
                        onClick={() => handleToggleFlag(user, 'approved', !user.isApproved)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 transition-all hover:scale-105 active:scale-95 ${
                            user.isApproved
                            ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-900/50'
                            : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50'
                        }`}
                        title={user.isApproved ? '클릭하여 승인 취소(대기 상태로 변경)' : '클릭하여 승인'}
                    >
                        {user.isApproved ? <CheckCircle2 size={10} /> : <BellOff size={10} />}
                        {user.isApproved ? 'APPROVED' : 'PENDING'}
                    </button>

                    {/* 잠금 여부 */}
                    <button
                        onClick={() => handleToggleFlag(user, 'locked', !user.isLocked)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 transition-all hover:scale-105 active:scale-95 ${
                            user.isLocked
                            ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900/50'
                            : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        title={user.isLocked ? '클릭하여 잠금 해제' : '클릭하여 잠금'}
                    >
                        <Lock size={10} className={user.isLocked ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-slate-600'} />
                        {user.isLocked ? 'LOCKED' : 'UNLOCKED'}
                    </button>

                    {/* 삭제 여부 */}
                    {user.isDeleted && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center gap-1">
                            <Trash2 size={10} /> DELETED
                        </span>
                    )}
                </div>
            )
        },
        {
            header: '비번 변경일',
            key: 'lastPasswordChangedDate',
            render: (user: UserListResponse) => (
                <span className="text-xs font-medium text-slate-400">
                    {user.lastPasswordChangedDate ? new Date(user.lastPasswordChangedDate).toLocaleDateString() : '-'}
                </span>
            )
        },
        {
            header: '관리',
            key: 'actions',
            align: 'right' as const,
            render: () => (
                <button className="text-slate-400 hover:text-violet-600 transition-colors font-black text-xs px-3 py-1.5 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg">
                    수정
                </button>
            )
        },
    ];

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        사용자 관리
                        <span className="text-sm font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                            전체 {totalElements}명
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 font-medium">서비스 이용자를 조회하고 상태를 관리합니다.</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        onClick={handleRefresh}
                        className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-violet-600 transition-all shadow-sm active:scale-95"
                        title="새로고침"
                    >
                        <RotateCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-black transition-all shadow-lg shadow-violet-200 dark:shadow-none active:scale-95 text-sm"
                    >
                        <UserPlus size={18} />
                        사용자 등록
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
                        placeholder="이름 또는 이메일로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-none text-sm font-bold shadow-sm"
                    />
                    {searchQuery !== appliedSearch && (
                        <span className="absolute ml-3 text-[10px] font-black text-amber-500 animate-pulse">
                            Enter를 눌러 검색
                        </span>
                    )}
                </form>
            </div>

            {/* Table Section */}
            <div className={loading ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
                <AdminTable
                    columns={columns}
                    data={users}
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

            {/* Registration Modal */}
            <UserCreateModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleRefresh}
            />
        </div>
    );
};

export default UserManagement;
