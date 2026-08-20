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
          muted: '#F8FAFC'
        }
      }
    },
  },
  plugins: [],
}
