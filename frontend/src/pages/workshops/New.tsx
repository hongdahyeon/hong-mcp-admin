import React, { useState } from 'react';
import { 
    Plus, Image as ImageIcon, MapPin, Tag, 
    WonWheel, Info, BookOpen, User, 
    CheckCircle2, ChevronLeft, Save, X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { REGIONS, CATEGORIES } from '@/constants/workshop';
import { Workshop } from '@/types/workshop';

const WorkshopNew: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: CATEGORIES[0],
        region: REGIONS[0],
        price: '',
        imageUrl: '',
        instructor: '',
        description: '',
        curriculum: ['', '', ''],
        instructorBio: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCurriculumChange = (index: number, value: string) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[index] = value;
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const addCurriculumStep = () => {
        setFormData(prev => ({ ...prev, curriculum: [...prev.curriculum, ''] }));
    };

    const removeCurriculumStep = (index: number) => {
        if (formData.curriculum.length > 1) {
            const newCurriculum = formData.curriculum.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newWorkshop: Workshop = {
            id: Date.now().toString(),
            ...formData,
            rating: 0,
            reviews: 0,
        };

        const existingStr = localStorage.getItem('MY_WORKSHOPS');
        const existing = existingStr ? JSON.parse(existingStr) : [];
        const updated = [newWorkshop, ...existing];
        
        localStorage.setItem('MY_WORKSHOPS', JSON.stringify(updated));
        
        setIsSubmitting(false);
        navigate('/workshops/manage');
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold mb-4"
                    >
                        <ChevronLeft size={20} /> 취소하고 돌아가기
                    </button>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">새 공방 등록</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">당신의 감성을 나눌 새로운 클래스를 만들어보세요.</p>
                </div>
            </div>

            <div className="max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-10">
                {/* Basic Information Section */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                        <Info size={24} className="text-violet-500" /> 기본 정보
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4 md:col-span-2">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300">클래스 제목</label>
                            <input 
                                required
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="예: [서촌] 한옥에서 즐기는 전통 자수"
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-violet-500 transition-all font-bold text-slate-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300">카테고리</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-violet-500 transition-all font-bold text-slate-900 dark:text-white cursor-pointer"
                            >
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300">지역</label>
                            <select 
                                name="region"
                                value={formData.region}
                                onChange={handleChange}
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-violet-500 transition-all font-bold text-slate-900 dark:text-white cursor-pointer"
                            >
                                {REGIONS.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300">참가비 (1인당 원화)</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₩</span>
                                <input 
                                    required
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="예: 45,000"
                                    className="w-full pl-10 pr-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-violet-500 transition-all font-bold text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300">대표 이미지 URL</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Plus size={18} />
                                </span>
                                <input 
                                    required
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-violet-500 transition-all font-bold text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Information Section */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                        <BookOpen size={24} className="text-violet-500" /> 상세 정보
                    </h2>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300">공반/클래스 소개</label>
                            <textarea 
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="공방의 분위기와 클래스의 핵심 매력을 설명해주세요."
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-violet-500 transition-all font-bold text-slate-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-black text-slate-700 dark:text-slate-300">커리큘럼 (단계별 수업 내용)</label>
                                <button 
                                    type="button"
                                    onClick={addCurriculumStep}
                                    className="text-xs font-black text-violet-600 dark:text-violet-400 flex items-center gap-1"
                                >
                                    <Plus size={14} /> 단계 추가
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.curriculum.map((step, index) => (
                                    <div key={index} className="flex gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center font-black flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <input 
                                            required
                                            value={step}
                                            onChange={(e) => handleCurriculumChange(index, e.target.value)}
                                            placeholder={`단계 ${index + 1} 내용을 입력하세요`}
                                            className="flex-1 px-5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-violet-500 transition-all font-bold text-slate-900 dark:text-white"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => removeCurriculumStep(index)}
                                            className="p-2.5 text-slate-300 hover:text-rose-500 transition-all"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructor Section */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                        <User size={24} className="text-violet-500" /> 강사 정보
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300">강사명 / 작가명</label>
                            <input 
                                required
                                name="instructor"
                                value={formData.instructor}
                                onChange={handleChange}
                                placeholder="예: 김연우 명인"
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-violet-500 transition-all font-bold text-slate-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <label className="text-sm font-black text-slate-700 dark:text-slate-300">강사 한줄 소개 (Bio)</label>
                            <textarea 
                                required
                                name="instructorBio"
                                value={formData.instructorBio}
                                onChange={handleChange}
                                rows={2}
                                placeholder="강사님의 전문 분야나 경력을 소개해주세요."
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-violet-500 transition-all font-bold text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pb-12">
                    <button 
                        type="button"
                        onClick={() => navigate('/workshops/manage')}
                        className="px-8 py-4 text-slate-500 hover:text-slate-900 dark:hover:text-white font-black transition-all"
                    >
                        취소
                    </button>
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`group relative px-10 py-4 bg-violet-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-violet-200 dark:shadow-none hover:bg-violet-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                등록 중...
                            </>
                        ) : (
                            <>
                                <Save size={20} /> 클래스 등록 완료
                            </>
                        )}
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default WorkshopNew;
