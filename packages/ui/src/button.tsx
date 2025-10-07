import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  const variantClasses: Record<string, string> = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200'
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  return (
    <button
      className={`${variantClasses[variant] || ''} ${sizeClasses[size] || ''} rounded-md`}
      {...props}
    >
      {children}
    </button>
  );
};
