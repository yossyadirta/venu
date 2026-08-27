import { cn } from 'loka';

export const styles = {
  eventCard: cn(
    'group flex flex-col h-full rounded-[20px] overflow-hidden bg-white cursor-pointer',
    'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]',
    'hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,124,255,0.15),0_4px_12px_rgba(0,0,0,0.08)]'
  ),
  eventCardImg:
    'w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]',
  categoryCard: cn(
    'group py-[30px] px-4 rounded-[24px] cursor-pointer text-center',
    'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'shadow-[0_4px_12px_rgba(0,0,0,0.02)] border',
    'hover:-translate-y-2 hover:scale-[1.02] hover:bg-white'
  ),
  venueCard:
    'relative h-[400px] rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
  spotlightSection:
    'mx-6 mb-[100px] rounded-[32px] overflow-hidden relative flex min-h-[500px] cursor-pointer bg-[#0a0a0a]',
  spotlightImg:
    'w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]',
  btnPrimary: cn(
    'py-[17px] px-9 rounded-xl bg-[#007CFF] text-white font-bold text-[15px] border-none cursor-pointer w-fit',
    'shadow-[0_4px_24px_rgba(0,124,255,0.45)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'hover:-translate-y-0.5 hover:scale-[1.03]'
  ),
  btnOutline: cn(
    'py-2.5 px-6 rounded-full bg-transparent text-[#007CFF] font-semibold text-[13px]',
    'border-[1.5px] border-[#007CFF] cursor-pointer transition-all duration-400',
    'ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.02em]',
    'hover:bg-[#007CFF] hover:text-white hover:scale-105 mt-4 sm:mt-0'
  ),
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

export const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const categories = [
  {
    name: 'Music',
    icon_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>',
    color: '#7C3AED',
    count: '2.4k',
    bg: 'linear-gradient(135deg, #7C3AED22, #7C3AED08)',
  },
  {
    name: 'Tech',
    icon_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>',
    color: '#007CFF',
    count: '890',
    bg: 'linear-gradient(135deg, #007CFF22, #007CFF08)',
  },
  {
    name: 'Comedy',
    icon_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>',
    color: '#F59E0B',
    count: '456',
    bg: 'linear-gradient(135deg, #F59E0B22, #F59E0B08)',
  },
  {
    name: 'Sports',
    icon_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>',
    color: '#10B981',
    count: '1.2k',
    bg: 'linear-gradient(135deg, #10B98122, #10B98108)',
  },
  {
    name: 'Food & Drink',
    icon_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>',
    color: '#EF4444',
    count: '678',
    bg: 'linear-gradient(135deg, #EF444422, #EF444408)',
  },
  {
    name: 'Arts',
    icon_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.53-.21-1.04-.59-1.41C13.54 17.72 13.34 17.2 13.34 16.66c0-1.1.9-2 2-2h1.16c3.04 0 5.5-2.46 5.5-5.5C22 7.03 17.52 2 12 2z" /><path d="M6.5 11.5c.83 0 1.5-.67 1.5-1.5S7.33 8.5 6.5 8.5 5 9.17 5 10s.67 1.5 1.5 1.5z" /><path d="M10 7.5c.83 0 1.5-.67 1.5-1.5S10.83 4.5 10 4.5 8.5 5.17 8.5 6s.67 1.5 1.5 1.5z" /><path d="M14 7.5c.83 0 1.5-.67 1.5-1.5S14.83 4.5 14 4.5 12.5 5.17 12.5 6s.67 1.5 1.5 1.5z" /><path d="M17.5 11.5c.83 0 1.5-.67 1.5-1.5s-1.5-1.5-2.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" /></svg>',
    color: '#EC4899',
    count: '345',
    bg: 'linear-gradient(135deg, #EC489922, #EC489908)',
  },
  {
    name: 'Wellness',
    icon_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>',
    color: '#14B8A6',
    count: '234',
    bg: 'linear-gradient(135deg, #14B8A622, #14B8A608)',
  },
  {
    name: 'Business',
    icon_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>',
    color: '#6366F1',
    count: '567',
    bg: 'linear-gradient(135deg, #6366F122, #6366F108)',
  },
];

export const stats = [
  { value: 12000, suffix: '+', label: 'Events Listed', format: false },
  { value: 2500000, suffix: '+', label: 'Tickets Sold', format: true },
  { value: 50, suffix: '+', label: 'Cities', format: false },
  { value: 98, suffix: '%', label: 'Satisfaction', format: false },
];

export const reviews = [
  {
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Absolutely seamless experience! Bought tickets in under 2 minutes and the QR code worked perfectly at the venue.',
    event: 'Jakarta Music Festival',
  },
  {
    name: 'Budi P.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Best ticketing platform in Indonesia. The premium package was worth every rupiah — incredible perks!',
    event: 'Tech Summit Indonesia',
  },
  {
    name: 'Anita R.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Finally a platform that actually shows real-time availability. No more guessing if tickets are still available.',
    event: 'ARTJOG 2025',
  },
  {
    name: 'Kevin L.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    rating: 4,
    text: 'Great selection of food events! The recommendations were spot-on for my taste.',
    event: 'Surabaya Food Carnival',
  },
  {
    name: 'Maya D.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    rating: 5,
    text: 'The wellness retreat booking was so smooth. Love the detailed event descriptions and gallery photos.',
    event: 'Bali Wellness Retreat',
  },
  {
    name: 'Rudi H.',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    rating: 5,
    text: 'VIP meet & greet ticket delivery was instant. The whole experience felt premium from start to finish.',
    event: 'Tomorrowland 2026',
  },
];

export const venues = [
  {
    name: 'Gelora Bung Karno',
    city: 'Jakarta',
    events: 12,
    img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'ICE BSD City',
    city: 'Tangerang',
    events: 8,
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Ciputra Artpreneur',
    city: 'Jakarta',
    events: 4,
    img: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Finns Beach Club',
    city: 'Bali',
    events: 9,
    img: 'https://images.unsplash.com/photo-1577172249844-716749254893?q=80&w=1000&auto=format&fit=crop',
  },
];

export const partners = [
  {
    name: 'Nusantek',
    logo_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22l10-10l10 10" /><path d="M12 2l10 10l-10 10l-10-10z" /></svg>',
  },
  {
    name: 'Palapa',
    logo_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>',
  },
  {
    name: 'Aksara',
    logo_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>',
  },
  {
    name: 'Cakrawala',
    logo_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M14.31 8l5.74 9.94" /><path d="M9.69 8h11.48" /><path d="M7.38 12l5.74-9.94" /><path d="M9.69 16L3.95 6.06" /><path d="M14.31 16H2.83" /><path d="M16.62 12l-5.74 9.94" /></svg>',
  },
  {
    name: 'Dirga',
    logo_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /><line x1="12" y1="22" x2="12" y2="15.5" /><polyline points="22 8.5 12 15.5 2 8.5" /><polyline points="2 15.5 12 8.5 22 15.5" /><line x1="12" y1="2" x2="12" y2="8.5" /></svg>',
  },
  {
    name: 'Kuantum',
    logo_svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 22h20L12 2z" /></svg>',
  },
];

export const marqueeText =
  'VENU · LIVE EXPERIENCES · CONCERTS · FESTIVALS · CONFERENCES · WORKSHOPS · COMEDY · SPORTS · ART · ';
