import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    const handleRegisterWorkshop = () => {
        const authDataString = localStorage.getItem('AUTH_DATA');
        const authData = authDataString ? JSON.parse(authDataString) : null;

        if (authData?.accessToken) {
            // 회원인 경우 공방 등록 화면으로 이동
            navigate('/workshops/manage/new');
        } else {
            // 비회원인 경우 로그인 화면으로 이동
            navigate('/login');
        }
    };

    return (
        <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-violet-600 rounded-lg flex items-center justify-center text-white font-black text-[10px]">C</div>
                        <span className="text-slate-900 dark:text-white font-extrabold tracking-tighter text-sm">CraftDay</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-slate-400 dark:text-slate-500 text-sm font-medium text-center md:text-left">
                            &copy; {new Date().getFullYear()} CraftDay. All rights reserved. 대한민국 No.1 공방 예약 플랫폼.
                        </p>
                        <button
                            onClick={handleRegisterWorkshop}
                            className="text-violet-600 dark:text-violet-400 text-sm font-bold hover:underline cursor-pointer transition-colors"
                        >
                            나도 공방 주인! 공방 등록하기 &rarr;
                        </button>
                    </div>

                    <div className="flex gap-6">
                        <button 
                            onClick={() => navigate('/terms')}
                            className="text-slate-500 dark:text-slate-400 text-xs font-bold hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer transition-colors"
                        >
                            이용약관
                        </button>
                        <button 
                            onClick={() => navigate('/privacy')}
                            className="text-slate-500 dark:text-slate-400 text-xs font-bold hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer transition-colors"
                        >
                            개인정보처리방침
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;