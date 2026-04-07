import React, { useState } from 'react';
import { Ticket, Coins, Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { MOCK_COUPONS, MOCK_POINT_SUMMARY, MOCK_POINT_HISTORY } from '@/constants/rewards';

const Coupons: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'COUPON' | 'POINT'>('COUPON');

    const availableCoupons = MOCK_COUPONS.filter(c => c.status === 'AVAILABLE');

    return (
        <div className="max-w-[1000px] mx-auto px-6 py-12 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">혜택 관리</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">보유하신 쿠폰과 마일리지를 알차게 사용해보세요.</p>
            </div>

            {/* Top Dashboard: VIP Card Style Summary */}
            <div className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 dark:from-slate-800 dark:to-slate-900 shadow-2xl mb-12 p-8 md:p-12 text-white">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    {/* Points Section */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 text-violet-200">
                            <Coins size={20} />
                            <span className="font-bold text-sm tracking-widest uppercase">My Points</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                                {MOCK_POINT_SUMMARY.totalPoints.toLocaleString()}
                            </span>
                            <span className="text-xl font-bold text-slate-400">P</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold">
                            <AlertCircle size={14} />
                            이번 달 소멸 예정 : {MOCK_POINT_SUMMARY.expiringThisMonth.toLocaleString()} P
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-32 bg-slate-700 mx-8" />
                    <div className="md:hidden w-full h-px bg-slate-700 my-2" />

                    {/* Coupons Section */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4 text-violet-200">
                            <Ticket size={20} />
                            <span className="font-bold text-sm tracking-widest uppercase">My Coupons</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-white">{availableCoupons.length}</span>
                                <span className="text-xs font-bold text-slate-400">사용 가능</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                <ChevronRight size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 mb-8">
                <button
                    onClick={() => setActiveTab('COUPON')}
                    className={`pb-4 px-4 text-lg font-black transition-all border-b-4 ${
                        activeTab === 'COUPON' 
                        ? 'border-violet-600 text-slate-900 dark:text-white' 
                        : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                >
                    사용 가능한 쿠폰
                </button>
                <button
                    onClick={() => setActiveTab('POINT')}
                    className={`pb-4 px-4 text-lg font-black transition-all border-b-4 ${
                        activeTab === 'POINT' 
                        ? 'border-violet-600 text-slate-900 dark:text-white' 
                        : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                >
                    포인트 내역
                </button>
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                
                {/* COUPON View */}
                {activeTab === 'COUPON' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {availableCoupons.length === 0 ? (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-slate-500 font-medium">현재 사용 가능한 쿠폰이 없습니다.</p>
                            </div>
                        ) : (
                            availableCoupons.map(coupon => (
                                <div key={coupon.id} className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex transition-transform hover:-translate-y-1 hover:shadow-md">
                                    {/* Left Ticket Stub (Violet Accent) */}
                                    <div className="w-1/3 bg-violet-50 dark:bg-violet-900/10 border-r border-dashed border-violet-200 dark:border-violet-800 p-6 flex flex-col items-center justify-center text-center relative">
                                        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white dark:bg-[#0f172a] rounded-full transform -translate-y-1/2 border-l border-slate-200 dark:border-slate-800 z-10" />
                                        
                                        <span className="text-violet-600 dark:text-violet-400 font-black text-3xl mb-1">
                                            {coupon.discountType === 'PERCENT' ? `${coupon.discountValue}%` : `${coupon.discountValue.toLocaleString()}원`}
                                        </span>
                                        <span className="text-xs font-bold text-violet-500 dark:text-violet-500">할인</span>
                                    </div>
                                    
                                    {/* Right Ticket Body */}
                                    <div className="w-2/3 p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black rounded uppercase tracking-wider">
                                                    APP 쿠폰
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2 line-clamp-2">
                                                {coupon.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono">
                                                {coupon.minOrderAmount === 0 ? '조건 없이 사용 가능' : `${coupon.minOrderAmount.toLocaleString()}원 이상 결제 시`}
                                            </p>
                                        </div>
                                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                                <Clock size={12} />
                                                {coupon.validUntil} 까지
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* POINT View */}
                {activeTab === 'POINT' && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                                        <th className="font-bold py-4 px-6 whitespace-nowrap">일자</th>
                                        <th className="font-bold py-4 px-6 whitespace-nowrap">내역</th>
                                        <th className="font-bold py-4 px-6 whitespace-nowrap text-right">포인트 증감</th>
                                        <th className="font-bold py-4 px-6 whitespace-nowrap text-right">잔액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_POINT_HISTORY.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="py-5 px-6 text-sm text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">
                                                {item.date}
                                            </td>
                                            <td className="py-5 px-6">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                                                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1 inline-block">
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-right whitespace-nowrap">
                                                <span className={`text-base font-black ${
                                                    item.amount > 0 ? 'text-violet-600 dark:text-violet-400' : 'text-slate-900 dark:text-slate-300'
                                                }`}>
                                                    {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()} P
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-right whitespace-nowrap">
                                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 font-mono">
                                                    {item.balance.toLocaleString()} P
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Coupons;
