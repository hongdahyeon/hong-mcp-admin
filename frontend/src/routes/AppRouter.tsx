import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Logout from '@/pages/logout';
import Signup from '@/pages/signup';
import UserManagement from '@/pages/admin/user';
import WorkplaceManagement from '@/pages/admin/workplace';
import AccessLog from '@/pages/admin/access';
import PaymentManagement from '@/pages/admin/payment';
import Cart from '@/pages/cart';
import Favorites from '@/pages/favorites';
import Workshops from '@/pages/workshops';
import WorkshopDetail from '@/pages/workshops/Detail';
import WorkshopManage from '@/pages/workshops/Manage';
import WorkshopNew from '@/pages/workshops/New';
import WorkshopReservations from '@/pages/workshops/Reservations';
import MyReservations from '@/pages/my/Reservations';
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

                    {/* 사용자 메뉴 */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/workshops" element={<Workshops />} />
                    <Route path="/workshops/:id" element={<WorkshopDetail />} />
                    <Route path="/workshops/manage" element={<WorkshopManage />} />
                    <Route path="/workshops/manage/new" element={<WorkshopNew />} />
                    <Route path="/workshops/manage/:id/reservations" element={<WorkshopReservations />} />
                    <Route path="/my/reservations" element={<MyReservations />} />

                    {/* 관리자(Admin) 전용 메뉴 */}
                    <Route path="/admin/user" element={<UserManagement />} />
                    <Route path="/admin/workplace" element={<WorkplaceManagement />} />
                    <Route path="/admin/access" element={<AccessLog />} />
                    <Route path="/admin/payment" element={<PaymentManagement />} />
                </Route>

                {/* 404 페이지 - 최상단 수준에서 렌더링 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;