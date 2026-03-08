import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tpa: {
          dark: "rgb(3, 27, 29)",
          "dark-secondary": "rgb(10, 46, 49)",
          gold: "rgb(196, 162, 101)",
          "gold-light": "rgb(216, 189, 143)",
          "gold-dark": "rgb(170, 138, 78)",
          cream: "rgb(250, 248, 243)",
          "cream-light": "rgb(253, 252, 250)",
          border: "rgb(240, 237, 229)",
          text: "rgb(26, 26, 26)",
          "hero-text": "rgb(250, 248, 243)",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
