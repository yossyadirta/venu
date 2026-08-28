import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Typography } from 'loka';

export const WaitingRoom = ({ event, onComplete }: { event: any; onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const statuses = [
    'INITIALIZING',
    'SECURING CONNECTION',
    'VERIFYING INVENTORY',
    'ALLOCATING SPOT',
    'ALMOST THERE',
  ];
  const [statusIdx, setStatusIdx] = useState(0);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        bgRef.current,
        { scale: 1.4, filter: 'blur(10px) grayscale(100%)' },
        { scale: 1.05, filter: 'blur(4px) grayscale(20%)', duration: 10, ease: 'power1.out' }
      );

      tl.fromTo(
        [infoRef.current, numberRef.current, statusRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.4, ease: 'expo.out' },
        '-=9'
      );

      // Countdown
      const obj = { val: 842 };
      gsap.to(obj, {
        val: 1,
        duration: 3.5,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.floor(obj.val).toLocaleString('en-US');
          }
        },
        onComplete: () => {
          // Fade
          gsap.to(flashRef.current, { opacity: 1, duration: 0.8, ease: 'power2.in', onComplete });
          if (numberRef.current) {
            gsap.to(numberRef.current, {
              opacity: 0,
              filter: 'blur(10px)',
              duration: 0.8,
              ease: 'power2.out',
            });
          }
        },
      });
    }, containerRef);

    const interval = setInterval(() => {
      setStatusIdx((prev) => Math.min(prev + 1, statuses.length - 1));
    }, 700);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-[#050505] text-[#EBEBEB] relative overflow-hidden font-sans uppercase flex flex-col justify-between pt-[100px] lg:pt-[120px] pb-6 lg:pb-12 px-6 lg:px-12"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          ref={bgRef}
          src={event.hero_image_url}
          alt="Atmosphere"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#050505]" />

        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow w-full text-center mt-10">
        <div ref={infoRef} className="flex flex-col items-center mb-10 lg:mb-12">
          <Typography variant="overline" className="text-[9px] lg:text-[11px] text-white/40 mb-2">
            {formatDate(event.date)} • {event.venue_name}
          </Typography>
          <Typography
            as="h1"
            variant="h3"
            className="text-sm lg:text-base tracking-[0.2em] font-medium text-white/90 truncate max-w-xs lg:max-w-md uppercase"
          >
            {event.title}
          </Typography>
        </div>

        <div
          ref={numberRef}
          className="text-[140px] md:text-[200px] lg:text-[280px] leading-[0.8] tracking-tighter font-black text-white mb-8 lg:mb-10 drop-shadow-2xl"
          style={{
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          842
        </div>

        <div ref={statusRef} className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <Typography
            variant="label"
            className="text-[10px] lg:text-[12px] tracking-[0.4em] text-white/40 m-0"
          >
            {statuses[statusIdx]}
          </Typography>
        </div>
      </div>

      <div className="relative z-10 w-full flex justify-between items-end">
        <Typography
          variant="overline"
          className="text-[9px] lg:text-[10px] text-white/40 max-w-[200px] lg:max-w-xs leading-relaxed normal-case font-semibold tracking-[0.2em]"
        >
          PLEASE REMAIN ON THIS PAGE.
          <br />
          REFRESHING WILL RESET YOUR POSITION.
        </Typography>
        <Typography
          variant="overline"
          className="text-[9px] lg:text-[10px] text-white/30 text-right m-0"
        >
          VENU © {new Date().getFullYear()}
        </Typography>
      </div>

      <div ref={flashRef} className="fixed inset-0 bg-black z-50 pointer-events-none opacity-0" />
    </div>
  );
};
