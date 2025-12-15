'use client';

import React, { createContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { Product, CartItem, CartItemToAdd, SiteProduct } from '@/types';
import { products, siteProducts } from '@/lib/config';
import { hexToHsl } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Theme = 'light' | 'dark';

interface AppContextType {
  products: Product[];
  currentProduct: Product;
  currentProductIndex: number;
  theme: Theme;
  isLoading: boolean;
  isSwitching: boolean;
  cart: CartItem[];
  isCartOpen: boolean;
  isCartAnimating: boolean;
  startCheckout: boolean;
  searchQuery: string;
  filteredProducts: SiteProduct[];
  setSearchQuery: (query: string) => void;
  addToCart: (item: CartItemToAdd, quantity: number) => void;
  buyNow: (item: CartItemToAdd, quantity: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setStartCheckout: (start: boolean) => void;
  switchProduct: (direction: 'next' | 'prev') => void;
  setTheme: (theme: Theme) => void;
  triggerCartAnimation: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [startCheckout, setStartCheckout] = useState(false);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return siteProducts;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return siteProducts.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery) ||
      product.description.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);
  
  const currentProduct = useMemo(() => products[currentProductIndex], [currentProductIndex]);

  const triggerCartAnimation = useCallback(() => {
    setIsCartAnimating(true);
    setTimeout(() => setIsCartAnimating(false), 500); // Duration of the shake animation
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  }, []);

  const addToCart = useCallback((item: CartItemToAdd, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
    triggerCartAnimation();
    toast({
      title: 'Added to cart',
      description: `${quantity} x ${item.name} added to your cart.`,
    });
  }, [toast, triggerCartAnimation]);

  const buyNow = useCallback((item: CartItemToAdd, quantity: number) => {
    setCart([{...item, quantity}]);
    setStartCheckout(true);
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== itemId);
      }
      return prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  useEffect(() => {
    const firstProduct = products[0];
    if (!firstProduct) {
        setIsLoading(false);
        return;
    }
    const mediaUrl = firstProduct.animatedWebpUrl;
    
    setTheme(firstProduct.mode === 'inherit' ? 'dark' : firstProduct.mode);

    if (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm')) {
      const video = document.createElement('video');
      video.src = mediaUrl;
      video.oncanplaythrough = () => setIsLoading(false);
      video.onerror = () => setIsLoading(false);
    } else {
      const img = new Image();
      img.src = mediaUrl;
      img.onload = () => setIsLoading(false);
      img.onerror = () => setIsLoading(false);
    }
  }, [setTheme]);

  useEffect(() => {
    if (currentProduct) {
      if (currentProduct.mode !== 'inherit') {
        setTheme(currentProduct.mode);
      }

      const [h, s, l] = hexToHsl(currentProduct.themeColor);
      document.documentElement.style.setProperty('--primary-h', `${h}`);
      document.documentElement.style.setProperty('--primary-s', `${s}%`);
      document.documentElement.style.setProperty('--primary-l', `${l}%`);
    }
  }, [currentProduct, setTheme]);

  const switchProduct = (direction: 'next' | 'prev') => {
    if (products.length <= 1) return;
    setIsSwitching(true);
    
    setTimeout(() => {
      setCurrentProductIndex(prevIndex => {
        let nextIndex;
        if (direction === 'next') {
          nextIndex = (prevIndex + 1) % products.length;
        } else {
          nextIndex = (prevIndex - 1 + products.length) % products.length;
        }
        return nextIndex;
      });

      setTimeout(() => setIsSwitching(false), 50);
    }, 400);
  };
  
  const value = useMemo(() => ({
    products,
    currentProduct,
    currentProductIndex,
    theme,
    isLoading,
    isSwitching,
    cart,
    isCartOpen,
    isCartAnimating,
    startCheckout,
    searchQuery,
    filteredProducts,
    setSearchQuery,
    addToCart,
    buyNow,
    updateQuantity,
    removeFromCart,
    clearCart,
    setIsCartOpen,
    setStartCheckout,
    switchProduct,
    setTheme,
    triggerCartAnimation,
  }), [products, currentProduct, currentProductIndex, theme, isLoading, isSwitching, cart, isCartOpen, isCartAnimating, startCheckout, searchQuery, filteredProducts, addToCart, buyNow, updateQuantity, removeFromCart, clearCart, switchProduct, setTheme, triggerCartAnimation]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
