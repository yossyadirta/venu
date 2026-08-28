import { useState, useEffect } from 'react';

export const useReservationTimer = (slug: string | undefined, durationMs: number = 10 * 60 * 1000) => {
  const [timeLeft, setTimeLeft] = useState<number>(durationMs);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const storageKey = `venu_timer_${slug}`;
    const storedExpiry = sessionStorage.getItem(storageKey);
    let targetTime: number;

    if (storedExpiry) {
      targetTime = parseInt(storedExpiry, 10);
    } else {
      targetTime = Date.now() + durationMs;
      sessionStorage.setItem(storageKey, targetTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, targetTime - now);
      
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        setIsExpired(true);
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [slug, durationMs]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return {
    timeLeft,
    formattedTime,
    isExpired,
    isLowWarning: timeLeft > 0 && timeLeft <= 60000 // Last 1 minute warning
  };
};
