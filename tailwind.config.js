/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      colors: {
        universe: {
          50: '#f0f4ff',
          100: '#dce4ff',
          200: '#b8ccff',
          300: '#8aabff',
          400: '#5c82ff',
          500: '#3b5cff',
          600: '#2a3ef5',
          700: '#1e2ed4',
          800: '#1a28a8',
          900: '#0a0f2e',
          950: '#050816',
        },
        neon: {
          blue: '#4d7cff',
          cyan: '#00e5ff',
          purple: '#b44dff',
          pink: '#ff4da6',
          green: '#4dff91',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at center, rgba(13,17,40,0.4) 0%, rgba(5,8,22,0.95) 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        'mesh-gradient': 'radial-gradient(at 20% 30%, rgba(61,92,255,0.15) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(180,77,255,0.1) 0px, transparent 50%)',
      },
      boxShadow: {
        'neon-blue': '0 0 30px rgba(61,92,255,0.3), 0 0 60px rgba(61,92,255,0.1)',
        'neon-purple': '0 0 30px rgba(180,77,255,0.3), 0 0 60px rgba(180,77,255,0.1)',
        'neon-cyan': '0 0 30px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
        'glow': '0 0 100px rgba(61,92,255,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'reveal': 'reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(61,92,255,0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(61,92,255,0.4), 0 0 80px rgba(61,92,255,0.1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)', filter: 'blur(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};