/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',       // 48px
        '6xl': '4rem',       // 64px
        '7xl': '5rem',       // 80px
        '8xl': '6rem',       // 96px
      },
    },
  },
  plugins: [],
};