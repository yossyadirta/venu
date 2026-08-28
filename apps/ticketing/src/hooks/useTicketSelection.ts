import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dbClient } from 'api-client';

export const useTicketSelection = (event: any, onComplete: () => void) => {
  const { data: tiers, isLoading } = useQuery({
    queryKey: ['ticket-tiers', event.id],
    queryFn: () => dbClient.tickets.getTiersByEventId(event.id),
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQty = useCallback((tierId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[tierId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [tierId]: next };
    });
  }, []);

  const handleCheckout = useCallback(() => {
    setIsCheckingOut(true);
    setTimeout(() => {
      localStorage.setItem(`venu_qty_${event.slug}`, JSON.stringify(quantities));
      onComplete();
    }, 1500);
  }, [event.slug, quantities, onComplete]);

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = tiers
    ? tiers.reduce((total, tier) => total + (quantities[tier.id] || 0) * tier.price, 0)
    : 0;

  return {
    tiers,
    isLoading,
    quantities,
    isCheckingOut,
    updateQty,
    handleCheckout,
    totalTickets,
    totalPrice
  };
};
