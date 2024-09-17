/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#0093d3",
          "secondary": "#CC016B",
          "accent": "#FFF10D",
          "neutral": "#464A4E",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}

