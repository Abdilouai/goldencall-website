/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)'
        },
        dark: 'var(--color-dark)',
        card: 'var(--color-card)',
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)'
        },
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        heading: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
