import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Card, CardContent, Separator, cn } from 'loka';
import { EventCard, EventCardSkeleton } from './components/EventCard';
import { gsap } from 'gsap';
import { HeroCinematicCarousel } from './HeroCinematicCarousel';
import {
  styles,
  formatPrice,
  formatDate,
  categories,
  stats,
  reviews,
  venues,
  partners,
  marqueeText,
} from './constants/landing.constants';
import { useLandingPage } from './hooks/useLandingPage';

export const LandingPage = () => {
  const navigate = useNavigate();
  const {
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
    venuesRef,
    spotlightRef,
    upcomingRef,
    reviewsRef,
    statsRef,
    partnersRef,
    ctaRef,
    marqueeTweenRef,
  } = useLandingPage();

  return (
    <div className="bg-neutral-0 min-h-screen font-sans relative overflow-x-hidden">
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999] opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <HeroCinematicCarousel
        events={featuredEvents}
        onEventClick={(slug) => navigate(`/events/${slug}`)}
        formatPrice={formatPrice}
        formatDate={formatDate}
      />

      <div
        ref={marqueeRef}
        className="w-full bg-[#0a0a0a] py-4 overflow-hidden flex items-center border-b border-[#222] cursor-default"
        onMouseEnter={() => {
          if (marqueeTweenRef.current)
            gsap.to(marqueeTweenRef.current, { timeScale: 0.1, duration: 0.5 });
        }}
        onMouseLeave={() => {
          if (marqueeTweenRef.current)
            gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.5 });
        }}
      >
        <div data-marquee-inner className="flex whitespace-nowrap will-change-transform">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-[#e0e0e0] text-xl font-extrabold uppercase tracking-[0.2em] px-4"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      <section className="px-6 pt-[100px] pb-20 max-w-[1280px] mx-auto">
        <div ref={flashDealsRef}>
          <div className="flex-col-mobile flex justify-between items-end mb-12">
            <div>
              <Typography variant="h2">
                Flash{' '}
                <span className="bg-gradient-to-br from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Deals
                </span>
              </Typography>
              <Typography variant="body" muted className="mt-3 max-w-[420px]">
                Limited-time offers ending soon. Don't wait!
              </Typography>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl py-2.5 px-5 mt-4 sm:mt-0">
              <span className="text-[13px] font-bold text-white tracking-[0.05em]">ENDS IN</span>
              {['hours', 'minutes', 'seconds'].map((key, i) => (
                <React.Fragment key={i}>
                  <div className="bg-black/25 rounded-md py-1 px-2 min-w-8 text-center">
                    <span className="text-white text-base font-extrabold tabular-nums">
                      {timeLeft[key as keyof typeof timeLeft].toString().padStart(2, '0')}
                    </span>
                  </div>
                  {i < 2 && <span className="text-white/60 font-bold text-base">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <EventCardSkeleton key={i} />)
              : flashDealEvents.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      <section className="px-6 pb-[100px] max-w-[1280px] mx-auto">
        <div ref={trendingRef}>
          <div className="flex-col-mobile flex justify-between items-end mb-12">
            <div>
              <Typography variant="h2">
                Don't Miss <span className="text-primary">Out</span>
              </Typography>
              <Typography variant="body" muted className="mt-3 max-w-[420px]">
                Events selling fast right now. Secure your spot before it's too late.
              </Typography>
            </div>
            <Button variant="pill-outline" size="sm" onClick={() => navigate('/explore')}>
              View All →
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)
              : trendingEvents.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      <section className="px-6 pb-[100px] max-w-[1280px] mx-auto">
        <div ref={nearYouRef}>
          <div className="mb-12">
            <Typography variant="h2">
              Near <span className="text-primary">You</span>
            </Typography>
            <div className="flex-col-mobile flex items-center gap-4 mt-3">
              <Typography variant="body" muted className="flex items-start gap-2 m-0">
                <span className="inline-flex w-2 h-2 rounded-full bg-[#10B981] animate-pulse mt-1.5 shrink-0" />
                <span className="leading-[1.4]">Showing events in Jakarta & surrounding areas</span>
              </Typography>
              <Typography
                as="span"
                variant="bodySm"
                className="text-primary font-semibold cursor-pointer"
              >
                Change Location
              </Typography>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)
              : nearYouEvents.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      <section className="px-6 pb-[100px] max-w-[1280px] mx-auto relative">
        <div ref={categoriesRef}>
          <div className="mb-12">
            <Typography variant="h2">
              Explore <span className="text-primary">Experiences</span>
            </Typography>
            <Typography variant="body" muted className="mt-3">
              Hover to explore categories.
            </Typography>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3.5">
            {categories.map((cat) => (
              <div
                key={cat.name}
                data-cat-card
                className={`${styles.categoryCard} cursor-pointer`}
                onClick={() => navigate(`/explore?category=${cat.name}`)}
                style={{
                  background: cat.bg,
                  borderColor: `${cat.color}15`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 24px 48px ${cat.color}25`;
                  e.currentTarget.style.borderColor = cat.color + '40';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = cat.color + '15';
                }}
              >
                <div
                  className="mb-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] inline-flex group-hover:scale-120 group-hover:-rotate-8"
                  style={{ color: cat.color }}
                  dangerouslySetInnerHTML={{ __html: cat.icon_svg }}
                />
                <div className="text-[15px] font-extrabold text-[#0a0a0a] mb-1">{cat.name}</div>
                <div className="text-[13px] font-bold opacity-80" style={{ color: cat.color }}>
                  {cat.count} events
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-[100px] max-w-[1280px] mx-auto">
        <div ref={venuesRef}>
          <div className="flex-col-mobile flex justify-between items-end mb-12">
            <div>
              <Typography variant="h2">
                Explore Top <span className="text-primary">Venues</span>
              </Typography>
              <Typography variant="body" muted className="mt-3">
                Experience world-class events in iconic locations.
              </Typography>
            </div>
            <Button variant="pill-outline" size="sm" onClick={() => navigate('/explore')}>
              All Venues →
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-5">
            {venues.map((venue, i) => {
              const colSpan =
                i === 0 || i === 3 ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4';
              return (
                <div
                  key={i}
                  data-venue-card
                  className={cn(styles.venueCard, colSpan)}
                  onPointerMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) / 20;
                    const y = (e.clientY - rect.top - rect.height / 2) / 20;
                    const img = e.currentTarget.querySelector('img');
                    if (img)
                      gsap.to(img, { x: x, y: y, scale: 1.15, duration: 0.6, ease: 'power2.out' });
                  }}
                  onPointerLeave={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img)
                      gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' });
                  }}
                >
                  <img
                    src={venue.img}
                    alt={venue.name}
                    className="w-full h-full object-cover scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                    <h3 className="text-white text-[28px] font-extrabold mb-2 tracking-[-0.02em]">
                      {venue.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-[15px] font-medium">{venue.city}</span>
                      <span className="bg-white/20 backdrop-blur-md text-white py-1.5 px-3.5 rounded-lg text-[13px] font-bold">
                        {venue.events} Events
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {spotlightEvent && (
        <section
          ref={spotlightRef}
          className={styles.spotlightSection}
          onClick={() => navigate(`/events/${spotlightEvent.slug}`)}
        >
          <div className="flex-1 relative overflow-hidden group">
            <img
              src={spotlightEvent.hero_image_url}
              alt={spotlightEvent.title}
              className={styles.spotlightImg}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 from-0% via-[#0a0a0a]/40 via-50% to-transparent to-100%" />
          </div>
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-[60px_70px] max-w-[580px] z-10">
            <Typography variant="h1" className="text-white mb-[18px]">
              {spotlightEvent.title}
            </Typography>
            <Typography variant="body" className="text-white/55 leading-[1.7] mb-6">
              {spotlightEvent.description}
            </Typography>
            <div className="flex items-center gap-5 mb-8">
              <span className="text-white/45 text-sm">📅 {formatDate(spotlightEvent.date)}</span>
              <span className="text-white/45 text-sm">📍 {spotlightEvent.location}</span>
            </div>
            <Button variant="primary" size="lg" className="rounded-xl shadow-primary-lg">
              Get Tickets — {formatPrice(spotlightEvent.min_price)}
            </Button>
          </div>
        </section>
      )}

      <section className="px-6 pb-[100px] max-w-[1280px] mx-auto">
        <div ref={upcomingRef}>
          <div className="flex-col-mobile flex justify-between items-end mb-12">
            <div>
              <Typography variant="h2">
                Upcoming <span className="text-primary">Events</span>
              </Typography>
              <Typography variant="body" muted className="mt-3 max-w-[420px]">
                Fresh events just added. Be the first to book.
              </Typography>
            </div>
            <Button
              variant="pill-outline"
              size="sm"
              onClick={() => navigate('/explore')}
              className="mt-4 sm:mt-0"
            >
              View All →
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <EventCardSkeleton key={i} large />)
              : upcomingEvents.map((event) => <EventCard key={event.id} event={event} large />)}
          </div>
        </div>
      </section>

      <section className="px-6 pb-[100px] max-w-[1280px] mx-auto">
        <div ref={reviewsRef}>
          <div className="mb-12">
            <Typography variant="h2">
              What People <span className="text-primary">Say</span>
            </Typography>
            <Typography variant="body" muted className="mt-3">
              Real reviews from real ticket holders.
            </Typography>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
            {reviews.map((review, i) => (
              <div
                key={i}
                data-review-card
                className="rounded-[20px] p-7 bg-white border border-[#f0f0f0] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,124,255,0.08)] hover:border-[#007CFF30]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f5] overflow-hidden shrink-0">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#0a0a0a]">{review.name}</div>
                    <div className="text-xs text-[#aaa]">{review.event}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-[#F59E0B] text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#555] leading-[1.65]">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={statsRef}
        className="stats-container flex-col-mobile py-20 px-6 mx-6 mb-[100px] rounded-[32px] bg-[#0a0a0a] flex justify-center"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            data-stat
            className={`flex-1 text-center py-5 ${i < stats.length - 1 ? 'border-r border-white/5' : ''}`}
          >
            <div className="text-[clamp(28px,4vw,52px)] font-black text-[#007CFF] tracking-[-0.04em] mb-2">
              {stat.format ? '2.5M' : stat.value.toLocaleString()}
              {stat.suffix}
            </div>
            <div className="text-sm text-white/40 font-medium tracking-[0.02em]">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="px-6 pb-[100px] max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <Typography variant="overline" className="text-neutral-300">
            Trusted by leading brands
          </Typography>
        </div>
        <div ref={partnersRef} className="overflow-hidden py-5">
          <div
            data-partner-inner
            className="marquee-mobile flex whitespace-nowrap w-max items-center"
          >
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 py-3 px-10 mr-4 text-lg font-extrabold text-[#d0d0d0] tracking-[-0.02em] transition-colors duration-300 hover:text-[#007CFF]"
              >
                <div dangerouslySetInnerHTML={{ __html: partner.logo_svg }} className="flex" />
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={ctaRef}
        onMouseMove={(e) => {
          if (!ctaRef.current) return;
          const rect = ctaRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          ctaRef.current.style.setProperty('--mouse-x', x.toString());
          ctaRef.current.style.setProperty('--mouse-y', y.toString());
        }}
        onMouseLeave={() => {
          if (!ctaRef.current) return;
          ctaRef.current.style.setProperty('--mouse-x', '0');
          ctaRef.current.style.setProperty('--mouse-y', '0');
        }}
        className="mx-6 mb-[100px] rounded-[32px] overflow-hidden relative p-[100px_60px] bg-gradient-to-br from-[#007CFF] from-0% via-[#0055CC] via-50% to-[#003399] to-100% shadow-[0_30px_60px_rgba(0,124,255,0.2)]"
      >
        <style>{`
          .newsletter-input::placeholder { color: #ffffff !important; opacity: 1 !important; font-weight: 500; }
        `}</style>

        <div
          className="absolute -top-[140px] -right-[140px] w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform:
              'translate(calc(var(--mouse-x, 0) * -80px), calc(var(--mouse-y, 0) * -80px))',
          }}
        />
        <div
          className="absolute -bottom-[100px] -left-[100px] w-[350px] h-[350px] rounded-full bg-white/5 pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform: 'translate(calc(var(--mouse-x, 0) * 50px), calc(var(--mouse-y, 0) * 50px))',
          }}
        />
        <div
          className="absolute top-[15%] left-[35%] w-[150px] h-[150px] rounded-full bg-white/5 pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform:
              'translate(calc(var(--mouse-x, 0) * 120px), calc(var(--mouse-y, 0) * 120px))',
          }}
        />

        <div className="relative z-10 max-w-[560px]">
          <Typography variant="h1" className="text-white mb-[18px]">
            Never miss
            <br />
            <span className="opacity-60">a moment.</span>
          </Typography>
          <Typography variant="body" className="text-white/80 mb-9 leading-[1.7] font-medium">
            Get personalized event recommendations and early access to exclusive ticket drops.
          </Typography>
          <div className="flex-col-mobile w-full flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input flex-1 py-[17px] px-[22px] rounded-xl border border-white/25 bg-white/10 backdrop-blur-md text-white text-[15px] outline-none transition-all duration-300 focus:border-white/60 focus:bg-white/15 focus:ring-4 focus:ring-white/10"
            />
            <button className="py-[17px] px-[34px] rounded-xl bg-white text-[#007CFF] font-bold text-[15px] border-none cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              Get Started
            </button>
          </div>
        </div>
      </section>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body, html { scrollbar-width: none; -ms-overflow-style: none; }
        body::-webkit-scrollbar, html::-webkit-scrollbar { display: none; }
        ::placeholder { color: rgba(150,150,150,0.5) !important; }
        img { -webkit-user-drag: none; user-select: none; }
      `}</style>
    </div>
  );
};
