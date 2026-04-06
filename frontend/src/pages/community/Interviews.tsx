import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, X, ChevronRight, Quote } from 'lucide-react';
import { MOCK_INTERVIEWS, InterviewItem } from '@/constants/interviews';

const Interviews: React.FC = () => {
    const navigate = useNavigate();
    const [selectedInterview, setSelectedInterview] = useState<InterviewItem | null>(null);

    return (
        <div className="max-w-[1440px] mx-auto px-6 py-16 animate-in fade-in duration-1000">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20 animate-in slide-in-from-bottom-8 duration-700">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-black uppercase tracking-widest mb-6">
                    <PenTool size={14} /> CraftDay Original
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight">
                    창작의 순간을<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">인터뷰하다</span>
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    단순한 공방을 넘어선, 혼을 담아 예술을 빚어내는 작가님들의 진솔한 스토리를 담았습니다.<br className="hidden md:block" /> 
                    CraftDay가 만난 우리 주변 장인들의 영감을 얻어가세요.
                </p>
            </div>

            {/* Masonry / Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {MOCK_INTERVIEWS.map((interview, index) => (
                    <article 
                        key={interview.id}
                        onClick={() => setSelectedInterview(interview)}
                        className="group relative cursor-pointer flex flex-col animate-in fade-in slide-in-from-bottom-8"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        {/* Image Wrapper */}
                        <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                            <img 
                                src={interview.thumbnail} 
                                alt={interview.title} 
                                className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                            />
                            {/* Hover Overlay with Quote */}
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center">
                                <Quote size={40} className="text-white/30 mb-6 group-hover:-translate-y-2 transition-transform duration-700 delay-100" />
                                <p className="text-2xl md:text-3xl font-black text-white leading-snug group-hover:translate-y-0 translate-y-4 transition-transform duration-700 delay-200">
                                    "{interview.quote}"
                                </p>
                            </div>
                            {/* Author Badge */}
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg">
                                    <img src={interview.profileImage} alt={interview.authorName} className="w-full h-full object-cover" />
                                </div>
                                <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full">
                                    <span className="text-xs font-black text-slate-900">{interview.authorName}</span>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="px-4">
                            <span className="text-xs font-black text-violet-600 tracking-widest uppercase mb-3 block">
                                INTERVIEW
                            </span>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-violet-600 transition-colors">
                                {interview.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium line-clamp-3">
                                {interview.summary}
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            {/* Editorial Detail Modal */}
            {selectedInterview && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur text-white animate-in fade-in duration-300" onClick={() => setSelectedInterview(null)} />
                    <div className="relative w-full max-w-4xl bg-white dark:bg-slate-950 rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] animate-in zoom-in slide-in-from-bottom-10 duration-500">
                        {/* Close Button Mobile (Absolute) */}
                        <button onClick={() => setSelectedInterview(null)} className="absolute top-6 right-6 p-2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors text-slate-900 dark:text-white z-[120]">
                            <X size={24} />
                        </button>

                        {/* Left: Sticky Image Area for larger screens */}
                        <div className="md:w-5/12 relative h-[40vh] md:h-auto">
                            <img src={selectedInterview.thumbnail} alt={selectedInterview.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-8 md:p-12">
                                <div>
                                    <h4 className="text-white text-3xl font-black mb-2">{selectedInterview.authorName}</h4>
                                    <p className="text-slate-300 font-bold text-sm tracking-wide">{selectedInterview.workshopName}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Scrollable Content Area */}
                        <div className="md:w-7/12 overflow-y-auto px-8 md:px-12 py-12 custom-scrollbar relative bg-white dark:bg-slate-950">
                            {/* Headline */}
                            <div className="mb-12">
                                <p className="text-violet-600 font-black text-xs uppercase tracking-widest mb-4">Interview Story</p>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-8">
                                    "{selectedInterview.title}"
                                </h2>
                                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border-l-4 border-violet-600">
                                    {selectedInterview.summary}
                                </p>
                            </div>

                            {/* Q&A Section */}
                            <div className="space-y-12">
                                {selectedInterview.qaList.map((qa, index) => (
                                    <div key={index} className="group">
                                        {/* Question */}
                                        <div className="flex gap-4 mb-4">
                                            <span className="text-2xl font-black text-slate-200 dark:text-slate-800 shrink-0 select-none">Q.</span>
                                            <h4 className="text-xl font-black text-slate-900 dark:text-white leading-snug pt-1 group-hover:text-violet-600 transition-colors">
                                                {qa.q}
                                            </h4>
                                        </div>
                                        {/* Answer */}
                                        <div className="flex gap-4">
                                            <span className="text-2xl font-black text-violet-200 dark:text-violet-900/50 shrink-0 select-none">A.</span>
                                            <p className="text-slate-700 dark:text-slate-300 font-medium leading-loose pt-1.5">
                                                {qa.a}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Call to action */}
                            <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem]">
                                <div className="text-center md:text-left">
                                    <p className="text-slate-900 dark:text-white font-black text-lg mb-1">{selectedInterview.authorName} 작가님을 만나고 싶다면?</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">{selectedInterview.workshopName}</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        setSelectedInterview(null);
                                        navigate('/workshops');
                                    }}
                                    className="w-full md:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white text-sm font-black rounded-2xl transition-all shadow-xl shadow-violet-200 dark:shadow-none whitespace-nowrap"
                                >
                                    해당 공방 예약하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Interviews;
