import React, { useState } from 'react';
import { User, ChevronDown, LogOut, Settings, UserCircle, LogIn, UserPlus, Sun, Moon, Heart, ShoppingCart, Trash2, ArrowRight, LayoutDashboard } from 'lucide-react';
import { useTheme } from '@/hooks/ThemeContext';
import { useCart } from '@/hooks/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { cartItems, favoriteItems, removeFromCart, toggleFavorite } = useCart();
    const navigate = useNavigate();

    // ✅ 로그인 상태 및 사용자 정보 확인
    const authDataString = localStorage.getItem('AUTH_DATA');
    const authData = authDataString ? JSON.parse(authDataString) : null;
    const isLoggedIn = !!authData?.accessToken;
    const username = authData?.username || '사용자';

    const menus = [
        {
            title: '공방 탐색',
            subMenus: [
                { name: '카테고리별 클래스', path: '#' },
                { name: '실시간 핫플레이스', path: '#' },
                { name: '신규 공방', path: '#' }
            ]
        },
        {
            title: '예약/결제',
            subMenus: [
                { name: '예약 내역', path: '/my/reservations' },
                { name: '결제 관리', path: '#' },
                { name: '쿠폰/포인트', path: '#' }
            ]
        },
        {
            title: '커뮤니티',
            subMenus: [
                { name: '찐 후기 자랑', path: '/community/reviews' },
                { name: '공방 소식', path: '/community/news' },
                { name: '작가님 인터뷰', path: '/community/interviews' }
            ]
        },
        {
            title: '제휴 문의',
            subMenus: [
                { name: '공방 입점 안내', path: '#' },
                { name: '작가 신청', path: '#' },
                { name: '광고/제휴', path: '#' }
            ]
        },
    ];

    // ✅ 관리자(ROLE_ADMIN)일 경우 시스템 관리 메뉴 추가
    if (authData?.role === 'ROLE_ADMIN') {
        menus.push({
            title: '시스템 관리',
            subMenus: [
                { name: '사용자 관리', path: '/admin/user' },
                { name: '공방 관리', path: '/admin/workplace' },
                { name: '접속 이력 관리', path: '/admin/access' },
                { name: '결제 정보 관리', path: '/admin/payment' }
            ]
        });
    }

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
                            className={`relative flex items-center px-4 cursor-pointer transition-all group ${activeMenu === menu.title ? 'text-violet-600 font-bold' : 'text-slate-600 dark:text-slate-300 font-semibold hover:text-violet-600'
                                } text-lg`}
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

                    {/* Favorites Toggle */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsFavoritesOpen(!isFavoritesOpen);
                                setIsCartOpen(false);
                                setIsUserMenuOpen(false);
                            }}
                            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-rose-300 transition-all relative group"
                            aria-label="Favorites"
                        >
                            <Heart size={20} className={favoriteItems.length > 0 ? 'text-rose-500 fill-rose-500' : ''} />
                            {favoriteItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-in zoom-in duration-300">
                                    {favoriteItems.length}
                                </span>
                            )}
                        </button>

                        {isFavoritesOpen && (
                            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in zoom-in duration-200">
                                <div className="px-4 pb-2 border-b border-slate-50 dark:border-slate-800 mb-2 flex justify-between items-center">
                                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">관심 목록</p>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-full">{favoriteItems.length}개</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto px-2 space-y-1">
                                    {favoriteItems.length === 0 ? (
                                        <div className="py-8 text-center">
                                            <p className="text-sm text-slate-400 font-medium">관심있는 공방이 없어요</p>
                                        </div>
                                    ) : (
                                        favoriteItems.slice(0, 5).map(item => (
                                            <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group/item">
                                                <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">{item.category} · {item.region}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(item);
                                                    }}
                                                    className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover/item:opacity-100"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {favoriteItems.length > 5 && (
                                    <button
                                        onClick={() => {
                                            setIsFavoritesOpen(false);
                                            navigate('/favorites');
                                        }}
                                        className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 text-xs font-black text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all border-t border-slate-50 dark:border-slate-800"
                                    >
                                        관심 목록 더보기 <ArrowRight size={12} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Cart Toggle */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsCartOpen(!isCartOpen);
                                setIsFavoritesOpen(false);
                                setIsUserMenuOpen(false);
                            }}
                            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-300 transition-all relative group"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart size={20} className={cartItems.length > 0 ? 'text-violet-600' : ''} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-in zoom-in duration-300">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>

                        {isCartOpen && (
                            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in zoom-in duration-200">
                                <div className="px-4 pb-2 border-b border-slate-50 dark:border-slate-800 mb-2 flex justify-between items-center">
                                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">주문 대기함</p>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-full">{cartItems.length}개</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto px-2 space-y-1">
                                    {cartItems.length === 0 ? (
                                        <div className="py-8 text-center">
                                            <p className="text-sm text-slate-400 font-medium">장바구니가 비어있어요</p>
                                        </div>
                                    ) : (
                                        cartItems.slice(0, 5).map(item => (
                                            <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group/item">
                                                <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">₩{item.price}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromCart(item.id);
                                                    }}
                                                    className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover/item:opacity-100"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {cartItems.length > 5 ? (
                                    <button
                                        onClick={() => {
                                            setIsCartOpen(false);
                                            navigate('/cart');
                                        }}
                                        className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 text-xs font-black text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all border-t border-slate-50 dark:border-slate-800"
                                    >
                                        장바구니 전체 보기 <ArrowRight size={12} />
                                    </button>
                                ) : cartItems.length > 0 && (
                                    <div className="px-2 mt-2">
                                        <button
                                            onClick={() => {
                                                setIsCartOpen(false);
                                                navigate('/cart');
                                            }}
                                            className="w-full py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-violet-200 dark:shadow-none"
                                        >
                                            주문하러 가기
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsUserMenuOpen(!isUserMenuOpen);
                                setIsCartOpen(false);
                                setIsFavoritesOpen(false);
                            }}
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
                                        <Link 
                                            to="/my/reservations"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400 font-bold transition-all"
                                        >
                                            <Settings size={18} /> 예약 내역 확인
                                        </Link>
                                        <Link 
                                            to="/workshops/manage"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400 font-bold transition-all"
                                        >
                                            <LayoutDashboard size={18} /> 내 공방 관리
                                        </Link>
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

            <div
                className={`absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${activeMenu ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-6 py-8">
                    <div
                        className="grid gap-8 text-center sm:text-left"
                        style={{ gridTemplateColumns: `repeat(${menus.length}, minmax(0, 1fr))` }}
                    >
                        {menus.map((menu) => (
                            <div key={menu.title} className="transition-opacity duration-300">
                                <h4 className={`text-xs font-black uppercase tracking-widest mb-4 ${activeMenu === menu.title ? 'text-violet-600' : 'text-slate-300 dark:text-slate-600'
                                    }`}>
                                    {menu.title}
                                </h4>
                                <ul className="space-y-2">
                                    {menu.subMenus.map((sub) => (
                                        <li key={sub.name}>
                                            <Link
                                                to={sub.path}
                                                onClick={() => setActiveMenu(null)}
                                                className="text-base font-bold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer transition-colors"
                                            >
                                                {sub.name}
                                            </Link>
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
