import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#EFF3FB',
  				'100': '#DEE7F7',
  				'200': '#BDCEF0',
  				'300': '#9DB6E8',
  				'400': '#7C9DE1',
  				'500': '#5B85D9',
  				'600': '#496AAE',
  				'700': '#375082',
  				'800': '#243557',
  				'900': '#121B2B'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
