import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext';

const NotFound: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans p-6 text-center">
            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-3xl flex items-center justify-center text-rose-500 relative">
                        <AlertCircle size={48} />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-slate-900 rounded-full shadow-md flex items-center justify-center text-rose-500 font-black text-xs">404</div>
                    </div>
                </div>

                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t('error.notFound.title')}</h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 font-medium leading-relaxed">
                    {t('error.notFound.desc1')}<br />
                    {t('error.notFound.desc2')}
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-violet-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-violet-200 dark:shadow-none hover:bg-violet-700 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        <Home size={20} />
                        {t('error.notFound.goHome')}
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-bold py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        {t('error.notFound.goBack')}
                    </button>
                </div>

                <div className="mt-12">
                    <div className="flex items-center justify-center gap-2 opacity-30 grayscale">
                        <div className="w-6 h-6 bg-slate-800 dark:bg-slate-200 rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-black text-[10px]">C</div>
                        <span className="text-slate-900 dark:text-white font-extrabold tracking-tighter text-sm">CraftDay</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
