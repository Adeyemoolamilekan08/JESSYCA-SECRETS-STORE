/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: {
          50: '#faf5fa',
          100: '#f3e7f2',
          200: '#e7cfe4',
          300: '#d2a8cd',
          400: '#b778af',
          500: '#934b8a',
          600: '#74356e',
          700: '#5b2857',
          800: '#482044',
          900: '#3c153d',
        },
        champagne: '#c9a66b',
        ivory: '#fbf8f2',
        cream: '#f3eee5',
        charcoal: '#29252a',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px rgba(44, 25, 43, 0.08)',
        product: '0 8px 24px rgba(44, 25, 43, 0.08)',
      },
    },
  },
  plugins: [],
}