import React from 'react';
import { Typography, Input, RadioGroup, FilterChip, Button, Skeleton, Separator } from 'loka';
import { categories } from './constants/landing.constants';
import { EXPLORE_LOCATIONS } from './constants/explore.constants';
import { useExploreEvents } from './hooks/useExploreEvents';
import { EventCard, EventCardSkeleton } from './components/EventCard';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

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
    date,
  } = useExploreEvents();

  const locationOptions = EXPLORE_LOCATIONS.map((loc) => ({ value: loc, label: loc }));
  const allCategories = [{ name: 'All' }, ...categories];

  return (
    <div className="bg-neutral-0 min-h-screen font-sans relative">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-primary-subtle to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-[100px] pb-20 flex flex-col lg:flex-row gap-10 lg:gap-16 relative z-10">
        <aside className="w-full lg:w-[300px] shrink-0">
          <div className="lg:sticky lg:top-[120px] lg:max-h-[calc(100vh-140px)] flex flex-col">
            <div className="shrink-0">
            <Typography variant="h2" className="mb-8">
              Find your next<br />
              <span className="text-primary">experience.</span>
            </Typography>

            <form onSubmit={handleSearchSubmit} className="mb-10">
              <Input
                type="text"
                placeholder="Search events, artists..."
                value={localQ}
                onChange={(e) => setLocalQ(e.target.value)}
                leftIcon={<SearchIcon />}
              />
            </form>

            </div>

            <div 
              className="lg:overflow-y-auto lg:flex-1 pb-24 min-h-0 px-2 -mx-2"
              style={{ 
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
              }}
            >
              <div className="mb-10">
                <Typography variant="overline" className="mb-4 block">Timeframe</Typography>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Anytime', value: '' },
                    { label: 'This Weekend', value: 'this_weekend' },
                    { label: 'This Month', value: 'this_month' }
                  ].map((tf) => (
                    <FilterChip
                      key={tf.value}
                      label={tf.label}
                      active={(date || '') === tf.value || (date === 'anytime' && tf.value === '')}
                      onClick={() => updateParams('date', tf.value)}
                    />
                  ))}
                </div>
              </div>

              <Separator className="mb-8" />

              <div className="mb-10">
              <Typography variant="overline" className="mb-4 block">Location</Typography>
              <RadioGroup
                name="location"
                options={locationOptions}
                value={location}
                onChange={(val) => updateParams('location', val)}
              />
            </div>

            <Separator className="mb-8" />

            <div>
              <Typography variant="overline" className="mb-4 block">Categories</Typography>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <FilterChip
                    key={cat.name}
                    label={cat.name === 'All' ? 'All Categories' : cat.name}
                    active={category === cat.name}
                    onClick={() => updateParams('category', cat.name)}
                  />
                ))}
              </div>
            </div>
              </div>
            </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-8 mt-2 lg:mt-6">
            <Typography as="h2" variant="h4" muted={!isFiltering}>
              {isLoading ? (
                'Searching...'
              ) : isFiltering ? (
                <><span className="text-neutral-950 text-2xl font-black">{events?.length ?? 0}</span>{' '}results found</>
              ) : (
                'Showing all events'
              )}
            </Typography>

            <div className="flex items-center gap-2">
              <Typography variant="overline" className="mr-2 desktop-only">Sort by</Typography>
              <FilterChip label="Date" active={sortBy === 'date'} onClick={() => setSortBy('date')} />
              <FilterChip label="Price" active={sortBy === 'price'} onClick={() => setSortBy('price')} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))
            ) : sortedEvents && sortedEvents.length > 0 ? (
              sortedEvents.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6 text-neutral-400">
                  <SearchIcon />
                </div>
                <Typography variant="h3" className="mb-2">No events found</Typography>
                <Typography variant="body" muted className="max-w-[300px] mb-6">
                  We couldn't find any events matching your filters. Try adjusting your criteria.
                </Typography>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
