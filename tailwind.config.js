/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        'crea-primary': '#F6CEC8',
        'crea-rose': '#D19793',
        'crea-dark': '#3A3F3B',
        'crea-bg': '#FCF9F6',
      }
    },
  },
  plugins: [],
}