import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#c2a4ff",
        bgDark: "#0b080c",
      },
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        floatOrb1: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, 40px)" },
        },
        floatOrb2: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-40px, 30px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s forwards",
        floatOrb1: "floatOrb1 8s ease-in-out infinite",
        floatOrb2: "floatOrb2 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
