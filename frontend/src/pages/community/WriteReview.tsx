import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Upload, X, ArrowLeft } from 'lucide-react';
import { reservationService } from '@/api/reservationService';
import { Reservation } from '@/types/reservation';
import { MOCK_WORKSHOPS } from '@/constants/workshop';
import { MOCK_REVIEWS } from '@/constants/reviews';
import { useLanguage } from '@/hooks/LanguageContext';

const WriteReview: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedWorkshopId, setSelectedWorkshopId] = useState<string>('');
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    
    useEffect(() => {
        // Load only CONFIRMED reservations for review
        const data = reservationService.getUserReservations();
        const confrmed = data.filter(r => r.status === 'CONFIRMED');
        setReservations(confrmed);
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (images.length + files.length > 5) {
            alert(t('community.review.maxPhotoLimit'));
            return;
        }
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImages(prev => [...prev, event.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedWorkshopId) {
            alert(t('community.review.errorSelectWorkshop'));
            return;
        }
        if (content.length < 10) {
            alert(t('community.review.errorMinLength'));
            return;
        }
        if (images.length === 0) {
            alert(t('community.review.errorMinPhoto'));
            return;
        }

        const workshop = MOCK_WORKSHOPS.find(w => w.id === selectedWorkshopId);
        
        const newReview = {
            id: `rev-${Date.now()}`,
            workshopId: selectedWorkshopId,
            workshopTitle: workshop?.title || t('workshop.unknown'),
            authorName: '강나은', // Mock user for now
            rating,
            content,
            images,
            likes: 0,
            comments: [],
            category: workshop?.category || '공예',
            createdAt: new Date().toISOString().split('T')[0]
        };

        // Mock 데이터를 최상단에 추가 (세션 유지)
        MOCK_REVIEWS.unshift(newReview);
        navigate('/community/reviews');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
                onClick={() => navigate('/community/reviews')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 font-bold"
            >
                <ArrowLeft size={18} /> {t('community.review.backToCommunity')}
            </button>
            
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                    {t('community.review.write')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    {t('community.review.writeDesc')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. 클래스 선택 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">{t('community.review.selectWorkshopTitle')}</h2>
                    {reservations.length === 0 ? (
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl text-center text-sm font-bold text-slate-500 border border-dashed border-slate-200 dark:border-slate-800">
                            {t('community.review.noReservationsForReview')}
                        </div>
                    ) : (
                        <select
                            value={selectedWorkshopId}
                            onChange={(e) => setSelectedWorkshopId(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-900 dark:text-white outline-none focus:border-violet-500 transition-colors"
                        >
                            <option value="">{t('community.review.selectFromReservations')}</option>
                            {reservations.map(res => {
                                const ws = MOCK_WORKSHOPS.find(w => w.id === res.workshopId);
                                return (
                                    <option key={res.id} value={res.workshopId}>
                                        {ws?.title} ({res.date})
                                    </option>
                                );
                            })}
                        </select>
                    )}
                </div>

                {/* 2. 별점 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">{t('community.review.howWasWorkshop')}</h2>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="p-1 transition-transform hover:scale-110"
                            >
                                <Star 
                                    size={36} 
                                    className={`${(hoverRating || rating) >= star ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200 dark:fill-slate-800 dark:text-slate-700'}`} 
                                />
                            </button>
                        ))}
                        <span className="ml-4 text-xl font-black text-amber-500">{t('community.review.ratingScore', { score: hoverRating || rating })}</span>
                    </div>
                </div>

                {/* 3. 사진 첨부 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-black text-slate-900 dark:text-white">{t('community.review.uploadPhotosTitle')}</h2>
                        <span className="text-xs font-bold text-slate-400">{images.length} / 5</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                                <img src={img} alt="preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(idx)}
                                    className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                        {images.length < 5 && (
                            <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:border-violet-500 hover:text-violet-500 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-950">
                                <Upload size={24} className="mb-2" />
                                <span className="text-[10px] font-bold">{t('community.review.attachPhoto')}</span>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    multiple 
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* 4. 내용 작성 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">{t('community.review.writeReviewTitle')}</h2>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={t('community.review.contentPlaceholder')}
                        className="w-full h-48 px-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-violet-500 transition-colors resize-none placeholder:text-slate-400"
                    />
                    <div className="text-right mt-2">
                        <span className={`text-xs font-bold ${content.length < 10 ? 'text-rose-500' : 'text-slate-400'}`}>
                            {t('community.review.charCount', { count: content.length })}
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button 
                        type="button"
                        onClick={() => navigate('/community/reviews')}
                        className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-[1.5rem] font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        {t('common.buttons.cancel')}
                    </button>
                    <button 
                        type="submit"
                        disabled={!selectedWorkshopId || content.length < 10 || images.length === 0}
                        className="flex-[2] py-4 bg-violet-600 text-white rounded-[1.5rem] font-black hover:bg-violet-700 transition-colors shadow-xl shadow-violet-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('common.buttons.create')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WriteReview;
