import React from 'react';
import AppRouter from '@/routes/AppRouter';
import { ThemeProvider } from '@/hooks/ThemeContext';
import { CartProvider } from '@/hooks/CartContext';
import './index.css';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <CartProvider>
                <AppRouter />
            </CartProvider>
        </ThemeProvider>
    );
};

export default App;