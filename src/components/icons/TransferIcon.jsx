import React from 'react';

export default function TransferIcon({ size = 20, className = '' }) {
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
      <path d="M22 12h-7" />
      <path d="M22 12l-3-3" />
      <path d="M22 12l-3 3" />
      <path d="M2 12h7" />
      <path d="M2 12l3-3" />
      <path d="M2 12l3 3" />
    </svg>
  );
}
