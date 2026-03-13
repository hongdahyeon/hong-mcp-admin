import React from 'react';
import AdminTable from '@/components/common/AdminTable';

const UserManagement: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const totalPages = 3;

    const sampleUsers = [
        { id: 1, email: 'admin@craftday.com', username: '관리자', role: 'ROLE_ADMIN', status: 'ACTIVE', lastLogin: '2024-03-13 18:30' },
        { id: 2, email: 'user1@gmail.com', username: '홍길동', role: 'ROLE_USER', status: 'ACTIVE', lastLogin: '2024-03-12 14:20' },
        { id: 3, email: 'host1@naver.com', username: '김작가', role: 'ROLE_HOST', status: 'PENDING', lastLogin: '2024-03-11 09:15' },
        { id: 4, email: 'user2@daum.net', username: '이철수', role: 'ROLE_USER', status: 'BLOCKED', lastLogin: '2024-03-10 21:45' },
    ];

    const columns = [
        { header: 'ID', key: 'id', render: (user: any) => <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{user.id}</span> },
        { header: '이메일', key: 'email', render: (user: any) => <span className="text-sm font-black text-slate-900 dark:text-white">{user.email}</span> },
        { header: '이름/닉네임', key: 'username', render: (user: any) => <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{user.username}</span> },
        {
            header: '권한',
            key: 'role',
            render: (user: any) => (
                <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-tight ${user.role === 'ROLE_ADMIN' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                    user.role === 'ROLE_HOST' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
                    }`}>
                    {user.role}
                </span>
            )
        },
        {
            header: '상태',
            key: 'status',
            render: (user: any) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-black ${user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    user.status === 'PENDING' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' :
                        'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                    {user.status}
                </span>
            )
        },
        { header: '최근 접속', key: 'lastLogin', render: (user: any) => <span className="text-sm font-medium text-slate-400">{user.lastLogin}</span> },
        {
            header: '관리',
            key: 'actions',
            align: 'right' as const,
            render: () => (
                <button className="text-slate-400 hover:text-violet-600 transition-colors font-black text-xs">수정</button>
            )
        },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">사용자 관리</h1>
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                    사용자 등록
                </button>
            </div>

            <AdminTable
                columns={columns}
                data={sampleUsers}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
};

export default UserManagement;
