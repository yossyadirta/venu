import React from 'react';
import { cn } from '../lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodyLg' | 'bodySm' | 'caption' | 'label' | 'overline';
  muted?: boolean;
}

const variantStyles: Record<string, string> = {
  display: 'text-[clamp(40px,6vw,72px)] font-black tracking-[-0.04em] leading-[1.0]',
  h1: 'text-[clamp(32px,4vw,56px)] font-black tracking-[-0.04em] leading-[1.05]',
  h2: 'text-[clamp(24px,3vw,40px)] font-extrabold tracking-[-0.03em] leading-[1.1]',
  h3: 'text-[clamp(18px,2vw,24px)] font-bold tracking-[-0.02em] leading-[1.2]',
  h4: 'text-[clamp(15px,1.5vw,18px)] font-bold tracking-[-0.01em] leading-[1.3]',
  body: 'text-[15px] font-medium leading-relaxed',
  bodyLg: 'text-[17px] font-medium leading-relaxed',
  bodySm: 'text-[13px] font-medium leading-relaxed',
  caption: 'text-[12px] font-medium leading-normal',
  label: 'text-[11px] font-bold uppercase tracking-[0.1em]',
  overline: 'text-[11px] font-bold uppercase tracking-[0.12em] opacity-50',
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, variant = 'body', muted = false, className, children, ...props }, ref) => {
    const defaultTags: Record<string, string> = {
      display: 'h1',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      body: 'p',
      bodyLg: 'p',
      bodySm: 'p',
      caption: 'span',
      label: 'label',
      overline: 'span',
    };

    const Tag = (as || defaultTags[variant] || 'p') as React.ElementType;

    return (
      <Tag
        ref={ref as any}
        className={cn(
          'text-[#0a0a0a]',
          variantStyles[variant],
          muted && 'text-[#888]',
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Typography.displayName = 'Typography';
