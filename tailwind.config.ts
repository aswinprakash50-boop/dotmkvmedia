import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "#0b0f19",
          card: "#111827",
          cardHover: "#182234",
          border: "#1f293d",
          borderSubtle: "#162032",
          text: "#f9fafb",
          textMuted: "#9ca3af",
          accent: "#6366f1",
          accentHover: "#4f46e5",
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
          info: "#06b6d4",
          purple: "#a855f7"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
