import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      "sans": "var(--font-didact-gothic)",
      "mono": "var(--font-jetbrains-mono)",
    },
    extend:{
      colors: {
        primary: colors.neutral['50'],
        complementary: colors.neutral['800'],
        primaryDark: colors.neutral['800'],
        complementaryDark: colors.neutral['50'],
        accent: colors.indigo
      },
    },
  },
  plugins: [],
};
export default config;
