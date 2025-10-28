import React from 'react';

export default function AirtimeIcon({ size = 20, className = '' }) {
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
      <path d="M22 12a10 10 0 1 0-20 0" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
