import React, { useState, useEffect } from 'react';
import { X, MessageSquarePlus, Tag, Type, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { adminService } from '@/api/admin';
import { BoardCode, SaveBoardRequest } from '@/types/board';

interface BoardCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const BoardCreateModal: React.FC<BoardCreateModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<SaveBoardRequest>({
        code: '',
        name: '',
        isUsed: true
    });

    const [boardCodes, setBoardCodes] = useState<BoardCode[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingCodes, setIsFetchingCodes] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const loadBoardCodes = async () => {
                setIsFetchingCodes(true);
                try {
                    const codes = await adminService.findBoardCodes();
                    setBoardCodes(codes);
                    if (codes.length > 0) {
                        setFormData(prev => ({ ...prev, code: codes[0] }));
                    }
                } catch (err) {
                    console.error('Failed to load board codes:', err);
                } finally {
                    setIsFetchingCodes(false);
                }
            };
            loadBoardCodes();
        } else {
            // Reset form when modal closes
            setFormData({
                code: '',
                name: '',
                isUsed: true
            });
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [id]: checkbox.checked }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.code || !formData.name) {
            const message = '모든 필수 항목을 입력해 주세요.';
            alert(message);
            return;
        }

        setIsLoading(true);
        try {
            await adminService.saveBoard(formData);
            const message = '게시판이 성공적으로 생성되었습니다!';
            alert(message);
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Failed to save board:', err);
            // Error handling is usually done in the axios interceptor, but we can add specific logic here if needed
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500 border border-transparent dark:border-slate-800">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header Section */}
                <div className="bg-indigo-600 p-6 text-center text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-inner">
                            <MessageSquarePlus size={28} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-black mb-1 tracking-tight">게시판 생성</h1>
                        <p className="text-indigo-100 text-xs opacity-90 font-medium">시스템에 새로운 게시판 기능을 추가합니다</p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                        {/* Board Code Field */}
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2" htmlFor="code">
                                <Tag size={14} className="text-indigo-500" />
                                게시판 코드
                            </label>
                            <div className="relative">
                                <select
                                    id="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    disabled={isFetchingCodes}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 dark:text-slate-100 font-bold appearance-none cursor-pointer text-sm"
                                >
                                    {isFetchingCodes ? (
                                        <option>로딩 중...</option>
                                    ) : (
                                        boardCodes.map(code => (
                                            <option key={code} value={code} className="dark:bg-slate-900">{code}</option>
                                        ))
                                    )}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                    <ChevronRight size={16} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Board Name Field */}
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2" htmlFor="name">
                                <Type size={14} className="text-indigo-500" />
                                게시판 명칭
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
                                placeholder="예: 공지사항, 자유게시판 등"
                                required
                            />
                        </div>

                        {/* IsUsed Toggle (Simple Checkbox with UI) */}
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className={formData.isUsed ? "text-emerald-500" : "text-slate-400"} />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">사용 여부</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    id="isUsed"
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={formData.isUsed}
                                    onChange={handleChange}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white font-black py-3.5 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2 group mt-8"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                게시판 저장하기 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BoardCreateModal;
