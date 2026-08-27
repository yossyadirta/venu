import React, { useEffect, useRef, useState } from 'react';
import { Skeleton, cn } from 'loka';
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
          className="w-full h-[120%] object-cover object-center absolute top-[-10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 from-0% to-transparent to-60%" />

        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md py-2 px-4 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            {event.status === 'selling_fast' && <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />}
            {event.status === 'available' && <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />}
            {event.status === 'sold_out' && <span className="w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.6)]" />}
            <span className="text-[10px] text-[#0a0a0a] font-black uppercase tracking-[0.2em] leading-none pt-[1px]">
              {event.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 lg:left-10 right-6 lg:right-10 flex flex-col gap-6 z-10">
          <h1 className="text-[clamp(32px,6vw,96px)] text-white font-extrabold tracking-[-0.04em] leading-none m-0">
            {event.title}
          </h1>

          <div className="flex gap-2 lg:gap-4 flex-wrap mt-2 lg:mt-0">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-[20px] py-1.5 px-3 lg:py-2.5 lg:px-5 rounded-full border border-white/20">
              <span className="text-[11px] lg:text-[13px] text-white font-semibold">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-[20px] py-1.5 px-3 lg:py-2.5 lg:px-5 rounded-full border border-white/20">
              <span className="text-[11px] lg:text-[13px] text-white font-semibold">{event.venue_name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SynopsisReveal = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.word');
      gsap.fromTo(
        words,
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-20 px-[5%] bg-[#fafafa] text-[#0a0a0a]">
      <h2 className="text-sm uppercase tracking-[0.2em] text-[#007CFF] mb-8 font-extrabold">
        The Story
      </h2>
      <p className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.4] tracking-[-0.02em] text-[#0a0a0a]">
        {text.split(' ').map((word, i) => (
          <span key={i} className="word inline-block mr-[0.3em]">
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
      <h2 className="text-sm uppercase tracking-[0.2em] text-[#007CFF] mb-8 font-extrabold pl-[5%]">
        The Lineup
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-[5%]">
        {acts.map((act, i) => (
          <div
            key={i}
            className={cn(styles.bentoAct, act.span === 2 ? 'col-span-1 md:col-span-2' : 'col-span-1 md:col-span-1')}
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
              <h3 className="text-[clamp(32px,4vw,56px)] font-extrabold m-0 tracking-[-0.02em] leading-none">
                {act.name}
              </h3>
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
      <h2 className="text-sm uppercase tracking-[0.2em] text-[#007CFF] mb-8 font-extrabold">
        Features
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {cards.map((c, i) => (
          <div key={i} className={styles.highlightCard}>
            <div className="flex justify-between items-start mb-8">
              <div
                className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#007CFF]"
                dangerouslySetInnerHTML={{ __html: c.iconSvg }}
              />
              <span className="text-[11px] font-bold py-1.5 px-3 bg-[#f5f5f5] text-[#666] rounded-full tracking-[0.05em]">
                {c.tag}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#0a0a0a] mb-3 tracking-[-0.02em]">
              {c.title}
            </h3>
            <p className="text-sm text-[#666] leading-[1.6] m-0">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const GBKVenueModern = ({ venue }: { venue: string }) => {
  return (
    <div className="py-20 px-[5%] bg-[#fafafa]">
      <h2 className="text-sm uppercase tracking-[0.2em] text-[#007CFF] mb-8 font-extrabold">
        Location
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className={styles.venueImgContainer}>
          <img
            src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200"
            className="absolute top-0 left-0 w-full h-full object-cover object-center pointer-events-none"
            alt="Gelora Bung Karno"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-[10px] py-4 px-6 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <h4 className="m-0 text-lg font-extrabold text-[#0a0a0a] tracking-[-0.01em]">
              {venue}
            </h4>
            <p className="mt-1 mb-0 text-[13px] text-[#666] font-medium">Jakarta, Indonesia</p>
          </div>
        </div>

        <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-col gap-4">
          <div className="bg-white rounded-[24px] p-4 md:p-6 flex flex-col justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#f5f5f5]">
            <span className="text-[10px] md:text-xs text-[#888] uppercase tracking-[0.1em] font-bold mb-1 md:mb-2">
              Capacity
            </span>
            <span className="text-xl md:text-[28px] text-[#0a0a0a] font-extrabold tracking-[-0.02em]">
              77,193
            </span>
          </div>
          <div className="bg-white rounded-[24px] p-4 md:p-6 flex flex-col justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#f5f5f5]">
            <span className="text-[10px] md:text-xs text-[#888] uppercase tracking-[0.1em] font-bold mb-1 md:mb-2">
              Access Gates
            </span>
            <span className="text-xl md:text-[28px] text-[#0a0a0a] font-extrabold tracking-[-0.02em]">
              1 - 12
            </span>
          </div>
          <div className="bg-white rounded-[24px] p-4 md:p-6 flex flex-col justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#f5f5f5]">
            <span className="text-[10px] md:text-xs text-[#888] uppercase tracking-[0.1em] font-bold mb-1 md:mb-2">
              Nearest MRT
            </span>
            <span className="text-xl md:text-[28px] text-[#0a0a0a] font-extrabold tracking-[-0.02em]">
              Istora
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SmoothFAQ = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="pt-20 pb-[150px] px-[5%] bg-[#fafafa] text-[#0a0a0a]">
      <h2 className="text-sm uppercase tracking-[0.2em] text-[#007CFF] mb-8 font-extrabold">FAQ</h2>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div key={i} className={styles.faqContainer}>
            <button
              onClick={() => setActive(active === i ? null : i)}
              className="w-full p-0 flex items-center justify-between bg-transparent border-none cursor-pointer text-left text-[#0a0a0a]"
            >
              <h4
                className={`text-lg font-bold transition-colors duration-300 ${active === i ? 'text-[#007CFF]' : 'text-[#0a0a0a]'}`}
              >
                {faq.q}
              </h4>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400 ${active === i ? 'bg-[#007CFF] text-white' : 'bg-[#f5f5f5] text-[#888]'}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-all duration-400 ${active === i ? 'rotate-45' : 'rotate-0'}`}
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-400 ${active === i ? 'h-auto opacity-100 mt-4' : 'h-0 opacity-0 mt-0'}`}
            >
              <p className="text-[15px] text-[#666] m-0 max-w-[600px] leading-[1.6]">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TicketPanel = ({ event, onGetTickets }: { event: any; onGetTickets: () => void }) => {
  return (
    <div className="hidden lg:block w-[35%] shrink-0 p-[160px_5%_100px_0] mb-20 lg:mb-0">
      <div className={styles.ticketPanelSticky}>
        <p className="text-[#888] text-xs font-bold uppercase tracking-[0.1em] mb-3">
          Tickets Starting From
        </p>
        <div className="text-[clamp(32px,3.5vw,48px)] font-extrabold text-[#007CFF] mb-10 tracking-[-0.03em]">
          {formatPrice(event.min_price)}
        </div>

        <div className="flex flex-col gap-4 mb-10">
          <div className="bg-[#fafafa] p-5 rounded-[20px] border border-[#f5f5f5]">
            <div className="text-[11px] text-[#888] font-bold uppercase tracking-[0.1em]">
              Date & Time
            </div>
            <div className="text-[15px] font-bold mt-1.5 text-[#111]">{formatDate(event.date)}</div>
          </div>

          <div className="bg-[#fafafa] p-5 rounded-[20px] border border-[#f5f5f5]">
            <div className="text-[11px] text-[#888] font-bold uppercase tracking-[0.1em]">
              Venue
            </div>
            <div className="text-[15px] font-bold mt-1.5 text-[#111]">{event.venue_name}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            className={cn(
              styles.ticketPanelBtnBase,
              event.status === 'sold_out'
                ? styles.ticketPanelBtnSoldOut
                : styles.ticketPanelBtnAvailable
            )}
            onClick={event.status !== 'sold_out' ? onGetTickets : undefined}
          >
            {event.status === 'sold_out' ? 'SOLD OUT' : 'GET TICKETS'}
          </button>
          <p className="text-center text-xs text-[#aaa] font-medium m-0">
            Guaranteed secure checkout via Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

export const EventDetail = () => {
  const { event, isLoading, navigate } = useEventDetail();

  if (isLoading) {
    return (
      <div className="bg-[#fafafa] min-h-screen pb-[100px]">
        <div className="h-[400px] lg:h-[500px] w-full relative">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-10 items-start">
            <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <Skeleton className="h-8 lg:h-12 w-[80%] mb-4" />
              <Skeleton className="h-5 lg:h-6 w-[40%] mb-8" />
              <Skeleton className="h-3 lg:h-4 w-full mb-3" />
              <Skeleton className="h-3 lg:h-4 w-[90%] mb-3" />
              <Skeleton className="h-3 lg:h-4 w-[95%] mb-8" />
            </div>
            <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <Skeleton className="h-6 lg:h-8 w-[60%] mb-6" />
              <Skeleton className="h-12 w-full rounded-full" />
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

      <div className="w-full lg:w-[65%] relative">
        <div className="pt-[140px] lg:pt-[160px] px-0 lg:px-0">
          <HeroModern event={event} />
          <SynopsisReveal text={event.description} />
          <LineupBento />
          <HighlightsModern />
          <GBKVenueModern venue={event.venue_name} />
          <SmoothFAQ />
        </div>
      </div>

      <TicketPanel event={event} onGetTickets={() => navigate(`/tickets/${event.slug}`)} />

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 p-4 pb-6 px-6 z-[99] flex justify-between items-end shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col">
          <p className="text-[10px] text-[#555] font-semibold truncate max-w-[160px] sm:max-w-[200px] mb-1.5">
            {formatDate(event.date)} • {event.venue_name}
          </p>
          <p className="text-[10px] text-[#888] font-bold uppercase tracking-[0.1em] m-0 leading-none">
            Tickets From
          </p>
          <div className="text-xl font-extrabold text-[#007CFF] tracking-[-0.02em] leading-none mt-1">
            {formatPrice(event.min_price)}
          </div>
        </div>
        <button
          className={cn(
            'py-3.5 px-8 rounded-full text-[14px] font-extrabold border-none tracking-[0.05em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            event.status === 'sold_out'
              ? 'bg-[#e5e5e5] text-[#888] cursor-not-allowed shadow-none'
              : 'bg-[#007CFF] text-white cursor-pointer shadow-[0_8px_24px_rgba(0,124,255,0.25)]'
          )}
          onClick={event.status !== 'sold_out' ? () => navigate(`/tickets/${event.slug}`) : undefined}
        >
          {event.status === 'sold_out' ? 'SOLD OUT' : 'GET TICKETS'}
        </button>
      </div>
    </div>
  );
};
