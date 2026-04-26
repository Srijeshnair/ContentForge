export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
        },
        // Dark theme colors
        bg: '#0F172A',
        card: '#1E293B',
        primary: '#6366F1',
      },
    },
  },
  plugins: [],
};
