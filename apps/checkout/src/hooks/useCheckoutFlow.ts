import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dbClient } from 'api-client';

export type CheckoutStep = 'attendee_info' | 'payment_entry' | 'processing' | 'success' | 'wallet';

export const useCheckoutFlow = (slug: string | undefined) => {
  const [step, setStep] = useState<CheckoutStep>(() => {
    return (sessionStorage.getItem(`venu_step_${slug}`) as CheckoutStep) || 'attendee_info';
  });

  // Save step to sessionStorage
  useEffect(() => {
    if (slug) {
      sessionStorage.setItem(`venu_step_${slug}`, step);
    }
  }, [step, slug]);

  const [attendee, setAttendee] = useState<{ name: string; email: string }>(() => {
    try {
      const stored = sessionStorage.getItem(`venu_attendee_${slug}`);
      return stored ? JSON.parse(stored) : { name: '', email: '' };
    } catch {
      return { name: '', email: '' };
    }
  });

  const handleAttendeeSubmit = (name: string, email: string) => {
    const newAttendee = { name, email };
    setAttendee(newAttendee);
    sessionStorage.setItem(`venu_attendee_${slug}`, JSON.stringify(newAttendee));
    setStep('payment_entry');
  };

  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem(`venu_qty_${slug}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [selectedSeats, setSelectedSeats] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`venu_seats_${slug}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Sync from localStorage
  useEffect(() => {
    if (slug) {
      try {
        const storedQty = localStorage.getItem(`venu_qty_${slug}`);
        if (storedQty) {
          const parsed = JSON.parse(storedQty);
          if (Object.keys(parsed).length > 0) {
            setQuantities(parsed);
          }
        }

        const storedSeats = localStorage.getItem(`venu_seats_${slug}`);
        if (storedSeats) {
          const parsed = JSON.parse(storedSeats);
          if (parsed.length > 0) {
            setSelectedSeats(parsed);
          }
        }
      } catch (e) {
        console.error('Failed to parse local storage', e);
      }
    }
  }, [slug]);

  const { data: event, isLoading: eventLoading } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => dbClient.events.getBySlug(slug as string),
    enabled: !!slug,
  });

  const { data: tiers } = useQuery({
    queryKey: ['ticket-tiers', event?.id],
    queryFn: () => dbClient.tickets.getTiersByEventId(event!.id),
    enabled: !!event?.id,
  });

  useEffect(() => {
    if (tiers && Object.keys(quantities).length > 0) {
      let total = 0;
      tiers.forEach((tier) => {
        if (quantities[tier.id]) {
          total += quantities[tier.id] * tier.price;
        }
      });
      setTotalPrice(total);
    }
  }, [tiers, quantities]);

  const handlePaymentSubmit = () => {
    setStep('processing');

    // Simulate payment processing delay
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  return {
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
  };
};
