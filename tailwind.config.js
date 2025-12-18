/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0084c7',
          dark: '#333333',
          light: '#e0f2fe',
          grey: '#4b5563'
        }
      }
    },
  },
  plugins: [],
}