export const colors = {
  brand: {
    primary: '#007CFF',
    primaryLight: '#5BAAFF',
    primaryDark: '#0056CC',
    primarySubtle: 'rgba(0, 124, 255, 0.08)',
  },
  neutral: {
    950: '#0a0a0a',
    900: '#111111',
    800: '#1e1e1e',
    700: '#333333',
    600: '#555555',
    500: '#777777',
    400: '#888888',
    300: '#aaaaaa',
    200: '#cccccc',
    150: '#e0e0e0',
    100: '#e5e5e5',
    50: '#f0f0f0',
    25: '#f5f5f5',
    0: '#fafafa',
  },
  semantic: {
    success: '#16a34a',
    successSubtle: 'rgba(22, 163, 74, 0.1)',
    warning: '#d97706',
    warningSubtle: 'rgba(217, 119, 6, 0.1)',
    danger: '#dc2626',
    dangerSubtle: 'rgba(220, 38, 38, 0.1)',
    info: '#0284c7',
    infoSubtle: 'rgba(2, 132, 199, 0.1)',
  },
  white: '#ffffff',
  black: '#000000',
} as const;

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  scale: {
    display: { size: 'clamp(40px,6vw,72px)', weight: '900', tracking: '-0.04em', lineHeight: '1.0' },
    h1: { size: 'clamp(32px,4vw,56px)', weight: '900', tracking: '-0.04em', lineHeight: '1.05' },
    h2: { size: 'clamp(24px,3vw,40px)', weight: '800', tracking: '-0.03em', lineHeight: '1.1' },
    h3: { size: 'clamp(18px,2vw,24px)', weight: '700', tracking: '-0.02em', lineHeight: '1.2' },
    h4: { size: 'clamp(15px,1.5vw,18px)', weight: '700', tracking: '-0.01em', lineHeight: '1.3' },
    bodyLg: { size: '17px', weight: '500', tracking: '0', lineHeight: '1.6' },
    body: { size: '15px', weight: '500', tracking: '0', lineHeight: '1.6' },
    bodySm: { size: '13px', weight: '500', tracking: '0', lineHeight: '1.5' },
    caption: { size: '12px', weight: '500', tracking: '0', lineHeight: '1.4' },
    label: { size: '11px', weight: '700', tracking: '0.1em', lineHeight: '1.2' },
    overline: { size: '11px', weight: '700', tracking: '0.12em', lineHeight: '1.2' },
  },
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(0,0,0,0.04)',
  md: '0 4px 12px rgba(0,0,0,0.06)',
  lg: '0 12px 32px rgba(0,0,0,0.08)',
  xl: '0 20px_40px rgba(0,0,0,0.10)',
  card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
  cardHover: '0 8px 24px rgba(0,0,0,0.06), 0 20px 40px rgba(0,0,0,0.04)',
  primary: '0 4px 16px rgba(0,124,255,0.4)',
  primaryLg: '0 8px 32px rgba(0,124,255,0.3)',
} as const;

export const transition = {
  fast: 'all 0.15s ease',
  base: 'all 0.3s ease',
  smooth: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
  spring: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
} as const;
