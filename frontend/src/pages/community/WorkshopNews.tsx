import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Newspaper, Eye, X, ChevronRight, Calendar } from 'lucide-react';
import { MOCK_NEWS, WorkshopNewsItem } from '@/constants/news';

const WorkshopNews: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedNews, setSelectedNews] = useState<WorkshopNewsItem | null>(null);

    const categories = ['전체', '이벤트', '신규 오픈', '클래스 소식', '공지사항'];
    
    // 가장 먼저 노출할 Featured 기사 찾기
    const featuredNews = MOCK_NEWS.find(n => n.isFeatured);
    // 선택된 카테고리에 맞는 기사 필터링 (Featured는 전체탭일 때 중복 노출을 피하거나 유지할 수 있음)
    // 여기선 featured된 것도 리스트에 포함시키거나 제외할 수 있는데, 일단 제외해보겠습니다.
    const filteredNews = MOCK_NEWS.filter(n => 
        (selectedCategory === '전체' ? true : n.category === selectedCategory) && 
        (selectedCategory === '전체' ? !n.isFeatured : true)
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-violet-600 font-black text-sm uppercase tracking-widest mb-3">
                        <Newspaper size={16} /> Community
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                        공방 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">소식</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                        CraftDay 작가님들이 전하는 특별한 이벤트와 새로운 클래스 소식을 구독해보세요.
                    </p>
                </div>
            </div>

            {/* Featured Post (Hero) */}
            {featuredNews && selectedCategory === '전체' && (
                <section className="mb-16">
                    <div 
                        onClick={() => setSelectedNews(featuredNews)}
                        className="group relative w-full rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl h-[400px] md:h-[500px]"
                    >
                        <img 
                            src={featuredNews.thumbnail} 
                            alt={featuredNews.title} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent flex items-center">
                            <div className="px-8 md:px-16 md:w-1/2">
                                <span className="inline-block px-4 py-1 rounded-full bg-violet-600 text-white text-xs font-black tracking-widest uppercase mb-6 animate-pulse">
                                    {featuredNews.category}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                                    {featuredNews.title}
                                </h2>
                                <p className="text-lg text-slate-200 font-medium mb-8 line-clamp-2">
                                    {featuredNews.summary}
                                </p>
                                <div className="flex items-center gap-6 text-sm font-bold text-white/80">
                                    <span className="flex items-center gap-2"><Calendar size={16} /> {featuredNews.date}</span>
                                    <span className="flex items-center gap-2"><Eye size={16} /> {featuredNews.viewCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Filter */}
            <div className="flex items-center justify-between gap-6 mb-10 border-b border-slate-100 dark:border-slate-800 pb-8 overflow-x-auto custom-scrollbar">
                <div className="flex gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-black whitespace-nowrap transition-all ${
                                selectedCategory === cat
                                ? 'bg-violet-600 text-white shadow-lg shadow-violet-100 dark:shadow-none'
                                : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Post List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map(news => (
                    <article 
                        key={news.id} 
                        onClick={() => setSelectedNews(news)}
                        className="group flex flex-col bg-white dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-2xl transition-all"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <img 
                                src={news.thumbnail} 
                                alt={news.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur text-slate-900 dark:bg-slate-900/90 dark:text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase shadow-sm">
                                    {news.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="text-[10px] font-black text-violet-600 mb-2 uppercase">{news.author}</div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
                                    {news.title}
                                </h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2">
                                    {news.summary}
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50 dark:border-slate-900 text-xs font-bold text-slate-400">
                                <span>{news.date}</span>
                                <span className="flex items-center gap-1"><Eye size={14} /> {news.viewCount}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Detail Modal */}
            {selectedNews && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedNews(null)} />
                    <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in slide-in-from-bottom-10 duration-500">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 py-6 flex items-center justify-between z-10 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-violet-600 font-black text-xs uppercase tracking-widest">{selectedNews.category}</span>
                            <button onClick={() => setSelectedNews(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                                <X size={20} />
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="overflow-y-auto w-full custom-scrollbar">
                            {/* Header details */}
                            <div className="px-8 md:px-16 pt-10 pb-8 text-center max-w-3xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                                    {selectedNews.title}
                                </h2>
                                <div className="flex items-center justify-center gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                                    <span className="text-slate-900 dark:text-white">{selectedNews.author}</span>
                                    <span>•</span>
                                    <span>{selectedNews.date}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Eye size={14} /> {selectedNews.viewCount}</span>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="w-full h-[300px] md:h-[450px]">
                                <img src={selectedNews.thumbnail} alt={selectedNews.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Content */}
                            <div className="px-8 md:px-16 py-12 max-w-3xl mx-auto">
                                <p className="text-slate-800 dark:text-slate-200 text-lg leading-loose font-medium whitespace-pre-wrap">
                                    {selectedNews.content}
                                </p>

                                <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
                                    <button 
                                        onClick={() => {
                                            setSelectedNews(null);
                                            navigate('/workshops');
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-violet-600 text-white rounded-[2rem] font-black text-lg hover:bg-violet-700 transition-all shadow-xl shadow-violet-200 dark:shadow-none hover:-translate-y-1"
                                    >
                                        공방 둘러보기 <ChevronRight size={20} />
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

export default WorkshopNews;
