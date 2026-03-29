import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, Calendar, Clock, Users, 
    CheckCircle2, XCircle, AlertCircle, 
    MessageCircle, MoreVertical, ShieldCheck,
    Mail
} from 'lucide-react';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { Workshop } from '@/types/workshop';
import { MOCK_WORKSHOPS } from '@/constants/workshop';
import RejectModal from './components/RejectModal';

const WorkshopReservations: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [workshop, setWorkshop] = useState<Workshop | null>(null);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Status filter
    const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'ALL'>('ALL');
    
    // Rejection Modal state
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);

    useEffect(() => {
        // Find workshop
        const found = MOCK_WORKSHOPS.find(w => w.id === id);
        if (found) {
            setWorkshop(found);
        }

        // Load reservations from localStorage or create mock ones
        const saved = localStorage.getItem(`RESERVATIONS_${id}`);
        if (saved) {
            setReservations(JSON.parse(saved));
        } else {
            // Generate some mock reservations if none exist
            const mockRes: Reservation[] = [
                {
                    id: 'res-1',
                    workshopId: id || '',
                    userName: '김철수',
                    userEmail: 'chulsoo@example.com',
                    date: '2026-04-10',
                    time: '14:00',
                    guests: 2,
                    totalPrice: (Number(found?.price.replace(/,/g, '')) || 0) * 2,
                    status: 'PENDING',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'res-2',
                    workshopId: id || '',
                    userName: '이영희',
                    userEmail: 'younghee@example.com',
                    date: '2026-04-12',
                    time: '10:00',
                    guests: 1,
                    totalPrice: Number(found?.price.replace(/,/g, '')) || 0,
                    status: 'CONFIRMED',
                    createdAt: new Date().toISOString()
                }
            ];
            setReservations(mockRes);
            localStorage.setItem(`RESERVATIONS_${id}`, JSON.stringify(mockRes));
        }
        setIsLoading(false);
    }, [id]);

    const handleStatusChange = (resId: string, newStatus: ReservationStatus, reason?: string) => {
        const updated = reservations.map(res => {
            if (res.id === resId) {
                return { ...res, status: newStatus, rejectReason: reason };
            }
            return res;
        });
        setReservations(updated);
        localStorage.setItem(`RESERVATIONS_${id}`, JSON.stringify(updated));
    };

    const openRejectModal = (resId: string) => {
        setSelectedReservationId(resId);
        setIsRejectModalOpen(true);
    };

    const confirmReject = (reason: string) => {
        if (selectedReservationId) {
            handleStatusChange(selectedReservationId, 'REJECTED', reason);
        }
        setIsRejectModalOpen(false);
        setSelectedReservationId(null);
    };

    const filteredReservations = reservations.filter(res => 
        statusFilter === 'ALL' ? true : res.status === statusFilter
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    if (!workshop) {
        return (
            <div className="p-10 text-center">
                <AlertCircle size={48} className="mx-auto text-rose-500 mb-4" />
                <h2 className="text-2xl font-bold">공방을 찾을 수 없습니다.</h2>
                <button onClick={() => navigate('/workshops/manage')} className="mt-4 text-violet-600 font-bold">목록으로 돌아가기</button>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto px-4 py-8">
            {/* Header section */}
            <div className="mb-10">
                <button 
                    onClick={() => navigate('/workshops/manage')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-4 font-bold"
                >
                    <ChevronLeft size={20} /> 관리 목록으로 돌아가기
                </button>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-[10px] font-black uppercase tracking-widest leading-none">
                                {workshop.category}
                            </span>
                            <span className="text-xs font-bold text-slate-400">ID: {workshop.id}</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                            {workshop.title} <span className="text-slate-400 font-medium">예약 관리</span>
                        </h1>
                    </div>
                    
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                        {(['ALL', 'PENDING', 'CONFIRMED', 'REJECTED'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                                    statusFilter === status 
                                    ? 'bg-white dark:bg-slate-800 text-violet-600 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                            >
                                {status === 'ALL' ? '전체' : 
                                 status === 'PENDING' ? '대기' : 
                                 status === 'CONFIRMED' ? '확정' : '반려'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                {filteredReservations.length === 0 ? (
                    <div className="bg-white dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] py-20 text-center">
                        <Users size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">예약 내역이 없습니다</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">선택한 필터 조건에 맞는 예약 신청이 없습니다.</p>
                    </div>
                ) : (
                    filteredReservations.map((res) => (
                        <div 
                            key={res.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl transition-all group"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                {/* Left side: User Info */}
                                <div className="flex items-center gap-4 lg:w-1/4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-100 dark:shadow-none">
                                        {res.userName.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-lg font-black text-slate-900 dark:text-white truncate">{res.userName}</h4>
                                        <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                            <Mail size={12} /> {res.userEmail}
                                        </p>
                                    </div>
                                </div>

                                {/* Middle side: Appointment & Guests */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 lg:pl-10 lg:border-l border-slate-100 dark:border-slate-800">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">예약 날짜</span>
                                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-black">
                                            <Calendar size={14} className="text-violet-500" />
                                            <span className="text-sm">{res.date}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">예약 시간</span>
                                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-black">
                                            <Clock size={14} className="text-violet-500" />
                                            <span className="text-sm">{res.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">인원 및 금액</span>
                                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-black">
                                            <Users size={14} className="text-violet-500" />
                                            <span className="text-sm">{res.guests}명 (₩{res.totalPrice.toLocaleString()})</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side: Status & Actions */}
                                <div className="flex items-center justify-between lg:justify-end gap-3 lg:w-1/4 mt-4 lg:mt-0">
                                    <div className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-black ring-1 ring-inset ${
                                        res.status === 'PENDING' 
                                            ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 ring-amber-100 dark:ring-amber-900/30' 
                                            : res.status === 'CONFIRMED'
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 ring-emerald-100 dark:ring-emerald-900/30'
                                            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 ring-rose-100 dark:ring-rose-900/30'
                                    }`}>
                                        {res.status === 'PENDING' && <AlertCircle size={14} />}
                                        {res.status === 'CONFIRMED' && <CheckCircle2 size={14} />}
                                        {res.status === 'REJECTED' && <XCircle size={14} />}
                                        {res.status === 'PENDING' ? '대기 중' : res.status === 'CONFIRMED' ? '확정됨' : '반려됨'}
                                    </div>

                                    <div className="flex gap-2">
                                        {res.status === 'PENDING' && (
                                            <>
                                                <button 
                                                    onClick={() => handleStatusChange(res.id, 'CONFIRMED')}
                                                    className="px-4 py-2 bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-slate-200 dark:shadow-none"
                                                >
                                                    <ShieldCheck size={14} /> 승인
                                                </button>
                                                <button 
                                                    onClick={() => openRejectModal(res.id)}
                                                    className="px-4 py-2 border border-rose-100 hover:bg-rose-50 dark:border-rose-900/30 dark:hover:bg-rose-900/20 text-rose-500 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
                                                >
                                                    <XCircle size={14} /> 반려
                                                </button>
                                            </>
                                        )}
                                        {res.status === 'REJECTED' && res.rejectReason && (
                                            <div className="group/reason relative">
                                                <div className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-help">
                                                    <MessageCircle size={20} />
                                                </div>
                                                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover/reason:opacity-100 group-hover/reason:visible transition-all z-10">
                                                    <p className="text-[10px] font-black text-violet-500 dark:text-violet-400 mb-1 uppercase tracking-widest">거절 사유</p>
                                                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{res.rejectReason}</p>
                                                </div>
                                            </div>
                                        )}
                                        <button className="p-2 text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                                            <MoreVertical size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Reject Modal */}
            <RejectModal 
                isOpen={isRejectModalOpen} 
                onClose={() => setIsRejectModalOpen(false)} 
                onConfirm={confirmReject} 
            />
        </div>
    );
};

export default WorkshopReservations;
