import React, { useState } from 'react';
import { X, AlertTriangle, MessageSquare } from 'lucide-react';

interface RejectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

const RejectModal: React.FC<RejectModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason.trim()) return;
        onConfirm(reason);
        setReason('');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-800">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-500">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">예약 반려</h3>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">
                        사용자에게 전달될 <strong className="text-slate-900 dark:text-white font-black underline underline-offset-4 decoration-rose-500/30">거절 사유</strong>를 입력해 주세요.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <div className="absolute top-4 left-4 text-slate-400 group-focus-within:text-violet-500 transition-colors">
                                <MessageSquare size={18} />
                            </div>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="예: 해당 시간에는 이미 예약이 찼습니다. 다른 시간대를 추천드립니다."
                                className="w-full h-32 pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none placeholder:text-slate-400"
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black transition-all"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                disabled={!reason.trim()}
                                className="flex-[2] py-4 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white rounded-2xl font-black shadow-lg shadow-rose-100 dark:shadow-none transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                확인 및 반려
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RejectModal;
