import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Typography, Button, Separator } from 'loka';

interface PaymentSuccessScreenProps {
  event: any;
  tiers: any[];
  quantities: Record<string, number>;
  totalPrice: number;
  attendee: { name: string; email: string };
  onReveal: () => void;
}

export const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  event,
  tiers,
  quantities,
  totalPrice,
  attendee,
  onReveal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPolylineElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    if (checkRef.current) {
      const length = checkRef.current.getTotalLength();
      gsap.set(checkRef.current, { strokeDasharray: length, strokeDashoffset: length });
    }

    tl.fromTo(
      contentRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out' }
    );

    if (checkRef.current) {
      tl.to(checkRef.current, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6');
    }

    tl.fromTo(
      itemsRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  const handleReveal = () => {
    const tl = gsap.timeline({ onComplete: onReveal });
    tl.to(itemsRef.current, {
      y: -10,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
    });
    tl.to(
      contentRef.current,
      {
        scale: 0.95,
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power3.inOut',
      },
      '-=0.2'
    );
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const totalTickets = Object.values(quantities).reduce((acc, val) => acc + val, 0);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center font-['Inter',sans-serif] px-4 py-24 md:py-32 relative"
    >
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-[80px] pointer-events-none mix-blend-multiply" />

      <div
        ref={contentRef}
        className="w-full max-w-md bg-white rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden text-center relative z-10 transition-transform duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]"
      >
        <div className="pt-14 pb-8 px-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-8 shadow-[0_8px_24px_rgba(34,197,94,0.3)]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline ref={checkRef} points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div ref={addToRefs}>
            <Typography variant="h1" className="text-3xl text-gray-900 tracking-tight mb-2">
              Payment Successful
            </Typography>
            <Typography variant="overline" className="text-gray-500 block">
              Order Ref • #VNU-{event.id.substring(0, 8).toUpperCase()}
            </Typography>
          </div>
        </div>

        <div className="relative h-6 flex items-center bg-white opacity-80" ref={addToRefs}>
          <div className="absolute left-[-12px] w-6 h-6 bg-gray-50 rounded-full border-r border-gray-100 shadow-inner" />
          <Separator className="flex-1 border-dashed bg-transparent border-gray-100 border-t-2" />
          <div className="absolute right-[-12px] w-6 h-6 bg-gray-50 rounded-full border-l border-gray-100 shadow-inner" />
        </div>

        <div className="px-8 py-6 text-left">
          <div ref={addToRefs} className="mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <Typography variant="overline" className="text-gray-900 block">
                Tickets ({totalTickets})
              </Typography>
            </div>
            <div className="space-y-2">
              {tiers?.map((tier) => {
                const qty = quantities[tier.id];
                if (!qty) return null;
                return (
                  <div key={tier.id} className="flex justify-between items-center">
                    <Typography variant="body" className="text-gray-500 text-sm">
                      {qty}x {tier.name}
                    </Typography>
                    <Typography variant="body" className="font-bold text-gray-900 text-sm">
                      Rp {(qty * tier.price).toLocaleString('id-ID')}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>

          <div ref={addToRefs} className="flex justify-between items-center mb-4">
            <Typography variant="bodySm" className="text-gray-400 font-semibold">
              Event
            </Typography>
            <Typography variant="bodySm" className="font-bold text-gray-900 truncate max-w-[150px]">
              {event.title}
            </Typography>
          </div>
          <div ref={addToRefs} className="flex justify-between items-center mb-4">
            <Typography variant="bodySm" className="text-gray-400 font-semibold">
              Event Date
            </Typography>
            <Typography variant="bodySm" className="font-bold text-gray-900">
              {new Date(event.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}{' '}
              • 19:00
            </Typography>
          </div>
          <div ref={addToRefs} className="flex justify-between items-center mb-4">
            <Typography variant="bodySm" className="text-gray-400 font-semibold">
              Payment Time
            </Typography>
            <Typography variant="bodySm" className="font-bold text-gray-900">
              {new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}{' '}
              • {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </div>
          <div ref={addToRefs} className="flex justify-between items-center mb-6">
            <Typography variant="bodySm" className="text-gray-400 font-semibold">
              Email Sent To
            </Typography>
            <Typography variant="bodySm" className="font-bold text-gray-900">
              {attendee.email}
            </Typography>
          </div>

          <div
            ref={addToRefs}
            className="flex justify-between items-center pt-5 border-t border-gray-100/60"
          >
            <Typography variant="body" className="text-gray-900 font-black tracking-wide">
              TOTAL PAID
            </Typography>
            <Typography variant="h2" className="text-green-600 tracking-tight">
              Rp {totalPrice.toLocaleString('id-ID')}
            </Typography>
          </div>
        </div>

        <div className="px-8 pb-10 pt-2" ref={addToRefs}>
          <Button
            onClick={handleReveal}
            size="lg"
            className="group w-full shadow-xl flex items-center justify-center gap-3 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            <span>Reveal Digital Pass</span>
            <svg
              className="transition-transform duration-300 group-hover:translate-x-1"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};
