import React, { useState } from 'react';
import { 
    Heart, MessageCircle, Star, 
    TrendingUp, Search, 
    Plus, X, User,
    Share2, MoreVertical
} from 'lucide-react';
import { MOCK_REVIEWS, ReviewPrideItem } from '@/constants/reviews';

const ReviewPride: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedReview, setSelectedReview] = useState<ReviewPrideItem | null>(null);

    const categories = ['전체', '도예', '조향', '자수', '가죽공예', '베이킹', '미술'];
    
    const bestReviews = MOCK_REVIEWS.filter(r => r.isBest);
    const filteredReviews = MOCK_REVIEWS.filter(r => 
        selectedCategory === '전체' ? true : r.category === selectedCategory
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-violet-600 font-black text-sm uppercase tracking-widest mb-3">
                        <TrendingUp size={16} /> Community
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                        찐 후기 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">자랑하기</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                        크래프트데이를 통해 완성된 나만의 작품을 공유하고 함께 기쁨을 나눠요.
                    </p>
                </div>
                <button 
                    onClick={() => {}}
                    className="flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-[1.5rem] font-black hover:scale-105 transition-all shadow-xl shadow-slate-200 dark:shadow-none shrink-0"
                >
                    <Plus size={20} /> 후기 작성하기
                </button>
            </div>

            {/* Best Reviews Section */}
            <section className="mb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        🏆 이달의 베스트 후기
                    </h2>
                    <span className="text-sm font-bold text-slate-400">실시간 인기 급상승 중</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {bestReviews.map((review) => (
                        <div 
                            key={review.id}
                            onClick={() => setSelectedReview(review)}
                            className="group cursor-pointer relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <img 
                                src={review.images[0]} 
                                alt={review.authorName} 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            
                            <div className="absolute top-6 left-6">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-black tracking-widest uppercase border border-white/30">
                                    {review.category}
                                </span>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border-2 border-white/50">
                                        {review.authorImage ? (
                                            <img src={review.authorImage} alt={review.authorName} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-500">
                                                {review.authorName[0]}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-white font-bold text-sm tracking-tight">{review.authorName}</span>
                                </div>
                                <h3 className="text-xl font-black text-white leading-tight mb-4 line-clamp-2">
                                    {review.content}
                                </h3>
                                <div className="flex items-center gap-4 text-white/80 text-xs font-bold">
                                    <span className="flex items-center gap-1"><Heart size={14} className="fill-rose-500 text-rose-500" /> {review.likes}</span>
                                    <span className="flex items-center gap-1"><MessageCircle size={14} /> {review.comments.length}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Filter & Grid Section */}
            <section>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-100 dark:border-slate-800 pb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-black transition-all ${
                                    selectedCategory === cat
                                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-100 dark:shadow-none'
                                    : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="워크숍 정보나 내용 검색..."
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-violet-600 focus:bg-white dark:focus:bg-slate-950 transition-all text-sm outline-none font-bold"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {filteredReviews.map((review) => (
                        <div 
                            key={review.id}
                            onClick={() => setSelectedReview(review)}
                            className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 group cursor-pointer hover:shadow-xl transition-all"
                        >
                            <div className="aspect-square overflow-hidden relative">
                                <img 
                                    src={review.images[0]} 
                                    alt={review.authorName} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=400&h=300&auto=format&fit=crop';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <div className="flex flex-col items-center text-white">
                                        <Heart size={20} className="fill-white" />
                                        <span className="text-[10px] font-black mt-1">{review.likes}</span>
                                    </div>
                                    <div className="flex flex-col items-center text-white">
                                        <MessageCircle size={20} className="fill-white" />
                                        <span className="text-[10px] font-black mt-1">{review.comments.length}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                    <span className="text-[10px] font-black text-slate-900 dark:text-white">{review.rating}</span>
                                    <span className="text-[10px] font-bold text-slate-400">• {review.category}</span>
                                </div>
                                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mb-1">
                                    {review.workshopTitle}
                                </h3>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50 dark:border-slate-900">
                                    <span className="text-[10px] font-bold text-slate-500">{review.authorName}</span>
                                    <span className="text-[9px] font-bold text-slate-300">{review.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Review Detail Modal */}
            {selectedReview && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedReview(null)} />
                    <div className="relative w-full max-w-[1000px] bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in slide-in-from-bottom-10 duration-500 max-h-[90vh]">
                        {/* Image Gallery */}
                        <div className="w-full md:w-[60%] bg-slate-100 dark:bg-slate-950 flex items-center justify-center relative overflow-hidden h-[40vh] md:h-auto">
                            <img 
                                src={selectedReview.images[0]} 
                                alt="Detail" 
                                className="w-full h-full object-cover"
                            />
                            {selectedReview.images.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 p-2 bg-black/20 backdrop-blur-md rounded-full">
                                    {selectedReview.images.map((_, i) => (
                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content & Comments */}
                        <div className="w-full md:w-[40%] flex flex-col p-8 bg-white dark:bg-slate-900">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center text-slate-400">
                                        {selectedReview.authorImage ? (
                                            <img src={selectedReview.authorImage} alt={selectedReview.authorName} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={20} />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedReview.authorName}</div>
                                        <div className="text-[10px] font-bold text-slate-400">📍 {selectedReview.category} 전문가</div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedReview(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center gap-0.5 text-amber-400">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} size={14} className={i < Math.floor(selectedReview.rating) ? 'fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                                            ))}
                                        </div>
                                        <span className="text-xs font-black text-slate-900 dark:text-white">{selectedReview.rating}</span>
                                    </div>
                                    <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium">
                                        {selectedReview.content}
                                    </p>
                                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <span className="text-[10px] font-black text-violet-600 uppercase tracking-widest block mb-1">참여 워크숍</span>
                                        <span className="text-xs font-black text-slate-900 dark:text-white">{selectedReview.workshopTitle}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <h4 className="text-xs font-black text-slate-900 dark:text-white mb-4 flex items-center gap-1.5 underline decoration-violet-500 underline-offset-4">
                                        댓글 {selectedReview.comments.length}개
                                    </h4>
                                    {selectedReview.comments.length === 0 ? (
                                        <div className="py-10 text-center text-slate-400 text-xs font-bold bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                            첫 댓글을 남겨보세요!
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {selectedReview.comments.map(c => (
                                                <div key={c.id} className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0" />
                                                    <div>
                                                        <div className="text-[11px] font-black text-slate-900 dark:text-white mb-0.5">{c.userName}</div>
                                                        <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 leading-normal">{c.content}</p>
                                                        <span className="text-[9px] text-slate-300 mt-1 block">{c.createdAt}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Interaction Bar */}
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-6">
                                        <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors group">
                                            <Heart size={22} className="group-hover:fill-rose-500 transition-colors" />
                                            <span className="text-xs font-black">{selectedReview.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-violet-500 transition-colors">
                                            <MessageCircle size={22} />
                                            <span className="text-xs font-black">{selectedReview.comments.length}</span>
                                        </button>
                                        <button className="text-slate-600 dark:text-slate-300 hover:text-slate-900 transition-colors">
                                            <Share2 size={22} />
                                        </button>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="따뜻한 댓글로 작가님을 응원하세요..." 
                                        className="w-full pl-0 pr-12 py-2 bg-transparent border-none focus:ring-0 text-xs font-bold outline-none placeholder:text-slate-300 text-slate-900 dark:text-white"
                                    />
                                    <button className="absolute right-0 top-1/2 -translate-y-1/2 text-violet-600 font-black text-xs hover:text-violet-700 transition-colors">
                                        게시
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewPride;
