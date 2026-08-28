import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { Typography, Button, Separator, Badge } from 'loka';
import { InteractiveCreditCard } from './InteractiveCreditCard';
import { AttendeeForm } from './AttendeeForm';
import { useReservationTimer } from '../hooks/useReservationTimer';

export const CheckoutLayout = ({
  event,
  tiers,
  quantities,
  seats,
  totalPrice,
  step,
  attendee,
  onAttendeeSubmit,
  onSubmit,
}: any) => {
  const { slug } = useParams<{ slug: string }>();
  const { formattedTime, isExpired, isLowWarning } = useReservationTimer(slug);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.1 }
      );
    }
  }, []);

  const totalTickets = Object.values(quantities).reduce((a: any, b: any) => a + b, 0) as number;
  const taxes = totalPrice * 0.1; // 10% tax
  const platformFee = 25000;
  const grandTotal = totalPrice + taxes + platformFee;

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col lg:flex-row font-['Inter',sans-serif] bg-[#fafafa] overflow-x-hidden"
    >
      <div
        ref={leftRef}
        className="w-full lg:w-[35%] relative bg-[#0a0a0a] flex flex-col justify-between pt-24 lg:pt-[120px] px-6 lg:px-[60px] pb-12 lg:pb-[60px] z-10 min-h-screen"
      >
        <img
          src={event.hero_image_url}
          alt="Event Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/40" />

        <div className="relative z-10 flex flex-col h-full">
          <Button
            variant="pill-outline"
            onClick={() => window.history.back()}
            className="z-50 w-fit mb-8 lg:mb-12 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Button>

          <div className="mt-auto lg:mt-0">
            <Badge
              variant="secondary"
              className="bg-white/15 backdrop-blur-md text-white border-transparent px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] mb-4"
            >
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Badge>
            <Typography variant="h1" className="text-[clamp(28px,8vw,42px)] text-white mb-2">
              {event.title}
            </Typography>
            <Typography variant="body" className="text-white/70 font-medium">
              {event.location}
            </Typography>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-2xl p-5 lg:p-6 mt-8 lg:mt-12 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <Typography variant="overline" className="text-neutral-400 mb-4 block">
              Order Summary
            </Typography>

            <div className="space-y-4 mb-6">
              {tiers.map((tier: any) => {
                if (!quantities[tier.id]) return null;
                return (
                  <div key={tier.id} className="flex justify-between items-start text-white">
                    <div>
                      <Typography variant="body" className="font-bold text-white">
                        {quantities[tier.id]}x {tier.name}
                      </Typography>
                    </div>
                    <Typography variant="body" className="font-bold text-white">
                      Rp {(quantities[tier.id] * tier.price).toLocaleString()}
                    </Typography>
                  </div>
                );
              })}
            </div>

            {seats && seats.length > 0 && (
              <div className="mb-6">
                <Typography variant="overline" className="text-white/40 mb-2 block">
                  Allocated Seats
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {seats.map((seat: string) => (
                    <span
                      key={seat}
                      className="px-3 py-1 bg-[#222] rounded-lg text-xs font-bold text-white border border-[#333]"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-[#222] mb-4" />

            <div className="space-y-3">
              <div className="flex justify-between text-white/60 text-sm">
                <span>Subtotal</span>
                <span>Rp {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/60 text-sm">
                <span>Taxes (10%)</span>
                <span>Rp {taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/60 text-sm">
                <span>Platform Fee</span>
                <span>Rp {platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end pt-3">
                <span className="text-sm font-bold text-white/80">Total Payment</span>
                <span className="text-2xl font-extrabold text-white">
                  Rp {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={rightRef}
        className="w-full lg:w-[65%] bg-[#fafafa] pt-12 pb-24 lg:pt-[120px] px-6 lg:px-[10%] flex flex-col justify-start relative"
      >
        <div className="w-full max-w-xl mx-auto mt-12 lg:mt-0">
          <div className="flex justify-end mb-6">
            <div
              className={`px-4 py-2 rounded-full border flex items-center gap-2 text-[13px] font-extrabold tracking-widest ${
                isExpired
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : isLowWarning
                    ? 'bg-orange-50 text-orange-600 border-orange-200 animate-pulse'
                    : 'bg-white text-[#0a0a0a] border-[#e5e5e5] shadow-sm'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isExpired ? 'bg-red-500' : isLowWarning ? 'bg-orange-500' : 'bg-[#007CFF]'}`}
              />
              {isExpired ? 'EXPIRED' : formattedTime}
            </div>
          </div>

          <div className="mb-10">
            <Typography variant="overline" className="text-primary mb-3 block">
              Secure Checkout
            </Typography>
            <Typography variant="h1" className="text-[clamp(28px,4vw,36px)] leading-tight mb-2">
              {step === 'attendee_info' ? 'Your Details' : 'Payment Details'}
            </Typography>
            <Typography variant="body" muted>
              {step === 'attendee_info'
                ? 'Enter your information to secure your reservation.'
                : 'Enter your card information to complete the purchase safely.'}
            </Typography>
          </div>

          <div className="bg-white rounded-[24px] p-6 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#f5f5f5]">
            {step === 'attendee_info' ? (
              <AttendeeForm
                initialName={attendee?.name}
                initialEmail={attendee?.email}
                onSubmit={onAttendeeSubmit}
              />
            ) : (
              <InteractiveCreditCard step={step} onSubmit={onSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
