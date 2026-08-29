import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from 'api-client';
import { Card, Badge, Typography, Separator, Skeleton, cn } from 'loka';
import { formatDate, formatPrice } from '../constants/landing.constants';

export const EventCard = ({ event, large = false }: { event: Event; large?: boolean }) => {
  const navigate = useNavigate();
  const isSoldOut = event.status === 'sold_out';

  return (
    <Card
      hoverable
      onClick={() => navigate(`/events/${event.slug}`)}
      className="group overflow-hidden flex flex-col h-full"
      data-event-card
    >
      <div className="relative overflow-hidden shrink-0" style={{ aspectRatio: large ? '16/9' : '16/10' }}>
        <img
          src={event.hero_image_url}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/70" />
        {event.status !== 'available' && (
          <Badge
            className="absolute top-4 left-4"
            variant={isSoldOut ? 'destructive' : event.status === 'selling_fast' ? 'urgent' : 'default'}
          >
            {event.status.replace(/_/g, ' ').toUpperCase()}
          </Badge>
        )}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <Typography as="p" variant="caption" className="text-white/90 font-medium">
            {formatDate(event.date)}
          </Typography>
          <div className="bg-white/12 backdrop-blur-md rounded-loka-sm py-1 px-3.5 border border-white/15">
            <Typography as="span" variant="caption" className="text-white font-bold">
              {formatPrice(event.min_price)}
            </Typography>
          </div>
        </div>
      </div>

      <div className="p-[18px_22px_22px] flex flex-col grow">
        <Typography as="h3" variant={large ? 'h3' : 'h4'} className={cn('mb-2 line-clamp-2', large ? 'min-h-[54px]' : 'min-h-[44px]')}>
          {event.title}
        </Typography>

        <div className="flex items-center gap-1.5 mb-3">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-neutral-400">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <Typography as="span" variant="bodySm" muted className="truncate">
            {event.venue_name} · {event.location}
          </Typography>
        </div>

        {large && (
          <Typography as="p" variant="bodySm" className="text-neutral-500 mb-4 leading-relaxed line-clamp-2 min-h-[44px]">
            {event.description}
          </Typography>
        )}

        <div className="grow" />

        <div className="flex justify-between items-center pt-3.5 border-t border-neutral-50">
          <Typography
            as="span"
            variant="label"
            className={isSoldOut ? 'text-neutral-300' : 'text-primary'}
          >
            {isSoldOut ? 'SOLD OUT' : 'VIEW DETAILS →'}
          </Typography>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
            isSoldOut ? 'bg-neutral-25' : 'bg-primary group-hover:shadow-primary'
          }`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isSoldOut ? '#ccc' : 'white'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const EventCardSkeleton = ({ large = false }: { large?: boolean }) => (
  <Card className="flex flex-col h-full overflow-hidden" data-event-card>
    <Skeleton
      className="w-full shrink-0 rounded-none"
      style={{ aspectRatio: large ? '16/9' : '16/10' }}
    />
    <div className="p-[18px_22px_22px] flex flex-col grow">
      <Skeleton className="h-7 w-[85%] mb-3" />
      <Skeleton className="h-4 w-[60%] mb-4" />
      
      {large && (
        <>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-[90%] mb-4" />
        </>
      )}
      
      <div className="grow" />
      
      <div className="flex justify-between items-center pt-3.5">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
    </div>
  </Card>
);
