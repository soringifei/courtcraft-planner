import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        floor: "#d8a35a",
        ink: "#0d1117",
        panel: "#151a22",
        line: "#f7ead6",
        signal: "#f97316",
        limecourt: "#9ccf53",
      },
      boxShadow: {
        trainer: "0 20px 70px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
