import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B1120",
        primary: "#3B82F6",
        secondary: "#8B5CF6",
        accent: "#06B6D4",
        foreground: "#F8FAFC",
        muted: "#94A3B8",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        "gradient-accent":  "linear-gradient(135deg, #06B6D4, #3B82F6)",
        "gradient-hero":    "linear-gradient(135deg, #0B1120 0%, #0f1a2e 50%, #0B1120 100%)",
      },
      boxShadow: {
        "glow-blue":   "0 0 20px rgba(59,130,246,0.3)",
        "glow-purple": "0 0 20px rgba(139,92,246,0.3)",
        "glow-cyan":   "0 0 20px rgba(6,182,212,0.3)",
        "card":        "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover":  "0 12px 40px rgba(0,0,0,0.55), 0 0 24px rgba(59,130,246,0.10), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
      // Only keep animations that CSS can't do — Framer Motion handles the rest
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
