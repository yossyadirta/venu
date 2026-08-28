import React, { useEffect, useRef } from 'react';
import { Skeleton, Typography, Button, Card, Badge, cn } from 'loka';
import { gsap } from 'gsap';
import { useTicketSelection } from './hooks/useTicketSelection';

const styles = {
  container: 'flex flex-col lg:flex-row min-h-screen bg-[#fafafa] lg:items-start',
  leftPane:
    'w-full lg:w-[40%] lg:sticky lg:top-0 lg:h-screen relative bg-[#0a0a0a] flex flex-col justify-between p-8 pt-[100px] lg:p-[60px] lg:pt-[120px] shadow-[20px_0_60px_rgba(0,0,0,0.05)] z-10 min-h-[40vh]',
  heroImg: 'absolute inset-0 w-full h-full object-cover opacity-50',
  gradientOverlay:
    'absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/80 lg:to-[#0a0a0a]/80',
  backBtn: cn(
    'bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 w-fit mb-8',
    'rounded-full cursor-pointer flex items-center gap-2 text-[13px] font-semibold transition-all duration-300 hover:bg-white/20 z-50 relative'
  ),
  title: 'text-[clamp(32px,8vw,56px)] font-extrabold m-0 leading-[1.1] tracking-[-0.02em] mb-4',
  rightPane:
    'w-full lg:w-[60%] pt-12 lg:pt-[120px] pb-32 lg:pb-20 px-6 lg:px-[8%] overflow-y-auto relative',
  liveInventory:
    'bg-[#E0F2FE] text-[#0284C7] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 whitespace-nowrap',
  tierCardSelected: 'bg-[#F8FAFC] shadow-[0_0_0_2px_#007CFF] border-transparent',
  tierCardUnselected: 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] border-[#f0f0f0]',
  qtyControls:
    'flex items-center justify-between lg:justify-start gap-4 bg-white py-2.5 px-4 rounded-full border border-[#e2e8f0] shadow-[0_2px_8px_rgba(0,0,0,0.02)]',
  qtyBtnMinusBase:
    'w-8 h-8 rounded-full border-none cursor-pointer text-lg font-extrabold transition-colors duration-200 flex items-center justify-center',
  qtyBtnMinusActive: 'bg-[#F1F5F9] text-[#0a0a0a] hover:bg-[#E2E8F0]',
  qtyBtnMinusInactive: 'bg-transparent text-[#ccc]',
  qtyBtnPlus:
    'w-8 h-8 rounded-full border-none bg-[#F1F5F9] hover:bg-[#E2E8F0] cursor-pointer text-lg font-extrabold text-[#007CFF] transition-colors duration-200 flex items-center justify-center',
  bottomBar: cn(
    'fixed bottom-6 lg:bottom-10 left-4 right-4 lg:left-[40%] lg:right-[8%] lg:ml-[8%] lg:max-w-[600px] bg-[#0a0a0a] rounded-2xl lg:rounded-3xl py-4 lg:py-5 px-5 lg:px-8 flex items-center justify-between',
    'shadow-[0_20px_40px_rgba(0,0,0,0.2)]'
  ),
};

