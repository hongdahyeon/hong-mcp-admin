import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/auth';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ 즉시 로그아웃 처리 후 로그인 페이지로 이동
        authService.logout();
        navigate('/login', { replace: true });
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
                <p className="text-slate-500 font-bold tracking-tight">로그아웃 중입니다...</p>
            </div>
        </div>
    );
};

export default Logout;
