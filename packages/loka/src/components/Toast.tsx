import React, { useEffect } from 'react';
import { cn } from '../lib/utils';

export interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'error' | 'success' | 'info';
  duration?: number;
}

export const Toast = ({
  message,
  isVisible,
  onClose,
  type = 'error',
  duration = 3000
}: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed top-6 lg:top-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-3.5 rounded-full w-max max-w-[90vw]',
        'shadow-[0_20px_40px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-top-10 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'backdrop-blur-xl border border-white/10',
        type === 'error' && 'bg-[#FF3B30]/90 text-white',
        type === 'success' && 'bg-[#34C759]/90 text-white',
        type === 'info' && 'bg-[#007CFF]/90 text-white'
      )}
    >
      <div className="shrink-0 flex items-center justify-center">
        {type === 'error' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
        {type === 'success' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )}
        {type === 'info' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        )}
      </div>
      <span className="font-semibold text-[14px] leading-snug">{message}</span>
    </div>
  );
};
