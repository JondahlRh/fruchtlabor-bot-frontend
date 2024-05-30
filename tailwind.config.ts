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
        primary: "#3BCBDB",
        secondary: "#FFC454",
        tertiary: "#FF548E",
        quadro: "#6C52E0",
      },
    },
  },
  plugins: [],
};
export default config;
