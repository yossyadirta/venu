import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dbClient } from 'api-client';
import { Skeleton } from 'loka';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

// --- Subcomponents for Clean GSAP Scoping ---

const HeroModern = ({ event }: { event: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ padding: '0 5% 80px', display: 'flex', flexDirection: 'column' }}>

      <div
        ref={containerRef}
        style={{
          width: '100%', height: '70vh',
          borderRadius: 40,
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
        }}
      >
        <img ref={imgRef} src={event.hero_image_url} alt={event.title} style={{ width: '100%', height: '140%', objectFit: 'cover', top: '-20%', position: 'absolute' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)' }} />

        {/* Modern Content Overlay */}
        <div style={{ position: 'absolute', bottom: 40, left: 40, right: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 96px)', color: 'white', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, margin: 0 }}>{event.title}</h1>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', padding: '10px 20px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{formatDate(event.date)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', padding: '10px 20px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{event.venue_name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', padding: '10px 20px', borderRadius: 999 }}>
              <span style={{ fontSize: 13, color: '#0a0a0a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{event.status.replace(/_/g, ' ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SynopsisReveal = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.word');
      gsap.fromTo(words,
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ padding: '80px 5%', background: '#fafafa', color: '#0a0a0a' }}>
      <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#007CFF', marginBottom: 32, fontWeight: 800 }}>The Story</h2>
      <p style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.02em', color: '#0a0a0a' }}>
        {text.split(' ').map((word, i) => (
          <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.3em' }}>{word}</span>
        ))}
      </p>
    </div>
  );
};