export const TicketSelection = ({ event, onComplete }: { event: any; onComplete: () => void }) => {
  const {
    tiers,
    isLoading,
    quantities,
    isCheckingOut,
    updateQty,
    handleCheckout,
    totalTickets,
    totalPrice,
  } = useTicketSelection(event, onComplete);

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const prevTotalRef = useRef(totalTickets);

  // Initial Entrance
  useEffect(() => {
    if (!isLoading && cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.tier-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' }
      );
    }
  }, [isLoading]);

  useEffect(() => {
    if (bottomBarRef.current) {
      if (totalTickets > 0 && prevTotalRef.current === 0) {
        gsap.fromTo(
          bottomBarRef.current,
          { y: 150, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.75)' }
        );
      } else if (totalTickets === 0 && prevTotalRef.current > 0) {
        gsap.to(bottomBarRef.current, {
          y: 150,
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: 'power2.in',
        });
      }
      prevTotalRef.current = totalTickets;
    }
  }, [totalTickets]);

  // Total Price
  useEffect(() => {
    if (priceRef.current && totalTickets > 0) {
      gsap.fromTo(
        priceRef.current,
        { scale: 1.2, color: '#60A5FA' },
        { scale: 1, color: '#ffffff', duration: 0.5, ease: 'back.out(2)' }
      );
    }
  }, [totalPrice, totalTickets]);

  const handleUpdateQty = (
    tierId: string,
    delta: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (delta < 0 && !quantities[tierId]) return; // Prevent minus below 0

    const btn = e.currentTarget;
    const numDisplay = btn.parentElement?.querySelector('.qty-val');

    gsap.fromTo(btn, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });

    if (numDisplay) {
      gsap.fromTo(
        numDisplay,
        { y: delta > 0 ? 10 : -10, opacity: 0.5 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }

    updateQty(tierId, delta);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <img src={event.hero_image_url} alt={event.title} className={styles.heroImg} />
        <div className={styles.gradientOverlay} />
        <button onClick={() => window.history.back()} className={styles.backBtn}>
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
        </button>
        <div className="relative z-[1] text-white">
          <div className="flex gap-3 mb-6 flex-wrap">
            <Badge
              variant="secondary"
              className="bg-white/15 backdrop-blur-md text-white border-transparent px-3 py-1.5 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.1em]"
            >
              {formatDate(event.date)}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/15 backdrop-blur-md text-white border-transparent px-3 py-1.5 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.1em]"
            >
              {event.venue_name}
            </Badge>
          </div>
          <Typography as="h1" variant="h1" className={cn(styles.title, 'text-white')}>
            {event.title}
          </Typography>
          <Typography variant="body" className="text-white/70 max-w-[400px]">
            Select your tickets below. Inventory is held for 15 minutes after proceeding to
            checkout.
          </Typography>
        </div>
      </div>

      <div className={styles.rightPane}>
        <div className="max-w-[600px]">
          <div className="mb-10">
            <Typography as="h2" variant="h3" className="m-0 text-[#0a0a0a]">
              Available Tickets
            </Typography>
          </div>

          <div ref={cardsContainerRef} className="flex flex-col gap-5 pb-[120px]">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl py-8 px-8 flex justify-between items-center border border-[#f0f0f0]"
                  >
                    <div className="w-full">
                      <Skeleton className="h-6 w-[140px] mb-3" />
                      <Skeleton className="h-4 w-[200px] mb-5" />
                      <Skeleton className="h-7 w-[120px]" />
                    </div>
                    <Skeleton className="w-[100px] h-[44px] rounded-full shrink-0" />
                  </div>
                ))
              : tiers?.map((tier) => (
                  <Card
                    key={tier.id}
                    padding="lg"
                    className={cn(
                      'tier-card flex flex-col lg:flex-row justify-between lg:items-center gap-6 lg:gap-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] py-6 lg:py-8 px-5 lg:px-8 border',
                      quantities[tier.id] ? styles.tierCardSelected : styles.tierCardUnselected
                    )}
                  >
                    <div>
                      <Typography as="h3" variant="h4" className="mb-1.5 text-[#0a0a0a]">
                        {tier.name}
                      </Typography>
                      <Typography variant="bodySm" muted className="mb-4">
                        {tier.perks && tier.perks.length > 0
                          ? tier.perks.join(' • ')
                          : 'Standard event access'}
                      </Typography>
                      <Typography
                        as="span"
                        variant="h3"
                        className={quantities[tier.id] ? 'text-[#007CFF]' : 'text-[#0a0a0a]'}
                      >
                        {formatPrice(tier.price)}
                      </Typography>
                    </div>

                    <div className={styles.qtyControls}>
                      <button
                        onClick={(e) => handleUpdateQty(tier.id, -1, e)}
                        className={cn(
                          styles.qtyBtnMinusBase,
                          quantities[tier.id]
                            ? styles.qtyBtnMinusActive
                            : styles.qtyBtnMinusInactive
                        )}
                      >
                        -
                      </button>
                      <span className="qty-val text-base font-extrabold w-5 text-center text-[#0a0a0a] block">
                        {quantities[tier.id] || 0}
                      </span>
                      <button
                        onClick={(e) => handleUpdateQty(tier.id, 1, e)}
                        className={styles.qtyBtnPlus}
                      >
                        +
                      </button>
                    </div>
                  </Card>
                ))}
          </div>
        </div>

        <div
          ref={bottomBarRef}
          className={styles.bottomBar}
          style={{
            opacity: 0,
            transform: 'translateY(150px) scale(0.9)',
            pointerEvents: totalTickets > 0 ? 'auto' : 'none',
          }}
        >
          <div className="flex flex-col">
            <Typography variant="overline" className="text-white/50 m-0">
              {totalTickets} Ticket{totalTickets > 1 ? 's' : ''}
            </Typography>
            <Typography
              ref={priceRef as any}
              as="span"
              variant="h2"
              className="text-white inline-block origin-left m-0"
            >
              {formatPrice(totalPrice)}
            </Typography>
          </div>

          <Button
            size="lg"
            variant="pill-primary"
            onClick={handleCheckout}
            disabled={isCheckingOut}
            isLoading={isCheckingOut}
            className={cn(
              'px-9 flex items-center gap-3 font-extrabold',
              isCheckingOut
                ? 'bg-[#333] text-white hover:bg-[#333] shadow-none'
                : 'bg-[#007CFF] hover:bg-[#007CFF] shadow-[0_8px_24px_rgba(0,124,255,0.3)] hover:scale-105'
            )}
          >
            {isCheckingOut ? 'Locking...' : 'Checkout'}
          </Button>
        </div>
      </div>
    </div>
  );
};
