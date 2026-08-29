import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography } from 'loka';
import { dbClient } from 'api-client';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const TabIndicator = ({ activeTab, onTabChange }: { activeTab: 'upcoming' | 'past'; onTabChange: (tab: 'upcoming' | 'past') => void }) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLButtonElement>(null);
  const pastRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const target = activeTab === 'upcoming' ? upcomingRef.current : pastRef.current;
    if (!target || !indicatorRef.current) return;
    gsap.to(indicatorRef.current, {
      x: target.offsetLeft,
      width: target.offsetWidth,
      duration: 0.35,
      ease: 'power3.out',
    });
  }, [activeTab]);

  return (
    <div className="relative inline-flex bg-[#f5f5f5] rounded-full p-1">
      <div
        ref={indicatorRef}
        className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm pointer-events-none"
        style={{ left: 4 }}
      />
      <button
        ref={upcomingRef}
        onClick={() => onTabChange('upcoming')}
        className={`relative z-10 px-5 py-2 text-sm font-bold rounded-full transition-colors duration-200 ${activeTab === 'upcoming' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
      >
        Upcoming
      </button>
      <button
        ref={pastRef}
        onClick={() => onTabChange('past')}
        className={`relative z-10 px-5 py-2 text-sm font-bold rounded-full transition-colors duration-200 ${activeTab === 'past' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
      >
        Past
      </button>
    </div>
  );
};

const TicketCard = ({ booking, onFullScreen }: { booking: any; onFullScreen: () => void }) => {
  const ticketCount = booking.tickets
    ? (Object.values(booking.tickets) as number[]).reduce((a: number, b: any) => a + b, 0)
    : 1;
  const seats: string[] = [];
  if (booking.tickets) {
    Object.entries(booking.tickets).forEach(([, qty]: [string, any]) => {
      for (let i = 0; i < qty; i++) seats.push(`GA-${i + 1}`);
    });
  }

  return (
    <div
      data-ticket-card
      className="w-full bg-white rounded-2xl md:rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col md:flex-row md:h-[280px] relative hover:shadow-[0_8px_40px_rgba(0,124,255,0.1)] hover:border-blue-100 transition-all duration-500 opacity-0 translate-y-10"
    >
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden mix-blend-overlay rounded-2xl md:rounded-3xl">
        <div className="w-[150%] h-[150%] absolute top-[-25%] left-[-25%] bg-gradient-to-tr from-transparent via-white/30 to-transparent rotate-45 translate-x-[-100%] animate-[shimmer_4s_infinite_ease-in-out]" />
      </div>

      <div className="relative h-[180px] md:h-full w-full md:w-[260px] shrink-0 bg-gray-900">
        <img
          src={booking.event?.hero_image_url}
          alt={booking.event?.title}
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r" />
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] font-bold tracking-widest text-white bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-3 py-1">
            E-TICKET
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <p className="text-white text-lg md:text-xl font-black uppercase leading-tight tracking-tight drop-shadow-md line-clamp-2">
            {booking.event?.title}
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed border-gray-200">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-[#007CFF] uppercase mb-4">
            Order #{booking.id.split('-')[0].toUpperCase()}
          </p>
          <div className="grid grid-cols-2 gap-y-5">
            <div>
              <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase mb-1">Date</p>
              <p className="text-sm font-bold text-gray-900">
                {new Date(booking.event?.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase mb-1">Time</p>
              <p className="text-sm font-bold text-gray-900">19:00 PM</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase mb-1">Venue</p>
              <p className="text-sm font-bold text-gray-900 line-clamp-1">{booking.event?.venue_name}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-[#007CFF] font-semibold tracking-widest uppercase mb-1">Attendee</p>
              <p className="text-sm font-bold text-gray-900">{booking.attendee_name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{booking.attendee_email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center justify-center shrink-0 md:w-[200px] gap-4">
        <div className="w-full">
          <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase mb-2 text-center">Scan at Entrance</p>
          <svg width="100%" height="44" viewBox="0 0 200 44" fill="none" preserveAspectRatio="none" className="opacity-80">
            <rect x="0"   width="4"  height="44" fill="#111827"/><rect x="6"   width="2"  height="44" fill="#111827"/>
            <rect x="10"  width="6"  height="44" fill="#111827"/><rect x="18"  width="2"  height="44" fill="#111827"/>
            <rect x="22"  width="8"  height="44" fill="#111827"/><rect x="32"  width="2"  height="44" fill="#111827"/>
            <rect x="36"  width="6"  height="44" fill="#111827"/><rect x="44"  width="4"  height="44" fill="#111827"/>
            <rect x="50"  width="8"  height="44" fill="#111827"/><rect x="60"  width="2"  height="44" fill="#111827"/>
            <rect x="64"  width="4"  height="44" fill="#111827"/><rect x="70"  width="2"  height="44" fill="#111827"/>
            <rect x="74"  width="8"  height="44" fill="#111827"/><rect x="84"  width="4"  height="44" fill="#111827"/>
            <rect x="90"  width="6"  height="44" fill="#111827"/><rect x="98"  width="2"  height="44" fill="#111827"/>
            <rect x="102" width="8"  height="44" fill="#111827"/><rect x="112" width="2"  height="44" fill="#111827"/>
            <rect x="116" width="4"  height="44" fill="#111827"/><rect x="122" width="6"  height="44" fill="#111827"/>
            <rect x="130" width="2"  height="44" fill="#111827"/><rect x="134" width="4"  height="44" fill="#111827"/>
            <rect x="140" width="8"  height="44" fill="#111827"/><rect x="150" width="4"  height="44" fill="#111827"/>
            <rect x="156" width="2"  height="44" fill="#111827"/><rect x="160" width="6"  height="44" fill="#111827"/>
            <rect x="168" width="2"  height="44" fill="#111827"/><rect x="172" width="8"  height="44" fill="#111827"/>
            <rect x="182" width="4"  height="44" fill="#111827"/><rect x="188" width="2"  height="44" fill="#111827"/>
            <rect x="192" width="8"  height="44" fill="#111827"/>
          </svg>
          <p className="font-mono text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-md text-center mt-2">
            TKT-{seats[0] || 'GA-1'}-{booking.event?.id?.substring(0, 4) || '0000'}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={onFullScreen}
          className="w-full text-xs font-bold rounded-full border-gray-200 hover:bg-[#007CFF] hover:text-white hover:border-[#007CFF] transition-all"
        >
          Full Screen ↗
        </Button>

        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-600 tracking-wide">
            {ticketCount} TICKET{ticketCount > 1 ? 'S' : ''} · VALID
          </span>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ onExplore }: { onExplore: () => void }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mb-6 opacity-20">
      <rect x="8" y="18" width="56" height="38" rx="8" stroke="#111827" strokeWidth="3" />
      <path d="M8 30h56" stroke="#111827" strokeWidth="3" />
      <circle cx="22" cy="24" r="2.5" fill="#111827" />
      <circle cx="36" cy="24" r="2.5" fill="#111827" />
      <path d="M26 47h20" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <Typography variant="h3" className="text-gray-800 font-bold mb-2">No tickets yet</Typography>
    <Typography variant="body" className="text-gray-400 mb-8 max-w-xs">
      You haven't booked any events yet. Find your next experience.
    </Typography>
    <Button variant="primary" onClick={onExplore} className="rounded-full px-8">
      Explore Events
    </Button>
  </div>
);

export const MyTickets = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await dbClient.bookings.getUserBookings();
        setBookings(data);
      } catch {
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [navigate]);

  useEffect(() => {
    if (loading || !listRef.current) return;
    const cards = listRef.current.querySelectorAll('[data-ticket-card]');
    if (cards.length === 0) return;
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
    );
  }, [loading, activeTab]);

  const now = new Date();
  const upcoming = bookings.filter((b) => new Date(b.event?.date) >= now);
  const past = bookings.filter((b) => new Date(b.event?.date) < now);
  const displayed = activeTab === 'upcoming' ? upcoming : past;

  const handleTabChange = (tab: 'upcoming' | 'past') => {
    if (!listRef.current) return setActiveTab(tab);
    gsap.to(listRef.current, {
      opacity: 0, y: 8, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(listRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#007CFF] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold text-[#007CFF] tracking-widest uppercase mb-2">Your Collection</p>
              <Typography variant="h1" className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-none">
                My Tickets
              </Typography>
              <p className="text-gray-400 text-sm font-medium mt-2">
                {upcoming.length > 0
                  ? `${upcoming.length} upcoming event${upcoming.length > 1 ? 's' : ''}`
                  : 'No upcoming events'}
                {past.length > 0 && ` · ${past.length} past`}
              </p>
            </div>
            <TabIndicator activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div ref={listRef} className="flex flex-col gap-6">
          {displayed.length === 0 ? (
            <EmptyState onExplore={() => navigate('/')} />
          ) : (
            displayed.map((booking) => (
              <TicketCard
                key={booking.id}
                booking={booking}
                onFullScreen={() => navigate(`/checkout/ticket/${booking.event?.slug || 'event'}/${booking.id}`)}
              />
            ))
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          50% { transform: translateX(100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      ` }} />
    </div>
  );
};


