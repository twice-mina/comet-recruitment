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
        comet: {
          bg: "#FFFFFF",
          surface: "#F8F8FC",
          border: "#E5E5E5",
          text: "#09090F",
          muted: "#6B7280",
          indigo: "#4338CA",
          "indigo-lt": "#EEF2FF",
          streak: "#F97316",
        },
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "serif"],
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        fadeInUp: "hero-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        fadeIn: "hero-stagger 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        scaleIn: "hero-scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2s ease-in-out infinite",
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
