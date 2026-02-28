import React, { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const menus = [
        { title: '대시보드', subMenus: ['통합 대시보드', '실시간 지표', '운영 리포트'] },
        { title: '사용자 관리', subMenus: ['유저 리스트', '권한 설정', '그룹 관리', '로그인 기록'] },
        { title: '시스템 설정', subMenus: ['일반 설정', '보안 관리', '백업/복구', 'API 로그'] },
        { title: '고객 지원', subMenus: ['FAQ', '공지사항', '1:1 문의'] },
    ];

    return (
        <header
            className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200"
            onMouseLeave={() => setActiveMenu(null)}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-violet-700 transition-colors">
                        H
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        HONG <span className="text-violet-600">MCP</span>
                    </span>
                </div>

                {/* Navigation */}
                <nav className="hidden lg:flex items-stretch h-full">
                    {menus.map((menu) => (
                        <div
                            key={menu.title}
                            className={`relative flex items-center px-4 cursor-pointer transition-all group ${activeMenu === menu.title ? 'text-violet-600 font-bold' : 'text-slate-600 font-medium hover:text-violet-600'
                                }`}
                            onMouseEnter={() => setActiveMenu(menu.title)}
                        >
                            {menu.title}
                            <ChevronDown size={16} className={`ml-1 transition-transform ${activeMenu === menu.title ? 'rotate-180 text-violet-600' : ''}`} />
                            <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-violet-600 transition-transform origin-left ${activeMenu === menu.title ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                        </div>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-violet-50 hover:text-violet-600 transition-all border border-transparent hover:border-violet-200"
                        >
                            <User size={20} />
                        </button>

                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-600 font-medium">
                                    로그인
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mega Menu Dropdown */}
            <div
                className={`absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${activeMenu ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-4 gap-8">
                        {menus.map((menu) => (
                            <div key={menu.title} className="transition-opacity duration-300">
                                <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${activeMenu === menu.title ? 'text-violet-600' : 'text-slate-400'
                                    }`}>
                                    {menu.title}
                                </h4>
                                <ul className="space-y-2">
                                    {menu.subMenus.map((sub) => (
                                        <li key={sub} className="text-sm font-medium text-slate-600 hover:text-violet-600 cursor-pointer transition-colors">
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
