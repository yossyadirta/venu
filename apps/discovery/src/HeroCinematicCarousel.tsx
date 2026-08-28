import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Event } from 'api-client';
import { cn } from 'loka';

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
      <section className="h-screen w-full bg-[#0a0a0a] flex items-end px-[60px] pb-[100px] pt-0">
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
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]"
      style={{
        '--mx': '0px',
        '--my': '0px'
      } as React.CSSProperties}
    >
      <div ref={slidesRef} className="absolute -inset-[30px]">
        {events.map((event, i) => (
          <div
            key={event.id}
            data-hero-slide
            className="absolute inset-0"
          >
            <img
              src={event.hero_image_url}
              alt={event.title}
              className="w-[calc(100%+60px)] h-[calc(100%+60px)] object-cover object-center will-change-transform"
              style={{
                transform: 'translate(var(--mx), var(--my)) scale(1.05)',
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.7)_100%)]" />
          </div>
        ))}
      </div>

      <div ref={contentsRef} className="hero-content-wrapper absolute inset-0 flex items-center px-[60px] z-10">
        {events.map((event, i) => (
          <div key={event.id} data-hero-content className="absolute max-w-[780px]">
            <h1 className="text-[clamp(46px,7vw,92px)] font-black text-white leading-[1.05] tracking-[-0.03em] mb-6 drop-shadow-[0_4px_40px_rgba(0,0,0,0.4)]">
              <SplitWords text={event.title} className={`slide-${i}-word`} />
            </h1>
            <p className="text-lg text-white/70 leading-[1.6] mb-3 max-w-[520px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
              {event.description.length > 130 ? event.description.slice(0, 130) + '...' : event.description}
            </p>
            <div data-meta className="flex items-center gap-6 mb-10 mt-6">
              <div className="flex items-center gap-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <span className="text-white/70 text-base font-medium">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span className="text-white/70 text-base font-medium">{event.venue_name}</span>
              </div>
            </div>

            <div data-cta className="flex-col-mobile w-full flex gap-4 items-center">
              <MagneticButton
                onClick={() => onEventClick(event.slug)}
                className="px-10 py-[18px] rounded-full bg-[#007CFF] text-white font-bold text-base cursor-pointer border-none shadow-[0_8px_32px_rgba(0,124,255,0.4)]"
                style={{}}
              >
                Get Tickets — {formatPrice(event.min_price)}
              </MagneticButton>
              <MagneticButton
                onClick={() => onEventClick(event.slug)}
                className="px-[34px] py-[18px] rounded-full bg-white/5 backdrop-blur-md text-white font-semibold text-base cursor-pointer border border-white/15"
                style={{}}
              >
                Learn More
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>

      <div ref={progressBarsRef} className="hero-thumbnails absolute bottom-12 right-[60px] flex gap-4 z-20">
        {events.map((event, i) => (
          <div
            key={event.id}
            className={cn("w-[140px] cursor-pointer transition-opacity duration-400 ease", i === activeIndex ? "opacity-100" : "opacity-40")}
            onClick={() => goToSlide(i)}
          >
            <div className="relative w-full h-1 bg-white/20 mb-3 rounded-sm overflow-hidden">
              <div data-progress-fill className="absolute inset-y-0 left-0 w-full bg-[#007CFF] origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>
            <div className="hero-thumbnail-details flex gap-3 items-center">
              <div className="hero-thumbnail-img w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-white/10">
                <img src={event.hero_image_url} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-semibold text-white leading-[1.3] line-clamp-2">
                {event.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
