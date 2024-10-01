/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '930px',
        'cl': '900px',
        'lg': '800px',
        'ml': '700px',
        'mg': '512px',
        "mt": "410px",
        'tm': '370px'
      }
    },
  },
  plugins: [],
}