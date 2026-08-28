import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dbClient } from 'api-client';
import { cn, Toast, Typography, Button, Badge } from 'loka';
import { gsap } from 'gsap';
import { useSeatSelection } from './hooks/useSeatSelection';

const styles = {
  container: 'flex flex-col lg:flex-row min-h-screen bg-[#fafafa] lg:items-start',
  leftPane:
    'w-full lg:w-[30%] lg:sticky lg:top-0 lg:h-screen relative bg-[#0a0a0a] flex flex-col justify-start pt-[100px] lg:pt-[120px] px-6 lg:px-[60px] pb-12 lg:pb-[60px] shadow-[20px_0_60px_rgba(0,0,0,0.05)] z-10',
  heroImg: 'absolute inset-0 w-full h-full object-cover opacity-50 grayscale',
  gradientOverlay:
    'absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/90',
  backBtn: cn(
    'bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5',
    'rounded-full cursor-pointer flex items-center gap-2 text-[13px] font-semibold transition-all duration-300 hover:bg-white/20 z-50 w-fit mb-8 lg:mb-12'
  ),
  title:
    'text-[clamp(28px,8vw,36px)] font-extrabold m-0 leading-[1.1] tracking-[-0.02em] mb-4 text-white',
  progressBox:
    'bg-[#111] border border-[#222] rounded-2xl p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden mt-6 lg:mt-8',
  rightPane:
    'w-full lg:w-[70%] pt-8 lg:pt-[120px] pb-32 lg:pb-20 px-4 lg:px-[5%] overflow-hidden relative flex flex-col',
  seatGrid:
    'flex-grow flex flex-col items-start sm:items-center justify-start lg:justify-center gap-2 lg:gap-3 overflow-x-auto pb-8 w-full',
  seatRow: 'flex justify-start sm:justify-center gap-1.5 lg:gap-2 min-w-max px-4',
  seatBase:
    'w-8 h-8 lg:w-10 lg:h-10 rounded-t-[8px] lg:rounded-t-[12px] rounded-b-[4px] cursor-pointer flex items-center justify-center text-[9px] lg:text-[11px] font-bold shadow-sm relative overflow-hidden bg-white shrink-0',
  seatOccupied: 'bg-[#f0f0f0] border border-[#e5e5e5] text-[#ccc] cursor-not-allowed opacity-50',
  seatVIP:
    'border-2 border-[#F59E0B] text-[#F59E0B] bg-[#FEF3C7]/20 hover:bg-[#FEF3C7] hover:shadow-[0_4px_12px_rgba(245,158,11,0.2)] hover:-translate-y-1',
  seatVIPSelected:
    'bg-[#F59E0B] border-[#F59E0B] text-white shadow-[0_4px_16px_rgba(245,158,11,0.4)] -translate-y-1',
  seatRegular:
    'border border-[#e0e0e0] text-[#888] hover:border-[#007CFF] hover:text-[#007CFF] hover:shadow-[0_4px_12px_rgba(0,124,255,0.15)] hover:-translate-y-1',
  seatRegularSelected:
    'bg-[#007CFF] border-[#007CFF] text-white shadow-[0_4px_16px_rgba(0,124,255,0.3)] -translate-y-1',
  bottomBar: cn(
    'fixed bottom-6 lg:bottom-10 left-4 right-4 lg:left-[30%] lg:right-[5%] lg:ml-[5%] lg:max-w-[800px] bg-[#0a0a0a] rounded-2xl lg:rounded-3xl py-4 lg:py-5 px-5 lg:px-8 flex items-center justify-between',
    'shadow-[0_20px_40px_rgba(0,0,0,0.2)] z-[100]'
  ),
};

