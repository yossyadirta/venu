import React from 'react';
import { cn } from '../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'urgent' | 'destructive';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'border-transparent bg-primary-subtle text-primary',
    secondary: 'border-transparent bg-neutral-100 text-neutral-900',
    outline: 'text-neutral-950 border-neutral-300',
    success: 'border-transparent bg-success-subtle text-success',
    warning: 'border-transparent bg-warning-subtle text-warning',
    urgent: 'border-transparent bg-warning text-white',
    destructive: 'border-transparent bg-danger text-white',
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
