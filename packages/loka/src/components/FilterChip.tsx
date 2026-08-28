import React from 'react';
import { cn } from '../lib/utils';

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: string;
}

export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ active = false, label, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 whitespace-nowrap border',
          active
            ? 'bg-primary-subtle border-primary text-primary'
            : 'bg-neutral-50 border-transparent text-neutral-600 hover:bg-primary-subtle hover:text-primary hover:border-primary/20',
          className
        )}
        {...props}
      >
        {label}
      </button>
    );
  }
);
FilterChip.displayName = 'FilterChip';
