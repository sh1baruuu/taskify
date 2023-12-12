/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "white-100": "#F1F1F1",
        'primary': '#265bff',
        'secondary': '#002087',
      },
      fontFamily: {
        'title': "Preahvihear"
      },
      boxShadow: {
        "inset": "inset 0 0 2px black",
        "bg": "0 0 10px 1000px rgb(0, 0, 0, 0.5)",

      }
    },
  },
  plugins: [],
}

