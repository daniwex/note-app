import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        bgLight100:"#F3F5F8",
        blue500:"#335CFF"
      },
      screens: {
        'sm':'650px',
        'md':'768px',
        'lg':'1550px',
        'xl':'1950px'
      }
    },
  },
  plugins: [],
};
export default config;
