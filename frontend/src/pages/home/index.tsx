import React, { useState, useEffect } from 'react';
import { MapPin, Star, ShoppingCart, RefreshCw, Zap, ArrowRight, Heart } from 'lucide-react';
import { Workshop } from '@/types/workshop';
import { useCart } from '@/hooks/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_WORKSHOPS, REGIONS } from '@/constants/workshop';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart, toggleFavorite, isFavorite } = useCart();

    useEffect(() => {
        handleLoadWorkshops();
    }, []);

    const handleLoadWorkshops = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setWorkshops(MOCK_WORKSHOPS);
        setIsLoading(false);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 mb-10 shadow-sm transition-colors">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-violet-50 dark:bg-violet-900/10 rounded-full blur-3xl opacity-50"></div>
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800/50 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <Zap size={14} /> 실시간 클래스 트렌드 업데이트
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                        일상이 예술이 되는 시간, <br />
                        <span className="text-violet-600 dark:text-violet-400 font-black italic">CraftDay</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        최근 당신이 눈여겨본 감성 공방들이에요. <br />
                        손끝에서 피어나는 특별한 경험을 지금 바로 예약해보세요.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 dark:shadow-violet-900/40 flex items-center gap-2 group border-0">
                            클래스 구경하기 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={handleLoadWorkshops}
                            className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-750 transition-all flex items-center gap-2"
                        >
                            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                            추천 새로고침
                        </button>
                    </div>
                </div>
            </section>

            {/* Kanban Board Layout */}
            <div className="flex gap-6 overflow-x-auto pb-6">
                {REGIONS.map(region => (
                    <div key={region} className="flex-shrink-0 w-80">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-violet-500 dark:text-violet-400" />
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{region}</h2>
                                <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-2 py-0.5 rounded-full">
                                    {workshops.filter(w => w.region === region).length}
                                </span>
                            </div>
                            <Link 
                                to={`/workshops?region=${encodeURIComponent(region)}`}
                                className="text-xs font-black text-slate-400 hover:text-violet-600 transition-colors flex items-center gap-1 group/link"
                            >
                                자세히 보기 <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            {isLoading ? (
                                Array(2).fill(0).map((_, i) => (
                                    <div key={i} className="bg-slate-50 dark:bg-slate-900 h-64 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse transition-colors"></div>
                                ))
                            ) : (
                                workshops
                                    .filter(w => w.region === region)
                                    .map(workshop => (
                                        <div 
                                            key={workshop.id} 
                                            onClick={() => navigate(`/workshops/${workshop.id}`)}
                                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-violet-300 dark:hover:border-violet-500 transition-all hover:shadow-lg dark:hover:shadow-violet-900/20 group cursor-pointer"
                                        >
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={workshop.imageUrl}
                                                    alt={workshop.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-violet-700 dark:text-violet-400 text-[10px] font-black px-2 py-1 rounded-lg shadow-sm uppercase">
                                                        {workshop.category}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(workshop);
                                                    }}
                                                    className={`absolute top-3 right-3 p-2 backdrop-blur-md rounded-full transition-all shadow-sm ${isFavorite(workshop.id)
                                                        ? 'bg-rose-500 text-white'
                                                        : 'bg-white/20 text-white hover:bg-white/90 hover:text-rose-500'
                                                        }`}
                                                >
                                                    <Heart size={16} fill={isFavorite(workshop.id) ? 'currentColor' : 'none'} className={isFavorite(workshop.id) ? '' : 'opacity-70 group-hover:opacity-100'} />
                                                </button>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center gap-1 text-amber-500 mb-2">
                                                    <Star size={14} fill="currentColor" />
                                                    <span className="text-sm font-bold">{workshop.rating}</span>
                                                    <span className="text-slate-400 text-xs font-medium">({workshop.reviews}+)</span>
                                                </div>
                                                <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-1 line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                                    {workshop.title}
                                                </h3>
                                                <p className="text-slate-400 dark:text-slate-500 text-xs mb-4">{workshop.instructor}</p>
                                                <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 transition-colors pt-4">
                                                    <div className="text-lg font-black text-slate-900 dark:text-white">
                                                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">₩</span>
                                                        {workshop.price}
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            addToCart(workshop);
                                                        }}
                                                        className="p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white dark:hover:text-white transition-all"
                                                    >
                                                        <ShoppingCart size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            )}
                            {!isLoading && workshops.filter(w => w.region === region).length === 0 && (
                                <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                                    <p className="text-slate-300 dark:text-slate-600 text-sm font-medium">조회된 공방이 없습니다</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
