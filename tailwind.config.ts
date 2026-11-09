import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        midnight: '#0A1420',
        elevated: '#101C2A',
        surface: {
          DEFAULT: '#101C2A',
          subtle: '#0E1724',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: '#162538',
        },
        botanical: {
          DEFAULT: '#6BAA83',
          light: '#B5D3BD',
          dark: '#4B8563',
          glow: 'rgba(107, 170, 131, 0.15)',
        },
        sage: '#B5D3BD',
        sky: {
          DEFAULT: '#83C9F5',
          dark: '#589DC9',
          glow: 'rgba(131, 201, 245, 0.15)',
        },
        editorial: {
          primary: '#F4F5F1',
          secondary: '#929BA7',
          muted: '#636D7A',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        editorial: [
          'Playfair Display',
          'Georgia',
          'serif',
        ],
        devanagari: [
          'Noto Sans Devanagari',
          'Kohinoor Devanagari',
          'sans-serif',
        ],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
