import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, LogIn, UserPlus, ArrowRight, Mail } from 'lucide-react';
import { authService } from '@/api/auth';

const STORAGE_KEY = 'HONG_CRAFT_DAY';

const Login: React.FC = () => {
    const [userId, setUserId] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem(STORAGE_KEY));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await authService.login(userId, password);

            // 로그인 성공시 아이디 저장 처리
            if (rememberMe) {
                localStorage.setItem(STORAGE_KEY, userId);
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }

            navigate('/');
        } catch (err: any) {
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans p-4 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500 border border-transparent dark:border-slate-800">
                {/* Header Section */}
                <div className="bg-violet-600 p-8 text-center text-white relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Lock size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30">
                            <LogIn size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-1">CraftDay</h1>
                        <p className="text-violet-100 text-sm opacity-80 font-medium italic">감성이 숨 쉬는 공방, 크래프트데이</p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleLogin} className="p-8">
                    <div className="mb-6">
                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="userId">
                            이메일 아이디
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                                <Mail size={18} />
                            </div>
                            <input
                                id="userId"
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium"
                                placeholder="example@craftday.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="password">
                            비밀번호
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                                <Lock size={18} />
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium"
                                placeholder="비밀번호를 입력하세요"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center mb-8 ml-1">
                        <input
                            id="rememberMe"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 text-violet-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded focus:ring-violet-500 outline-none cursor-pointer"
                        />
                        <label htmlFor="rememberMe" className="ml-2 text-sm font-bold text-slate-500 dark:text-slate-400 cursor-pointer">
                            로그인 상태 유지
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-violet-600 text-white font-black py-4 rounded-xl shadow-lg shadow-violet-200 dark:shadow-violet-900/20 hover:bg-violet-700 transition-all active:scale-95 flex items-center justify-center gap-2 group mb-6"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                공방 탐색 시작하기 <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="text-center mb-8">
                        <Link to="/" className="text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors inline-flex items-center gap-1 group">
                            로그인 없이 <span className="text-violet-600 dark:text-violet-400 underline underline-offset-4 decoration-2">둘러보기</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 flex items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500">
                        <div>테스트 계정: admin@hong.craft / 1234</div>
                        <Link
                            to="/signup"
                            className="flex items-center gap-1 text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors"
                        >
                            <UserPlus size={14} /> 간편 회원가입
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;