import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Logout from '@/pages/logout';
import Signup from '@/pages/signup';
import NotFound from '@/pages/error/NotFound';

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 인증이 필요 없는 경로 */}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />

                {/* 메인 레이아웃 적용 경로 (대시보드 등) */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    {/* 향후 다른 페이지들을 여기에 추가 */}
                </Route>

                {/* 404 페이지 - 최상단 수준에서 렌더링 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;