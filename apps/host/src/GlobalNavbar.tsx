import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, cn } from 'loka';
import { gsap } from 'gsap';

export const GlobalNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [navSolid, setNavSolid] = useState(!isHomePage);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSearchActive = searchQuery.trim().length > 0 || searchDate.length > 0;

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setNavSolid(!isHomePage || window.scrollY > 100);
    handleScroll(); // run once on mount or when isHomePage changes
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  const searchBarStyle = (solid: boolean) =>
    cn(
      'desktop-only flex items-center gap-0 rounded-full px-1 py-1 flex-1 max-w-[520px]',
      'transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
      solid ? 'bg-[#f5f5f5] border border-[#e5e5e5]' : 'bg-white/12 backdrop-blur-[20px] border border-white/20'
    );

  const searchInputStyle = (solid: boolean) =>
    cn(
      'bg-transparent border-none outline-none text-[13px] px-3.5 py-2 flex-1 min-w-0',
      solid ? 'text-[#0a0a0a]' : 'text-white'
    );

  const searchDivider = (solid: boolean) =>
    cn('w-[1px] h-5 shrink-0', solid ? 'bg-[#e0e0e0]' : 'bg-white/20');

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-10',
          'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          navSolid
            ? 'py-2.5 bg-white/95 backdrop-blur-3xl backdrop-saturate-[1.8] border-b border-black/5'
            : 'py-4 bg-gradient-to-b from-black/60 to-transparent'
        )}
      >
        <div
          className="flex items-center gap-1.5 cursor-pointer shrink-0 group"
          onClick={() => navigate('/')}
        >
          <img
            data-logo
            src="/logo.svg"
            alt="Venu Logo"
            className="h-7 transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <span
            className={cn(
              'font-black text-lg tracking-normal transition-colors duration-400',
              navSolid ? 'text-[#0070E0]' : 'text-white'
            )}
            style={{ WebkitTextStroke: '1.2px currentColor' }}
          >
            VENU
          </span>
        </div>

        <div className={searchBarStyle(navSolid)}>
          <div className="flex items-center gap-2 px-4 flex-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={navSolid ? '#888' : 'rgba(255,255,255,0.6)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              placeholder="Events, artists, cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={searchInputStyle(navSolid)}
            />
          </div>
          <div className={searchDivider(navSolid)} />
          <div className="flex items-center gap-2 px-4 relative">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={navSolid ? '#888' : 'rgba(255,255,255,0.6)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div
              className="relative w-[110px] h-5 flex items-center cursor-pointer"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span
                className={`${searchInputStyle(navSolid)} flex items-center pointer-events-none whitespace-nowrap`}
                style={{
                  color: searchDate
                    ? navSolid
                      ? '#111'
                      : 'white'
                    : navSolid
                      ? '#9CA3AF'
                      : 'rgba(255,255,255,0.6)',
                }}
              >
                {searchDate
                  ? new Date(searchDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Any date'}
              </span>
            </div>

            {showCalendar && (
              <>
                <div className="fixed inset-0 z-[90]" onClick={() => setShowCalendar(false)} />
                <div className="absolute top-full left-0 mt-6 z-[100]">
                  <Calendar
                    mode="single"
                    selected={searchDate ? new Date(searchDate) : undefined}
                    onSelect={(date: any) => {
                      setSearchDate(date ? date.toISOString() : '');
                      setShowCalendar(false);
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <button
            className={cn(
              'w-9 h-9 rounded-full border-none flex items-center justify-center cursor-pointer transition-all duration-300 shrink-0',
              isSearchActive
                ? 'bg-[#007CFF] hover:scale-110 hover:shadow-[0_4px_16px_rgba(0,124,255,0.5)]'
                : navSolid
                  ? 'bg-gray-200 hover:bg-gray-300'
                  : 'bg-white/15 hover:bg-white/25'
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isSearchActive ? 'white' : navSolid ? '#9CA3AF' : 'rgba(255,255,255,0.5)'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>

        <div className="desktop-only flex items-center gap-6 shrink-0">
          {['Explore', 'Categories'].map((item) => (
            <span
              key={item}
              className={cn(
                'text-[13px] font-medium cursor-pointer transition-colors duration-300 tracking-[0.01em]',
                navSolid ? 'text-[#555] hover:text-[#007CFF]' : 'text-white/75 hover:text-[#007CFF]'
              )}
            >
              {item}
            </span>
          ))}
          <button
            className={cn(
              'rounded-full font-semibold px-5 py-2 text-[13px] cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105',
              navSolid
                ? 'bg-[#007CFF] text-white border-none'
                : 'bg-white/12 backdrop-blur-md text-white border border-white/20'
            )}
          >
            Sign In
          </button>
        </div>

        <div
          className={`mobile-only flex items-center cursor-pointer ${navSolid ? 'text-[#0a0a0a]' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center backdrop-blur-md">
          <button
            className="absolute top-6 right-6 bg-transparent border-none text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="flex flex-col gap-8 items-center">
            <span
              className="text-white text-2xl font-semibold cursor-pointer"
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
            >
              Explore
            </span>
            <span className="text-white text-2xl font-semibold cursor-pointer">Categories</span>
            <span className="text-[#007CFF] text-2xl font-semibold cursor-pointer">Sign In</span>
          </div>
        </div>
      )}
    </>
  );
};
