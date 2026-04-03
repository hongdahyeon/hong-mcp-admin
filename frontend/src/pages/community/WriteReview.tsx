import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Upload, X, ArrowLeft } from 'lucide-react';
import { reservationService } from '@/api/reservationService';
import { Reservation } from '@/types/reservation';
import { MOCK_WORKSHOPS } from '@/constants/workshop';
import { MOCK_REVIEWS } from '@/constants/reviews';

const WriteReview: React.FC = () => {
    const navigate = useNavigate();
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
            alert('사진은 최대 5장까지 첨부 가능합니다.');
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
            alert('후기를 작성할 공방을 선택해주세요.');
            return;
        }
        if (content.length < 10) {
            alert('후기 내용은 최소 10자 이상 작성해주세요.');
            return;
        }
        if (images.length === 0) {
            alert('최소 1장 이상의 사진을 첨부해주세요.');
            return;
        }

        const workshop = MOCK_WORKSHOPS.find(w => w.id === selectedWorkshopId);
        
        const newReview = {
            id: `rev-${Date.now()}`,
            workshopId: selectedWorkshopId,
            workshopTitle: workshop?.title || '알 수 없는 공방',
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
                <ArrowLeft size={18} /> 커뮤니티로 돌아가기
            </button>
            
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                    후기 작성하기
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    직접 경험한 워크숍의 생생한 후기를 나누어 주세요.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. 클래스 선택 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">1. 방문한 공방 선택</h2>
                    {reservations.length === 0 ? (
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl text-center text-sm font-bold text-slate-500 border border-dashed border-slate-200 dark:border-slate-800">
                            후기를 작성할 수 있는 방문 완료 공방이 없습니다.
                        </div>
                    ) : (
                        <select
                            value={selectedWorkshopId}
                            onChange={(e) => setSelectedWorkshopId(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-900 dark:text-white outline-none focus:border-violet-500 transition-colors"
                        >
                            <option value="">예약 내역에서 선택해주세요</option>
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
                    <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">2. 공방은 어떠셨나요?</h2>
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
                        <span className="ml-4 text-xl font-black text-amber-500">{hoverRating || rating}점</span>
                    </div>
                </div>

                {/* 3. 사진 첨부 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-black text-slate-900 dark:text-white">3. 멋진 작품 사진 (최대 5장)</h2>
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
                                <span className="text-[10px] font-bold">사진 첨부</span>
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
                    <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">4. 솔직한 리뷰 작성</h2>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="공방의 분위기, 선생님의 친절함, 완성된 작품에 대한 만족도 등을 10자 이상 자유롭게 적어주세요!"
                        className="w-full h-48 px-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-violet-500 transition-colors resize-none placeholder:text-slate-400"
                    />
                    <div className="text-right mt-2">
                        <span className={`text-xs font-bold ${content.length < 10 ? 'text-rose-500' : 'text-slate-400'}`}>
                            {content.length} 자
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button 
                        type="button"
                        onClick={() => navigate('/community/reviews')}
                        className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-[1.5rem] font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        취소
                    </button>
                    <button 
                        type="submit"
                        disabled={!selectedWorkshopId || content.length < 10 || images.length === 0}
                        className="flex-[2] py-4 bg-violet-600 text-white rounded-[1.5rem] font-black hover:bg-violet-700 transition-colors shadow-xl shadow-violet-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WriteReview;
