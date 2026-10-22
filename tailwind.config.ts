import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#FAF9F6",
          100: "#F5F2EB",
          200: "#EAE4D7",
          300: "#DDD4C1",
          900: "#2C2824",
        },
        forest: {
          50: "#F0F7F4",
          100: "#D8ECE3",
          200: "#B3DAC9",
          600: "#2D5A43",
          700: "#244A36",
          800: "#1B3B2B",
          900: "#132A1F",
        },
        sage: {
          50: "#F4F7F5",
          100: "#E3ECE6",
          200: "#C7D8CE",
          500: "#5D7B6C",
          700: "#3D5248",
          800: "#2C3D35",
        },
        slate: {
          850: "#151F30",
          950: "#0B1120",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
