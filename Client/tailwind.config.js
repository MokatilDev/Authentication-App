/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      backgroundColor: {
        input: "#0d0d0d",
        black: "#0d0d0d"
      },
      colors: {
        main: "#e0dfff",
        blackInput: "#444444",
        second: "#a1a1a1"
      },
    },
  },
  plugins: [],
}

