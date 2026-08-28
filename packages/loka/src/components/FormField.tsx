import React from 'react';
import { cn } from '../lib/utils';

export interface FormFieldProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FormField = ({ label, hint, error, required, className, children }: FormFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.1em]">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </span>
      )}
      {children}
      {(hint || error) && (
        <p className={cn('text-xs font-medium', error ? 'text-danger' : 'text-neutral-400')}>
          {error || hint}
        </p>
      )}
    </div>
  );
};
