/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-100': '#FEF0D0',
        'primary-200': '#FEDDA2',
        'primary-300': '#FCC474',
        'primary-400': '#FAAB51',
        'primary-500': '#F78419',
        'primary-600': '#D46512',
        'primary-700': '#B14B0C',
        'primary-800': '#8F3407',
        'primary-900': '#762404',
      },
    },
  },
  plugins: [],
};
