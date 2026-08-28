import React from 'react';
import { cn } from '../lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export const Separator = ({ orientation = 'horizontal', label, className, ...props }: SeparatorProps) => {
  if (orientation === 'vertical') {
    return (
      <div className={cn('w-px bg-neutral-100 self-stretch', className)} {...props} />
    );
  }

  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)} {...props}>
        <div className="flex-1 h-px bg-neutral-100" />
        <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-[0.1em] whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-px bg-neutral-100" />
      </div>
    );
  }

  return (
    <div className={cn('h-px w-full bg-neutral-100', className)} {...props} />
  );
};
