import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ko from '../lang/ko.json';
import en from '../lang/en.json';

export type Language = 'ko' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    t: (key: string, replacements?: Record<string, string | number>) => string;
}

const translations: Record<Language, any> = { ko, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage === 'ko' || savedLanguage === 'en') return savedLanguage;
        
        // 브라우저 기본 언어 확인
        const browserLang = navigator.language.substring(0, 2);
        return browserLang === 'en' ? 'en' : 'ko';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const toggleLanguage = () => {
        setLanguageState(prev => (prev === 'ko' ? 'en' : 'ko'));
    };

    const t = (key: string, replacements?: Record<string, string | number>): string => {
        const keys = key.split('.');
        let result: any = translations[language];
        
        for (const k of keys) {
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                // 특정 키 경로를 찾지 못할 때, navigation 딕셔너리에서 다이렉트 매칭 시도
                if (translations[language].navigation && translations[language].navigation[key] !== undefined) {
                    result = translations[language].navigation[key];
                    break;
                }
                return key; // 키를 못 찾으면 키 원본 반환
            }
        }

        if (typeof result === 'string') {
            if (replacements) {
                let replaced = result;
                Object.entries(replacements).forEach(([k, v]) => {
                    replaced = replaced.replace(`{${k}}`, String(v));
                });
                return replaced;
            }
            return result;
        }

        return typeof result === 'string' ? result : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
