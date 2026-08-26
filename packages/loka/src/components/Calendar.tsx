import React from 'react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import 'react-day-picker/style.css';

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: DayPickerProps) {
  return (
    <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-4">
      <style>{`
        .rdp-root {
          --rdp-cell-size: 40px;
          --rdp-accent-color: #007CFF;
          --rdp-background-color: #eff6ff;
          --rdp-outline: none;
          margin: 0;
        }
        .rdp-months {
          justify-content: center;
        }
        .rdp-month_caption {
          padding: 0 8px;
          height: 44px;
          display: flex;
          align-items: center;
        }
        .rdp-caption_label {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }
        .rdp-nav {
          height: 44px;
        }
        .rdp-button_previous, .rdp-button_next {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          transition: all 0.2s;
        }
        .rdp-button_previous:hover, .rdp-button_next:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }
        .rdp-weekday {
          color: #6b7280;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
        }
        .rdp-day {
          border-radius: 50% !important;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s;
          cursor: pointer;
        }
        .rdp-day:not(.rdp-day_selected):hover {
          background-color: #f3f4f6;
          color: #111827;
        }
        .rdp-day_selected {
          background-color: #007CFF !important;
          color: white !important;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(0, 124, 255, 0.4);
        }
        .rdp-day_today:not(.rdp-day_selected) {
          color: #007CFF;
          font-weight: 700;
          background-color: #eff6ff;
        }
        .rdp-day_outside {
          color: #d1d5db;
          pointer-events: none;
        }
      `}</style>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn('p-1', className)}
        components={{
          Chevron: ({ orientation }) => {
            const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
            return <Icon className="h-4 w-4" strokeWidth={3} />;
          },
        }}
        {...props}
      />
    </div>
  );
}
