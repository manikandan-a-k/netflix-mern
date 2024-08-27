import tailwindScrollbarHide from "tailwind-scrollbar-hide"

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbarHide],
}

