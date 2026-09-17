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
        background: "#f8fafc",
        surface: "#ffffff",
        "surface-subtle": "#f1f5f9",
        apex: {
          cyan: "#00b4d8",
          "cyan-light": "#0284c7",
          blue: "#2563eb",
          dark: "#0f172a",
          slate: "#334155",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "apex-gradient": "linear-gradient(135deg, #00b4d8 0%, #0284c7 50%, #2563eb 100%)",
      },
      boxShadow: {
        "neon-cyan": "0 0 25px -5px rgba(0, 180, 216, 0.3)",
        "neon-blue": "0 0 35px -5px rgba(37, 99, 235, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
