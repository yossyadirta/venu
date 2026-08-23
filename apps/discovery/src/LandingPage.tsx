import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useQuery } from '@tanstack/react-query';
import { dbClient, Event } from 'api-client';
import { useNavigate } from 'react-router-dom';
import { Badge, Skeleton, Calendar } from 'loka';
import { HeroCinematicCarousel } from './HeroCinematicCarousel';

gsap.registerPlugin(ScrollTrigger);

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

const categories = [
  { name: 'Music', icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>', color: '#7C3AED', count: '2.4k', bg: 'linear-gradient(135deg, #7C3AED22, #7C3AED08)' },
  { name: 'Tech', icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>', color: '#007CFF', count: '890', bg: 'linear-gradient(135deg, #007CFF22, #007CFF08)' },
  { name: 'Comedy', icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>', color: '#F59E0B', count: '456', bg: 'linear-gradient(135deg, #F59E0B22, #F59E0B08)' },
  { name: 'Sports', icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>', color: '#10B981', count: '1.2k', bg: 'linear-gradient(135deg, #10B98122, #10B98108)' },
  { name: 'Food & Drink', icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>', color: '#EF4444', count: '678', bg: 'linear-gradient(135deg, #EF444422, #EF444408)' },
  { name: 'Arts', icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.53-.21-1.04-.59-1.41C13.54 17.72 13.34 17.2 13.34 16.66c0-1.1.9-2 2-2h1.16c3.04 0 5.5-2.46 5.5-5.5C22 7.03 17.52 2 12 2z" /><path d="M6.5 11.5c.83 0 1.5-.67 1.5-1.5S7.33 8.5 6.5 8.5 5 9.17 5 10s.67 1.5 1.5 1.5z" /><path d="M10 7.5c.83 0 1.5-.67 1.5-1.5S10.83 4.5 10 4.5 8.5 5.17 8.5 6s.67 1.5 1.5 1.5z" /><path d="M14 7.5c.83 0 1.5-.67 1.5-1.5S14.83 4.5 14 4.5 12.5 5.17 12.5 6s.67 1.5 1.5 1.5z" /><path d="M17.5 11.5c.83 0 1.5-.67 1.5-1.5s-1.5-1.5-2.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" /></svg>', color: '#EC4899', count: '345', bg: 'linear-gradient(135deg, #EC489922, #EC489908)' },
  { name: 'Wellness', icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>', color: '#14B8A6', count: '234', bg: 'linear-gradient(135deg, #14B8A622, #14B8A608)' },
  { name: 'Business', icon_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>', color: '#6366F1', count: '567', bg: 'linear-gradient(135deg, #6366F122, #6366F108)' }
];

const stats = [
  { value: 12000, suffix: '+', label: 'Events Listed', format: false },
  { value: 2500000, suffix: '+', label: 'Tickets Sold', format: true },
  { value: 50, suffix: '+', label: 'Cities', format: false },
  { value: 98, suffix: '%', label: 'Satisfaction', format: false }
];

const reviews = [
  { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', rating: 5, text: 'Absolutely seamless experience! Bought tickets in under 2 minutes and the QR code worked perfectly at the venue.', event: 'Jakarta Music Festival' },
  { name: 'Budi P.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop', rating: 5, text: 'Best ticketing platform in Indonesia. The premium package was worth every rupiah — incredible perks!', event: 'Tech Summit Indonesia' },
  { name: 'Anita R.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop', rating: 5, text: 'Finally a platform that actually shows real-time availability. No more guessing if tickets are still available.', event: 'ARTJOG 2025' },
  { name: 'Kevin L.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', rating: 4, text: 'Great selection of food events! The recommendations were spot-on for my taste.', event: 'Surabaya Food Carnival' },
  { name: 'Maya D.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', rating: 5, text: 'The wellness retreat booking was so smooth. Love the detailed event descriptions and gallery photos.', event: 'Bali Wellness Retreat' },
  { name: 'Rudi H.', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop', rating: 5, text: 'VIP meet & greet ticket delivery was instant. The whole experience felt premium from start to finish.', event: 'Stand-Up Comedy Night' }
];

const venues = [
  { name: 'Gelora Bung Karno', city: 'Jakarta', events: 12, img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop' },
  { name: 'ICE BSD City', city: 'Tangerang', events: 8, img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Ciputra Artpreneur', city: 'Jakarta', events: 4, img: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Finns Beach Club', city: 'Bali', events: 9, img: 'https://images.unsplash.com/photo-1577172249844-716749254893?q=80&w=1000&auto=format&fit=crop' }
];

const partners = [
  { name: 'Nusantek', logo_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22l10-10l10 10" /><path d="M12 2l10 10l-10 10l-10-10z" /></svg>' },
  { name: 'Palapa', logo_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>' },
  { name: 'Aksara', logo_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>' },
  { name: 'Cakrawala', logo_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M14.31 8l5.74 9.94" /><path d="M9.69 8h11.48" /><path d="M7.38 12l5.74-9.94" /><path d="M9.69 16L3.95 6.06" /><path d="M14.31 16H2.83" /><path d="M16.62 12l-5.74 9.94" /></svg>' },
  { name: 'Dirga', logo_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /><line x1="12" y1="22" x2="12" y2="15.5" /><polyline points="22 8.5 12 15.5 2 8.5" /><polyline points="2 15.5 12 8.5 22 15.5" /><line x1="12" y1="2" x2="12" y2="8.5" /></svg>' },
  { name: 'Kuantum', logo_svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 22h20L12 2z" /></svg>' }
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 37 });

  const marqueeRef = useRef<HTMLDivElement>(null);
  const flashDealsRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const nearYouRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const catHoverImgRef = useRef<HTMLImageElement>(null);
  const spotlightRef = useRef<HTMLElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const { data: events, isLoading } = useQuery({
    queryKey: ['all-events'],
    queryFn: dbClient.events.getTrending,
  });

  const featuredEvents = useMemo(() => events?.slice(0, 4) || [], [events]);
  const flashDealEvents = useMemo(() => events?.slice(4, 8) || [], [events]);
  const trendingEvents = useMemo(() => events?.slice(8, 12) || [], [events]);
  const nearYouEvents = useMemo(() => events?.slice(12, 15) || [], [events]);
  const upcomingEvents = useMemo(() => events?.slice(15, 19) || [], [events]);
  const spotlightEvent = events?.[23] || null;

  // Flash Sale Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          return { hours: 2, minutes: 0, seconds: 0 };
        }
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation
      if (marqueeRef.current) {
        const inner = marqueeRef.current.querySelector('[data-marquee-inner]') as HTMLElement;
        if (inner) {
          marqueeTweenRef.current = gsap.to(inner, { xPercent: -50, repeat: -1, duration: 40, ease: 'linear' });
        }
      }

      // Staggered Reveals
      const revealSections = [flashDealsRef, trendingRef, nearYouRef, upcomingRef, reviewsRef, statsRef, ctaRef];
      revealSections.forEach(ref => {
        if (!ref.current) return;
        const children = ref.current.children[0]?.children; // Target the inner grid/flex elements
        gsap.fromTo(children || ref.current,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      if (spotlightRef.current) {
        gsap.fromTo(spotlightRef.current,
          { y: 120, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: spotlightRef.current, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!events) return;

    const allCards = document.querySelectorAll('[data-event-card]');
    allCards.forEach(card => {
      gsap.fromTo(card,
        { y: 80, opacity: 0, rotateX: 4 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' }
        }
      );
    });

    const catCards = document.querySelectorAll('[data-cat-card]');
    gsap.fromTo(catCards,
      { y: 50, opacity: 0, scale: 0.85 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: categoriesRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );

    const statEls = document.querySelectorAll('[data-stat]');
    gsap.fromTo(statEls,
      { y: 40, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );

    const reviewCards = document.querySelectorAll('[data-review-card]');
    gsap.fromTo(reviewCards,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: reviewsRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  }, [events]);

  const marqueeText = 'VENU · LIVE EXPERIENCES · CONCERTS · FESTIVALS · CONFERENCES · WORKSHOPS · COMEDY · SPORTS · ART · ';

  const EventCard = ({ event, large = false }: { event: Event; large?: boolean }) => (
    <div
      data-event-card
      onClick={() => navigate(`/events/${event.slug}`)}
      style={{
        borderRadius: 20, overflow: 'hidden', background: 'white', cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', height: '100%',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,124,255,0.15), 0 4px 12px rgba(0,0,0,0.08)';
        const img = e.currentTarget.querySelector('[data-card-img]') as HTMLElement;
        if (img) img.style.transform = 'scale(1.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)';
        const img = e.currentTarget.querySelector('[data-card-img]') as HTMLElement;
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      <div style={{ aspectRatio: large ? '16/9' : '16/10', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <img data-card-img src={event.hero_image_url} alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.7))' }} />
        <Badge style={{ position: 'absolute', top: 16, left: 16 }}
          variant={event.status === 'sold_out' ? 'destructive' : event.status === 'selling_fast' ? 'success' : 'default'}
        >
          {event.status.replace(/_/g, ' ').toUpperCase()}
        </Badge>
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500 }}>{formatDate(event.date)}</p>
          <div style={{
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 10, padding: '5px 14px', border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>{formatPrice(event.min_price)}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '18px 22px 22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{
          fontSize: large ? 22 : 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8, color: '#0a0a0a',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          minHeight: large ? 54 : 44, // Ensures titles always take 2 lines worth of height for perfect grid alignment
        }}>{event.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', fontSize: 13, marginBottom: 12 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.venue_name} · {event.location}</span>
        </div>
        {large && <p style={{ fontSize: 14, color: '#666', marginBottom: 16, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 44 }}>{event.description}</p>}

        <div style={{ flexGrow: 1 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: event.status === 'sold_out' ? '#ccc' : '#007CFF', letterSpacing: '0.02em' }}>
            {event.status === 'sold_out' ? 'SOLD OUT' : 'VIEW DETAILS →'}
          </span>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: event.status === 'sold_out' ? '#f5f5f5' : '#007CFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,124,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={event.status === 'sold_out' ? '#ccc' : 'white'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      background: '#fafafa', minHeight: '100vh', fontFamily: 'Inter, sans-serif',
      position: 'relative', overflowX: 'hidden'
    }}>
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 9999, opacity: 0.03,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
      }} />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />


      {isLoading ? (
        <div style={{ height: '100vh', width: '100%', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
          <Skeleton style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
          <div style={{ position: 'absolute', inset: 0, padding: '0 60px', display: 'flex', alignItems: 'center', zIndex: 10 }}>
            <div style={{ maxWidth: 780, width: '100%' }}>
              <Skeleton style={{ height: 80, width: '70%', marginBottom: 12 }} />
              <Skeleton style={{ height: 80, width: '50%', marginBottom: 32 }} />
              <Skeleton style={{ height: 20, width: '80%', marginBottom: 12 }} />
              <Skeleton style={{ height: 20, width: '60%', marginBottom: 40 }} />
              <div style={{ display: 'flex', gap: 16 }}>
                <Skeleton style={{ height: 56, width: 180, borderRadius: 999 }} />
                <Skeleton style={{ height: 56, width: 140, borderRadius: 999 }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <HeroCinematicCarousel
          events={featuredEvents}
          onEventClick={(slug) => navigate(`/events/${slug}`)}
          formatPrice={formatPrice}
          formatDate={formatDate}
        />
      )}

      <div
        ref={marqueeRef}
        style={{ overflow: 'hidden', padding: '18px 0', background: '#0a0a0a', cursor: 'default' }}
        onMouseEnter={() => {
          if (marqueeTweenRef.current) gsap.to(marqueeTweenRef.current, { timeScale: 0.1, duration: 0.5 });
        }}
        onMouseLeave={() => {
          if (marqueeTweenRef.current) gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.5 });
        }}
      >
        <div data-marquee-inner style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.25em', textTransform: 'uppercase', paddingRight: 24 }}>
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      <section style={{ padding: '100px 24px 80px', maxWidth: 1280, margin: '0 auto' }}>
        <div ref={flashDealsRef}>
          <div className="flex-col-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Flash <span style={{ background: 'linear-gradient(135deg, #EF4444, #F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Deals</span>
              </h2>
              <p style={{ fontSize: 16, color: '#888', marginTop: 12, maxWidth: 420 }}>Limited-time offers ending soon. Don't wait!</p>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #EF4444, #F97316)', borderRadius: 12, padding: '10px 20px',
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'white', letterSpacing: '0.05em' }}>ENDS IN</span>
              {['hours', 'minutes', 'seconds'].map((key, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    background: 'rgba(0,0,0,0.25)', borderRadius: 6, padding: '4px 8px',
                    minWidth: 32, textAlign: 'center' as const,
                  }}>
                    <span style={{ color: 'white', fontSize: 16, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                      {timeLeft[key as keyof typeof timeLeft].toString().padStart(2, '0')}
                    </span>
                  </div>
                  {i < 2 && <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 16 }}>:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Skeleton className="rounded-2xl" style={{ height: 240, width: '100%' }} />
                  <Skeleton style={{ height: 20, width: '60%' }} />
                  <Skeleton style={{ height: 14, width: '40%' }} />
                </div>
              ))
              : flashDealEvents.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div ref={trendingRef}>
          <div className="flex-col-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Don't Miss <span style={{ color: '#007CFF' }}>Out</span>
              </h2>
              <p style={{ fontSize: 16, color: '#888', marginTop: 12, maxWidth: 420 }}>Events selling fast right now. Secure your spot before it's too late.</p>
            </div>
            <button style={{
              padding: '10px 24px', borderRadius: 999, background: 'transparent', color: '#007CFF',
              fontWeight: 600, fontSize: 13, border: '1.5px solid #007CFF', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', letterSpacing: '0.02em',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#007CFF'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#007CFF'; e.currentTarget.style.transform = 'scale(1)'; }}
            >View All →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Skeleton className="rounded-2xl" style={{ height: 240, width: '100%' }} />
                  <Skeleton style={{ height: 20, width: '60%' }} />
                  <Skeleton style={{ height: 14, width: '40%' }} />
                </div>
              ))
              : trendingEvents.map(event => <EventCard key={event.id} event={event} />)
            }
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div ref={nearYouRef}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Near <span style={{ color: '#007CFF' }}>You</span>
            </h2>
            <div className="flex-col-mobile" style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
              <p style={{ fontSize: 16, color: '#888', display: 'flex', alignItems: 'flex-start', gap: 8, margin: 0 }}>
                <span style={{ display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite', marginTop: 6, flexShrink: 0 }} />
                <span style={{ lineHeight: 1.4 }}>Showing events in Jakarta & surrounding areas</span>
              </p>
              <span style={{ color: '#007CFF', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Change Location</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Skeleton className="rounded-2xl" style={{ height: 240, width: '100%' }} />
                  <Skeleton style={{ height: 20, width: '60%' }} />
                  <Skeleton style={{ height: 14, width: '40%' }} />
                </div>
              ))
              : nearYouEvents.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px', maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div ref={categoriesRef}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Explore <span style={{ color: '#007CFF' }}>Experiences</span>
            </h2>
            <p style={{ fontSize: 16, color: '#888', marginTop: 12 }}>Hover to explore categories.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
            {categories.map(cat => (
              <div key={cat.name} data-cat-card style={{
                padding: '30px 16px', borderRadius: 24, background: cat.bg, cursor: 'pointer',
                textAlign: 'center', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                border: `1px solid ${cat.color}15`, boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 24px 48px ${cat.color}25`;
                  e.currentTarget.style.borderColor = cat.color + '40';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = cat.color + '15';
                  e.currentTarget.style.background = cat.bg;
                }}
              >
                <div style={{ marginBottom: 12, transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', display: 'inline-flex', color: cat.color }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.2) rotate(-8deg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(0)'; }}
                  dangerouslySetInnerHTML={{ __html: cat.icon_svg }}
                />
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0a0a0a', marginBottom: 4 }}>{cat.name}</div>
                <div style={{ fontSize: 13, color: cat.color, fontWeight: 700, opacity: 0.8 }}>{cat.count} events</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <div className="flex-col-mobile" style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                Explore Top <span style={{ color: '#007CFF' }}>Venues</span>
              </h2>
              <p style={{ fontSize: 16, color: '#888', marginTop: 12 }}>Experience world-class events in iconic locations.</p>
            </div>
            <button style={{
              padding: '10px 24px', borderRadius: 999, background: 'transparent', color: '#007CFF',
              fontWeight: 600, fontSize: 13, border: '1.5px solid #007CFF', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', letterSpacing: '0.02em',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#007CFF'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#007CFF'; e.currentTarget.style.transform = 'scale(1)'; }}
            >All Venues →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 20 }}>
            {venues.map((venue, i) => {
              const colSpan = (i === 0 || i === 3) ? 'span 8' : 'span 4';
              return (
                <div key={i} data-venue-card style={{
                  position: 'relative', height: 400, borderRadius: 32, overflow: 'hidden', cursor: 'pointer',
                  gridColumn: colSpan,
                  transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s'
                }}
                  onPointerMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) / 20;
                    const y = (e.clientY - rect.top - rect.height / 2) / 20;
                    const img = e.currentTarget.querySelector('img');
                    if (img) gsap.to(img, { x: x, y: y, scale: 1.15, duration: 0.6, ease: 'power2.out' });
                  }}
                  onPointerLeave={e => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' });
                  }}
                >
                  <img src={venue.img} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover', scale: 1 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32, pointerEvents: 'none' }}>
                    <h3 style={{ color: 'white', fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>{venue.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 500 }}>{venue.city}</span>
                      <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white', padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                        {venue.events} Events
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {spotlightEvent && (
        <section ref={spotlightRef} style={{
          margin: '0 24px 100px', borderRadius: 32, overflow: 'hidden',
          position: 'relative', display: 'flex', minHeight: 500, cursor: 'pointer',
          background: '#0a0a0a',
        }} onClick={() => navigate(`/events/${spotlightEvent.slug}`)}>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <img src={spotlightEvent.hero_image_url} alt={spotlightEvent.title} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.06)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)' }} />
          </div>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, display: 'flex',
            flexDirection: 'column', justifyContent: 'center', padding: '60px 70px',
            maxWidth: 580, zIndex: 2,
          }}>
            <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 52px)', fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 18 }}>
              {spotlightEvent.title}
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 24 }}>
              {spotlightEvent.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>📅 {formatDate(spotlightEvent.date)}</span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>📍 {spotlightEvent.location}</span>
            </div>
            <button style={{
              padding: '17px 36px', borderRadius: 14, background: '#007CFF', color: 'white',
              fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', width: 'fit-content',
              boxShadow: '0 4px 24px rgba(0,124,255,0.45)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
            >
              Get Tickets — {formatPrice(spotlightEvent.min_price)}
            </button>
          </div>
        </section>
      )}

      <section style={{ padding: '0 24px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div ref={upcomingRef}>
          <div className="flex-col-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                Upcoming <span style={{ color: '#007CFF' }}>Events</span>
              </h2>
              <p style={{ fontSize: 16, color: '#888', marginTop: 12, maxWidth: 420 }}>Fresh events just added. Be the first to book.</p>
            </div>
            <button style={{
              padding: '10px 24px', borderRadius: 999, background: 'transparent', color: '#007CFF',
              fontWeight: 600, fontSize: 13, border: '1.5px solid #007CFF', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', letterSpacing: '0.02em',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#007CFF'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#007CFF'; e.currentTarget.style.transform = 'scale(1)'; }}
            >View All →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Skeleton className="rounded-2xl" style={{ height: 240, width: '100%' }} />
                  <Skeleton style={{ height: 20, width: '60%' }} />
                </div>
              ))
              : upcomingEvents.map(event => <EventCard key={event.id} event={event} large />)
            }
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div ref={reviewsRef}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              What People <span style={{ color: '#007CFF' }}>Say</span>
            </h2>
            <p style={{ fontSize: 16, color: '#888', marginTop: 12 }}>Real reviews from real ticket holders.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {reviews.map((review, i) => (
              <div key={i} data-review-card style={{
                borderRadius: 20, padding: '28px', background: 'white', cursor: 'default',
                border: '1px solid #f0f0f0',
                transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s, border-color 0.3s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,124,255,0.08)';
                  e.currentTarget.style.borderColor = '#007CFF30';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#f0f0f0';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f5f5f5', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={review.avatar} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0a0a0a' }}>{review.name}</div>
                    <div style={{ fontSize: 12, color: '#aaa' }}>{review.event}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="stats-container flex-col-mobile" style={{
        padding: '80px 24px', margin: '0 24px 100px',
        borderRadius: 32, background: '#0a0a0a',
        display: 'flex', justifyContent: 'center',
      }}>
        {stats.map((stat, i) => (
          <div key={i} data-stat style={{
            flex: 1, textAlign: 'center', padding: '20px 0',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <div style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: '#007CFF', letterSpacing: '-0.04em', marginBottom: 8 }}>
              {stat.format ? '2.5M' : stat.value.toLocaleString()}{stat.suffix}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '0.02em' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      <section style={{ padding: '0 24px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#aaa', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Trusted by leading brands</p>
        </div>
        <div ref={partnersRef} style={{ overflow: 'hidden', padding: '20px 0' }}>
          <div data-partner-inner className="marquee-mobile" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content', alignItems: 'center' }}>
            {[...partners, ...partners].map((partner, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 40px', marginRight: 16,
                fontSize: 18, fontWeight: 800, color: '#d0d0d0', letterSpacing: '-0.02em',
                transition: 'color 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#007CFF'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#d0d0d0'; }}
              >
                <div dangerouslySetInnerHTML={{ __html: partner.logo_svg }} style={{ display: 'flex' }} />
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={ctaRef}
        onMouseMove={(e) => {
          if (!ctaRef.current) return;
          const rect = ctaRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          ctaRef.current.style.setProperty('--mouse-x', x.toString());
          ctaRef.current.style.setProperty('--mouse-y', y.toString());
        }}
        onMouseLeave={() => {
          if (!ctaRef.current) return;
          ctaRef.current.style.setProperty('--mouse-x', '0');
          ctaRef.current.style.setProperty('--mouse-y', '0');
        }}
        style={{
          margin: '0 24px 100px', borderRadius: 32, overflow: 'hidden',
          position: 'relative', padding: '100px 60px',
          background: 'linear-gradient(135deg, #007CFF 0%, #0055CC 50%, #003399 100%)',
          boxShadow: '0 30px 60px rgba(0, 124, 255, 0.2)',
        }}>
        <style>{`
          .newsletter-input::placeholder { color: #ffffff !important; opacity: 1 !important; font-weight: 500; }
        `}</style>

        <div style={{
          position: 'absolute', top: -140, right: -140, width: 500, height: 500, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
          transform: 'translate(calc(var(--mouse-x, 0) * -80px), calc(var(--mouse-y, 0) * -80px))',
          transition: 'transform 0.3s ease-out'
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -100, width: 350, height: 350, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
          transform: 'translate(calc(var(--mouse-x, 0) * 50px), calc(var(--mouse-y, 0) * 50px))',
          transition: 'transform 0.3s ease-out'
        }} />
        <div style={{
          position: 'absolute', top: '15%', left: '35%', width: 150, height: 150, borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
          transform: 'translate(calc(var(--mouse-x, 0) * 120px), calc(var(--mouse-y, 0) * 120px))',
          transition: 'transform 0.3s ease-out'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
          <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 52px)', fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 18 }}>
            Never miss
            <br /><span style={{ opacity: 0.6 }}>a moment.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 36, lineHeight: 1.7, fontWeight: 500 }}>
            Get personalized event recommendations and early access to exclusive ticket drops.
          </p>
          <div className="flex-col-mobile w-full" style={{ display: 'flex', gap: 12 }}>
            <input type="email" placeholder="Enter your email" className="newsletter-input" style={{
              flex: 1, padding: '17px 22px', borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)', color: 'white', fontSize: 15, outline: 'none',
              transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
            }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255,255,255,0.1)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            <button style={{
              padding: '17px 34px', borderRadius: 14, background: 'white', color: '#007CFF',
              fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >Get Started</button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body, html { scrollbar-width: none; -ms-overflow-style: none; }
        body::-webkit-scrollbar, html::-webkit-scrollbar { display: none; }
        ::placeholder { color: rgba(150,150,150,0.5) !important; }
        img { -webkit-user-drag: none; user-select: none; }
      `}</style>
    </div>
  );
};
