'use client';

import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Product } from '@/types';
import { products } from '@/lib/config';
import { hexToHsl } from '@/lib/utils';

type Theme = 'light' | 'dark';

interface AppContextType {
  products: Product[];
  currentProduct: Product;
  currentProductIndex: number;
  theme: Theme;
  isLoading: boolean;
  isSwitching: boolean;
  switchProduct: (direction: 'next' | 'prev') => void;
  setTheme: (theme: Theme) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);

  const currentProduct = useMemo(() => products[currentProductIndex], [currentProductIndex]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  }, []);

  useEffect(() => {
    // Initial load: preload the first product's animation
    const firstProduct = products[0];
    if (!firstProduct) {
        setIsLoading(false);
        return;
    }
    const mediaUrl = firstProduct.animatedWebpUrl;
    
    // Set initial theme from config
    setTheme(firstProduct.mode === 'inherit' ? 'dark' : firstProduct.mode);

    // This logic handles both video and image URLs for preloading
    if (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm')) {
      const video = document.createElement('video');
      video.src = mediaUrl;
      video.oncanplaythrough = () => setIsLoading(false);
      video.onerror = () => setIsLoading(false); // Handle potential errors
    } else {
      const img = new Image();
      img.src = mediaUrl;
      img.onload = () => setIsLoading(false);
      img.onerror = () => setIsLoading(false); // Handle potential errors
    }
  }, [setTheme]);

  useEffect(() => {
    // Update theme and accent color when product changes
    if (currentProduct) {
      // Set theme mode
      if (currentProduct.mode !== 'inherit') {
        setTheme(currentProduct.mode);
      }

      // Set accent color
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

      // Let the content update before we fade it back in
      setTimeout(() => setIsSwitching(false), 50);
    }, 400); // This duration should match the fade-out transition
  };
  
  const value = useMemo(() => ({
    products,
    currentProduct,
    currentProductIndex,
    theme,
    isLoading,
    isSwitching,
    switchProduct,
    setTheme,
  }), [products, currentProduct, currentProductIndex, theme, isLoading, isSwitching, switchProduct, setTheme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
