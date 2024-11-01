import type { Config } from "tailwindcss";
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      // => @media (min-width: 360px) { ... }

      'md': '360px',
      // => @media (min-width: 400px) { ... }

      'mdx': '460px',
      // => @media (min-width: 650px) { ... }

      'mdl': '550px',
      // => @media (min-width: 750px) { ... }

      'slg': '750px',
      // => @media (min-width: 900px) { ...

      'lg': '900px',
      // => @media (min-width: 1100px) { ... }

      'xl': '1000px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1100px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1440px',
      // => @media (min-width: 1440px) { ... }
      '4xl': '1600px',
      '5xl': '2000px',
    },
    extend: {
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
      },
      colors: {
        corporate: "#E94B50",
        hover_corporate: "#EE787C",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backdropBlur: {
        '7.5': '7.5px',
      },
    },
  },
  plugins: [
    tailwindScrollbarHide,
    lineClamp,
  ],
};
export default config;
