import React from 'react';
import { useCart } from '@/hooks/CartContext';
import { Heart, Home, Star, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
    const navigate = useNavigate();
    const { favoriteItems, toggleFavorite, addToCart } = useCart();

    return (
        <div className="max-w-[1200px] mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-wider mb-4">
                        My Favorites
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">관심 공방 목록</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">총 담긴 개수</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{favoriteItems.length}개</p>
                    </div>
                </div>
            </div>

            {favoriteItems.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] py-32 text-center shadow-sm">
                    <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-300 dark:text-rose-700">
                        <Heart size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">마음에 드는 클래스가 없나요?</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">흥미로운 공방들을 하트로 찜해보세요!</p>
                    <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black hover:scale-105 transition-all shadow-xl">
                        <Home size={20} /> 실시간 랭킹 공방 보러가기
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoriteItems.map((workshop) => (
                        <div 
                            key={workshop.id} 
                            onClick={() => navigate(`/workshops/${workshop.id}`)}
                            className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-rose-300 dark:hover:border-rose-500 transition-all hover:shadow-2xl hover:shadow-rose-500/10 group cursor-pointer"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={workshop.imageUrl}
                                    alt={workshop.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-rose-600 dark:text-rose-400 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-sm uppercase tracking-wider">
                                        {workshop.category}
                                    </span>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(workshop);
                                    }}
                                    className="absolute top-4 right-4 p-2.5 bg-rose-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                                >
                                    <Heart size={18} fill="currentColor" />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-1.5 text-amber-500 mb-3">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm font-black">{workshop.rating}</span>
                                    <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold">({workshop.reviews}+)</span>
                                </div>
                                <h3 className="text-slate-900 dark:text-slate-100 font-black mb-1 line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors text-lg">
                                    {workshop.title}
                                </h3>
                                <p className="text-slate-400 dark:text-slate-500 text-sm font-bold mb-6">{workshop.instructor} · {workshop.region}</p>
                                <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-800">
                                    <div className="text-xl font-black text-slate-900 dark:text-white">
                                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">₩</span>
                                        {workshop.price}
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(workshop);
                                        }}
                                        className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl hover:bg-violet-600 transition-all group/cart"
                                    >
                                        <ShoppingCart size={20} className="group-hover/cart:rotate-12 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
