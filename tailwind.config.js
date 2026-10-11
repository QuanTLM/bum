/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          50: '#FDF7F8',
          100: '#FCEEF1',
          200: '#F9DCE2',
          300: '#F4BFC9',
          400: '#E992A2',
          500: '#D9657A',
          600: '#C2485E',
          700: '#A33347',
          800: '#872C3D',
          900: '#732937',
        },
        warm: {
          50: '#FAF9F6',
          100: '#F5F3EF',
          200: '#EBE7DF',
          300: '#DDD7CB',
          400: '#C4BCAB',
          500: '#A99F8D',
          600: '#8A806F',
          700: '#5F574B',
          800: '#2E2B2A',
          900: '#1C1A19',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'mobile': '440px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'premium': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      boxShadow: {
        'romantic-soft': '0 12px 32px -4px rgba(217, 101, 122, 0.18)',
        'warm-diffused': '0 16px 40px -12px rgba(46, 43, 42, 0.08)',
        'glass-edge': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)',
      }
    },
  },
  plugins: [],
}
