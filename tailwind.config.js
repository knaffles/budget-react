/** @type {import('tailwindcss').Config} */
import themes from "daisyui/src/theming/themes";
themes.dark["base-200"] = "#333";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: { ...themes.dark },
      },
    ],
  },
};
