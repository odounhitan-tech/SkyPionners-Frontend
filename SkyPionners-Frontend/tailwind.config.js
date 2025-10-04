/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0B3D91', // NASA Blue
        'secondary': '#4D85E0', // Lighter Blue
        'accent': '#FC3D21',  // NASA Red
        'light': '#F5F5F5',     // Off-white for text
        'dark': '#212121',      // Dark gray for backgrounds
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}