'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/hooks/use-app';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { CheckoutForm } from './checkout-form';
import type { CartItem } from '@/types';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, startCheckout, setStartCheckout } = useApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (startCheckout) {
      setIsCheckingOut(true);
    }
  }, [startCheckout]);
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleClose = () => {
    setIsCartOpen(false);
    // Give sheet time to close before resetting checkout state
    setTimeout(() => {
        setIsCheckingOut(false);
        setStartCheckout(false);
    }, 300);
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={handleClose}>
      <SheetContent className="flex flex-col sm:max-w-md">
        <SheetHeader className="pr-6">
          <SheetTitle className="flex items-center gap-2 text-2xl font-headline">
            {isCheckingOut ? 'Checkout' : 'Your Cart'}
          </SheetTitle>
        </SheetHeader>
        
        {isCheckingOut ? (
           <CheckoutForm subtotal={subtotal} onBack={() => setIsCheckingOut(false)} />
        ) : (
          <>
            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-8">
                <ShoppingCart className="h-20 w-20 text-muted-foreground/50" strokeWidth={1} />
                <h3 className="text-2xl font-semibold font-headline">Your cart is empty</h3>
                <p className="text-muted-foreground">
                  Looks like you haven't added anything yet.
                </p>
                <Button onClick={() => setIsCartOpen(false)} size="lg" className="mt-4">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-grow my-4 -mr-6 pr-6">
                  <div className="flex flex-col gap-6">
                    {cart.map((item: CartItem) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-base">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Rs. {item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-md"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-md"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                             <p className="font-semibold text-base">
                              Rs. {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0 -mr-2 rounded-md"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <SheetFooter className="mt-auto pr-6">
                  <div className="w-full space-y-4 pt-4">
                    <Separator />
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <Button onClick={() => setIsCheckingOut(true)} className="w-full" size="lg">
                      Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                    </Button>
                    <Button onClick={() => clearCart()} variant="outline" className="w-full">
                        Clear Cart
                    </Button>
                  </div>
                </SheetFooter>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
