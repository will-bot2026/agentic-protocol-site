/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          blue: '#3B82F6',
          'blue-glow': '#60A5FA',
          purple: '#8B5CF6',
          'purple-glow': '#A78BFA',
          cyan: '#06B6D4',
          dark: '#050A14',
          'dark-card': '#0D1526',
          'dark-border': '#1E2D4A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.25) 0%, transparent 60%)',
        'grid-pattern':
          'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(59,130,246,0.3)' },
          to: { boxShadow: '0 0 40px rgba(139,92,246,0.5)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(59,130,246,0.3)',
        'glow-purple': '0 0 30px rgba(139,92,246,0.3)',
        'glow-lg': '0 0 60px rgba(59,130,246,0.2)',
      },
    },
  },
  plugins: [],
};
