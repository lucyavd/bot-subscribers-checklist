/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        coffee: {
          light: '#E6CCAF',
          DEFAULT: '#6F4E37',
          dark: '#4A2C17',
        },
      },
    },
  },
  plugins: [],
};