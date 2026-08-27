import React from 'react';
import AppRouter from '@/routes/AppRouter';
import { ThemeProvider } from '@/hooks/ThemeContext';
import { CartProvider } from '@/hooks/CartContext';
import { LanguageProvider } from '@/hooks/LanguageContext';
import './index.css';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <CartProvider>
                    <AppRouter />
                </CartProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default App;