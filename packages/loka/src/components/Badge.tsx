import React from 'react';
import { cn } from '../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'destructive';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'border-transparent bg-primary text-white',
    secondary: 'border-transparent bg-gray-100 text-gray-900',
    outline: 'text-gray-950 border-gray-300',
    success: 'border-transparent bg-green-100 text-green-800',
    destructive: 'border-transparent bg-red-100 text-red-800',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
