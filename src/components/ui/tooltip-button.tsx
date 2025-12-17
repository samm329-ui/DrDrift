
'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface TooltipButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export const TooltipButton: React.FC<TooltipButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="tooltip-button"
      data-tooltip="Buy Now"
    >
      <div className="tooltip-button-wrapper">
        <div className="text">Buy Now</div>
        <span className="icon">
          <ShoppingBag />
        </span>
      </div>
    </button>
  );
};
