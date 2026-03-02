import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { authService } from '@/api/auth';
import { UserSaveRequest } from '@/types/auth';

const Signup: React.FC = () => {
    const navigate = useNavigate();
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
    }, []);

    // 입력값 변경
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        // Reset check status when input changes
        if (id === 'email' || id === 'username') {
            setChecks(prev => ({
                ...prev,
                [id]: { status: 'idle', message: '' }
            }));
        }
    };

    // 이메일 중복 체크
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

    // 사용자명 중복 체크
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

    // 회원가입
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
            alert('회원가입이 완료되었습니다! 로그인해 주세요.');
            navigate('/login');
        } catch (err: any) {
            alert(err.response?.data || '회원가입 실패. 입력 정보를 다시 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const isPasswordMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4 py-12">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Header Section */}
                <div className="bg-violet-600 p-10 text-center text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-400/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 border border-white/30 shadow-inner">
                            <UserPlus size={40} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">CraftDay</h1>
                        <p className="text-violet-100 text-sm opacity-90 font-medium italic">당신만의 감성 공방 라이프를 시작하세요</p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSignup} className="p-10">
                    <div className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1" htmlFor="email">
                                이메일 주소
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
                                        placeholder="example@craftday.com"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCheckEmail}
                                    className="px-4 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all text-sm whitespace-nowrap"
                                >
                                    중복 확인
                                </button>
                            </div>
                            {checks.email.message && (
                                <p className={`mt-2 text-xs font-bold flex items-center gap-1 ml-1 ${checks.email.status === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {checks.email.status === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                    {checks.email.message}
                                </p>
                            )}
                        </div>

                        {/* Username (Name) Field */}
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1" htmlFor="username">
                                사용자 이름
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <User size={18} />
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
                                        placeholder="이름 또는 닉네임을 입력하세요"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCheckUsername}
                                    className="px-4 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all text-sm whitespace-nowrap"
                                >
                                    중복 확인
                                </button>
                            </div>
                            {checks.username.message && (
                                <p className={`mt-2 text-xs font-bold flex items-center gap-1 ml-1 ${checks.username.status === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {checks.username.status === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                    {checks.username.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-700 text-sm font-bold mb-2 ml-1" htmlFor="password">
                                    비밀번호
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
                                        placeholder="비밀번호 설정"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-700 text-sm font-bold mb-2 ml-1" htmlFor="confirmPassword">
                                    비밀번호 확인
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3.5 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium ${formData.confirmPassword ? (isPasswordMatch ? 'border-emerald-500 focus:border-emerald-500' : 'border-rose-500 focus:border-rose-500') : 'border-slate-200 focus:border-violet-500'
                                            }`}
                                        placeholder="비밀번호 재입력"
                                        required
                                    />
                                </div>
                                {formData.confirmPassword && (
                                    <p className={`mt-2 text-[10px] font-bold flex items-center gap-1 ml-1 ${isPasswordMatch ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {isPasswordMatch ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다'}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1" htmlFor="role">
                                회원 유형
                            </label>
                            <select
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 font-bold appearance-none cursor-pointer"
                            >
                                {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-violet-600 text-white font-black py-4.5 rounded-2xl shadow-xl shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95 flex items-center justify-center gap-3 group mt-10 mb-6"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                크래프트데이 시작하기 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-slate-400 text-sm font-bold">
                            이미 계정이 있으신가요?{' '}
                            <Link to="/login" className="text-violet-600 hover:underline underline-offset-4 decoration-2">
                                로그인하기
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
