import React, { useState } from 'react';
import { User, ChevronDown, LogOut, Settings, UserCircle, LogIn, UserPlus, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/ThemeContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    // ✅ 로그인 상태 및 사용자 정보 확인
    const isLoggedIn = !!localStorage.getItem('accessToken');
    const username = localStorage.getItem('username') || '사용자';

    const menus = [
        { title: '공방 탐색', subMenus: ['카테고리별 클래스', '실시간 핫플레이스', '신규 공방'] },
        { title: '예약/결제', subMenus: ['예약 내역', '결제 관리', '쿠폰/포인트'] },
        { title: '커뮤니티', subMenus: ['찐후기 자랑', '공방 소식', '작가님 인터뷰'] },
        { title: '제휴 문의', subMenus: ['공방 입점 안내', '작가 신청', '광고/제휴'] },
    ];

    return (
        <header
            className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 transition-colors"
            onMouseLeave={() => setActiveMenu(null)}
        >
            <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo: CraftDay */}
                <Link to="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-white font-black group-hover:rotate-6 transition-transform shadow-lg shadow-violet-200 dark:shadow-violet-900/20">
                        C
                    </div>
                    <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
                        Craft<span className="text-violet-600 italic">Day</span>
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-stretch h-full">
                    {menus.map((menu) => (
                        <div
                            key={menu.title}
                            className={`relative flex items-center px-4 cursor-pointer transition-all group ${activeMenu === menu.title ? 'text-violet-600 font-bold' : 'text-slate-600 dark:text-slate-300 font-medium hover:text-violet-600'
                                }`}
                            onMouseEnter={() => setActiveMenu(menu.title)}
                        >
                            {menu.title}
                            <ChevronDown size={14} className={`ml-1 transition-transform ${activeMenu === menu.title ? 'rotate-180 text-violet-600' : ''}`} />
                            <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-violet-600 transition-transform origin-left ${activeMenu === menu.title ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                        </div>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-300 transition-all"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-violet-300 transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
                                <User size={18} />
                            </div>
                            {isLoggedIn && (
                                <span className="hidden sm:block text-sm font-bold text-slate-800 dark:text-slate-200">{username}님</span>
                            )}
                            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                                {isLoggedIn ? (
                                    <>
                                        <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-800 mb-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">My Account</p>
                                            <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{username}님 반갑습니다!</p>
                                        </div>
                                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400 font-bold transition-all">
                                            <UserCircle size={18} /> 내 정보 관리
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400 font-bold transition-all">
                                            <Settings size={18} /> 예약 내역 확인
                                        </button>
                                        <Link
                                            to="/logout"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 font-black transition-all border-t border-slate-50 dark:border-slate-800 mt-1"
                                        >
                                            <LogOut size={18} /> 로그아웃
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-800 mb-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guest</p>
                                            <p className="text-sm font-black text-slate-900 dark:text-white">로그인이 필요합니다</p>
                                        </div>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800 font-black transition-all"
                                        >
                                            <LogIn size={18} /> 로그인하기
                                        </Link>
                                        <Link
                                            to="/signup"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-all"
                                        >
                                            <UserPlus size={18} /> 회원가입
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mega Menu Dropdown */}
            <div
                className={`absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${activeMenu ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-6 py-8">
                    <div className="grid grid-cols-4 gap-8 text-center sm:text-left">
                        {menus.map((menu) => (
                            <div key={menu.title} className="transition-opacity duration-300">
                                <h4 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${activeMenu === menu.title ? 'text-violet-600' : 'text-slate-300 dark:text-slate-600'
                                    }`}>
                                    {menu.title}
                                </h4>
                                <ul className="space-y-2">
                                    {menu.subMenus.map((sub) => (
                                        <li key={sub} className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer transition-colors">
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
