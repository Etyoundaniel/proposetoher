import React from 'react';

interface RingIconProps {
  size?: number;
  className?: string;
}

export const RingIcon: React.FC<RingIconProps> = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Solitaire diamond at top */}
    <path d="M9 3.5L12 1.5L15 3.5L17.5 6.5L12 9.5L6.5 6.5L9 3.5Z" />
    <path d="M9 3.5L12 9.5L15 3.5" />
    {/* Ring band circle */}
    <circle cx="12" cy="15" r="6.5" />
  </svg>
);
