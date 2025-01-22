/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',  // Important for Vite projects
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { 'background-position': '200%' },
          '100%': { 'background-position': '-200%' },
        },
      },
      animation: {
        shine: 'shine var(--shine-duration, 5s) linear infinite',
      },
    },
  },
  plugins: [],
}