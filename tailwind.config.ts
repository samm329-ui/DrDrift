
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Roboto', 'system-ui', 'sans-serif'],
        headline: ['Montserrat', 'system-ui', 'sans-serif'],
        code: ['monospace'],
      },
      boxShadow: {
        strong: 'inset 0 -3em 3em rgba(0,0,0,0.02), 0 0 0 1px rgb(220, 220, 220), 0.1em 0.1em 0.4em rgba(0,0,0,0.1)',
        glass: '12px 17px 51px hsl(var(--foreground) / 0.1)',
      },
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      colors: {
        background: {
          DEFAULT: 'hsl(var(--background))',
          alt: 'hsl(var(--background-alt))',
        },
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'shake': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        'roll-down': {
          from: {
            opacity: '0',
            transform: 'translateY(-10px) rotateX(-15deg)',
            transformOrigin: 'top center',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0) rotateX(0deg)',
            transformOrigin: 'top center',
          },
        },
        celebrate: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.4)',
            opacity: '0.8',
          },
        },
        'display-star': {
          '0%': {
            transform: 'rotateX(100deg) rotateY(100deg) translateY(10px)',
          },
          '100%': {
            transform: 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          },
        },
        'shake-star': {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-20deg)' },
          '50%': { transform: 'rotate(20deg)' },
          '80%': { transform: 'rotate(-20deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.5s ease-in-out',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'roll-down': 'roll-down 0.3s ease-out',
        celebrate: 'celebrate 1.5s ease-in-out infinite',
        'display-star': 'display-star 0.5s cubic-bezier(0.75, 0.41, 0.82, 1.2)',
        'shake-star': 'shake-star 0.6s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
