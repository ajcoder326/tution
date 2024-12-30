import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button = ({ 
  isLoading, 
  variant = 'primary', 
  children, 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = "w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center";
  const variants = {
    primary: "bg-yellow-600 text-white hover:bg-yellow-700",
    secondary: "bg-brown-700 text-white hover:bg-brown-800"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${
        (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : children}
    </button>
  );
};

export default Button;