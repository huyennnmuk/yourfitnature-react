import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'camber-sage-primary': '#6E7C5B',
        'camber-sage-light': '#B2C299',
        'camber-sage-medium': '#919F77',
        'camber-sage-muted': '#939C8F',
        'camber-sage-neutral': '#889989',
        'camber-sage-dark': '#75776F',
        'camber-sage-accent': '#9BA58C',
        'camber-sage-forest': '#748573',
        'camber-sage-charcoal': '#3B3934',
        'camber-sage-deep': '#5A684A',
        'camber-primary': '#6E7C5B',
        'camber-secondary': '#B2C299',
        'camber-accent': '#9BA58C',
        'camber-text-primary': '#374151',
        'camber-text-secondary': '#6B7280',
        'camber-background-light': '#F9FAFB',
        'camber-background-medium': '#F3F4F6',
        'camber-background-muted': '#E5E7EB',
        'jade': '#959085',
        'soil': '#959085',
        'blackCta': '#1f2937',
        'ctaText': '#374151',
        'glass-bg': 'rgba(255, 255, 255, 0.7)',
        'blog-background': '#FBFAF4',
        'perplexity-primary': '#20808D',
        'perplexity-heading': '#13343B',
        'perplexity-link': '#20808D',
        'perplexity-muted': '#64645F',
        'perplexity-accent-bg': '#BADEDD',
        'perplexity-table-border': '#BADEDD',
        'perplexity-code-bg': '#E3F2F2',
        'perplexity-hr': '#CCCAB7',
        'perplexity-text': 'rgba(19, 51, 59, 0.88)',
        'perplexity-heading-dark': '#091717',
        'klarna-pink': '#FEA8CC',
      },
      fontFamily: {
        sans: ['var(--font-schulbuch-nord)', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
        'schulbuch-nord': ['SchulbuchNord', 'SchulbuchNord Fallback'],
        'sans-1': ['FK Grotesk', 'Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'modal-open': {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'modal-open': 'modal-open 0.3s ease-out forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
