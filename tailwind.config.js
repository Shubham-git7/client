/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary" : "#0A1925",
        "secondary" : "#F97316",
        "tertiary" : "#5406BB",
      }
    },
    screens: {
      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }
      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}