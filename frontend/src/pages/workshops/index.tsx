import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Tag, Star, ShoppingCart, Heart, SlidersHorizontal, ChevronDown, X, RefreshCw } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { REGIONS, CATEGORIES, MOCK_WORKSHOPS } from '@/constants/workshop';

const Workshops: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { addToCart, toggleFavorite, isFavorite } = useCart();
    
    // Filters State
    const [name, setName] = useState(searchParams.get('q') || '');
    const [region, setRegion] = useState(searchParams.get('region') || '전체');
    const [category, setCategory] = useState(searchParams.get('category') || '전체');
    const [minRating, setMinRating] = useState(Number(searchParams.get('rating')) || 0);
    const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || 100000);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Sync state with URL
    useEffect(() => {
        const params: any = {};
        if (name) params.q = name;
        if (region !== '전체') params.region = region;
        if (category !== '전체') params.category = category;
        if (minRating > 0) params.rating = minRating.toString();
        if (maxPrice < 100000) params.maxPrice = maxPrice.toString();
        setSearchParams(params);
    }, [name, region, category, minRating, maxPrice]);

    const filteredWorkshops = useMemo(() => {
        return MOCK_WORKSHOPS.filter(w => {
            const matchesName = w.title.toLowerCase().includes(name.toLowerCase());
            const matchesRegion = region === '전체' || w.region === region;
            const matchesCategory = category === '전체' || w.category === category;
            const matchesRating = w.rating >= minRating;
            const price = parseInt(w.price.replace(/,/g, ''));
            const matchesPrice = price <= maxPrice;
            
            return matchesName && matchesRegion && matchesCategory && matchesRating && matchesPrice;
        });
    }, [name, region, category, minRating, maxPrice]);

    const clearFilters = () => {
        setName('');
        setRegion('전체');
        setCategory('전체');
        setMinRating(0);
        setMaxPrice(100000);
    };

    return (
        <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">공방 클래스 찾기</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">당신의 감성을 깨울 특별한 경험을 검색해보세요.</p>
            </div>

            {/* Search & Filter Header */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-8 shadow-sm transition-all">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Text Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="공방 이름이나 클래스 명을 입력하세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 transition-all font-bold"
                        />
                    </div>
                    
                    {/* Filter Toggle (Mobile/Tablet) */}
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="lg:hidden flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold transition-all border border-slate-200 dark:border-slate-700"
                    >
                        <SlidersHorizontal size={18} /> 필터 상세 설정
                    </button>

                    {/* Desktop Selection Filters */}
                    <div className="hidden lg:flex gap-4">
                        <div className="relative group">
                            <select 
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white font-bold cursor-pointer focus:ring-2 focus:ring-violet-500 transition-all"
                            >
                                <option value="전체">모든 지역</option>
                                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                        </div>

                        <div className="relative">
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white font-bold cursor-pointer focus:ring-2 focus:ring-violet-500 transition-all"
                            >
                                <option value="전체">모든 카테고리</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                {/* Advanced Filters Drawer/Section */}
                {(isFilterOpen || true) && (
                    <div className={`mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${!isFilterOpen && 'hidden lg:grid'}`}>
                        {/* Price Filter */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">가격대 (~ ₩{maxPrice.toLocaleString()})</label>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="100000" 
                                step="5000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                            />
                        </div>

                        {/* Rating Filter */}
                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">최소 별점 ({minRating === 0 ? '전체' : minRating + '점 이상'})</label>
                            <div className="flex gap-2">
                                {[0, 3, 4, 4.5].map(rating => (
                                    <button
                                        key={rating}
                                        onClick={() => setMinRating(rating)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${minRating === rating 
                                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' 
                                            : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100'}`}
                                    >
                                        {rating === 0 ? 'ALL' : rating + '↑'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Region Filter (Mobile only since visible on desktop) */}
                        <div className="lg:hidden space-y-3">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">지역</label>
                            <select 
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white font-bold"
                            >
                                <option value="전체">모든 지역</option>
                                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>

                        {/* Reset Button */}
                        <div className="flex items-end">
                            <button 
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-rose-500 font-bold transition-all"
                            >
                                <RefreshCw className="w-4 h-4" /> 필터 초기화
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Count & Tags */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-slate-900 dark:text-white">검색 결과 {filteredWorkshops.length}개</span>
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
                    <div className="flex gap-2 overflow-x-auto">
                        {region !== '전체' && (
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-bold rounded-full border border-violet-100 dark:border-violet-800">
                                <MapPin size={12} /> {region} <X size={12} className="cursor-pointer" onClick={() => setRegion('전체')} />
                            </span>
                        )}
                        {category !== '전체' && (
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-bold rounded-full border border-sky-100 dark:border-sky-800">
                                <Tag size={12} /> {category} <X size={12} className="cursor-pointer" onClick={() => setCategory('전체')} />
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Workshops Grid */}
            {filteredWorkshops.length === 0 ? (
                <div className="py-20 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-600">
                        <Search size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">검색 결과가 없습니다</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">필터 조건을 변경하여 다시 검색해보세요.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredWorkshops.map(workshop => (
                        <div key={workshop.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-violet-300 dark:hover:border-violet-500 transition-all hover:shadow-2xl hover:shadow-violet-500/10 group cursor-pointer">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={workshop.imageUrl}
                                    alt={workshop.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-violet-700 dark:text-violet-400 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-sm uppercase tracking-wider">
                                        {workshop.category}
                                    </span>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(workshop);
                                    }}
                                    className={`absolute top-4 right-4 p-2.5 backdrop-blur-md rounded-full transition-all shadow-lg ${isFavorite(workshop.id)
                                        ? 'bg-rose-500 text-white'
                                        : 'bg-white/20 text-white hover:bg-white/90 hover:text-rose-500'
                                    }`}
                                >
                                    <Heart size={18} fill={isFavorite(workshop.id) ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-1.5 text-amber-500 mb-3">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm font-black">{workshop.rating}</span>
                                    <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold">({workshop.reviews}+)</span>
                                </div>
                                <h3 className="text-slate-900 dark:text-slate-100 font-black mb-1 line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors text-lg">
                                    {workshop.title}
                                </h3>
                                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-bold mb-6">
                                    <MapPin size={14} /> {workshop.region} · {workshop.instructor}
                                </div>
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

export default Workshops;
