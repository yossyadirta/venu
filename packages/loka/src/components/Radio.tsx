import React from 'react';
import { cn } from '../lib/utils';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'flex items-center gap-3 cursor-pointer group',
          props.disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="relative flex items-center justify-center shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            className="sr-only peer"
            {...props}
          />
          <div className={cn(
            'w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-200',
            'border-[#ccc] group-hover:border-[#888]',
            'peer-checked:border-[#007CFF]',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-[#007CFF]/30 peer-focus-visible:ring-offset-1'
          )}>
            <div className="w-2 h-2 rounded-full bg-[#007CFF] scale-0 peer-checked:scale-100 transition-transform duration-200 hidden" />
          </div>
          <div className={cn(
            'absolute w-2 h-2 rounded-full bg-[#007CFF] transition-transform duration-200',
            props.checked || props.defaultChecked ? 'scale-100' : 'scale-0'
          )} />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className={cn(
                'text-sm font-medium transition-colors',
                props.checked ? 'text-[#007CFF]' : 'text-[#555] group-hover:text-[#111]'
              )}>
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-[#999] mt-0.5">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export interface RadioGroupProps {
  options: Array<{ value: string; label: string; description?: string }>;
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
}

export const RadioGroup = ({ options, value, onChange, name, className }: RadioGroupProps) => {
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative shrink-0">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              className="sr-only"
            />
            <div className={cn(
              'w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-200',
              value === option.value ? 'border-[#007CFF]' : 'border-[#ccc] group-hover:border-[#888]'
            )}>
              {value === option.value && (
                <div className="w-2 h-2 rounded-full bg-[#007CFF]" />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <span className={cn(
              'text-sm font-medium transition-colors',
              value === option.value ? 'text-[#007CFF]' : 'text-[#555] group-hover:text-[#111]'
            )}>
              {option.label}
            </span>
            {option.description && (
              <span className="text-xs text-[#999] mt-0.5">{option.description}</span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};
