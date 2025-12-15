'use client';

import React, { useState } from 'react';
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
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { CheckoutForm } from './checkout-form';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleClose = () => {
    setIsCartOpen(false);
    // Give sheet time to close before resetting checkout state
    setTimeout(() => {
        setIsCheckingOut(false);
    }, 300);
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={handleClose}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {isCheckingOut ? 'Checkout' : 'Your Cart'}
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {isCheckingOut ? (
           <CheckoutForm subtotal={subtotal} onBack={() => setIsCheckingOut(false)} />
        ) : (
          <>
            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Your cart is empty</h3>
                <p className="text-muted-foreground">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Button onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-grow my-4 pr-4">
                  <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-grow">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                           <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <SheetFooter className="mt-auto">
                  <div className="w-full space-y-4">
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <Button onClick={() => clearCart()} variant="outline" className="w-full">
                        Clear Cart
                    </Button>
                    <Button onClick={() => setIsCheckingOut(true)} className="w-full">
                      Proceed to Checkout
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
