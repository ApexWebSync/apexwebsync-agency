import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070A12",
        surface: "#0F172A",
        "surface-light": "#1E293B",
        apex: {
          cyan: "#00D2FF",
          "cyan-light": "#38BDF8",
          blue: "#2563EB",
          dark: "#070A12",
          slate: "#0F172A",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "apex-gradient": "linear-gradient(135deg, #00D2FF 0%, #3A7BD5 50%, #2563EB 100%)",
        "glow-conic": "conic-gradient(from 180deg at 50% 50%, #00D2FF 0deg, #2563EB 180deg, #00D2FF 360deg)",
      },
      boxShadow: {
        "neon-cyan": "0 0 25px -5px rgba(0, 210, 255, 0.4)",
        "neon-blue": "0 0 35px -5px rgba(37, 99, 235, 0.35)",
        "glass-inset": "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