const LineupBento = () => {
  const acts = [
    { name: 'Special Guest', role: 'Main Act', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600', span: 2 },
    { name: 'Mystery Act', role: 'Opening', img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600', span: 1 },
    { name: 'Global Talent', role: 'Co-Host', img: 'https://images.unsplash.com/photo-1493225457124-a1a2b163d76e?w=600', span: 1 }
  ];

  return (
    <div style={{ padding: '80px 0', background: '#fafafa', color: '#0a0a0a' }}>
      <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#007CFF', marginBottom: 32, fontWeight: 800, paddingLeft: '5%' }}>The Lineup</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, padding: '0 5%' }}>
        {acts.map((act, i) => (
          <div key={i} style={{
            gridColumn: `span ${act.span}`, height: 400, position: 'relative', overflow: 'hidden',
            borderRadius: 32, background: '#fff', display: 'flex', alignItems: 'flex-end', padding: 40,
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)'
          }}
            className="bento-act"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              gsap.to(e.currentTarget.querySelector('img'), { scale: 1.05, filter: 'grayscale(0%)', duration: 0.5, ease: 'power3.out' });
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
              gsap.to(e.currentTarget.querySelector('img'), { scale: 1, filter: 'grayscale(100%)', duration: 0.5, ease: 'power3.out' });
            }}
          >
            <img src={act.img} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)' }} />
            <div style={{ position: 'relative', zIndex: 10, color: 'white' }}>
              <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{act.role}</div>
              <h3 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>{act.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HighlightsModern = () => {
  const cards = [
    { title: 'Exclusive Access', desc: 'Get behind-the-scenes access and premium seating options.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>, tag: 'VIP ONLY' },
    { title: 'Cinematic Production', desc: 'State-of-the-art audiovisuals delivering a cinematic live experience.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /></svg>, tag: 'EXPERIENCE' },
    { title: 'Curated F&B', desc: 'Enjoy a diverse selection of premium food and beverages.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>, tag: 'DINING' }
  ];

  return (
    <div style={{ padding: '80px 5%', background: '#fafafa' }}>
      <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#007CFF', marginBottom: 32, fontWeight: 800 }}>Features</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            background: '#fff', padding: 32, borderRadius: 32,
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f5f5f5',
            display: 'flex', flexDirection: 'column',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007CFF' }}>
                {c.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '6px 12px', background: '#f5f5f5', color: '#666', borderRadius: 999, letterSpacing: '0.05em' }}>{c.tag}</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0a0a0a', marginBottom: 12, letterSpacing: '-0.02em' }}>{c.title}</h3>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const GBKVenueModern = ({ venue }: { venue: string }) => {
  return (
    <div style={{ padding: '80px 5%', background: '#fafafa' }}>
      <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#007CFF', marginBottom: 32, fontWeight: 800 }}>Location</h2>

      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>

        {/* Real GBK / Stadium Photo */}
        <div style={{ flex: '2', height: 400, position: 'relative', borderRadius: 32, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <img src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gelora Bung Karno" />
          <div style={{ position: 'absolute', bottom: 24, left: 24, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '16px 24px', borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.01em' }}>{venue}</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#666', fontWeight: 500 }}>Jakarta, Indonesia</p>
          </div>
        </div>

        {/* Modern Data Block */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #f5f5f5' }}>
            <span style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>Capacity</span>
            <span style={{ fontSize: 28, color: '#0a0a0a', fontWeight: 800, letterSpacing: '-0.02em' }}>77,193</span>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #f5f5f5' }}>
            <span style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>Access Gates</span>
            <span style={{ fontSize: 28, color: '#0a0a0a', fontWeight: 800, letterSpacing: '-0.02em' }}>1 - 12</span>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #f5f5f5' }}>
            <span style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>Nearest MRT</span>
            <span style={{ fontSize: 28, color: '#0a0a0a', fontWeight: 800, letterSpacing: '-0.02em' }}>Istora</span>
          </div>
        </div>

      </div>
    </div>
  );
};

const SmoothFAQ = () => {
  const [active, setActive] = useState<number | null>(null);

  const faqs = [
    { q: 'Are tickets refundable?', a: 'Tickets are non-refundable but can be transferred to another person up to 24 hours before the event through our secure portal.' },
    { q: 'Is there parking available?', a: 'Yes, premium and standard parking options are available at the venue.' },
    { q: 'What items are prohibited?', a: 'Professional cameras, outside food and beverages, and large backpacks are strictly prohibited inside the venue.' }
  ];

  return (
    <div style={{ padding: '80px 5% 150px', background: '#fafafa', color: '#0a0a0a' }}>
      <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#007CFF', marginBottom: 32, fontWeight: 800 }}>FAQ</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 24, padding: '24px 32px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #f5f5f5' }}>
            <button
              onClick={() => setActive(active === i ? null : i)}
              style={{ width: '100%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: '#0a0a0a' }}
            >
              <h4 style={{ fontSize: 18, fontWeight: 700, color: active === i ? '#007CFF' : '#0a0a0a', transition: 'color 0.3s' }}>{faq.q}</h4>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: active === i ? '#007CFF' : '#f5f5f5', color: active === i ? 'white' : '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: active === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'all 0.4s' }}>
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </button>
            <div style={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0, overflow: 'hidden', transition: 'all 0.4s', marginTop: active === i ? 16 : 0 }}>
              <p style={{ fontSize: 15, color: '#666', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TicketPanel = ({ event, onGetTickets }: { event: any, onGetTickets: () => void }) => {
  return (
    <div style={{ width: '35%', flexShrink: 0, padding: '160px 5% 100px 0' }}>
      <div style={{
        position: 'sticky', top: 120,
        background: 'white', borderRadius: 32,
        padding: 40,
        boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        display: 'flex', flexDirection: 'column'
      }}>

        <p style={{ color: '#888', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Tickets Starting From</p>
        <div style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 800, color: '#007CFF', marginBottom: 40, letterSpacing: '-0.03em' }}>
          {formatPrice(event.min_price)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          <div style={{ background: '#fafafa', padding: 20, borderRadius: 20, border: '1px solid #f5f5f5' }}>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date & Time</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 6, color: '#111' }}>{formatDate(event.date)}</div>
          </div>

          <div style={{ background: '#fafafa', padding: 20, borderRadius: 20, border: '1px solid #f5f5f5' }}>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Venue</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 6, color: '#111' }}>{event.venue_name}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button style={{
            width: '100%', padding: '20px', borderRadius: 999,
            background: event.status === 'sold_out' ? '#e5e5e5' : '#007CFF',
            color: event.status === 'sold_out' ? '#888' : 'white',
            fontSize: 15, fontWeight: 800, border: 'none', letterSpacing: '0.05em',
            cursor: event.status === 'sold_out' ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            boxShadow: event.status === 'sold_out' ? 'none' : '0 8px 24px rgba(0,124,255,0.25)',
          }}
            onClick={event.status !== 'sold_out' ? onGetTickets : undefined}
            onMouseEnter={(e) => {
              if (event.status !== 'sold_out') {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,124,255,0.35)';
              }
            }}
            onMouseLeave={(e) => {
              if (event.status !== 'sold_out') {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,124,255,0.25)';
              }
            }}
          >
            {event.status === 'sold_out' ? 'SOLD OUT' : 'GET TICKETS'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#aaa', fontWeight: 500 }}>Guaranteed secure checkout via Stripe</p>
        </div>

      </div>
    </div>
  )
}

export const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => dbClient.events.getBySlug(slug as string),
    enabled: !!slug,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div style={{ background: '#fafafa', minHeight: '100vh', paddingBottom: 100 }}>
        <div style={{ height: 500, width: '100%', position: 'relative' }}>
          <Skeleton style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', marginTop: -80, position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 40, alignItems: 'start' }}>
            <div style={{ background: 'white', borderRadius: 32, padding: 48, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Skeleton style={{ height: 48, width: '80%', marginBottom: 16 }} />
              <Skeleton style={{ height: 24, width: '40%', marginBottom: 32 }} />
              <Skeleton style={{ height: 16, width: '100%', marginBottom: 12 }} />
              <Skeleton style={{ height: 16, width: '90%', marginBottom: 12 }} />
              <Skeleton style={{ height: 16, width: '95%', marginBottom: 32 }} />
            </div>
            <div style={{ background: 'white', borderRadius: 32, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Skeleton style={{ height: 32, width: '60%', marginBottom: 24 }} />
              <Skeleton style={{ height: 48, width: '100%', borderRadius: 999 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!event) return <div style={{ height: '100vh', background: '#fafafa', color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Event Not Found</h2></div>;

  return (
    <div style={{ display: 'flex', width: '100%', background: '#fafafa', minHeight: '100vh', alignItems: 'stretch', fontFamily: "'Inter', sans-serif", position: 'relative' }}>

      {/* Back Button Modern Minimalist */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute', top: 100, left: '5%', zIndex: 100,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'white', padding: '10px 20px', borderRadius: 999,
          border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          cursor: 'pointer', fontWeight: 600, fontSize: 13, color: '#0a0a0a',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Back to Events
      </button>

      {/* LEFT COLUMN: Deep Exploration (65%) */}
      <div style={{ width: '65%', position: 'relative' }}>
        <div style={{ paddingTop: 160 }}>
          <HeroModern event={event} />
          <SynopsisReveal text={event.description} />
          <LineupBento />
          <HighlightsModern />
          <GBKVenueModern venue={event.venue_name} />
          <SmoothFAQ />
        </div>
      </div>

      {/* RIGHT COLUMN: Sticky Conversion Zone (35%) */}
      <TicketPanel event={event} onGetTickets={() => navigate(`/tickets/${event.slug}`)} />

    </div>
  )
}
