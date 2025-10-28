import React from 'react';

export default function BankIcon({ size = 24, className = '', ...props }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M3 11l9-7 9 7" />
      <path d="M5 11v9" />
      <path d="M10 11v9" />
      <path d="M15 11v9" />
      <path d="M20 11v9" />
      <path d="M2 21h20" />
    </svg>
  );
}
