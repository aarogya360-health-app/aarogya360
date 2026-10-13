/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          900: '#041F1F',
          800: '#073B3A', // Midnight teal primary
          700: '#0B4D4B',
          600: '#0E625F',
          500: '#11BFA4', // Emerald accent
        },
        emerald: {
          400: '#25D8BD',
          500: '#11BFA4',
          600: '#0E9F88',
        },
        mint: {
          50: '#F5FFFC',
          100: '#E8FFF7',
          200: '#D9FFF1', // Soft mint
          300: '#B8FFE6',
          400: '#8AECD3',
        },
        navy: {
          900: '#0A1B2C',
          800: '#102A43', // Deep navy
          700: '#1A3B5C',
          600: '#274C77',
        },
        ice: {
          50: '#F8FCFC', // Ice white
          100: '#EDF6F6',
          200: '#E0EFEF',
        },
        lavender: {
          300: '#D6C8FF',
          400: '#B9A5FF', // Lavender accent
          500: '#9B7EF7',
        },
        canvas: '#F1F7F6', // Soft neutral background
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(7, 59, 58, 0.08)',
        'glass-hover': '0 14px 40px 0 rgba(7, 59, 58, 0.14)',
        'glow-emerald': '0 0 25px -5px rgba(17, 191, 164, 0.4)',
        'glow-teal': '0 0 35px -5px rgba(7, 59, 58, 0.35)',
        'card': '0 4px 20px -2px rgba(16, 42, 67, 0.06), 0 2px 6px -1px rgba(16, 42, 67, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-very-slow': 'spin 24s linear infinite',
        'spin-reverse-slow': 'spin-reverse 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
}
