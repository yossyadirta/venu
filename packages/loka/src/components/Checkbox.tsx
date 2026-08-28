import React from 'react';
import { cn } from '../lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, id, checked, onChange, ...props }, ref) => {
    const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'flex items-start gap-3 cursor-pointer group',
          props.disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="relative shrink-0 mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          <div className={cn(
            'w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-all duration-200',
            checked
              ? 'bg-[#007CFF] border-[#007CFF]'
              : 'bg-white border-[#ccc] group-hover:border-[#888]'
          )}>
            {checked && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-[#0a0a0a] group-hover:text-[#000] transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-[#888] mt-0.5">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
