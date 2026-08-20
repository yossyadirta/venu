import React from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './Button';

export function SearchBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-gray-200 bg-white shadow-md p-2 transition-all hover:shadow-lg',
        className
      )}
    >
      <div className="flex flex-col px-6 border-r border-gray-200 cursor-pointer group hover:bg-gray-50 rounded-l-full py-2">
        <span className="text-xs font-bold text-gray-900">Location</span>
        <div className="flex items-center text-sm text-gray-500 mt-0.5">
          <MapPin className="w-4 h-4 mr-2 opacity-50" />
          <input
            type="text"
            placeholder="Where to?"
            className="bg-transparent border-none focus:outline-none placeholder:text-gray-400 w-32 group-hover:bg-gray-50"
          />
        </div>
      </div>

      <div className="flex flex-col px-6 cursor-pointer group hover:bg-gray-50 rounded-full py-2">
        <span className="text-xs font-bold text-gray-900">Date</span>
        <div className="flex items-center text-sm text-gray-500 mt-0.5">
          <Calendar className="w-4 h-4 mr-2 opacity-50" />
          <span className="text-gray-400">When?</span>
        </div>
      </div>

      <div className="pl-2">
        <Button size="icon" className="rounded-full h-12 w-12 bg-primary hover:bg-primary-light">
          <Search className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
}
