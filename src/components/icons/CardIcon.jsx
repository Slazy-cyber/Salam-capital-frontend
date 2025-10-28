import React from "react";

export default function CardIcon({ size = 60, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="6" y="12" width="36" height="24" rx="4" fill="#1976d2" stroke="#1565c0" strokeWidth="2"/>
      <rect x="10" y="28" width="10" height="4" rx="1" fill="#fff"/>
      <rect x="10" y="18" width="28" height="4" rx="1" fill="#90caf9"/>
      <circle cx="36" cy="30" r="2" fill="#fff"/>
    </svg>
  );
}
