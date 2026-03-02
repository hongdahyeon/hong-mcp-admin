import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-6 text-center">
            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 relative">
                        <AlertCircle size={48} />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-rose-500 font-black text-xs">404</div>
                    </div>
                </div>

                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">죄송합니다!</h1>
                <p className="text-lg text-slate-500 mb-10 font-medium leading-relaxed">
                    요청하신 페이지를 찾을 수가 없습니다.<br />
                    주소가 정확한지 다시 한번 확인해주세요.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-violet-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        <Home size={20} />
                        메인 홈페이지로 돌아가기
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-white text-slate-600 border border-slate-200 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        이전 페이지로 가기
                    </button>
                </div>

                <div className="mt-12">
                    <div className="flex items-center justify-center gap-2 opacity-30 grayscale">
                        <div className="w-6 h-6 bg-slate-800 rounded-lg flex items-center justify-center text-white font-black text-[10px]">C</div>
                        <span className="text-slate-900 font-extrabold tracking-tighter text-sm">CraftDay</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
