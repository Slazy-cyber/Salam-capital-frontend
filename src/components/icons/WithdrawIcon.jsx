import React from 'react';

export default function WithdrawIcon({ size = 20, className = '' }) {
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
      <path d="M12 1v22" />
      <path d="M5 11h14" />
      <path d="M7 7h10v10H7z" />
    </svg>
  );
}
