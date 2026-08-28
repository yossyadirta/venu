import { useState, useEffect, useCallback, useMemo } from 'react';

export interface Seat {
  id: string;
  row: number;
  col: number;
  status: 'available' | 'occupied' | 'selected';
  zone?: 'VIP' | 'REGULAR';
}

export const useSeatSelection = (eventSlug: string) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [totalTicketsAllowed, setTotalTicketsAllowed] = useState(0);
  const [vipAllowed, setVipAllowed] = useState(0);
  const [regularAllowed, setRegularAllowed] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isProceeding, setIsProceeding] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`venu_qty_${eventSlug}`);
      if (stored) {
        const parsed: Record<string, number> = JSON.parse(stored);
        setQuantities(parsed);
        const total = Object.values(parsed).reduce((a, b) => a + b, 0);
        setTotalTicketsAllowed(total);
      }
    } catch (e) {
      console.error('Failed to parse ticket quantities', e);
    }
  }, [eventSlug]);

  // mock
  const seats = useMemo(() => {
    const grid: Seat[] = [];
    const rows = 10;
    const cols = 14;

    let seed = 1;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        if (c === 5 || c === 10) continue;

        const isOccupied = random() > 0.6;
        const zone = r <= 3 ? 'VIP' : 'REGULAR'; // Rows 1-3 VIP, others Regular

        grid.push({
          id: `R${r}-C${c}`,
          row: r,
          col: c,
          status: isOccupied ? 'occupied' : 'available',
          zone: zone as 'VIP' | 'REGULAR',
        });
      }
    }
    return grid;
  }, []);

  const toggleSeat = useCallback(
    (seatId: string) => {
      setError(null);
      setSelectedSeats((prev) => {
        if (prev.includes(seatId)) {
          return prev.filter((id) => id !== seatId);
        }

        const seat = seats.find((s) => s.id === seatId);
        if (!seat) return prev;

        const currentVip = prev.filter(
          (id) => seats.find((s) => s.id === id)?.zone === 'VIP'
        ).length;
        const currentRegular = prev.filter(
          (id) => seats.find((s) => s.id === id)?.zone === 'REGULAR'
        ).length;

        if (seat.zone === 'VIP' && currentVip >= vipAllowed) {
          setError(`You can only select ${vipAllowed} VIP seat(s) based on your ticket selection.`);
          return prev;
        }
        if (seat.zone === 'REGULAR' && currentRegular >= regularAllowed) {
          setError(
            `You can only select ${regularAllowed} Regular seat(s) based on your ticket selection.`
          );
          return prev;
        }

        if (prev.length < totalTicketsAllowed) {
          return [...prev, seatId];
        }

        return prev;
      });
    },
    [totalTicketsAllowed, vipAllowed, regularAllowed, seats]
  );

  const handleProceed = useCallback(() => {
    if (selectedSeats.length !== totalTicketsAllowed) return;

    setIsProceeding(true);
    setTimeout(() => {
      localStorage.setItem(`venu_seats_${eventSlug}`, JSON.stringify(selectedSeats));
      window.location.href = `/checkout/${eventSlug}`;
    }, 1500);
  }, [selectedSeats, totalTicketsAllowed, eventSlug]);

  return {
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
    clearError: () => setError(null),
    isComplete: selectedSeats.length === totalTicketsAllowed && totalTicketsAllowed > 0,
  };
};
