import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, UserPlus, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { authService } from '@/api/auth';
import { UserSaveRequest } from '@/types/auth';

interface UserCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const UserCreateModal: React.FC<UserCreateModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<UserSaveRequest & { confirmPassword: string }>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const [roles, setRoles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checks, setChecks] = useState({
        email: { status: 'idle', message: '' },
        username: { status: 'idle', message: '' }
    });

    useEffect(() => {
        if (isOpen) {
            const loadRoles = async () => {
                try {
                    const data = await authService.findUserRoles();
                    setRoles(data);
                    if (data.length > 0) setFormData(prev => ({ ...prev, role: data[0] }));
                } catch (err) {
                    console.error('Failed to load roles:', err);
                }
            };
            loadRoles();
        } else {
            // Reset form when modal closes
            setFormData({
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
                role: ''
            });
            setChecks({
                email: { status: 'idle', message: '' },
                username: { status: 'idle', message: '' }
            });
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        if (id === 'email' || id === 'username') {
            setChecks(prev => ({
                ...prev,
                [id]: { status: 'idle', message: '' }
            }));
        }
    };

    const handleCheckEmail = async () => {
        if (!formData.email) return;
        setChecks(prev => ({ ...prev, email: { status: 'checking', message: '확인 중...' } }));
        try {
            const isDuplicate = await authService.checkEmailDuplicate(formData.email);
            setChecks(prev => ({
                ...prev,
                email: isDuplicate
                    ? { status: 'error', message: '이미 사용 중인 이메일입니다.' }
                    : { status: 'success', message: '사용 가능한 이메일입니다.' }
            }));
        } catch (err) {
            setChecks(prev => ({ ...prev, email: { status: 'error', message: '확인 실패' } }));
        }
    };

    const handleCheckUsername = async () => {
        if (!formData.username) return;
        setChecks(prev => ({ ...prev, username: { status: 'checking', message: '확인 중...' } }));
        try {
            const isDuplicate = await authService.checkUsernameDuplicate(formData.username);
            setChecks(prev => ({
                ...prev,
                username: isDuplicate
                    ? { status: 'error', message: '이미 사용 중인 아이디입니다.' }
                    : { status: 'success', message: '사용 가능한 아이디입니다.' }
            }));
        } catch (err) {
            setChecks(prev => ({ ...prev, username: { status: 'error', message: '확인 실패' } }));
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (checks.email.status !== 'success' || checks.username.status !== 'success') {
            alert('이메일 및 아이디 중복 확인이 필요합니다.');
            return;
        }

        setIsLoading(true);
        try {
            const { confirmPassword, ...signupData } = formData;
            await authService.signup(signupData);
            alert('사용자 등록이 완료되었습니다!');
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const isPasswordMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500 border border-transparent dark:border-slate-800 max-h-[96vh] overflow-y-auto">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header Section */}
                <div className="bg-violet-600 p-6 text-center text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-400/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-inner">
                            <UserPlus size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-1 tracking-tight">사용자 등록</h1>
                        <p className="text-violet-100 text-xs opacity-90 font-medium">새로운 서비스 이용자를 시스템에 등록합니다</p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSignup} className="p-6">
                    <div className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="email">
                                이메일 주소
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
                                        placeholder="example@craftday.com"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCheckEmail}
                                    className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs whitespace-nowrap"
                                >
                                    중복 확인
                                </button>
                            </div>
                            {checks.email.message && (
                                <p className={`mt-1.5 text-[10px] font-bold flex items-center gap-1 ml-1 ${checks.email.status === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {checks.email.status === 'success' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                    {checks.email.message}
                                </p>
                            )}
                        </div>

                        {/* Username (Name) Field */}
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="username">
                                사용자 이름
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                                        <User size={16} />
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
                                        placeholder="이름 또는 닉네임을 입력하세요"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCheckUsername}
                                    className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs whitespace-nowrap"
                                >
                                    중복 확인
                                </button>
                            </div>
                            {checks.username.message && (
                                <p className={`mt-1.5 text-[10px] font-bold flex items-center gap-1 ml-1 ${checks.username.status === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {checks.username.status === 'success' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                    {checks.username.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="password">
                                    비밀번호
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                                        <Lock size={16} />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
                                        placeholder="비밀번호 설정"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="confirmPassword">
                                    비밀번호 확인
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                                        <Lock size={16} />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm ${formData.confirmPassword ? (isPasswordMatch ? 'border-emerald-500 focus:border-emerald-500' : 'border-rose-500 focus:border-rose-500') : 'border-slate-200 dark:border-slate-700 focus:border-violet-500'
                                            }`}
                                        placeholder="비밀번호 재입력"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="role">
                                회원 유형
                            </label>
                            <select
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 font-bold appearance-none cursor-pointer text-sm"
                            >
                                {roles.map(role => (
                                    <option key={role} value={role} className="dark:bg-slate-900">{role}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-violet-600 text-white font-black py-3.5 rounded-xl shadow-xl shadow-violet-200 dark:shadow-violet-900/20 hover:bg-violet-700 transition-all active:scale-95 flex items-center justify-center gap-3 group mt-6"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                사용자 등록 완료 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserCreateModal;
