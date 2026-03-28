import React, { useState } from 'react';
import { 
    X, Calendar as CalendarIcon, Clock, Users, 
    ChevronLeft, ChevronRight, CheckCircle2, 
    CreditCard, ArrowRight, AlertCircle 
} from 'lucide-react';

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    workshopTitle: string;
    price: string;
    onConfirm: (data: any) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ 
    isOpen, onClose, workshopTitle, price, onConfirm 
}) => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [guests, setGuests] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calendar State
    const today = new Date();
    const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    // Calendar Helpers
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOffset = (year: number, month: number) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOffset = getFirstDayOffset(currentYear, currentMonth);
    const timeSlots = ['10:00', '13:00', '15:30', '19:00'];

    const isPrevMonthDisabled = currentYear <= today.getFullYear() && currentMonth <= today.getMonth();

    const handlePrevMonth = () => {
        if (!isPrevMonthDisabled) {
            setViewDate(new Date(currentYear, currentMonth - 1, 1));
            setSelectedDate(null); // Reset date on month change
        }
    };

    const handleNextMonth = () => {
        setViewDate(new Date(currentYear, currentMonth + 1, 1));
        setSelectedDate(null);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value);
        let newMonth = currentMonth;
        if (newYear === today.getFullYear() && currentMonth < today.getMonth()) {
            newMonth = today.getMonth();
        }
        setViewDate(new Date(newYear, newMonth, 1));
        setSelectedDate(null);
    };

    if (!isOpen) return null;

    const priceNumber = parseInt(price.replace(/,/g, ''));
    const totalPrice = (priceNumber * guests).toLocaleString();

    const handleConfirm = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const bookingDate = `${currentYear}.${String(currentMonth + 1).padStart(2, '0')}.${String(selectedDate).padStart(2, '0')}`;
        
        onConfirm({
            date: bookingDate,
            time: selectedTime,
            guests
        });
        setIsSubmitting(false);
        setStep(4); // Success step
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-[500px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-10 duration-500">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">예약하기</h3>
                        <p className="text-sm text-slate-500 font-medium truncate max-w-[300px]">{workshopTitle}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Bar */}
                {step < 4 && (
                    <div className="flex bg-slate-50 dark:bg-slate-950 px-6 py-2 gap-2">
                        {[1, 2, 3].map(i => (
                            <div 
                                key={i} 
                                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-800'}`} 
                            />
                        ))}
                    </div>
                )}

                <div className="p-8">
                    {/* Step 1: Date Selection */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                                    <CalendarIcon size={20} className="text-violet-500" /> 날짜를 선택하세요
                                </h4>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={handlePrevMonth}
                                        disabled={isPrevMonthDisabled}
                                        className={`p-1 transition-colors ${isPrevMonthDisabled ? 'text-slate-200' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        <ChevronLeft size={20}/>
                                    </button>
                                    
                                    <div className="flex items-center gap-1 font-black text-slate-900 dark:text-white text-sm">
                                        <select 
                                            value={currentYear} 
                                            onChange={handleYearChange}
                                            className="bg-transparent focus:outline-none cursor-pointer hover:text-violet-600 transition-colors"
                                        >
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <option key={i} value={today.getFullYear() + i}>{today.getFullYear() + i}년</option>
                                            ))}
                                        </select>
                                        <span>{currentMonth + 1}월</span>
                                    </div>

                                    <button 
                                        onClick={handleNextMonth}
                                        className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        <ChevronRight size={20}/>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 text-center mb-4">
                                {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                                    <span key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</span>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`empty-${i}`} />)}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const isSelected = selectedDate === day;
                                    
                                    // Calculate if this specific day is in the past
                                    const dateAtDay = new Date(currentYear, currentMonth, day);
                                    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                    const isPast = dateAtDay < todayDate;
                                    const isAvailable = !isPast;

                                    return (
                                        <button
                                            key={day}
                                            disabled={!isAvailable}
                                            onClick={() => setSelectedDate(day)}
                                            className={`h-10 rounded-xl font-bold transition-all text-sm
                                                ${isSelected 
                                                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-200 dark:shadow-none scale-110' 
                                                    : isAvailable 
                                                        ? 'hover:bg-violet-50 dark:hover:bg-violet-900/20 text-slate-700 dark:text-slate-300' 
                                                        : 'text-slate-200 dark:text-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'}`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                disabled={!selectedDate}
                                onClick={() => setStep(2)}
                                className="w-full mt-10 py-4 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                다음 단계 <ArrowRight size={20} />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Time & Guests */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <button 
                                onClick={() => setStep(1)}
                                className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1 mb-6"
                            >
                                <ChevronLeft size={14} /> 날짜 다시 선택
                            </button>

                            <section className="mb-8">
                                <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                    <Clock size={20} className="text-violet-500" /> 시간 선택
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {timeSlots.map(time => {
                                        const [hour, minute] = time.split(':').map(Number);
                                        const isToday = currentYear === today.getFullYear() && 
                                                      currentMonth === today.getMonth() && 
                                                      selectedDate === today.getDate();
                                        
                                        const isPastTime = isToday && (
                                            hour < today.getHours() || 
                                            (hour === today.getHours() && minute <= today.getMinutes())
                                        );
                                        const isAvailable = !isPastTime;

                                        return (
                                            <button
                                                key={time}
                                                disabled={!isAvailable}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-3 rounded-xl font-bold border transition-all
                                                    ${selectedTime === time 
                                                        ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-200' 
                                                        : isAvailable
                                                            ? 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-violet-300'
                                                            : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed'}`}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            <section>
                                <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                    <Users size={20} className="text-violet-500" /> 인원 선택
                                </h4>
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <div className="text-sm font-bold text-slate-600 dark:text-slate-300">참가 인원 (최대 4인)</div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => setGuests(Math.max(1, guests - 1))}
                                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-violet-600 hover:text-violet-600 transition-all font-black"
                                        >-</button>
                                        <span className="text-xl font-black text-slate-900 dark:text-white min-w-[20px] text-center">{guests}</span>
                                        <button 
                                            onClick={() => setGuests(Math.min(4, guests + 1))}
                                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-violet-600 hover:text-violet-600 transition-all font-black"
                                        >+</button>
                                    </div>
                                </div>
                            </section>

                            <button
                                disabled={!selectedTime}
                                onClick={() => setStep(3)}
                                className="w-full mt-10 py-4 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                예약 정보 확인 <ArrowRight size={20} />
                            </button>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-6">최종 예약 정보를 확인하세요</h4>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <span className="text-slate-500 font-bold">일정</span>
                                    <span className="text-slate-900 dark:text-white font-black">{currentYear}.{String(currentMonth + 1).padStart(2, '0')}.{String(selectedDate).padStart(2, '0')} · {selectedTime}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <span className="text-slate-500 font-bold">인원</span>
                                    <span className="text-slate-900 dark:text-white font-black">{guests}명</span>
                                </div>
                                <div className="flex justify-between items-center p-6 bg-violet-50 dark:bg-violet-900/20 rounded-[1.5rem] border-2 border-violet-100 dark:border-violet-800">
                                    <span className="text-violet-600 dark:text-violet-400 font-black">최종 결제 금액</span>
                                    <span className="text-2xl font-black text-violet-700 dark:text-violet-300">₩{totalPrice}</span>
                                </div>
                            </div>

                            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/50 mb-8 flex gap-3">
                                <AlertCircle size={20} className="text-amber-500 flex-shrink-0" />
                                <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                                    예약 취소 및 환불은 클래스 시작 3일 전까지 100% 가능하며, 이후에는 규정에 따라 차등 적용됩니다.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(2)}
                                    className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black hover:bg-slate-200 transition-all"
                                >
                                    이전
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={isSubmitting}
                                    className="flex-1 py-4 bg-violet-600 text-white rounded-2xl font-black text-lg hover:bg-violet-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-200 dark:shadow-none"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <><CreditCard size={20} /> 결제 및 예약 완료</>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div className="py-10 text-center animate-in zoom-in duration-500">
                             <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">예약 확정!</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-10">작가님에게 예약 정보가 전달되었습니다.<br/>선택하신 시간에 맞춰 설레는 마음으로 만나요!</p>
                            
                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all"
                            >
                                확인
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationModal;
