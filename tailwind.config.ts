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
        background: "#F8F8F8", // Slightly warmer/softer background
        card: "#FFFFFF",
        foreground: "#050505", // Deeper black for high contrast
        muted: "#86868B", // Apple-style muted grey
        border: "rgba(0,0,0,0.04)",
        accent: "#000000",
        success: "#2DD4BF",
        warning: "#F59E0B",
        danger: "#FF3B30", // San Francisco style red
      },
      fontFamily: {
        sans: ["var(--font-inter)", "SF Pro Display", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "SF Pro Display", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2.5rem",
        "5xl": "3.5rem",
        "6xl": "4.5rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(0,0,0,0.02), 0 8px 40px rgba(0,0,0,0.03)",
        elevated: "0 20px 80px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.02)",
        glow: "0 0 50px rgba(0,0,0,0.04)",
        "inner-glow": "inset 0 0 20px rgba(255,255,255,0.5)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateX(-150%) skewX(-30deg)" },
          "100%": { transform: "translateX(200%) skewX(-30deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        sweep: "sweep 2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
