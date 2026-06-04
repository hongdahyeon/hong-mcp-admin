import React, { useState, useEffect } from 'react';
import { X, Edit2, Tag, Type, CheckCircle, ChevronRight } from 'lucide-react';
import { adminService } from '@/api/admin';
import { BoardCode, BoardListResponse } from '@/types/board';

interface BoardEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    board: BoardListResponse | null;
}

const BoardEditModal: React.FC<BoardEditModalProps> = ({ isOpen, onClose, onSuccess, board }) => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        isUsed: true
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && board) {
            setFormData({
                code: board.boardCode || '',
                name: board.name || '',
                isUsed: board.isUsed ?? true
            });
        }
    }, [isOpen, board]);

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

        if (!formData.name) {
            alert('게시판 명칭을 입력해 주세요.');
            return;
        }

        setIsLoading(true);
        try {
            await adminService.changeBoard(board.id, {
                name: formData.name,
                isUsed: formData.isUsed
            });
            alert('게시판이 성공적으로 수정되었습니다.');
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Failed to update board:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !board) return null;

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
                <div className="bg-emerald-600 p-6 text-center text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-inner">
                            <Edit2 size={28} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-black mb-1 tracking-tight">게시판 수정</h1>
                        <p className="text-emerald-100 text-xs opacity-90 font-medium">기존 게시판의 설정을 변경합니다</p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                        {/* Board Code Field */}
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2" htmlFor="code">
                                <Tag size={14} className="text-emerald-500" />
                                게시판 코드
                            </label>
                            <div className="relative">
                                <input
                                    id="code"
                                    type="text"
                                    value={formData.code}
                                    readOnly
                                    className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-500 dark:text-slate-400 font-bold text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Board Name Field */}
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2" htmlFor="name">
                                <Type size={14} className="text-emerald-500" />
                                게시판 명칭
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
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
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-emerald-600 text-white font-black py-3.5 rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2 group mt-8"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                수정 완료 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BoardEditModal;
