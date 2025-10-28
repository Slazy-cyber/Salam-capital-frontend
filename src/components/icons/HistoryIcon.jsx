import React from 'react';

export default function HistoryIcon({ size = 20, className = '' }) {
  return (
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
      <path d="M3 3v6h6" />
      <path d="M21 21v-6h-6" />
      <path d="M20 4a9 9 0 1 0 0 16" />
    </svg>
  );
}
