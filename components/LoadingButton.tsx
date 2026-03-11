'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'navbar';
  showArrow?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  href, 
  className = '', 
  children = 'Enter Cogniva Dashboard',
  variant = 'primary',
  showArrow = true
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to ensure the animation is visible
    await new Promise(resolve => setTimeout(resolve, 300));
    
    router.push(href);
  };

  // Define base styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-white text-cta';
      case 'navbar':
        return 'bg-primary text-white rounded-2xl px-6 py-2 font-semibold';
      default:
        return 'bg-primary text-white rounded-4xl px-10 py-5 text-xl font-semibold';
    }
  };

  // Build final className
  const buttonClassName = `
    group ${getVariantStyles()} 
    flex items-center gap-3 cursor-pointer
    hover:bg-primary/90 transform hover:scale-105 
    transition-all duration-300 shadow-xl hover:shadow-2xl
    disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100
    relative overflow-hidden
    ${className}
  `.trim();

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={buttonClassName}
    >
      {/* Loading overlay animation */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
      
      {/* Button content */}
      <span className={`flex items-center gap-3 ${isLoading ? 'animate-pulse' : ''}`}>
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Entering Cogniva...</span>
          </>
        ) : (
          <>
            {children}
            {showArrow && (
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </>
        )}
      </span>
    </button>
  );
};

export default LoadingButton;
