/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aboriginal-brown': '#8B4513',
        'aboriginal-dark': '#2C1810',
        'aboriginal-cream': '#F5F0E8',
        'aboriginal-warm': '#EDE4D8',
        'aboriginal-light': '#D4C5B2',
        'aboriginal-medium': '#4A2A1A',
        'aboriginal-darker': '#1A0E08',
      }
    },
  },
  plugins: [],
}