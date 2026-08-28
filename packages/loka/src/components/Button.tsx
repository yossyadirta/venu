import React from 'react';
import { cn } from '../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'pill-primary'
    | 'pill-outline'
    | 'pill-ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-300 ease-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';

    const variants: Record<string, string> = {
      primary:
        'bg-primary text-white hover:bg-primary-light rounded-loka-md shadow-sm hover:shadow-primary',
      secondary: 'bg-neutral-50 text-neutral-950 hover:bg-neutral-100 rounded-loka-md',
      outline:
        'border-[1.5px] border-neutral-100 bg-white text-neutral-950 hover:border-neutral-950 hover:bg-neutral-25 rounded-loka-md',
      ghost: 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950 rounded-loka-md',
      destructive: 'bg-danger text-white hover:bg-red-600 rounded-loka-md shadow-sm',
      'pill-primary':
        'bg-neutral-950 text-white rounded-full shadow-sm hover:shadow-lg hover:-translate-y-px',
      'pill-outline':
        'border-[1.5px] border-primary text-primary bg-transparent rounded-full hover:bg-primary hover:text-white',
      'pill-ghost':
        'bg-neutral-50 text-neutral-600 rounded-full hover:bg-neutral-100 hover:text-neutral-950',
    };

    const sizes: Record<string, string> = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-6 text-sm',
      lg: 'h-14 px-8 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
