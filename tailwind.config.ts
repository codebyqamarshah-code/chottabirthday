import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5C8A',
        secondary: '#FF9F9F',
        'soft-peach': '#FFD6C9',
        cream: '#FFF8F2',
        'warm-gold': '#F2C66D',
        'dark-ink': '#241A22',
        'soft-rose': '#FFF0F4',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        hand: ['Dancing Script', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scaleY(1)' },
          '50%': { opacity: '0.7', transform: 'scaleY(0.9) scaleX(1.1)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        'balloon-rise': {
          '0%': { transform: 'translateY(100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(-20vh) rotate(15deg)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 1s infinite',
        flicker: 'flicker 0.8s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        'balloon-rise': 'balloon-rise 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