export const SeatSelection = ({ event }: { event: any }) => {
  const {
    quantities,
    totalTicketsAllowed,
    setVipAllowed,
    setRegularAllowed,
    selectedSeats,
    isProceeding,
    seats,
    toggleSeat,
    handleProceed,
    error,
    clearError,
    isComplete,
  } = useSeatSelection(event.slug);

  const { data: tiers } = useQuery({
    queryKey: ['ticket-tiers', event.id],
    queryFn: () => dbClient.tickets.getTiersByEventId(event.id),
  });

  const selectedTiers = tiers?.filter((t) => quantities[t.id] > 0) || [];

  useEffect(() => {
    if (tiers) {
      let v = 0;
      let r = 0;
      selectedTiers.forEach((tier) => {
        const name = tier.name.toLowerCase();
        if (name.includes('vip') || name.includes('gold') || name.includes('premium')) {
          v += quantities[tier.id];
        } else {
          r += quantities[tier.id];
        }
      });
      setVipAllowed(v);
      setRegularAllowed(r);
    }
  }, [tiers, quantities, setVipAllowed, setRegularAllowed]);

  const gridRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const isCompleteRef = useRef(isComplete);
  const prevSelectedCount = useRef(0);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'expo.out' }
      );
    }
    const validRows = rowsRef.current.filter(Boolean);
    if (validRows.length > 0) {
      gsap.fromTo(
        validRows,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.3 }
      );
    }
  }, []);

  useEffect(() => {
    if (bottomBarRef.current) {
      if (isComplete && !isCompleteRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { y: 150, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.75)' }
        );
      } else if (!isComplete && isCompleteRef.current) {
        gsap.to(bottomBarRef.current, {
          y: 150,
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: 'power2.in',
        });
      }
      isCompleteRef.current = isComplete;
    }
  }, [isComplete]);

  useEffect(() => {
    const prev = prevSelectedCount.current;
    const curr = selectedSeats.length;
    prevSelectedCount.current = curr;

    if (counterRef.current) {
      gsap.fromTo(
        counterRef.current,
        { scale: curr > prev ? 1.3 : 0.8, color: curr > prev ? '#60A5FA' : '#ff6b6b' },
        { scale: 1, color: '#ffffff', duration: 0.4, ease: 'back.out(2)' }
      );
    }

    if (isComplete && progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { boxShadow: '0 0 0px rgba(0,124,255,0)' },
        {
          boxShadow: '0 0 16px rgba(0,124,255,0.8)',
          duration: 0.4,
          yoyo: true,
          repeat: 2,
          ease: 'power2.inOut',
        }
      );
    }
  }, [selectedSeats.length, isComplete]);

  const handleSeatClick = (seat: any, e: React.MouseEvent) => {
    if (seat.status === 'occupied') return;

    const btn = e.currentTarget as HTMLElement;

    gsap
      .timeline()
      .to(btn, { scale: 0.75, duration: 0.1, ease: 'power2.in' })
      .to(btn, { scale: 1.15, duration: 0.2, ease: 'back.out(2.5)' })
      .to(btn, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });

    toggleSeat(seat.id);
  };

  const rows = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = [];
      acc[seat.row].push(seat);
      return acc;
    },
    {} as Record<number, typeof seats>
  );

  return (
    <div className={styles.container}>
      <Toast message={error || ''} isVisible={!!error} onClose={clearError} type="error" />
      <div className={styles.leftPane}>
        <img src={event.hero_image_url} alt={event.title} className={styles.heroImg} />
        <div className={styles.gradientOverlay} />

        <div className="relative z-[1] flex flex-col h-full">
          <Button variant="ghost" onClick={() => window.history.back()} className={styles.backBtn}>
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

          <div>
            <Badge
              variant="secondary"
              className="mb-4 bg-white/15 backdrop-blur-md text-white border-transparent px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em]"
            >
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Badge>
            <Typography as="h1" variant="h1" className={cn(styles.title, 'text-white')}>
              {event.title}
            </Typography>
            <Typography variant="body" className="text-white/70">
              {event.venue_name}
            </Typography>
          </div>

          <div className={styles.progressBox}>
            <Typography variant="overline" className="text-white/50 mb-4 block">
              Your Tickets
            </Typography>

            <div className="flex flex-col gap-3 mb-6">
              {selectedTiers.map((tier) => (
                <div key={tier.id} className="flex justify-between items-center">
                  <Typography as="span" variant="bodySm" className="text-white font-semibold">
                    {tier.name}
                  </Typography>
                  <Typography as="span" variant="bodySm" className="text-white font-extrabold">
                    {quantities[tier.id]}x
                  </Typography>
                </div>
              ))}
            </div>

            <div className="w-full h-[1px] bg-white/20 mb-4" />

            <div
              ref={counterRef}
              className="text-4xl font-extrabold text-white tracking-[-0.02em] mb-4 flex items-end gap-2 origin-left"
            >
              {selectedSeats.length}{' '}
              <Typography as="span" variant="h3" className="text-white/30 pb-1">
                / {totalTicketsAllowed}
              </Typography>
            </div>

            <div
              ref={progressBarRef}
              className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden"
            >
              <div
                className={cn(
                  'h-full transition-all duration-500 ease-out rounded-full',
                  isComplete ? 'bg-[#34D399]' : 'bg-[#007CFF]'
                )}
                style={{
                  width: `${(selectedSeats.length / Math.max(totalTicketsAllowed, 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightPane}>
        <div ref={gridRef} className={styles.seatGrid}>
          <div className="relative w-full min-w-[300px] max-w-[600px] mb-8 lg:mb-12 flex flex-col items-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#007CFF]/20 blur-2xl rounded-full animate-pulse" />
            <div className="w-full h-10 lg:h-12 bg-gradient-to-b from-[#e8f0ff] to-transparent rounded-t-[50%] flex items-center justify-center border-t-2 border-[#007CFF]/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#007CFF]/10 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
              <Typography
                variant="overline"
                className="text-[#007CFF]/70 relative z-10 tracking-[0.4em]"
              >
                Stage
              </Typography>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {Object.entries(rows).map(([rowNum, rowSeats], rowIdx) => (
              <div
                key={rowNum}
                ref={(el) => {
                  rowsRef.current[rowIdx] = el;
                }}
                className={styles.seatRow}
              >
                <div className="w-6 h-10 flex items-center justify-center text-[#bbb] font-bold text-xs">
                  {String.fromCharCode(64 + parseInt(rowNum))}
                </div>

                {rowSeats.map((seat) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  let stateClass = seat.zone === 'VIP' ? styles.seatVIP : styles.seatRegular;

                  if (seat.status === 'occupied') stateClass = styles.seatOccupied;
                  else if (isSelected && seat.zone === 'VIP') stateClass = styles.seatVIPSelected;
                  else if (isSelected) stateClass = styles.seatRegularSelected;

                  return (
                    <div
                      key={seat.id}
                      onClick={(e) => handleSeatClick(seat, e)}
                      className={cn(
                        styles.seatBase,
                        stateClass,
                        seat.status !== 'occupied' && 'transition-all duration-200'
                      )}
                    >
                      {seat.status === 'occupied' ? '✕' : seat.col}
                      {isSelected && (
                        <span className="absolute inset-0 rounded-t-[8px] animate-ping opacity-30 bg-current" />
                      )}
                    </div>
                  );
                })}

                <div className="w-6 h-10 flex items-center justify-center text-[#bbb] font-bold text-xs">
                  {String.fromCharCode(64 + parseInt(rowNum))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-8 mt-12 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#f0f0f0]">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-[4px] bg-white border-2 border-[#F59E0B]" />
              <Typography variant="label" className="text-[#888] m-0">
                VIP
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-[4px] bg-white border border-[#e0e0e0]" />
              <Typography variant="label" className="text-[#888] m-0">
                Regular
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-[4px] bg-[#f0f0f0] border border-[#e5e5e5]" />
              <Typography variant="label" className="text-[#888] m-0">
                Occupied
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-[4px] bg-[#007CFF]" />
              <Typography variant="label" className="text-[#888] m-0">
                Selected
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bottomBarRef}
        className={styles.bottomBar}
        style={{
          opacity: 0,
          transform: 'translateY(150px) scale(0.9)',
          pointerEvents: isComplete ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col">
          <Typography variant="overline" className="text-[#007CFF] m-0">
            Ready to Proceed
          </Typography>
          <Typography as="span" variant="h3" className="text-white m-0">
            {selectedSeats.length} Seats Secured
          </Typography>
        </div>

        <Button
          size="lg"
          variant="pill-primary"
          onClick={handleProceed}
          disabled={isProceeding}
          isLoading={isProceeding}
          className={cn(
            'px-9 flex items-center gap-3 font-extrabold',
            isProceeding
              ? 'bg-[#333] text-white hover:bg-[#333] shadow-none'
              : 'bg-[#007CFF] hover:bg-[#007CFF] shadow-[0_8px_24px_rgba(0,124,255,0.3)] hover:scale-105'
          )}
        >
          {isProceeding ? 'Processing...' : 'Proceed to Payment'}
        </Button>
      </div>
    </div>
  );
};
