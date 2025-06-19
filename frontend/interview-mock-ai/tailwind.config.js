/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust if your components are elsewhere
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
      },
      screens: {
        '3xl': '1920px',
      },
      fontFamily: {
        display: ['var(--font-display)'],
      },
    },
  },
  plugins: [],
}
