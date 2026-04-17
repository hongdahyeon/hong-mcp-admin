import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { MOCK_PAYMENT_METHODS, PaymentMethodItem } from '@/constants/payments';
import { useNavigate } from 'react-router-dom';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalPrice: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, totalPrice }) => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const [selectedCardId, setSelectedCardId] = useState<string>(MOCK_PAYMENT_METHODS.find(m => m.isDefault)?.id || MOCK_PAYMENT_METHODS[0].id);
    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

    if (!isOpen) return null;

    const handlePayment = () => {
        setStatus('PROCESSING');
        // Simulate payment processing
        setTimeout(() => {
            setStatus('SUCCESS');
            // After success, clear cart and eventually navigate
            setTimeout(() => {
                clearCart();
                navigate('/my/reservations');
            }, 2000);
        }, 1500);
    };

    const getCardGradient = (theme: string) => {
        switch (theme) {
            case 'violet': return 'from-violet-600 to-indigo-800';
            case 'slate': return 'from-slate-700 to-slate-900';
            case 'rose': return 'from-rose-500 to-pink-700';
            case 'emerald': return 'from-emerald-500 to-teal-700';
            default: return 'from-slate-600 to-slate-800';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300 px-6">
            <div 
                className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]" 
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">주문 및 결제</h2>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">최종 내역을 확인하고 결제를 진행하세요.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        disabled={status === 'PROCESSING'}
                        className="p-2 text-slate-400 hover:text-rose-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {status === 'SUCCESS' ? (
                        <div className="py-12 text-center animate-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-6 shadow-xl shadow-emerald-100 dark:shadow-none">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">결제가 완료되었습니다!</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">잠시 후 예약 내역 페이지로 이동합니다.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Order Summary Summary */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">주문 상품 요약</h4>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{cartItems.length}개 항목</span>
                                </div>
                                <div className="space-y-3">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                                            <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">{item.category} · {item.instructor}</p>
                                            </div>
                                            <div className="text-sm font-bold text-slate-900 dark:text-white">₩{item.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Payment Method Selection */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">결제 수단 선택</h4>
                                    <button 
                                        onClick={() => navigate('/my/payments')}
                                        className="text-[10px] font-bold text-violet-600 dark:text-violet-400 hover:underline"
                                    >
                                        관리하기
                                    </button>
                                </div>
                                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar snap-x">
                                    {MOCK_PAYMENT_METHODS.map((card) => (
                                        <div 
                                            key={card.id}
                                            onClick={() => status === 'IDLE' && setSelectedCardId(card.id)}
                                            className={`min-w-[180px] h-28 rounded-2xl bg-gradient-to-br ${getCardGradient(card.theme)} p-4 text-white shadow-lg cursor-pointer transition-all snap-center relative overflow-hidden group ${
                                                selectedCardId === card.id ? 'ring-2 ring-violet-400 ring-offset-2 dark:ring-offset-slate-900 scale-[1.02]' : 'opacity-60 grayscale-[0.3] hover:opacity-90'
                                            }`}
                                        >
                                            <div className="relative z-10 h-full flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[10px] font-black tracking-widest opacity-80">{card.cardName}</span>
                                                    <CreditCard size={14} className="opacity-60" />
                                                </div>
                                                <div className="font-mono text-sm tracking-widest mt-auto">
                                                    **** {card.cardNumberMasked.slice(-4)}
                                                </div>
                                            </div>
                                            {selectedCardId === card.id && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-violet-600 shadow-sm">
                                                        <CheckCircle2 size={12} strokeWidth={3} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Final Amount */}
                            <section className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">총 상품 금액</span>
                                        <span className="text-slate-900 dark:text-white font-bold">₩{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">할인 금액</span>
                                        <span className="text-emerald-500 font-black">- ₩0</span>
                                    </div>
                                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-2 shadow-[0_1px_rgba(255,255,255,0.1)]"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-black text-slate-800 dark:text-slate-200">최종 결제 금액</span>
                                        <span className="text-2xl font-black text-violet-600 dark:text-violet-400">
                                            <span className="text-sm font-medium mr-1">₩</span>
                                            {totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                                <ShieldCheck size={18} className="flex-shrink-0" />
                                <p className="text-[10px] font-bold leading-tight">개인정보 수집 및 제3자 제공 주장에 동의하며, 위 결제 금액을 확인하였으며 결제를 진행합니다.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {status !== 'SUCCESS' && (
                    <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <button 
                            onClick={handlePayment}
                            disabled={status === 'PROCESSING'}
                            className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-[1.25rem] font-black transition-all shadow-xl shadow-violet-200 dark:shadow-none flex items-center justify-center gap-2 group disabled:opacity-70"
                        >
                            {status === 'PROCESSING' ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>결제 처리 중...</span>
                                </>
                            ) : (
                                <>
                                    <span>{totalPrice.toLocaleString()}원 결제 완료</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
