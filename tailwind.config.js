/** @type {import('tailwindcss').Config} */
import themes from "daisyui/src/theming/themes";
themes.dark["base-200"] = "#444";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: { ...themes.dark },
      },
      "light",
    ],
  },
};
