/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pixel: {
          bg: '#FFD6E7',
          sky: '#FFC2DC',
          cabinet: '#FF6BA9',
          cabinetDark: '#D92B76',
          cabinetDeep: '#8C1449',
          trim: '#FFF0F6',
          gold: '#FFE47A',
          heart: '#FF2E7E',
          ink: '#591234',
        },
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
      },
      fontFamily: {
        pixel: ['"VT323"', 'monospace'],
        arcade: ['"Press Start 2P"', '"VT323"', 'monospace'],
        sans: ['"Quicksand"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'mobile': '430px',
      },
    },
  },
  plugins: [],
}
