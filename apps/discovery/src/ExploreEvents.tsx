import React from 'react';
import { Skeleton, cn } from 'loka';
import { categories } from './constants/landing.constants';
import { EXPLORE_LOCATIONS } from './constants/explore.constants';
import { useExploreEvents } from './hooks/useExploreEvents';
import { EventCard } from './components/EventCard';

export const ExploreEvents = () => {
  const {
    localQ,
    setLocalQ,
    location,
    category,
    sortBy,
    setSortBy,
    events,
    sortedEvents,
    isLoading,
    isFiltering,
    updateParams,
    handleSearchSubmit,
    clearFilters,
  } = useExploreEvents();

  return (
    <div className="bg-[#fafafa] min-h-screen font-['Inter',sans-serif] relative">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#007CFF]/5 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-[100px] pb-20 flex flex-col lg:flex-row gap-10 lg:gap-16 relative z-10">
        <aside className="w-full lg:w-[300px] shrink-0">
          <div className="lg:sticky lg:top-[120px]">
            <h1 className="text-[clamp(32px,4vw,42px)] font-black tracking-[-0.04em] mb-8 text-[#0a0a0a] leading-[1.05]">
              Find your next
              <br />
              <span className="text-[#007CFF]">experience.</span>
            </h1>

            <form onSubmit={handleSearchSubmit} className="relative mb-10">
              <input
                type="text"
                placeholder="Search events, artists..."
                value={localQ}
                onChange={(e) => setLocalQ(e.target.value)}
                className="w-full bg-white border border-[#e5e5e5] rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-[#007CFF] focus:shadow-[0_0_0_4px_rgba(0,124,255,0.1)]"
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </form>

            <div className="mb-10">
              <h3 className="text-[13px] font-bold text-[#888] uppercase tracking-[0.1em] mb-4">
                Location
              </h3>
              <div className="flex flex-col gap-2">
                {EXPLORE_LOCATIONS.map((loc) => (
                  <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="location"
                      checked={location === loc}
                      onChange={() => updateParams('location', loc)}
                      className="hidden"
                    />
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-all',
                        location === loc
                          ? 'border-[#007CFF]'
                          : 'border-[#ccc] group-hover:border-[#888]'
                      )}
                    >
                      {location === loc && <div className="w-2 h-2 rounded-full bg-[#007CFF]" />}
                    </div>
                    <span
                      className={cn(
                        'text-sm font-medium transition-colors',
                        location === loc ? 'text-[#007CFF]' : 'text-[#555] group-hover:text-[#111]'
                      )}
                    >
                      {loc}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[13px] font-bold text-[#888] uppercase tracking-[0.1em] mb-4">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateParams('category', 'All')}
                  className={cn(
                    'px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300',
                    category === 'All'
                      ? 'bg-[#0a0a0a] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] scale-105'
                      : 'bg-[#f0f0f0] text-[#555] hover:bg-[#e5e5e5] hover:text-[#111]'
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => updateParams('category', cat.name)}
                    className={cn(
                      'px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300',
                      category === cat.name
                        ? 'bg-[#0a0a0a] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] scale-105'
                        : 'bg-[#f0f0f0] text-[#555] hover:bg-[#e5e5e5] hover:text-[#111]'
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-end mb-8 mt-2 lg:mt-6">
            <h2 className="text-lg font-bold text-[#888]">
              {isLoading ? (
                'Searching...'
              ) : isFiltering ? (
                <>
                  <span className="text-[#0a0a0a] text-2xl">{events?.length || 0}</span> results
                  found
                </>
              ) : (
                'Showing all events'
              )}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.1em] mr-2 desktop-only">
                Sort by
              </span>
              <button
                onClick={() => setSortBy('date')}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border',
                  sortBy === 'date'
                    ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                    : 'bg-white text-[#888] border-[#e5e5e5] hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
                )}
              >
                Date
              </button>
              <button
                onClick={() => setSortBy('price')}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border',
                  sortBy === 'price'
                    ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                    : 'bg-white text-[#888] border-[#e5e5e5] hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
                )}
              >
                Price
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="rounded-2xl h-[240px] w-full" />
                  <Skeleton className="h-5 w-[60%]" />
                  <Skeleton className="h-3.5 w-[40%]" />
                </div>
              ))
            ) : sortedEvents && sortedEvents.length > 0 ? (
              sortedEvents.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mb-6">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#888"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">No events found</h3>
                <p className="text-[#888] max-w-[300px]">
                  We couldn't find any events matching your current filters. Try adjusting your
                  search criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2.5 bg-white border border-[#e5e5e5] rounded-full text-sm font-semibold hover:border-[#0a0a0a] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
