import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dbClient } from 'api-client';

export const useExploreEvents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'All';
  const location = searchParams.get('location') || 'All Locations';

  const [localQ, setLocalQ] = useState(q);
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');

  useEffect(() => {
    setLocalQ(q);
    window.scrollTo(0, 0);
  }, [q]);

  const { data: events, isLoading } = useQuery({
    queryKey: ['explore-events', q, category, location],
    queryFn: () => dbClient.events.search(q, category, location),
  });

  const sortedEvents = useMemo(() => {
    if (!events) return [];
    const copy = [...events];
    if (sortBy === 'price') {
      return copy.sort((a, b) => a.min_price - b.min_price);
    }
    return copy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, sortBy]);

  const isFiltering = q.trim() !== '' || category !== 'All' || location !== 'All Locations';

  const updateParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All' && value !== 'All Locations') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams('q', localQ);
  };

  const clearFilters = () => {
    setLocalQ('');
    setSearchParams(new URLSearchParams());
  };

  return {
    q,
    category,
    location,
    localQ,
    setLocalQ,
    sortBy,
    setSortBy,
    events,
    sortedEvents,
    isLoading,
    isFiltering,
    updateParams,
    handleSearchSubmit,
    clearFilters
  };
};
