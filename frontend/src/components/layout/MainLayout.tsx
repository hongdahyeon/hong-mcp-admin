import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased selection:bg-violet-100 selection:text-violet-700">
            <Header />
            {/* Header height padding */}
            <main className="flex-grow pt-16">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
