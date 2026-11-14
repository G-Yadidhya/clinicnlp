import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', className = '' }) => {
  const dimensions =
    size === 'sm'
      ? 'w-7 h-7 rounded-lg'
      : size === 'lg'
      ? 'w-12 h-12 rounded-2xl'
      : 'w-9 h-9 rounded-xl';

  return (
    <div
      className={`${dimensions} bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 flex items-center justify-center shadow-xs ring-1 ring-inset ring-white/20 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[62%] h-[62%]"
      >
        {/* Subtle clinical ring / Q arc */}
        <path
          d="M16 4.5C9.64873 4.5 4.5 9.64873 4.5 16C4.5 22.3513 9.64873 27.5 16 27.5C22.3513 27.5 27.5 22.3513 27.5 16C27.5 12.92 26.288 10.123 24.314 8.059"
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Clean clinical pulse wave integrating with vertical cross axis */}
        <path
          d="M7.5 16.5H11.5L13.75 11.25L17.25 21.25L19.75 14.5L21.5 16.5H24.5"
          stroke="white"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Crisp Q accent dot */}
        <circle cx="24.5" cy="24.5" r="1.75" fill="#99F6E4" />
      </svg>
    </div>
  );
};
