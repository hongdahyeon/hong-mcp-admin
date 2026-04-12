import React, { useState } from 'react';
import { CreditCard, Plus, Receipt, CheckCircle2, AlertCircle, RefreshCcw, Trash2, Pencil, Star, X } from 'lucide-react';
import { MOCK_PAYMENT_METHODS, MOCK_PAYMENT_HISTORY, PaymentMethodItem } from '@/constants/payments';

const Payments: React.FC = () => {
    // State management for cards to enable CRUD
    const [cards, setCards] = useState<PaymentMethodItem[]>(MOCK_PAYMENT_METHODS);
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        cardName: '',
        cardType: 'CREDIT' as 'CREDIT' | 'CHECK',
        brand: 'VISA' as 'VISA' | 'MASTER' | 'UNIONPAY' | 'LOCAL',
        lastFourDigits: '',
        theme: 'violet' as PaymentMethodItem['theme']
    });

    // Payment History Modal State
    const [selectedHistory, setSelectedHistory] = useState<typeof MOCK_PAYMENT_HISTORY[0] | null>(null);
    const [isHistoryDetailOpen, setIsHistoryDetailOpen] = useState(false);

    // Utility for card themes
    const getCardGradient = (theme: string) => {
        switch (theme) {
            case 'violet': return 'from-violet-600 to-indigo-800';
            case 'slate': return 'from-slate-700 to-slate-900';
            case 'rose': return 'from-rose-500 to-pink-700';
            case 'emerald': return 'from-emerald-500 to-teal-700';
            default: return 'from-slate-600 to-slate-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-black rounded-full"><CheckCircle2 size={12} /> 결제 완료</span>;
            case 'REFUNDED':
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-black rounded-full"><AlertCircle size={12} /> 전액 환불</span>;
            case 'PARTIAL_REFUND':
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-black rounded-full"><RefreshCcw size={12} /> 부분 환불</span>;
            default:
                return null;
        }
    };

    // Actions
    const handleSetDefault = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setCards(prev => prev.map(card => ({
            ...card,
            isDefault: card.id === id
        })));
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('정말로 이 결제 카드를 삭제하시겠습니까?')) {
            setCards(prev => prev.filter(card => card.id !== id));
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({
            cardName: '',
            cardType: 'CREDIT',
            brand: 'VISA',
            lastFourDigits: '',
            theme: 'emerald'
        });
        setIsModalOpen(true);
    };

    const openEditModal = (card: PaymentMethodItem, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingId(card.id);
        const lastFour = card.cardNumberMasked.slice(-4);
        setFormData({
            cardName: card.cardName,
            cardType: card.cardType,
            brand: card.brand,
            lastFourDigits: lastFour.includes('*') ? '' : lastFour,
            theme: card.theme
        });
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingId) {
            // Update
            setCards(prev => prev.map(card => {
                if (card.id === editingId) {
                    return {
                        ...card,
                        cardName: formData.cardName,
                        cardType: formData.cardType,
                        brand: formData.brand,
                        cardNumberMasked: `**** **** **** ${formData.lastFourDigits || '0000'}`,
                        theme: formData.theme
                    };
                }
                return card;
            }));
        } else {
            // Create
            const newCard: PaymentMethodItem = {
                id: `pm-custom-${Date.now()}`,
                cardName: formData.cardName,
                cardNumberMasked: `**** **** **** ${formData.lastFourDigits || '1234'}`,
                cardType: formData.cardType,
                brand: formData.brand,
                isDefault: cards.length === 0, // 첫 카드면 무조건 기본결제
                theme: formData.theme
            };
            setCards(prev => [...prev, newCard]);
        }
        setIsModalOpen(false);
    };

    const handleHistoryClick = (item: typeof MOCK_PAYMENT_HISTORY[0]) => {
        setSelectedHistory(item);
        setIsHistoryDetailOpen(true);
    };

    return (
        <div className="max-w-[1000px] mx-auto px-6 py-12 animate-in fade-in duration-700 relative">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">결제 관리</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">안전하고 간편한 결제 수단과 지난 결제 내역을 확인하세요.</p>
            </div>

            {/* Section 1: Payment Methods (Cards) */}
            <div className="mb-14">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <CreditCard className="text-violet-600" size={20} />
                        내 결제 수단
                    </h2>
                </div>

                {/* Horizontal scroll native implementation for cards */}
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar px-1 snap-x">
                    {/* Cards */}
                    {cards.map((card) => (
                        <div 
                            key={card.id} 
                            className={`min-w-[280px] sm:min-w-[320px] h-48 rounded-[1.5rem] bg-gradient-to-br ${getCardGradient(card.theme)} p-6 text-white shadow-lg relative overflow-hidden group snap-center cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl`}
                        >
                            {/* Card Decoration */}
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                            <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-black/10 rounded-full blur-xl" />
                            
                            <div className="relative h-full flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start h-8">
                                    <span className="text-sm font-black tracking-widest opacity-90">{card.cardName}</span>
                                    
                                    <span className="text-xs font-black uppercase tracking-widest px-2 py-1 bg-white/20 backdrop-blur-md rounded-md group-hover:opacity-0 transition-opacity duration-300">
                                        {card.brand}
                                    </span>

                                    {/* Action buttons on Hover */}
                                    <div className="absolute right-0 top-0 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        {!card.isDefault && (
                                            <button 
                                                className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center transition-colors" 
                                                title="기본 카드 설정"
                                                onClick={(e) => handleSetDefault(card.id, e)}
                                            >
                                                <Star size={12} className="text-white" />
                                            </button>
                                        )}
                                        <button 
                                            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center transition-colors" 
                                            title="카드 정보 수정"
                                            onClick={(e) => openEditModal(card, e)}
                                        >
                                            <Pencil size={12} className="text-white" />
                                        </button>
                                        <button 
                                            className="w-7 h-7 rounded-full bg-rose-500/90 hover:bg-rose-500 backdrop-blur-md flex items-center justify-center transition-colors shadow-lg" 
                                            title="카드 삭제"
                                            onClick={(e) => handleDelete(card.id, e)}
                                        >
                                            <Trash2 size={12} className="text-white" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="font-mono text-lg font-medium tracking-[0.2em] mb-4 opacity-90 flex gap-4">
                                        <span>****</span>
                                        <span>****</span>
                                        <span>****</span>
                                        <span>{card.cardNumberMasked.slice(-4)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs font-medium opacity-70">
                                            {card.cardType === 'CREDIT' ? '신용카드' : '체크카드'}
                                        </div>
                                        {card.isDefault && (
                                            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                                                기본 결제
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card Button */}
                    <div 
                        onClick={openAddModal}
                        className="min-w-[280px] sm:min-w-[320px] h-48 rounded-[1.5rem] border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 hover:text-violet-600 hover:border-violet-300 dark:hover:border-violet-600 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 cursor-pointer transition-all group snap-center"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-200/50 dark:bg-slate-700/50 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 flex items-center justify-center mb-3 transition-colors">
                            <Plus size={24} />
                        </div>
                        <span className="font-bold text-sm">새 결제 수단 등록</span>
                    </div>
                </div>
            </div>

            {/* Section 2: Payment History (Receipts) */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Receipt className="text-violet-600" size={20} />
                        결제 및 환불 내역
                    </h2>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                                    <th className="font-bold py-4 px-6 whitespace-nowrap hidden sm:table-cell">승인일시</th>
                                    <th className="font-bold py-4 px-6 whitespace-nowrap">결제처/상품명</th>
                                    <th className="font-bold py-4 px-6 whitespace-nowrap">결제수단</th>
                                    <th className="font-bold py-4 px-6 whitespace-nowrap text-right">금액</th>
                                    <th className="font-bold py-4 px-6 whitespace-nowrap text-center">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_PAYMENT_HISTORY.map((item) => {
                                    const usedCard = cards.find(m => m.id === item.paymentMethodId) || MOCK_PAYMENT_METHODS.find(m => m.id === item.paymentMethodId);
                                    
                                    return (
                                        <tr 
                                            key={item.id} 
                                            onClick={() => handleHistoryClick(item)}
                                            className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer group/row"
                                        >
                                            <td className="py-5 px-6 text-sm text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap hidden sm:table-cell">
                                                {item.transactionDate}
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="sm:hidden text-xs text-slate-400 font-mono mb-1">{item.transactionDate}</div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1">
                                                    {item.productName}
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-block">
                                                    {item.transactionId}
                                                </p>
                                            </td>
                                            <td className="py-5 px-6 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{usedCard?.cardName || '기타 결제'}</span>
                                                    <span className="text-[10px] text-slate-400 font-mono">{usedCard ? `끝자리 ${usedCard.cardNumberMasked.slice(-4)}` : '-'}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-right whitespace-nowrap text-slate-900 dark:text-white font-black">
                                                {item.amount.toLocaleString()}원
                                            </td>
                                            <td className="py-5 px-6 text-center whitespace-nowrap">
                                                {getStatusLabel(item.status)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                                <CreditCard size={18} className="text-violet-600" />
                                {editingId ? '결제 카드 수정' : '새 결제 카드 등록'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-rose-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="p-6">
                            <div className="space-y-5">
                                {/* Card Name */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mb-1.5 uppercase">카드 별칭 (이름)</label>
                                    <input 
                                        type="text"
                                        required
                                        maxLength={15}
                                        value={formData.cardName}
                                        onChange={e => setFormData({...formData, cardName: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors placeholder:font-medium placeholder:text-slate-400"
                                        placeholder="예: 현대카드 M3, 토스 체크카드"
                                    />
                                </div>

                                {/* Last Four Digits */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mb-1.5 uppercase">카드 끝자리 4번호</label>
                                    <input 
                                        type="text"
                                        required
                                        maxLength={4}
                                        pattern="\d{4}"
                                        value={formData.lastFourDigits}
                                        onChange={e => setFormData({...formData, lastFourDigits: e.target.value.replace(/\D/g, '')})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono rounded-xl px-4 py-3 outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors placeholder:font-sans placeholder:font-medium placeholder:text-slate-400"
                                        placeholder="예: 1234"
                                    />
                                </div>

                                {/* Multi Selectors */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mb-1.5 uppercase">결제 형식</label>
                                        <select 
                                            value={formData.cardType}
                                            onChange={e => setFormData({...formData, cardType: e.target.value as any})}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors appearance-none"
                                        >
                                            <option value="CREDIT">신용카드</option>
                                            <option value="CHECK">체크카드</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mb-1.5 uppercase">브랜드</label>
                                        <select 
                                            value={formData.brand}
                                            onChange={e => setFormData({...formData, brand: e.target.value as any})}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors appearance-none"
                                        >
                                            <option value="VISA">VISA</option>
                                            <option value="MASTER">MasterCard</option>
                                            <option value="UNIONPAY">UnionPay</option>
                                            <option value="LOCAL">국내전용</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Theme Color Picker */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mb-2 uppercase">디자인 테마 선택</label>
                                    <div className="flex gap-3">
                                        {[
                                            { id: 'violet', color: 'bg-violet-500' },
                                            { id: 'slate', color: 'bg-slate-700' },
                                            { id: 'rose', color: 'bg-rose-500' },
                                            { id: 'emerald', color: 'bg-emerald-500' }
                                        ].map(t => (
                                            <div 
                                                key={t.id}
                                                onClick={() => setFormData({...formData, theme: t.id as any})}
                                                className={`w-10 h-10 rounded-full cursor-pointer transition-transform flex items-center justify-center border-2 ${
                                                    formData.theme === t.id ? 'border-violet-400 scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                                                }`}
                                            >
                                                <div className={`w-8 h-8 rounded-full ${t.color}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="mt-8">
                                <button type="submit" className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-xl transition-all shadow-lg shadow-violet-200 dark:shadow-none focus:ring-4 focus:ring-violet-500/20">
                                    {editingId ? '변경 사항 저장' : '새 카드 등록 완료하기'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Payment History Detail Modal */}
            {isHistoryDetailOpen && selectedHistory && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div 
                        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300" 
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Receipt Top Section */}
                        <div className="relative bg-violet-600 px-8 pt-8 pb-10 text-center overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                            </div>
                            
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mb-3 text-white shadow-xl">
                                <Receipt size={28} />
                            </div>
                            <h2 className="text-xl font-black text-white mb-0.5">결제 상세 정보</h2>
                            <p className="text-violet-100 text-xs font-medium opacity-80">{selectedHistory.transactionDate} 결제</p>
                            
                            <button 
                                onClick={() => setIsHistoryDetailOpen(false)} 
                                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Receipt Middle Body */}
                        <div className="px-6 pb-8">
                            <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
                                <div className="space-y-6">
                                    {/* Product Section */}
                                    <div className="text-center pb-6 border-b border-dashed border-slate-200 dark:border-slate-700">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">PRODUCT INFO</p>
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 leading-tight">
                                            {selectedHistory.productName}
                                        </h3>
                                        <div className="flex justify-center">
                                            {getStatusLabel(selectedHistory.status)}
                                        </div>
                                    </div>

                                    {/* Detail Specs */}
                                    <div className="space-y-4 pt-1">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">주문 번호</span>
                                            <span className="text-xs font-mono font-black text-slate-700 dark:text-slate-300">{selectedHistory.transactionId}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">결제 수단</span>
                                            <div className="text-right">
                                                <div className="text-xs font-black text-slate-700 dark:text-slate-300">
                                                    {(cards.find(c => c.id === selectedHistory.paymentMethodId) || MOCK_PAYMENT_METHODS.find(c => c.id === selectedHistory.paymentMethodId))?.cardName || '기타 결제'}
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-mono">
                                                    {(cards.find(c => c.id === selectedHistory.paymentMethodId) || MOCK_PAYMENT_METHODS.find(c => c.id === selectedHistory.paymentMethodId))?.cardNumberMasked.slice(-4) || '****'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">거래 일시</span>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">{selectedHistory.transactionDate}</span>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-0.5">TOTAL</span>
                                            <span className="text-2xl font-black text-violet-600 dark:text-violet-400 tabular-nums">
                                                {selectedHistory.amount.toLocaleString()}원
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions Internal */}
                                    <div className="pt-2 flex gap-3">
                                        <button className="flex-[1.5] py-3.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-black rounded-[1rem] hover:bg-slate-800 dark:hover:bg-white transition-all shadow-xl text-xs flex items-center justify-center gap-2 active:scale-95">
                                            <Receipt size={16} /> 영수증 저장
                                        </button>
                                        <button 
                                            onClick={() => setIsHistoryDetailOpen(false)}
                                            className="flex-1 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-black rounded-[1rem] hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-xs active:scale-95"
                                        >
                                            닫기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payments;
