import React, { useEffect, useRef, useState } from 'react';
import { Skeleton, cn, Badge, Typography, Card, Accordion, Button } from 'loka';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  styles,
  formatPrice,
  formatDate,
  acts,
  cards,
  faqs,
} from './constants/eventDetail.constants';
import { useEventDetail } from './hooks/useEventDetail';

gsap.registerPlugin(ScrollTrigger);

const HeroModern = ({ event }: { event: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="px-[5%] pb-20 flex flex-col">
      <div ref={containerRef} className={styles.heroContainer}>
        <img
          ref={imgRef}
          src={event.hero_image_url}
          alt={event.title}
          className="w-full h-[130%] object-cover object-center absolute top-[-15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 from-0% to-transparent to-60%" />

        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          {event.status !== 'available' && (
            <Badge
              variant={event.status === 'selling_fast' ? 'urgent' : 'destructive'}
              className="text-[10px] font-black tracking-[0.2em] py-2 px-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
            >
              {event.status.replace(/_/g, ' ').toUpperCase()}
            </Badge>
          )}
        </div>

        <div className="absolute bottom-10 left-6 lg:left-10 right-6 lg:right-10 flex flex-col gap-6 z-10">
          <h1 className="text-[clamp(32px,6vw,96px)] text-white font-extrabold tracking-[-0.04em] leading-none m-0">
            {event.title}
          </h1>

          <div className="flex gap-2 lg:gap-4 flex-wrap mt-2 lg:mt-0">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-[20px] py-1.5 px-3 lg:py-2.5 lg:px-5 rounded-full border border-white/20">
              <span className="text-[11px] lg:text-[13px] text-white font-semibold">
                {formatDate(event.date)}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-[20px] py-1.5 px-3 lg:py-2.5 lg:px-5 rounded-full border border-white/20">
              <span className="text-[11px] lg:text-[13px] text-white font-semibold">
                {event.venue_name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SynopsisReveal = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!wordsRef.current.length) return;

    const ctx = gsap.context(() => {
      const validWords = wordsRef.current.filter(Boolean);

      if (validWords.length > 0) {
        gsap.fromTo(
          validWords,
          { opacity: 0.1, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 95%',
              end: 'bottom 40%',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    // Refresh ScrollTrigger after a slight delay to account for async layout shifts on hard reload
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [text]);

  return (
    <div ref={containerRef} className="py-20 px-[5%] bg-[#fafafa] text-[#0a0a0a]">
      <Typography variant="overline" className="text-primary mb-8 block font-extrabold">
        The Story
      </Typography>
      <p className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.4] tracking-[-0.02em] text-[#0a0a0a]">
        {text.split(' ').map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              wordsRef.current[i] = el;
            }}
            className="word inline-block mr-[0.3em] will-change-[transform,opacity]"
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};

const LineupBento = () => {
  return (
    <div className="py-20 bg-[#fafafa] text-[#0a0a0a]">
      <Typography variant="overline" className="text-primary mb-8 block font-extrabold pl-[5%]">
        The Lineup
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-[5%]">
        {acts.map((act, i) => (
          <div
            key={i}
            className={cn(
              styles.bentoAct,
              act.span === 2 ? 'col-span-1 md:col-span-2' : 'col-span-1 md:col-span-1'
            )}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget.querySelector('img'), {
                scale: 1.05,
                filter: 'grayscale(0%)',
                duration: 0.5,
                ease: 'power3.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget.querySelector('img'), {
                scale: 1,
                filter: 'grayscale(100%)',
                duration: 0.5,
                ease: 'power3.out',
              });
            }}
          >
            <img
              src={act.img}
              className="absolute top-0 left-0 w-full h-full object-cover object-center grayscale pointer-events-none"
              alt={act.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 from-0% to-transparent to-60%" />
            <div className="relative z-10 text-white">
              <div className="inline-block py-1.5 px-4 bg-white/20 backdrop-blur-[10px] rounded-full text-xs font-bold tracking-[0.1em] uppercase mb-3">
                {act.role}
              </div>
              <Typography
                as="h3"
                variant="h2"
                className="text-white text-[clamp(32px,4vw,56px)] font-extrabold m-0 tracking-[-0.02em] leading-none"
              >
                {act.name}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HighlightsModern = () => {
  return (
    <div className="py-20 px-[5%] bg-[#fafafa]">
      <Typography variant="overline" className="text-primary mb-8 block font-extrabold">
        Features
      </Typography>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {cards.map((c, i) => (
          <Card
            key={i}
            className={cn(
              styles.highlightCard,
              'group relative overflow-hidden cursor-default border-transparent transition-all duration-500 hover:border-[#007CFF]/20'
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#007CFF]/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex justify-between items-start mb-8">
              <div
                className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#007CFF] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-[#007CFF] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(0,124,255,0.25)]"
                dangerouslySetInnerHTML={{ __html: c.iconSvg }}
              />
              <Badge
                variant="outline"
                className="bg-[#f5f5f5] text-[#666] border-none font-bold tracking-[0.05em] py-1.5 px-3 transition-colors duration-500 group-hover:bg-[#007CFF]/10 group-hover:text-[#007CFF]"
              >
                {c.tag}
              </Badge>
            </div>
            <Typography
              as="h3"
              variant="h3"
              className="relative z-10 text-xl font-extrabold text-[#0a0a0a] mb-3 tracking-[-0.02em]"
            >
              {c.title}
            </Typography>
            <Typography
              as="p"
              variant="body"
              className="relative z-10 text-sm text-[#666] leading-[1.6] m-0"
            >
              {c.desc}
            </Typography>
          </Card>
        ))}
      </div>
    </div>
  );
};

const VenueSection = ({ event }: { event: any }) => {
  return (
    <div className="py-20 px-[5%] bg-[#fafafa]">
      <Typography variant="overline" className="text-primary mb-8 block font-extrabold">
        Location
      </Typography>

      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className={styles.venueImgContainer}>
          <img
            src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200"
            className="absolute top-0 left-0 w-full h-full object-cover object-center pointer-events-none"
            alt="Gelora Bung Karno"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-[10px] py-4 px-6 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <Typography
              as="h4"
              variant="h3"
              className="m-0 text-lg font-extrabold text-[#0a0a0a] tracking-[-0.01em]"
            >
              {event.venue_name}
            </Typography>
            <Typography
              as="p"
              variant="body"
              className="mt-1 mb-0 text-[13px] text-[#666] font-medium"
            >
              {event.location}
            </Typography>
          </div>
        </div>

        <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-col gap-4">
          <Card className="bg-white rounded-[24px] p-4 md:p-6 flex flex-col justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#f5f5f5]">
            <Typography
              variant="overline"
              className="text-[10px] md:text-xs text-[#888] font-bold mb-1 md:mb-2 block"
            >
              Parking
            </Typography>
            <Typography
              as="span"
              variant="h2"
              className="text-xl md:text-[28px] text-[#0a0a0a] font-extrabold tracking-[-0.02em]"
            >
              On-site
            </Typography>
          </Card>
          <Card className="bg-white rounded-[24px] p-4 md:p-6 flex flex-col justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#f5f5f5]">
            <Typography
              variant="overline"
              className="text-[10px] md:text-xs text-[#888] font-bold mb-1 md:mb-2 block"
            >
              Food & Drinks
            </Typography>
            <Typography
              as="span"
              variant="h2"
              className="text-xl md:text-[28px] text-[#0a0a0a] font-extrabold tracking-[-0.02em]"
            >
              Available
            </Typography>
          </Card>
          <Card className="bg-white rounded-[24px] p-4 md:p-6 flex flex-col justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#f5f5f5]">
            <Typography
              variant="overline"
              className="text-[10px] md:text-xs text-[#888] font-bold mb-1 md:mb-2 block"
            >
              Accessibility
            </Typography>
            <Typography
              as="span"
              variant="h2"
              className="text-xl md:text-[28px] text-[#0a0a0a] font-extrabold tracking-[-0.02em]"
            >
              Wheelchair Ready
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="pt-20 pb-[150px] px-[5%] bg-[#fafafa]">
      <Typography variant="overline" className="text-primary mb-8 block font-extrabold">
        FAQ
      </Typography>
      <Accordion
        items={faqs.map((faq, i) => ({
          id: `faq-${i}`,
          title: faq.q,
          content: faq.a,
        }))}
      />
    </div>
  );
};

const TicketPanel = ({ event, onGetTickets }: { event: any; onGetTickets: () => void }) => {
  return (
    <div className="hidden lg:block w-[35%] shrink-0 p-[160px_5%_100px_0] mb-20 lg:mb-0">
      <div className={styles.ticketPanelSticky}>
        <Typography variant="overline" className="text-[#888] font-bold mb-3 block">
          Tickets Starting From
        </Typography>
        <Typography
          variant="h1"
          className="text-[clamp(32px,3.5vw,48px)] text-primary mb-10 tracking-[-0.03em]"
        >
          {formatPrice(event.min_price)}
        </Typography>

        <div className="flex flex-col gap-4 mb-10">
          <Card className="bg-[#fafafa] p-5 rounded-[20px] border border-[#f5f5f5]">
            <Typography variant="overline" className="text-[#888] font-bold block mb-1">
              Date & Time
            </Typography>
            <Typography as="p" variant="body" className="font-bold text-[#111] m-0">
              {formatDate(event.date)}
            </Typography>
          </Card>

          <Card className="bg-[#fafafa] p-5 rounded-[20px] border border-[#f5f5f5]">
            <Typography variant="overline" className="text-[#888] font-bold block mb-1">
              Venue
            </Typography>
            <Typography as="p" variant="body" className="font-bold text-[#111] m-0">
              {event.venue_name}
            </Typography>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            variant="primary"
            disabled={event.status === 'sold_out'}
            onClick={onGetTickets}
            className={cn(
              styles.ticketPanelBtnBase,
              event.status === 'sold_out'
                ? styles.ticketPanelBtnSoldOut
                : styles.ticketPanelBtnAvailable,
              'w-full h-auto'
            )}
          >
            {event.status === 'sold_out' ? 'SOLD OUT' : 'GET TICKETS'}
          </Button>
          <Typography as="p" variant="body" muted className="text-center text-xs font-medium m-0">
            Powered by Venu Secure Ticketing
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const EventDetail = () => {
  const { event, isLoading, navigate } = useEventDetail();

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row w-full bg-[#fafafa] min-h-screen items-stretch font-['Inter',sans-serif] relative">
        <div className="w-full lg:w-[65%] relative">
          <div className="pt-[140px] lg:pt-[160px] px-[5%] pb-20">
            <Skeleton className="w-full h-[70vh] rounded-[40px]" />
          </div>
          <div className="py-20 px-[5%]">
            <Skeleton className="h-6 w-24 mb-8" />
            <Skeleton className="h-12 w-[90%] mb-4" />
            <Skeleton className="h-12 w-[70%]" />
          </div>
        </div>

        <div className="hidden lg:block w-[35%] shrink-0 p-[160px_5%_100px_0] mb-20 lg:mb-0">
          <div className="sticky top-[120px] bg-white rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-[#f0f0f0] flex flex-col">
            <Skeleton className="h-4 w-[40%] mb-3" />
            <Skeleton className="h-12 w-[60%] mb-10" />

            <div className="flex flex-col gap-4 mb-10">
              <Skeleton className="h-[90px] w-full rounded-[20px]" />
              <Skeleton className="h-[90px] w-full rounded-[20px]" />
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="h-14 w-full rounded-full" />
              <Skeleton className="h-3 w-[50%] mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event)
    return (
      <div className="h-screen bg-[#fafafa] text-[#0a0a0a] flex items-center justify-center">
        <h2>Event Not Found</h2>
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row w-full bg-[#fafafa] min-h-screen items-stretch font-['Inter',sans-serif] relative">
      <div className="w-full lg:w-[65%] relative">
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Events
        </button>
        <div className="pt-[140px] lg:pt-[160px] px-0 lg:px-0">
          <HeroModern event={event} />
          <SynopsisReveal text={event.description} />
          <LineupBento />
          <HighlightsModern />
          <VenueSection event={event} />
          <FAQ />
        </div>
      </div>

      <TicketPanel event={event} onGetTickets={() => navigate(`/tickets/${event.slug}`)} />

      {/* Mobile Sticky Bet Tickets */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-neutral-200 p-4 pb-6 px-6 z-[99] flex justify-between items-end shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col">
          <Typography
            as="p"
            variant="body"
            className="text-[10px] text-[#555] font-semibold truncate max-w-[160px] sm:max-w-[200px] mb-1.5"
          >
            {formatDate(event.date)} • {event.venue_name}
          </Typography>
          <Typography
            variant="overline"
            className="text-[10px] text-[#888] font-bold mb-0 block leading-none"
          >
            Tickets From
          </Typography>
          <Typography
            as="p"
            variant="h3"
            className="text-xl font-extrabold text-[#007CFF] tracking-[-0.02em] leading-none mt-1 m-0"
          >
            {formatPrice(event.min_price)}
          </Typography>
        </div>
        <Button
          size="md"
          variant="primary"
          disabled={event.status === 'sold_out'}
          onClick={() => navigate(`/tickets/${event.slug}`)}
          className={cn(
            'py-3.5 px-8 rounded-full text-[14px] font-extrabold border-none tracking-[0.05em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            event.status === 'sold_out'
              ? 'bg-[#e5e5e5] text-[#888] cursor-not-allowed shadow-none'
              : 'bg-[#007CFF] text-white cursor-pointer shadow-[0_8px_24px_rgba(0,124,255,0.25)]'
          )}
        >
          {event.status === 'sold_out' ? 'SOLD OUT' : 'GET TICKETS'}
        </Button>
      </div>
    </div>
  );
};
