import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Star, MapPin, Clock, Users, ChevronLeft, 
    ShoppingCart, Heart, Share2, Info, BookOpen, 
    User, MessageSquare, CheckCircle2 
} from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { MOCK_WORKSHOPS } from '@/constants/workshop';

const WorkshopDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart, toggleFavorite, isFavorite } = useCart();
    const [activeTab, setActiveTab] = useState<'about' | 'curriculum' | 'instructor' | 'reviews'>('about');

    const workshop = MOCK_WORKSHOPS.find(w => w.id === id);

    if (!workshop) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">공방을 찾을 수 없습니다.</h2>
                <button 
                    onClick={() => navigate('/workshops')}
                    className="px-6 py-2 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Back Button */}
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold"
                >
                    <ChevronLeft size={20} /> 뒤로가기
                </button>
                <div className="flex gap-2">
                    <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-500 hover:text-violet-600 transition-all">
                        <Share2 size={18} />
                    </button>
                    <button 
                        onClick={() => toggleFavorite(workshop)}
                        className={`p-2.5 border rounded-full transition-all ${isFavorite(workshop.id) 
                            ? 'bg-rose-50 text-rose-500 border-rose-100' 
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-500'}`}
                    >
                        <Heart size={18} fill={isFavorite(workshop.id) ? 'currentColor' : 'none'} />
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl">
                    <img 
                        src={workshop.imageUrl} 
                        alt={workshop.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6">
                        <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-violet-700 dark:text-violet-400 text-xs font-black px-4 py-2 rounded-2xl shadow-lg uppercase tracking-wider">
                            {workshop.category}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-amber-500 mb-4 bg-amber-50 dark:bg-amber-900/20 w-fit px-3 py-1 rounded-full border border-amber-100 dark:border-amber-800/50">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-black">{workshop.rating}</span>
                        <span className="text-amber-400/80 text-xs font-bold">({workshop.reviews}+ 리뷰)</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                        {workshop.title}
                    </h1>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <MapPin size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">지역</span>
                            </div>
                            <div className="text-slate-900 dark:text-white font-black">{workshop.region}</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <User size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">강사</span>
                            </div>
                            <div className="text-slate-900 dark:text-white font-black">{workshop.instructor}</div>
                        </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                        {workshop.description}
                    </p>

                    <div className="flex items-center gap-6 text-slate-500 font-bold border-y border-slate-100 dark:border-slate-800 py-6 mb-8">
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-violet-500" />
                            <span>약 2시간 소요</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={18} className="text-violet-500" />
                            <span>최대 4인</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs & Content */}
            <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="flex items-center gap-8 mb-10 overflow-x-auto pb-2 scrollbar-none">
                    {[
                        { id: 'about', label: '클래스 소개', icon: Info },
                        { id: 'curriculum', label: '커리큘럼', icon: BookOpen },
                        { id: 'instructor', label: '강사 소개', icon: User },
                        { id: 'reviews', label: '리얼 리뷰', icon: MessageSquare },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 whitespace-nowrap pb-2 font-black transition-all border-b-4 ${activeTab === tab.id 
                                ? 'text-violet-600 border-violet-600' 
                                : 'text-slate-400 border-transparent hover:text-slate-600 dark:hover:text-slate-200'}`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="min-h-[300px]">
                    {activeTab === 'about' && (
                        <div className="animate-in fade-in duration-500">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">일상에 예술을 더하는 시간</h3>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 font-medium leading-relaxed">
                                    {workshop.description} 본 클래스에서는 실생활에서 활용 가능한 작품을 직접 제작하며,
                                    예술적 영감을 일상으로 가져옵니다. 초보자도 전문가의 세심한 지도 아래 완성도 높은 결과물을 얻으실 수 있습니다.
                                </p>
                                <ul className="space-y-4">
                                    {['모든 재료 포함', '전문가 피드백 제공', '소수 정예 진행', '웰컴 드링크 제공'].map(item => (
                                        <li key={item} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold">
                                            <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'curriculum' && (
                        <div className="animate-in fade-in duration-500 space-y-6">
                            {workshop.curriculum.map((item, index) => (
                                <div key={index} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center font-black text-lg group-hover:bg-violet-600 group-hover:text-white transition-all shadow-sm">
                                            {index + 1}
                                        </div>
                                        {index !== workshop.curriculum.length - 1 && (
                                            <div className="w-0.5 h-full bg-slate-100 dark:bg-slate-800 my-2"></div>
                                        )}
                                    </div>
                                    <div className="pb-8">
                                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{item}</h4>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium">실습 위주의 교육으로 핵심 노하우를 명확히 전달합니다.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'instructor' && (
                        <div className="animate-in fade-in duration-500">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl">
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <User size={48} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{workshop.instructor}</h4>
                                    <p className="text-violet-600 dark:text-violet-400 font-black">메인 튜터 / 마스터</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-bold italic quote">
                                    "{workshop.instructorBio}"
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="animate-in fade-in duration-500">
                             <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-1">사용자 후기 {workshop.reviews}개</h4>
                                    <p className="text-slate-500 font-medium italic underline underline-offset-4 decoration-violet-300">평균 만족도 98%</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-black text-slate-900 dark:text-white">{workshop.rating}</div>
                                    <div className="flex gap-0.5 text-amber-500 justify-end">
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                </div>
                             </div>
                             <div className="space-y-6">
                                {[1, 2].map(i => (
                                    <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400">U</div>
                                                <div className="font-black text-slate-900 dark:text-white">사용자 {i}</div>
                                            </div>
                                            <div className="text-xs text-slate-400 font-bold">2026.03.{10+i}</div>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 font-medium">강사님이 너무 친절하시고 공간 분위기도 정말 좋아요. 처음 해보는 건데도 결과물이 너무 예쁘게 나와서 만족스럽습니다!</p>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Interaction Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[800px] z-50">
                <div className="bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/10 dark:border-slate-700/50 p-4 rounded-[2rem] flex items-center justify-between shadow-2xl shadow-violet-500/20">
                    <div className="pl-6">
                        <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">참가비 (1인 아티장 패키지)</div>
                        <div className="text-white text-3xl font-black tracking-tighter">
                            <span className="text-lg mr-1 text-violet-400">₩</span>
                            {workshop.price}
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={() => toggleFavorite(workshop)}
                            className={`p-4 rounded-2xl transition-all shadow-lg ${isFavorite(workshop.id) 
                                ? 'bg-rose-500 text-white' 
                                : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            <Heart size={24} fill={isFavorite(workshop.id) ? 'currentColor' : 'none'} />
                        </button>
                        <button 
                            onClick={() => addToCart(workshop)}
                            className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-black text-lg hover:bg-violet-700 transition-all flex items-center gap-3 shadow-lg shadow-violet-500/30"
                        >
                            <ShoppingCart size={22} /> 장바구니 담기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkshopDetail;
