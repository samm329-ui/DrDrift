
'use client';

import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Product, CartItem, CartItemToAdd, SiteProduct, Review } from '@/types';
import { products, siteProducts, siteConfig } from '@/lib/config';
import { hexToHsl } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Theme = 'light' | 'dark';

interface AppContextType {
  products: Product[];
  siteProducts: SiteProduct[];
  currentProduct: Product;
  currentProductIndex: number;
  theme: Theme;
  isLoading: boolean;
  isSwitching: boolean;
  cart: CartItem[];
  isCartOpen: boolean;
  isCartAnimating: boolean;
  startCheckout: boolean;
  reviews: Review[];
  searchQuery: string;
  filteredProducts: SiteProduct[];
  setSearchQuery: (query: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'avatarUrl'>) => void;
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

const initialReviews: Review[] = [
  {
      id: 'review_1',
      productId: 'prod_floor_cleaner',
      name: "Priya S.",
      text: "I'm genuinely impressed. My floors have never looked better, and I love that it's safe for my toddler and dog. The shine is real!",
      rating: 5,
      date: new Date('2024-05-15T10:00:00Z'),
      avatarUrl: 'https://images.unsplash.com/photo-1599625343415-9290b9b32997?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
      id: 'review_2',
      productId: 'prod_dishwasher',
      name: "Rohan K.",
      text: "As a professional cleaner, I'm very picky. Dr. Drift's Dishwasher liquid is now a staple in my kit. It cuts my window cleaning time in half.",
      rating: 5,
      date: new Date('2024-05-12T14:30:00Z'),
      avatarUrl: 'https://images.unsplash.com/photo-1605362141725-709540a3c93f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
      id: 'review_3',
      productId: 'prod_toilet_cleaner',
      name: "Anjali D.",
      text: "Finally, a bathroom cleaner that actually works on soap scum without toxic fumes. The bathroom smells fresh, not like chemicals.",
      rating: 4,
      date: new Date('2024-05-10T09:00:00Z'),
      avatarUrl: 'https://images.unsplash.com/photo-1620177209237-1ac205abf47d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [theme, setThemeState] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [startCheckout, setStartCheckout] = useState(false);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = useCallback((review: Omit<Review, 'id' | 'date' | 'avatarUrl'>) => {
    const newReview: Review = {
      ...review,
      id: `review_${Date.now()}`,
      date: new Date(),
      avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    setReviews(prev => [newReview, ...prev]);
  }, []);

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
    addToCart(item, quantity);
    setStartCheckout(true);
    setIsCartOpen(true);
  }, [addToCart]);

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
    const timer = setTimeout(() => setIsLoading(false), 500); // Set loading to false after a short delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentProduct) {
      if (currentProduct.mode !== 'inherit') {
        setTheme(currentProduct.mode);
      }
      const [h, s, l] = hexToHsl(currentProduct.themeColor);
      document.documentElement.style.setProperty('--primary', `${h} ${s}% ${l}%`);

    }
  }, [currentProduct, setTheme, currentProductIndex]);

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
    siteProducts,
    currentProduct,
    currentProductIndex,
    theme,
    isLoading,
    isSwitching,
    cart,
    isCartOpen,
    isCartAnimating,
    startCheckout,
    reviews,
    searchQuery,
    filteredProducts,
    setSearchQuery,
    addReview,
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
  }), [products, siteProducts, currentProduct, currentProductIndex, theme, isLoading, isSwitching, cart, isCartOpen, isCartAnimating, startCheckout, reviews, searchQuery, filteredProducts, addReview, addToCart, buyNow, updateQuantity, removeFromCart, clearCart, switchProduct, setTheme, triggerCartAnimation, setSearchQuery]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
