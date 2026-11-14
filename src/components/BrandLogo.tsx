import React from 'react';
import { Stethoscope } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', className = '' }) => {
  const containerSize =
    size === 'sm'
      ? 'w-7 h-7 rounded-lg'
      : size === 'lg'
      ? 'w-12 h-12 rounded-2xl'
      : 'w-9 h-9 rounded-xl';

  const iconSize =
    size === 'sm'
      ? 'w-4 h-4'
      : size === 'lg'
      ? 'w-6 h-6'
      : 'w-5 h-5';

  return (
    <div
      className={`${containerSize} bg-teal-600 flex items-center justify-center text-white shadow-xs shrink-0 ${className}`}
      aria-hidden="true"
    >
      <Stethoscope className={iconSize} />
    </div>
  );
};
