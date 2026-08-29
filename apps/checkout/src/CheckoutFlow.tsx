import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckoutLayout } from './components/CheckoutLayout';
import { CheckoutSuccessLayout } from './components/CheckoutSuccessLayout';
import { useCheckoutFlow } from './hooks/useCheckoutFlow';

export const CheckoutFlow = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    step,
    attendee,
    quantities,
    selectedSeats,
    totalPrice,
    event,
    eventLoading,
    tiers,
    handleAttendeeSubmit,
    handlePaymentSubmit,
  } = useCheckoutFlow(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (eventLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="w-8 h-8 rounded-full border-2 border-[#333] border-t-white animate-spin" />
      </div>
    );
  }

  if (!event) {
    return <div className="text-white">Event not found</div>;
  }

  if (step === 'success') {
    let finalSeats = selectedSeats;
    if (finalSeats.length === 0 && Object.keys(quantities).length > 0) {
      finalSeats = [];
      Object.entries(quantities).forEach(([tierId, qty]) => {
        const tierName = tiers?.find((t) => t.id === tierId)?.name || 'TKT';
        const shortName = tierName.substring(0, 3).toUpperCase();
        for (let i = 0; i < qty; i++) {
          finalSeats.push(`${shortName}-${i + 1}`);
        }
      });
    }
    if (finalSeats.length === 0) finalSeats = ['GA-1'];

    return (
      <CheckoutSuccessLayout
        event={event}
        tiers={tiers || []}
        quantities={quantities}
        seats={finalSeats}
        totalPrice={totalPrice}
        attendee={attendee}
      />
    );
  }

  return (
    <CheckoutLayout
      event={event}
      tiers={tiers || []}
      quantities={quantities}
      seats={selectedSeats}
      totalPrice={totalPrice}
      step={step}
      attendee={attendee}
      onAttendeeSubmit={handleAttendeeSubmit}
      onSubmit={handlePaymentSubmit}
    />
  );
};
