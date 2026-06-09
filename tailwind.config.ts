import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- SAFunded palette (edit here to re-skin the whole site) ----
        base: "#070B16", // deep navy/near-black background
        surface: "#0E1424", // elevated panels
        ink: "#06121C", // dark text used on the accent (for contrast on buttons)
        accent: "#2DD4A7", // refined emerald (primary)
        "accent-bright": "#37E6B6", // hover
        gold: "#CBA35C", // muted premium gold (secondary accents)
        muted: "#9AA3B8", // secondary text
        faint: "#6B7488", // tertiary text / hints
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(45,212,167,0.18), 0 12px 40px -12px rgba(45,212,167,0.35)",
        "glow-lg":
          "0 0 0 1px rgba(45,212,167,0.25), 0 18px 60px -12px rgba(45,212,167,0.5)",
        card: "0 24px 80px -24px rgba(0,0,0,0.65)",
      },
    },
  },
  plugins: [],
};

export default config;
