import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sakura: '#FAF6F2',
        petal: '#F2C4CE',
        blush: '#E8A4A0',
        sand: '#C4A882',
        espresso: '#2C1F1A',
        rosegold: '#C4857A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      animation: {
        'drift-1': 'petalDrift1 20s ease-in-out infinite',
        'drift-2': 'petalDrift2 26s ease-in-out infinite 4s',
        'drift-3': 'petalDrift3 22s ease-in-out infinite 8s',
        'drift-4': 'petalDrift4 30s ease-in-out infinite 2s',
        'drift-5': 'petalDrift5 18s ease-in-out infinite 6s',
        'drift-6': 'petalDrift6 24s ease-in-out infinite 10s',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        petalDrift1: {
          '0%': { transform: 'translate(0, -60px) rotate(0deg)', opacity: '0' },
          '5%': { opacity: '0.12' },
          '50%': { transform: 'translate(40px, 50vh) rotate(200deg)' },
          '95%': { opacity: '0.06' },
          '100%': { transform: 'translate(-20px, 105vh) rotate(380deg)', opacity: '0' },
        },
        petalDrift2: {
          '0%': { transform: 'translate(0, -40px) rotate(45deg)', opacity: '0' },
          '5%': { opacity: '0.1' },
          '50%': { transform: 'translate(-50px, 48vh) rotate(240deg)' },
          '95%': { opacity: '0.05' },
          '100%': { transform: 'translate(30px, 108vh) rotate(420deg)', opacity: '0' },
        },
        petalDrift3: {
          '0%': { transform: 'translate(0, -80px) rotate(90deg)', opacity: '0' },
          '8%': { opacity: '0.09' },
          '50%': { transform: 'translate(60px, 52vh) rotate(260deg)' },
          '92%': { opacity: '0.04' },
          '100%': { transform: 'translate(-40px, 110vh) rotate(440deg)', opacity: '0' },
        },
        petalDrift4: {
          '0%': { transform: 'translate(0, -50px) rotate(20deg)', opacity: '0' },
          '6%': { opacity: '0.11' },
          '50%': { transform: 'translate(-30px, 47vh) rotate(220deg)' },
          '94%': { opacity: '0.05' },
          '100%': { transform: 'translate(50px, 106vh) rotate(400deg)', opacity: '0' },
        },
        petalDrift5: {
          '0%': { transform: 'translate(0, -70px) rotate(120deg)', opacity: '0' },
          '7%': { opacity: '0.08' },
          '50%': { transform: 'translate(70px, 49vh) rotate(310deg)' },
          '93%': { opacity: '0.04' },
          '100%': { transform: 'translate(-60px, 107vh) rotate(490deg)', opacity: '0' },
        },
        petalDrift6: {
          '0%': { transform: 'translate(0, -30px) rotate(60deg)', opacity: '0' },
          '5%': { opacity: '0.1' },
          '50%': { transform: 'translate(-45px, 51vh) rotate(250deg)' },
          '95%': { opacity: '0.05' },
          '100%': { transform: 'translate(35px, 109vh) rotate(430deg)', opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.25', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
