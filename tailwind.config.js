/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          light: '#8C2E3B',
          DEFAULT: '#800020',
          dark: '#4A0E17',
          deep: '#240408',
        },
        korean: {
          red: '#C51C24',
          accent: '#A3151B',
        },
        charcoal: {
          100: '#F5F5F5',
          300: '#A3A3A3',
          500: '#737373',
          700: '#404040',
          800: '#1C1917',
          900: '#120E0E',
          950: '#0B0808',
        },
        cream: {
          light: '#FAF9F6',
          DEFAULT: '#F5F2EB',
          dark: '#E8E3D5',
        },
        gold: {
          light: '#E5C06A',
          DEFAULT: '#D4AF37',
          dark: '#B08E28',
        },
        copper: '#C5A059',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'steam': 'steam 5s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        steam: {
          '0%, 100%': { transform: 'translateY(0) scale(1) translateX(0)', opacity: '0.1' },
          '50%': { transform: 'translateY(-10px) scale(1.1) translateX(3px)', opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
