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
          800: '#2E2B2A',
          900: '#1C1A19',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'mobile': '440px',
      }
    },
  },
  plugins: [],
}
