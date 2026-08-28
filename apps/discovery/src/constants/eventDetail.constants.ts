import React from 'react';
import { cn } from 'loka';

export const styles = {
  heroContainer:
    'w-full h-[70vh] rounded-[40px] relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]',
  bentoAct: cn(
    'bento-act relative overflow-hidden rounded-[32px] bg-white flex items-end p-10 cursor-pointer h-[400px]',
    'shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] group'
  ),
  highlightCard: cn(
    'bg-white p-8 rounded-[32px] shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-[#f5f5f5]',
    'flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)]'
  ),
  venueImgContainer:
    'flex-[2] h-[400px] relative rounded-[32px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]',
  faqContainer:
    'bg-white rounded-[24px] p-[24px_32px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#f5f5f5]',
  ticketPanelSticky:
    'sticky top-[120px] bg-white rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-[#f0f0f0] flex flex-col',
  ticketPanelBtnBase:
    'w-full p-5 rounded-full text-[15px] font-extrabold border-none tracking-[0.05em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
  ticketPanelBtnSoldOut: 'bg-[#e5e5e5] text-[#888] cursor-not-allowed shadow-none',
  ticketPanelBtnAvailable:
    'bg-[#007CFF] text-white cursor-pointer shadow-[0_8px_24px_rgba(0,124,255,0.25)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,124,255,0.35)]',
  backBtn: cn(
    'absolute top-[80px] lg:top-[100px] left-6 lg:left-[calc(5%-20px)] z-[999] flex items-center gap-2 bg-white py-2.5 px-5 rounded-full',
    'border border-[#eaeaea] shadow-[0_4px_12px_rgba(0,0,0,0.04)] cursor-pointer font-semibold',
    'text-[13px] text-[#0a0a0a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
  ),
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const acts = [
  {
    name: 'Special Guest',
    role: 'Main Act',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
    span: 2,
  },
  {
    name: 'Mystery Act',
    role: 'Opening',
    img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600',
    span: 1,
  },
  {
    name: 'Global Talent',
    role: 'Co-Host',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000',
    span: 1,
  },
];

export const cards = [
  {
    title: 'Exclusive Access',
    desc: 'Get behind-the-scenes access and premium seating options.',
    iconSvg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>',
    tag: 'VIP ONLY',
  },
  {
    title: 'Cinematic Production',
    desc: 'State-of-the-art audiovisuals delivering a cinematic live experience.',
    iconSvg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /></svg>',
    tag: 'EXPERIENCE',
  },
  {
    title: 'Curated F&B',
    desc: 'Enjoy a diverse selection of premium food and beverages.',
    iconSvg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>',
    tag: 'DINING',
  },
];

export const faqs = [
  {
    q: 'Are tickets refundable?',
    a: 'Tickets are non-refundable but can be transferred to another person up to 24 hours before the event through our secure portal.',
  },
  {
    q: 'Is there parking available?',
    a: 'Yes, premium and standard parking options are available at the venue.',
  },
  {
    q: 'What items are prohibited?',
    a: 'Professional cameras, outside food and beverages, and large backpacks are strictly prohibited inside the venue.',
  },
];
