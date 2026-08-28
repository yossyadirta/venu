import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  allowMultiple?: boolean;
  className?: string;
}

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const AccordionItemComponent = ({ title, children, isOpen, onToggle, className }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn('bg-white rounded-[24px] p-[24px_32px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-neutral-100 mb-4 last:mb-0 transition-all', className)}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-0 text-left group bg-transparent border-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className={cn(
          'font-bold text-lg tracking-[-0.01em] transition-colors duration-300 pr-4',
          isOpen ? 'text-primary' : 'text-neutral-950'
        )}>
          {title}
        </span>
        <div className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-400',
          isOpen ? 'bg-primary text-white rotate-45' : 'bg-neutral-50 text-neutral-500 group-hover:bg-neutral-100'
        )}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-spring"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 500}px` : '0px',
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? '16px' : '0px'
        }}
      >
        <div className="text-[15px] text-neutral-600 font-medium leading-[1.6] max-w-[600px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Accordion = ({ items, defaultOpen, allowMultiple = false, className }: AccordionProps) => {
  const [openIds, setOpenIds] = useState<Set<string>>(
    defaultOpen ? new Set([defaultOpen]) : new Set()
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn('w-full', className)}>
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          title={item.title}
          isOpen={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
        >
          {item.content}
        </AccordionItemComponent>
      ))}
    </div>
  );
};
