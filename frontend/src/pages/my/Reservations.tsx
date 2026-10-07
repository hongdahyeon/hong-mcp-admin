import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Calendar, Clock, Users, 
    CheckCircle2, XCircle, AlertCircle, 
    ChevronRight, MapPin, ShoppingBag,
    ArrowLeft
} from 'lucide-react';
import { Reservation } from '@/types/reservation';
import { MOCK_WORKSHOPS } from '@/constants/workshop';
import { reservationService } from '@/api/reservationService';
import { useLanguage } from '@/hooks/LanguageContext';

const MyReservations: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'CONFIRMED' | 'REJECTED'>('ALL');

    useEffect(() => {
        // Load reservations
        const data = reservationService.getUserReservations();
        setReservations(data);
        setIsLoading(false);
    }, []);

    const filteredReservations = reservations.filter(res => 
        filter === 'ALL' ? true : res.status === filter
    );

    const getWorkshopInfo = (wsId: string) => {
        return MOCK_WORKSHOPS.find(w => w.id === wsId);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="mb-10">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-6 font-bold"
                >
                    <ArrowLeft size={18} /> {t('my.reservations.backToMain')}
                </button>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">{t('my.reservations.title')}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{t('my.reservations.desc')}</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl w-fit border border-slate-200 dark:border-slate-800">
                {(['ALL', 'PENDING', 'CONFIRMED', 'REJECTED'] as const).map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                            filter === s 
                            ? 'bg-white dark:bg-slate-800 text-violet-600 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                    >
                        {s === 'ALL' ? t('my.reservations.filterAll') : 
                         s === 'PENDING' ? t('my.reservations.filterPending') : 
                         s === 'CONFIRMED' ? t('my.reservations.filterConfirmed') : t('my.reservations.filterRejected')}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-6">
                {filteredReservations.length === 0 ? (
                    <div className="bg-white dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] py-24 text-center">
                        <ShoppingBag size={64} className="mx-auto text-slate-200 mb-6" />
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t('my.reservations.noReservations')}</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">{t('my.reservations.findHobbyDesc')}</p>
                        <button 
                            onClick={() => navigate('/workshops')}
                            className="px-8 py-3 bg-violet-600 text-white rounded-2xl font-black hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 dark:shadow-none"
                        >
                            {t('my.reservations.exploreWorkshops')}
                        </button>
                    </div>
                ) : (
                    filteredReservations.map((res) => {
                        const workshop = getWorkshopInfo(res.workshopId);
                        return (
                            <div 
                                key={res.id}
                                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 md:p-8 hover:shadow-2xl transition-all group overflow-hidden relative"
                            >
                                <div className="flex flex-col lg:flex-row gap-8 items-center">
                                    {/* Workshop Image */}
                                    <div className="w-full lg:w-48 h-48 rounded-3xl overflow-hidden flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                                        <img 
                                            src={workshop?.imageUrl || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=400&h=300&auto=format&fit=crop'} 
                                            alt={workshop?.title || 'Workshop'} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-[10px] font-black uppercase tracking-wider">
                                                {workshop?.category ? t('category.' + workshop.category) : '워크숍'}
                                            </span>
                                            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                                <MapPin size={12} /> {workshop?.region || t('my.reservations.noRegionInfo')}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 line-clamp-1 group-hover:text-violet-600 transition-colors">
                                            {workshop?.title || t('workshop.unknown')}
                                        </h3>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('my.reservations.date')}</p>
                                                <p className="text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                                    <Calendar size={14} className="text-violet-500" /> {res.date}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('my.reservations.time')}</p>
                                                <p className="text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                                    <Clock size={14} className="text-violet-500" /> {res.time}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('my.reservations.guests')}</p>
                                                <p className="text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                                    <Users size={14} className="text-violet-500" /> {t('my.reservations.guestCount', { count: res.guests })}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('my.reservations.totalPrice')}</p>
                                                <p className="text-sm font-black text-slate-900 dark:text-white">
                                                    ₩{res.totalPrice.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Action */}
                                    <div className="flex flex-col items-center lg:items-end justify-center gap-4 lg:w-48 lg:border-l border-slate-100 dark:border-slate-800 lg:pl-8">
                                        <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-black shadow-sm ring-1 ring-inset ${
                                            res.status === 'PENDING' 
                                                ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 ring-amber-100 dark:ring-amber-900/30' 
                                                : res.status === 'CONFIRMED'
                                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 ring-emerald-100 dark:ring-emerald-900/30'
                                                : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 ring-rose-100 dark:ring-rose-900/30'
                                        }`}>
                                            {res.status === 'PENDING' && <AlertCircle size={14} />}
                                            {res.status === 'CONFIRMED' && <CheckCircle2 size={14} />}
                                            {res.status === 'REJECTED' && <XCircle size={14} />}
                                            {res.status === 'PENDING' ? t('my.reservations.statusPending') : res.status === 'CONFIRMED' ? t('my.reservations.statusConfirmed') : t('my.reservations.statusRejected')}
                                        </div>
                                        
                                        <button 
                                            onClick={() => navigate(`/workshops/${res.workshopId}`)}
                                            className="text-xs font-bold text-slate-400 hover:text-violet-600 transition-all flex items-center gap-1 group/btn"
                                        >
                                            {t('my.reservations.viewDetails')} <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                        
                                        {res.status === 'REJECTED' && res.rejectReason && (
                                            <div className="mt-2 p-3 bg-rose-50 dark:bg-rose-900/10 rounded-xl border border-rose-100 dark:border-rose-900/20 w-full">
                                                <p className="text-[10px] font-black text-rose-500 mb-1 uppercase tracking-tight">{t('my.reservations.rejectReason')}</p>
                                                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-tight">{res.rejectReason}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MyReservations;
