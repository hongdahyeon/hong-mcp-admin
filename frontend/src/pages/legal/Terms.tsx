import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext';

const Terms: React.FC = () => {
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
                        <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400">
                            <Scale size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('legal.terms.title')}</h1>
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">{t('legal.terms.lastUpdated')}</p>
                        </div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-violet-600 rounded-full inline-block" />
                                {t('legal.terms.article1Title')}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                {t('legal.terms.article1Body')}
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-violet-600 rounded-full inline-block" />
                                {t('legal.terms.article2Title')}
                            </h2>
                            <ul className="list-disc pl-5 space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                                <li><strong>{t('legal.terms.article2Item1Label')}</strong>{t('legal.terms.article2Item1Text')}</li>
                                <li><strong>{t('legal.terms.article2Item2Label')}</strong>{t('legal.terms.article2Item2Text')}</li>
                                <li><strong>{t('legal.terms.article2Item3Label')}</strong>{t('legal.terms.article2Item3Text')}</li>
                                <li><strong>{t('legal.terms.article2Item4Label')}</strong>{t('legal.terms.article2Item4Text')}</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-violet-600 rounded-full inline-block" />
                                {t('legal.terms.article3Title')}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                {t('legal.terms.article3Body')}
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-violet-600 rounded-full inline-block" />
                                {t('legal.terms.article4Title')}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                {t('legal.terms.article4Sub')}
                            </p>
                            <ol className="list-decimal pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>{t('legal.terms.article4Item1')}</li>
                                <li>{t('legal.terms.article4Item2')}</li>
                                <li>{t('legal.terms.article4Item3')}</li>
                                <li>{t('legal.terms.article4Item4')}</li>
                            </ol>
                        </section>

                        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-slate-400 dark:text-slate-500 text-xs italic">
                                {t('legal.terms.disclaimer')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
