/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../packages/loka/src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007CFF',
          dark: '#050505',
          light: '#5BAAFF',
          muted: '#F8FAFC',
          subtle: 'rgba(0, 124, 255, 0.08)',
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
        success: {
          DEFAULT: '#16a34a',
          subtle: 'rgba(22, 163, 74, 0.1)',
        },
        warning: {
          DEFAULT: '#d97706',
          subtle: 'rgba(217, 119, 6, 0.1)',
        },
        danger: {
          DEFAULT: '#dc2626',
          subtle: 'rgba(220, 38, 38, 0.1)',
        },
      },
      fontFamily: {
        sans: ["'Inter'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'sans-serif'],
      },
      borderRadius: {
        'loka-sm': '8px',
        'loka-md': '12px',
        'loka-lg': '16px',
        'loka-xl': '20px',
        'loka-2xl': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.06), 0 20px 40px rgba(0,0,0,0.04)',
        'primary': '0 4px 16px rgba(0,124,255,0.4)',
        'primary-lg': '0 8px 32px rgba(0,124,255,0.3)',
        'navbar': '0 1px 0 rgba(0,0,0,0.06)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16,1,0.3,1)',
        'bounce-out': 'cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
}
