import React from 'react';
import { useCart } from '@/hooks/CartContext';
import { ShoppingCart, Trash2, ArrowRight, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useCart();

    const totalPrice = cartItems.reduce((acc, item) => {
        const price = parseInt(item.price.replace(/,/g, ''));
        return acc + price;
    }, 0);

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">장바구니</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">선택하신 클래스들을 확인하고 주문을 진행하세요.</p>
                </div>
                <div className="bg-violet-50 dark:bg-violet-900/30 px-4 py-2 rounded-2xl border border-violet-100 dark:border-violet-800">
                    <span className="text-sm font-bold text-violet-600 dark:text-violet-400">총 {cartItems.length}개 항목</span>
                </div>
            </div>

            {cartItems.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl py-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-600">
                        <ShoppingCart size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">장바구니가 비어있습니다</h2>
                    <p className="text-slate-400 dark:text-slate-500 mb-8 font-medium">마음에 드는 클래스를 직접 경험해보세요!</p>
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 dark:shadow-none">
                        <Home size={18} /> 클래스 구경하기
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div 
                                key={item.id} 
                                onClick={() => navigate(`/workshops/${item.id}`)}
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex gap-4 hover:border-violet-300 dark:hover:border-violet-500 transition-all shadow-sm group cursor-pointer"
                            >
                                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 min-w-0 py-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest">{item.category}</span>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate mb-1">{item.title}</h3>
                                    <p className="text-xs text-slate-400 font-medium mb-3">{item.instructor} · {item.region}</p>
                                    <div className="text-lg font-black text-slate-900 dark:text-white">
                                        <span className="text-xs font-medium text-slate-500 mr-1">₩</span>
                                        {item.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 dark:bg-white rounded-3xl p-6 text-white dark:text-slate-900 sticky top-24 shadow-2xl">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                                결제 예정 금액
                            </h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-slate-400 dark:text-slate-500 font-bold">
                                    <span>상품 금액 ({cartItems.length}개)</span>
                                    <span>₩{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400 dark:text-slate-500 font-bold">
                                    <span>배송비/수수료</span>
                                    <span>FREE</span>
                                </div>
                                <div className="h-px bg-white/10 dark:bg-slate-100 my-4"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold opacity-70">최종 결제 금액</span>
                                    <span className="text-3xl font-black">
                                        <span className="text-sm font-medium mr-1 opacity-70">₩</span>
                                        {totalPrice.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-violet-600 dark:bg-violet-600 text-white rounded-2xl font-black hover:bg-violet-700 transition-all flex items-center justify-center gap-2 group border-0">
                                결제하기 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
