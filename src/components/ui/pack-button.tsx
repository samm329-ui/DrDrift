
'use client';

import React from 'react';

interface PackButtonProps {
  onClick: () => void;
}

export const PackButton: React.FC<PackButtonProps> = ({ onClick }) => {
  return (
    <div className="btn-container w-full">
      <button className="pack-btn w-full" onClick={onClick}>
        <div className="transition-top btn-drawer">Buy Pack of 8</div>
        <span className="btn-text">8% OFF</span>
        <div className="transition-bottom btn-drawer">8% OFF</div>
      </button>
      <svg
        className="btn-corner"
        viewBox="0 0 44 44"
        strokeWidth="2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M42 2C42 12.4345 33.4345 21 23 21C12.5655 21 4 12.4345 4 2" />
      </svg>
      <svg
        className="btn-corner"
        viewBox="0 0 44 44"
        strokeWidth="2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M42 2C42 12.4345 33.4345 21 23 21C12.5655 21 4 12.4345 4 2" />
      </svg>
      <svg
        className="btn-corner"
        viewBox="0 0 44 44"
        strokeWidth="2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M42 2C42 12.4345 33.4345 21 23 21C12.5655 21 4 12.4345 4 2" />
      </svg>
      <svg
        className="btn-corner"
        viewBox="0 0 44 44"
        strokeWidth="2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M42 2C42 12.4345 33.4345 21 23 21C12.5655 21 4 12.4345 4 2" />
      </svg>
    </div>
  );
};
