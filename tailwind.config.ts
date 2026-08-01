import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5fbff",
          100: "#e2f4ff",
          200: "#b9e7ff",
          300: "#7fd3ff",
          400: "#3db4ff",
          500: "#1294f2",
          600: "#0075d0",
          700: "#005ca9",
          800: "#054d87",
          900: "#0a3f6f"
        }
      }
    }
  },
  plugins: []
};

export default config;
