import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, cn, Button } from 'loka';
import { gsap } from 'gsap';
import { dbClient } from 'api-client';

export const GlobalNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [navSolid, setNavSolid] = useState(!isHomePage);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);
  const isSearchActive = searchQuery.trim().length > 0 || searchDate.length > 0;

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    dbClient.auth.getSession().then((session) => setUserSession(session));
  }, [location.pathname]);

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
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const searchBarStyle = (solid: boolean) =>
    cn(
      'hidden lg:flex items-center gap-0 rounded-full px-1 py-1 flex-1 max-w-[520px]',
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
            ? 'py-2.5 bg-white/95 backdrop-blur-3xl backdrop-saturate-[1.8] shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : 'py-4 bg-gradient-to-b from-black/60 to-transparent shadow-none'
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (searchQuery.trim() || searchDate)) {
                  const params = new URLSearchParams();
                  if (searchQuery.trim()) params.append('q', searchQuery.trim());
                  if (searchDate) params.append('date', searchDate.split('T')[0]);
                  navigate(`/explore?${params.toString()}`);
                }
              }}
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
                {searchDate === 'this_weekend' 
                  ? 'This Weekend' 
                  : searchDate === 'this_month'
                  ? 'This Month'
                  : searchDate && searchDate !== 'anytime'
                  ? new Date(searchDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })
                  : 'Any date'}
              </span>
            </div>

            {showCalendar && (
              <>
                <div className="fixed inset-0 z-[90]" onClick={() => setShowCalendar(false)} />
                <div className="absolute top-full right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 mt-6 z-[100] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#f0f0f0] w-auto min-w-[320px] p-5 overflow-hidden animate-[fade-in-up_0.2s_ease-out]">
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {[
                      { label: 'Anytime', value: 'anytime' },
                      { label: 'Weekend', value: 'this_weekend' },
                      { label: 'Month', value: 'this_month' },
                    ].map((option) => (
                      <div 
                        key={option.value}
                        className={`py-2 px-1 text-[12px] font-bold text-center rounded-xl cursor-pointer transition-all border ${
                          (searchDate || 'anytime') === option.value 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => {
                          setSearchDate(option.value);
                          setShowCalendar(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                  
                  <div className="w-full h-[1px] bg-gray-100 my-4" />
                  
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={searchDate && searchDate !== 'anytime' && searchDate !== 'this_weekend' && searchDate !== 'this_month' ? new Date(searchDate) : undefined}
                      onSelect={(date: any) => {
                        setSearchDate(date ? date.toISOString() : 'anytime');
                        setShowCalendar(false);
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => {
              if (searchQuery.trim() || searchDate) {
                const params = new URLSearchParams();
                if (searchQuery.trim()) params.append('q', searchQuery.trim());
                if (searchDate) params.append('date', searchDate.split('T')[0]);
                navigate(`/explore?${params.toString()}`);
              }
            }}
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

        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <span
            className={cn(
              'text-[13px] font-medium cursor-pointer transition-colors duration-300 tracking-[0.01em]',
              navSolid ? 'text-[#555] hover:text-[#007CFF]' : 'text-white/75 hover:text-[#007CFF]'
            )}
            onClick={() => navigate('/explore')}
          >
            Explore
          </span>
          <div 
            className="relative py-2"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <span
              className={cn(
                'text-[13px] font-medium cursor-pointer transition-colors duration-300 tracking-[0.01em] flex items-center gap-1',
                navSolid ? 'text-[#555] hover:text-[#007CFF]' : 'text-white/75 hover:text-[#007CFF]'
              )}
            >
              Categories
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <div 
              className="absolute top-full left-1/2 mt-1 w-[160px] bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#f0f0f0] flex flex-col py-2 z-50 overflow-hidden"
              style={{
                transform: `translateX(-50%) ${isCategoriesOpen ? 'translateY(0)' : 'translateY(8px)'}`,
                opacity: isCategoriesOpen ? 1 : 0,
                visibility: isCategoriesOpen ? 'visible' : 'hidden',
                pointerEvents: isCategoriesOpen ? 'auto' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {['Music', 'Sports', 'Arts & Theatre', 'Comedy', 'Family', 'Festivals'].map(cat => (
                <div 
                  key={cat}
                  onClick={() => {
                    setIsCategoriesOpen(false);
                    navigate(`/explore?category=${cat}`);
                  }}
                  className="px-5 py-2.5 text-[13px] font-semibold text-[#555] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
          {userSession ? (
            <div 
              className="relative py-2"
              onMouseEnter={() => setMobileCategoriesOpen(true)}
              onMouseLeave={() => setMobileCategoriesOpen(false)}
            >
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105',
                  navSolid
                    ? 'bg-[#007CFF]/10 text-[#007CFF]'
                    : 'bg-white/12 backdrop-blur-md text-white border border-white/20'
                )}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div 
                className="absolute top-full right-0 pt-2 z-50"
                style={{
                  transform: `translateY(${mobileCategoriesOpen ? '0' : '8px'})`,
                  opacity: mobileCategoriesOpen ? 1 : 0,
                  visibility: mobileCategoriesOpen ? 'visible' : 'hidden',
                  pointerEvents: mobileCategoriesOpen ? 'auto' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div className="w-[140px] bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#f0f0f0] flex flex-col py-2 overflow-hidden">
                <div 
                  onClick={() => {
                    setMobileCategoriesOpen(false);
                    navigate('/my-tickets');
                  }}
                  className="px-5 py-2.5 text-[13px] font-semibold text-[#555] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                >
                  My Tickets
                </div>
                  <div 
                    onClick={async () => {
                      await dbClient.auth.signOut();
                      setUserSession(null);
                      navigate('/');
                    }}
                    className="px-5 py-2.5 text-[13px] font-semibold text-[#555] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                  >
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className={cn(
                'rounded-full font-semibold px-5 py-2 text-[13px] cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105',
                navSolid
                  ? 'bg-[#007CFF] text-white border-none'
                  : 'bg-white/12 backdrop-blur-md text-white border border-white/20'
              )}
            >
              Sign In
            </button>
          )}
        </div>

        <div
          className={`flex lg:hidden items-center cursor-pointer ${navSolid ? 'text-[#0a0a0a]' : 'text-white'}`}
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
                navigate('/explore');
                setMobileMenuOpen(false);
              }}
            >
              Explore
            </span>
            <div className="flex flex-col items-center gap-4">
              <span 
                className="text-white text-2xl font-semibold cursor-pointer flex items-center gap-2"
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
              >
                Categories
                <svg 
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: mobileCategoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
              <div 
                className="flex flex-col items-center gap-3 overflow-hidden transition-all duration-300"
                style={{ maxHeight: mobileCategoriesOpen ? '500px' : '0px', opacity: mobileCategoriesOpen ? 1 : 0 }}
              >
                {['Music', 'Sports', 'Arts & Theatre', 'Comedy', 'Family', 'Festivals'].map(cat => (
                  <span 
                    key={cat}
                    onClick={() => {
                      setMobileCategoriesOpen(false);
                      setMobileMenuOpen(false);
                      navigate(`/explore?category=${cat}`);
                    }}
                    className="text-white/80 text-xl font-medium cursor-pointer hover:text-white transition-colors"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            {userSession ? (
              <div className="flex flex-col items-center gap-4">
                <span className="text-white text-2xl font-semibold cursor-pointer mt-4" onClick={() => { setMobileMenuOpen(false); navigate('/my-tickets'); }}>My Tickets</span>
                <span className="text-red-400 text-lg font-medium cursor-pointer" onClick={async () => { await dbClient.auth.signOut(); setUserSession(null); setMobileMenuOpen(false); navigate('/'); }}>Log Out</span>
              </div>
            ) : (
              <span className="text-[#007CFF] text-2xl font-semibold cursor-pointer mt-4" onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }}>Sign In</span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
