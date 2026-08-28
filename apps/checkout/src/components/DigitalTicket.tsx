import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Typography, Badge } from 'loka';

interface DigitalTicketProps {
  event: any;
  seats: string[];
  attendee?: { name: string; email: string };
}

export const DigitalTicket: React.FC<DigitalTicketProps> = ({ event, seats, attendee }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ticketList = seats && seats.length > 0 ? seats : ['GA-1'];

  useEffect(() => {
    gsap.fromTo(
      '.ticket-card-container',
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleNext = () => {
    if (activeIndex < ticketList.length - 1) {
      gsap.to('.dynamic-ticket-content', {
        opacity: 0,
        x: -10,
        duration: 0.15,
        onComplete: () => {
          setActiveIndex((prev) => prev + 1);
          gsap.fromTo(
            '.dynamic-ticket-content',
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0, duration: 0.25 }
          );
        },
      });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      gsap.to('.dynamic-ticket-content', {
        opacity: 0,
        x: 10,
        duration: 0.15,
        onComplete: () => {
          setActiveIndex((prev) => prev - 1);
          gsap.fromTo(
            '.dynamic-ticket-content',
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.25 }
          );
        },
      });
    }
  };

  return (
    <div className="ticket-card-container relative w-full flex items-center justify-center gap-4 group">
      <div className="flex-1 w-full bg-white rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col md:flex-row md:h-[300px] overflow-hidden relative z-10">
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden mix-blend-overlay">
          <div className="w-[150%] h-[150%] absolute top-[-25%] left-[-25%] bg-gradient-to-tr from-transparent via-white/40 to-transparent rotate-45 translate-x-[-100%] animate-[shimmer_3s_infinite_ease-in-out]" />
        </div>

        <div className="relative h-[200px] md:h-full w-full md:w-[280px] shrink-0 bg-gray-900">
          <img
            src={event.hero_image_url}
            alt="Event"
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r" />

          <div className="absolute top-4 right-4 md:left-4 md:right-auto z-10">
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-md border-white/20 text-white font-bold tracking-widest text-[10px]"
            >
              {ticketList.length > 1 ? `${activeIndex + 1} OF ${ticketList.length}` : 'E-TICKET'}
            </Badge>
          </div>

          <div className="absolute bottom-6 left-6 right-6 md:right-4 z-10">
            <Typography
              variant="h1"
              className="text-xl md:text-2xl text-white uppercase leading-tight tracking-tight shadow-black drop-shadow-md"
            >
              {event.title}
            </Typography>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-dashed border-gray-200 bg-white">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <Typography variant="overline" className="text-gray-400 mb-1 block">
                Date
              </Typography>
              <Typography variant="body" className="font-semibold text-gray-900 text-sm">
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </Typography>
            </div>
            <div>
              <Typography variant="overline" className="text-gray-400 mb-1 block">
                Time
              </Typography>
              <Typography variant="body" className="font-semibold text-gray-900 text-sm">
                19:00 PM
              </Typography>
            </div>
            <div className="col-span-2">
              <Typography variant="overline" className="text-gray-400 mb-1 block">
                Venue
              </Typography>
              <Typography
                variant="body"
                className="font-semibold text-gray-900 text-sm line-clamp-2"
              >
                {event.venue_name}
              </Typography>
            </div>
            <div className="col-span-2 pt-2 dynamic-ticket-content">
              <Typography variant="overline" className="text-blue-500 mb-1 block">
                Assigned Seat
              </Typography>
              <Typography variant="h1" className="font-black text-gray-900 text-2xl tracking-tight">
                {ticketList[activeIndex]}
              </Typography>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-6 flex flex-col items-center justify-center shrink-0 md:w-[220px] bg-white dynamic-ticket-content relative overflow-hidden">
          <Typography variant="overline" className="text-gray-400 mb-2 text-center block">
            Scan at Entrance
          </Typography>

          <div className="w-full flex justify-center my-4">
            <svg
              width="100%"
              height="60"
              viewBox="0 0 200 60"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-[60px] opacity-80"
            >
              <rect x="0" y="0" width="4" height="100%" fill="#111827" />
              <rect x="6" y="0" width="2" height="100%" fill="#111827" />
              <rect x="10" y="0" width="6" height="100%" fill="#111827" />
              <rect x="18" y="0" width="2" height="100%" fill="#111827" />
              <rect x="22" y="0" width="8" height="100%" fill="#111827" />
              <rect x="32" y="0" width="2" height="100%" fill="#111827" />
              <rect x="36" y="0" width="6" height="100%" fill="#111827" />
              <rect x="44" y="0" width="4" height="100%" fill="#111827" />
              <rect x="50" y="0" width="8" height="100%" fill="#111827" />
              <rect x="60" y="0" width="2" height="100%" fill="#111827" />
              <rect x="64" y="0" width="4" height="100%" fill="#111827" />
              <rect x="70" y="0" width="2" height="100%" fill="#111827" />
              <rect x="74" y="0" width="8" height="100%" fill="#111827" />
              <rect x="84" y="0" width="4" height="100%" fill="#111827" />
              <rect x="90" y="0" width="6" height="100%" fill="#111827" />
              <rect x="98" y="0" width="2" height="100%" fill="#111827" />
              <rect x="102" y="0" width="8" height="100%" fill="#111827" />
              <rect x="112" y="0" width="2" height="100%" fill="#111827" />
              <rect x="116" y="0" width="4" height="100%" fill="#111827" />
              <rect x="122" y="0" width="6" height="100%" fill="#111827" />
              <rect x="130" y="0" width="2" height="100%" fill="#111827" />
              <rect x="134" y="0" width="4" height="100%" fill="#111827" />
              <rect x="140" y="0" width="8" height="100%" fill="#111827" />
              <rect x="150" y="0" width="4" height="100%" fill="#111827" />
              <rect x="156" y="0" width="2" height="100%" fill="#111827" />
              <rect x="160" y="0" width="6" height="100%" fill="#111827" />
              <rect x="168" y="0" width="2" height="100%" fill="#111827" />
              <rect x="172" y="0" width="8" height="100%" fill="#111827" />
              <rect x="182" y="0" width="4" height="100%" fill="#111827" />
              <rect x="188" y="0" width="2" height="100%" fill="#111827" />
              <rect x="192" y="0" width="8" height="100%" fill="#111827" />
            </svg>
          </div>

          <Typography
            variant="overline"
            className="font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-md block"
          >
            TKT-{ticketList[activeIndex]}-{event.id.substring(0, 4)}
          </Typography>
        </div>
      </div>

      {ticketList.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`hidden md:flex absolute -left-6 w-12 h-12 bg-white text-gray-700 rounded-full shadow-lg border border-gray-100 items-center justify-center transition-all z-20 ${activeIndex === 0 ? 'opacity-0 cursor-default' : 'hover:scale-105 active:scale-95'}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === ticketList.length - 1}
            className={`hidden md:flex absolute -right-6 w-12 h-12 bg-white text-gray-700 rounded-full shadow-lg border border-gray-100 items-center justify-center transition-all z-20 ${activeIndex === ticketList.length - 1 ? 'opacity-0 cursor-default' : 'hover:scale-105 active:scale-95'}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute -bottom-10 left-0 right-0 flex gap-2 justify-center md:hidden">
            {ticketList.map((_: string, i: number) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-blue-600 w-6' : 'bg-gray-300 cursor-pointer hover:bg-gray-400'}`}
                onClick={() => {
                  const direction = i > activeIndex ? -10 : 10;
                  gsap.to('.dynamic-ticket-content', {
                    opacity: 0,
                    x: direction,
                    duration: 0.15,
                    onComplete: () => {
                      setActiveIndex(i);
                      gsap.fromTo(
                        '.dynamic-ticket-content',
                        { opacity: 0, x: -direction },
                        { opacity: 1, x: 0, duration: 0.25 }
                      );
                    },
                  });
                }}
              />
            ))}
          </div>
        </>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          50% { transform: translateX(100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      `,
        }}
      />
    </div>
  );
};
