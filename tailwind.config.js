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
          "primary": "#4AC3E8",
          "secondary": "#E75CA2",
          "accent": "#FCDD1B",
          "neutral": "#464A4E",

          "--rounded-box": "0.1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.1rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0.1rem", // border radius rounded-badge utility class, used in badges and similar
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}

