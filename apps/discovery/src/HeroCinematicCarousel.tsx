import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Event } from 'api-client';

interface HeroCinematicCarouselProps {
  events: Event[];
  onEventClick: (slug: string) => void;
  formatPrice: (price: number) => string;
  formatDate: (dateStr: string) => string;
}

const MagneticButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  style: React.CSSProperties;
  className?: string;
}> = ({ children, onClick, style, className }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      style={{ ...style, transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}
    >
      {children}
    </button>
  );
};

const SplitWords: React.FC<{ text: string; className: string }> = ({ text, className }) => (
  <span style={{ display: 'inline' }}>
    {text.split(' ').map((word, i) => (
      <span
        key={i}
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          paddingRight: '0.3em',
          paddingBottom: '0.1em',
          marginBottom: '-0.1em',
        }}
      >
        <span
          className={className}
          data-word
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
          }}
        >
          {word}
        </span>
      </span>
    ))}
  </span>
);

export const HeroCinematicCarousel: React.FC<HeroCinematicCarouselProps> = ({
  events,
  onEventClick,
  formatPrice,
  formatDate,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);
  const progressBarsRef = useRef<HTMLDivElement>(null);

  const xToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEnd;

    if (diff > 50) {
      goToSlide((activeIndex + 1) % events.length, false);
    } else if (diff < -50) {
      goToSlide((activeIndex - 1 + events.length) % events.length, false);
    }
    touchStartX.current = null;
  };

  const goToSlide = useCallback((index: number, autoPlay: boolean = false) => {
    if (!slidesRef.current || !contentsRef.current) return;
    const slides = slidesRef.current.querySelectorAll('[data-hero-slide]');
    const contents = contentsRef.current.querySelectorAll('[data-hero-content]');
    const progressBars = progressBarsRef.current?.querySelectorAll('[data-progress-fill]');

    slides.forEach((slide, i) => {
      const img = slide.querySelector('img') as HTMLElement;
      if (i === index) {
        (slide as HTMLElement).style.zIndex = '2';

        gsap.fromTo(slide,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' }
        );

        if (img) {
          gsap.fromTo(img, { scale: 1.15 }, { scale: 1.05, duration: 6, ease: 'power2.out' });
        }
      } else {
        (slide as HTMLElement).style.zIndex = '1';
        gsap.to(slide, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'none' }); 
        if (img) gsap.killTweensOf(img);
      }
    });

    contents.forEach((content, i) => {
      const words = content.querySelectorAll('[data-word]');
      const metaAndBtns = content.querySelectorAll('[data-meta], [data-cta]');
      const pText = content.querySelector('p');

      gsap.killTweensOf(content);

      if (i === index) {
        gsap.set(content, { opacity: 1, pointerEvents: 'auto' });

        gsap.fromTo(words,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out', delay: 0.3 }
        );

        if (pText) {
          gsap.fromTo(pText,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
          );
        }

        gsap.fromTo(metaAndBtns,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.6 }
        );
      } else {
        gsap.set(content, { pointerEvents: 'none' });
        gsap.to(content, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
    });

    progressBars?.forEach((bar, i) => {
      gsap.killTweensOf(bar);
      if (i === index) {
        gsap.fromTo(bar,
          { scaleX: 0 },
          { scaleX: 1, duration: autoPlay ? 6 : 0.5, ease: autoPlay ? 'none' : 'power2.out', transformOrigin: 'left' }
        );
      } else if (i < index) {
        gsap.set(bar, { scaleX: 1 });
      } else {
        gsap.set(bar, { scaleX: 0 });
      }
    });

    setActiveIndex(index);
  }, []);

  useLayoutEffect(() => {
    if (!slidesRef.current || !contentsRef.current) return;
    const slides = slidesRef.current.querySelectorAll('[data-hero-slide]');
    const contents = contentsRef.current.querySelectorAll('[data-hero-content]');

    gsap.set(slides, { clipPath: 'inset(0% 100% 0% 0%)' });
    gsap.set(contents, { opacity: 0, pointerEvents: 'none' });
  }, [events.length]);

  useEffect(() => {
    if (!events.length) return;

    goToSlide(0, true);

    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % events.length;
        goToSlide(next, true);
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [events.length, goToSlide]);

  useEffect(() => {
    if (!containerRef.current) return;
    const hero = containerRef.current;

    xToRef.current = gsap.quickTo(hero, '--mx', { duration: 0.8, ease: 'power3.out' });
    yToRef.current = gsap.quickTo(hero, '--my', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * -30; 
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15; 
      xToRef.current?.(x);
      yToRef.current?.(y);
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!events.length) {
    return (
      <section style={{ height: '100vh', width: '100%', background: '#0a0a0a', display: 'flex', alignItems: 'center', padding: '0 60px' }}>
        <div style={{ maxWidth: 780, width: '100%' }}>
          <div className="w-[80%] lg:w-[600px] h-[60px] lg:h-[90px] bg-white/5 rounded-2xl mb-4 animate-pulse" />
          <div className="w-[60%] lg:w-[400px] h-[60px] lg:h-[90px] bg-white/5 rounded-2xl mb-8 animate-pulse" />
          <div className="w-[40%] lg:w-[300px] h-[20px] bg-white/5 rounded-full mb-3 animate-pulse" />
          <div className="w-[50%] lg:w-[380px] h-[20px] bg-white/5 rounded-full mb-10 animate-pulse" />
          <div className="flex gap-4">
            <div className="w-[200px] h-[56px] bg-white/5 rounded-full animate-pulse" />
            <div className="w-[160px] h-[56px] bg-white/5 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#0a0a0a',
        '--mx': '0px',
        '--my': '0px'
      } as React.CSSProperties}
    >
      <div ref={slidesRef} style={{ position: 'absolute', inset: '-30px' }}>
        {events.map((event, i) => (
          <div
            key={event.id}
            data-hero-slide
            style={{
              position: 'absolute',
              inset: 0,
            }}
          >
            <img
              src={event.hero_image_url}
              alt={event.title}
              style={{
                width: 'calc(100% + 60px)',
                height: 'calc(100% + 60px)',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'translate(var(--mx), var(--my)) scale(1.05)',
                willChange: 'transform',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.7) 100%)'
            }} />
          </div>
        ))}
      </div>

      <div ref={contentsRef} className="hero-content-wrapper" style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        padding: '0 60px', zIndex: 10,
      }}>
        {events.map((event, i) => (
          <div key={event.id} data-hero-content style={{
            position: 'absolute', maxWidth: 780,
          }}>
            <h1 style={{
              fontSize: 'clamp(46px, 7vw, 92px)', fontWeight: 900, color: 'white',
              lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24,
              textShadow: '0 4px 40px rgba(0,0,0,0.4)',
            }}>
              <SplitWords text={event.title} className={`slide-${i}-word`} />
            </h1>
            <p style={{
              fontSize: 18, color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6, marginBottom: 12, maxWidth: 520,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              {event.description.length > 130 ? event.description.slice(0, 130) + '...' : event.description}
            </p>
            <div data-meta style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40, marginTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: 500 }}>{formatDate(event.date)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: 500 }}>{event.venue_name}</span>
              </div>
            </div>

            <div data-cta className="flex-col-mobile w-full" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <MagneticButton
                onClick={() => onEventClick(event.slug)}
                style={{
                  padding: '18px 40px', borderRadius: 999, background: '#007CFF', color: 'white',
                  fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0,124,255,0.4)',
                }}
              >
                Get Tickets — {formatPrice(event.min_price)}
              </MagneticButton>
              <MagneticButton
                onClick={() => onEventClick(event.slug)}
                style={{
                  padding: '18px 34px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
                  color: 'white', fontWeight: 600, fontSize: 16, border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                }}
              >
                Learn More
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>

      <div ref={progressBarsRef} className="hero-thumbnails" style={{
        position: 'absolute', bottom: 48, right: 60,
        display: 'flex', gap: 16, zIndex: 20,
      }}>
        {events.map((event, i) => (
          <div
            key={event.id}
            style={{
              width: 140,
              cursor: 'pointer',
              opacity: i === activeIndex ? 1 : 0.4,
              transition: 'opacity 0.4s ease'
            }}
            onClick={() => goToSlide(i)}
          >
            <div style={{ position: 'relative', width: '100%', height: 4, background: 'rgba(255,255,255,0.2)', marginBottom: 12, borderRadius: 2, overflow: 'hidden' }}>
              <div data-progress-fill style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: '100%',
                background: '#007CFF', transformOrigin: 'left', transform: 'scaleX(0)',
              }} />
            </div>
            <div className="hero-thumbnail-details" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="hero-thumbnail-img" style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={event.hero_image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{
                fontSize: 12, fontWeight: 600, color: 'white',
                lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
              }}>
                {event.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
