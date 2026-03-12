import React from 'react';
import AppRouter from '@/routes/AppRouter';
import { ThemeProvider } from '@/hooks/ThemeContext';
import './index.css';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AppRouter />
        </ThemeProvider>
    );
};

export default App;