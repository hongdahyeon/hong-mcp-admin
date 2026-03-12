import React, { useState, useEffect } from 'react';
import { MapPin, Star, ShoppingCart, RefreshCw, Zap, ArrowRight, Heart } from 'lucide-react';

interface Workshop {
    id: string;
    title: string;
    region: string;
    category: string;
    price: string;
    rating: number;
    reviews: number;
    imageUrl: string;
    instructor: string;
}

const REGIONS = ['서울', '경기/인천', '부산/경상', '제주/강원'];

const MOCK_WORKSHOPS: Workshop[] = [
    { id: '1', title: '서촌 한옥에서 즐기는 전통 자수 클래스', region: '서울', category: '공예', price: '45,000', rating: 4.9, reviews: 124, instructor: '김연우 명인', imageUrl: 'https://images.unsplash.com/photo-1544961371-5120307bb371?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '2', title: '망원동 감성 가득한 세라믹 페인팅', region: '서울', category: '도예', price: '38,000', rating: 4.8, reviews: 89, instructor: '스튜디오 소담', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '3', title: '판교 숲속 공방 목공 입문 클래스', region: '경기/인천', category: '목공', price: '65,000', rating: 4.7, reviews: 56, instructor: '우든 핸즈', imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '4', title: '송도 센트럴파크 야경 유화 그리기', region: '경기/인천', category: '미술', price: '42,000', rating: 4.9, reviews: 210, instructor: '그리다 예술원', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '5', title: '해운대 바다를 닮은 레진 아트 클래스', region: '부산/경상', category: '공예', price: '50,000', rating: 4.6, reviews: 45, instructor: '부산 바다 공방', imageUrl: 'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?q=80&w=400&h=300&auto=format&fit=crop' },
    { id: '6', title: '애월 바다 담은 감성 캔들 만들기', region: '제주/강원', category: '향수/캔들', price: '35,000', rating: 5.0, reviews: 32, instructor: '제주 향기', imageUrl: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=400&h=300&auto=format&fit=crop' },
];

const Home: React.FC = () => {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
                                        <div key={workshop.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-violet-300 dark:hover:border-violet-500 transition-all hover:shadow-lg dark:hover:shadow-violet-900/20 group cursor-pointer">
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
                                                <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/90 backdrop-blur-md rounded-full text-white hover:text-rose-500 transition-all shadow-sm">
                                                    <Heart size={16} fill="currentColor" className="opacity-70 group-hover:opacity-100" />
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
                                                    <button className="p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white dark:hover:text-white transition-all">
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
