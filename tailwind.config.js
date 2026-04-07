export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f3f4f6',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#6366f1',
          600: '#7c43df',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3c1a78',
        },
      },
      gridTemplateColumns: {
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fill-250': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
    },
  },
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|12)/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /col-span-(1|2|3|4|5|6|12)/,
    },
  ],
  plugins: [],
};
