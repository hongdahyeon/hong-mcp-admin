import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Workshop } from '@/types/workshop';

interface CartContextType {
    cartItems: Workshop[];
    favoriteItems: Workshop[];
    addToCart: (item: Workshop) => void;
    removeFromCart: (id: string) => void;
    toggleFavorite: (item: Workshop) => void;
    isFavorite: (id: string) => boolean;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Workshop[]>([]);
    const [favoriteItems, setFavoriteItems] = useState<Workshop[]>([]);

    const addToCart = (item: Workshop) => {
        setCartItems(prev => {
            if (prev.find(i => i.id === item.id)) return prev;
            return [item, ...prev];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const toggleFavorite = (item: Workshop) => {
        setFavoriteItems(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) {
                return prev.filter(i => i.id !== item.id);
            }
            return [item, ...prev];
        });
    };

    const isFavorite = (id: string) => {
        return favoriteItems.some(i => i.id === id);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, favoriteItems, addToCart, removeFromCart, toggleFavorite, isFavorite, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
