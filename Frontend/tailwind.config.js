/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37', // This makes 'bg-gold' use the same as 'bg-gold-500'
          50: '#FFFDF7',
          100: '#FEF9E7',
          200: '#FDF2C7',
          300: '#FCE96A',
          400: '#FACC15',
          500: '#D4AF37',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
          950: '#422006',
        },
        charcoal: '#2E2E2E',
        ivory: '#F9F6F0',
        navy: {
          DEFAULT: '#0F1C2E',
          100: '#E6E8EB',
          200: '#C0C5CC',
          300: '#99A1AD',
          400: '#4D5B75',
          500: '#0F1C2E',
          600: '#0D1929',
          700: '#0B1422',
          800: '#08101B',
          900: '#060C15',
        },
        success: {
          100: '#E6F4EA',
          500: '#34A853',
          900: '#0D652D',
        },
        warning: {
          100: '#FEF7E6',
          500: '#FBBC05',
          900: '#965D00',
        },
        error: {
          100: '#FDEDED',
          500: '#EA4335',
          900: '#9D1E14',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};