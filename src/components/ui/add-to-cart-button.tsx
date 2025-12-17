'use client';

import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export const AddToCartButton = ({ onClick, className }: AddToCartButtonProps) => {
  return (
    <button className={cn('add-to-cart-button', className)} onClick={onClick}>
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <ShoppingCart />
        </div>
      </div>
      <span>Add to cart</span>
    </button>
  );
};
