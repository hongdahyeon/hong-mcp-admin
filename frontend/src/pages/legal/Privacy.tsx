import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext';

const Privacy: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">{t('legal.backToList')}</span>
                </button>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('legal.privacy.title')}</h1>
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">{t('legal.privacy.lastUpdated')}</p>
                        </div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-600 rounded-full inline-block" />
                                {t('legal.privacy.section1Title')}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                {t('legal.privacy.section1Body')}
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>{t('legal.privacy.section1Item1')}</li>
                                <li>{t('legal.privacy.section1Item2')}</li>
                                <li>{t('legal.privacy.section1Item3')}</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-600 rounded-full inline-block" />
                                {t('legal.privacy.section2Title')}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                {t('legal.privacy.section2Body')}
                            </p>
                            <ol className="list-decimal pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>{t('legal.privacy.section2Item1')}</li>
                                <li>{t('legal.privacy.section2Item2')}</li>
                                <li>{t('legal.privacy.section2Item3')}</li>
                            </ol>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-600 rounded-full inline-block" />
                                {t('legal.privacy.section3Title')}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                {t('legal.privacy.section3Body')}
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>{t('legal.privacy.section3Item1')}</li>
                                <li>{t('legal.privacy.section3Item2')}</li>
                                <li>{t('legal.privacy.section3Item3')}</li>
                            </ul>
                        </section>

                        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-slate-400 dark:text-slate-500 text-xs italic">
                                {t('legal.privacy.disclaimer')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
