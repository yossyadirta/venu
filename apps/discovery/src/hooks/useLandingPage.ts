import { useEffect, useRef, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dbClient } from 'api-client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 37 });

  const marqueeRef = useRef<HTMLDivElement>(null);
  const flashDealsRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const nearYouRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const { data: events, isLoading } = useQuery({
    queryKey: ['all-events'],
    queryFn: dbClient.events.getTrending,
  });

  const featuredEvents = useMemo(() => events?.slice(0, 4) || [], [events]);
  const flashDealEvents = useMemo(() => events?.slice(4, 8) || [], [events]);
  const trendingEvents = useMemo(() => events?.slice(8, 12) || [], [events]);
  const nearYouEvents = useMemo(() => events?.slice(12, 15) || [], [events]);
  const upcomingEvents = useMemo(() => events?.slice(15, 19) || [], [events]);
  const spotlightEvent = events?.[23] || null;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          return { hours: 2, minutes: 0, seconds: 0 };
        }
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        const inner = marqueeRef.current.querySelector('[data-marquee-inner]') as HTMLElement;
        if (inner) {
          marqueeTweenRef.current = gsap.to(inner, {
            xPercent: -50,
            repeat: -1,
            duration: 40,
            ease: 'linear',
          });
        }
      }

      const revealSections = [
        flashDealsRef,
        trendingRef,
        nearYouRef,
        upcomingRef,
        reviewsRef,
        statsRef,
        ctaRef,
      ];
      revealSections.forEach((ref) => {
        if (!ref.current) return;
        const children = ref.current.children[0]?.children;
        gsap.fromTo(
          children || ref.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      if (spotlightRef.current) {
        gsap.fromTo(
          spotlightRef.current,
          { y: 120, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: spotlightRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!events) return;

    const allCards = document.querySelectorAll('[data-event-card]');
    allCards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, rotateX: 4 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
        }
      );
    });

    if (categoriesRef.current) {
      const catCards = document.querySelectorAll('[data-cat-card]');
      gsap.fromTo(
        catCards,
        { y: 50, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (statsRef.current) {
      const statEls = document.querySelectorAll('[data-stat]');
      gsap.fromTo(
        statEls,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (reviewsRef.current) {
      const reviewCards = document.querySelectorAll('[data-review-card]');
      gsap.fromTo(
        reviewCards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [events]);

  return {
    timeLeft,
    isLoading,
    featuredEvents,
    flashDealEvents,
    trendingEvents,
    nearYouEvents,
    upcomingEvents,
    spotlightEvent,
    marqueeRef,
    flashDealsRef,
    trendingRef,
    nearYouRef,
    categoriesRef,
    spotlightRef,
    upcomingRef,
    reviewsRef,
    statsRef,
    partnersRef,
    ctaRef,
    marqueeTweenRef,
  };
};
