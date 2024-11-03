import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#EFF3FB",
          "100": "#DEE7F7",
          "200": "#BDCEF0",
          "300": "#9DB6E8",
          "400": "#7C9DE1",
          "500": "#5B85D9",
          "600": "#496AAE",
          "700": "#375082",
          "800": "#243557",
          "900": "#121B2B",
        },
        error: {
          "100": "#FDD9D7",
          "200": "#FBB4AF",
          "300": "#F88E86",
          "400": "#F6695E",
          "500": "#F44336",
          "600": "#C3362B",
          "700": "#922820",
          "800": "#491410",
          "900": "#180705",
        },
        warning: {
          "100": "#FFF3CD",
          "200": "#FFE69C",
          "300": "#FFDA6A",
          "400": "#FFCD39",
          "500": "#FFC107",
          "600": "#CC9A06",
          "700": "#997404",
          "800": "#664D03",
          "900": "#332701",
        },
        success: {
          "100": "#D1E7DD",
          "200": "#A3CFBB",
          "300": "#75B798",
          "400": "#479F76",
          "500": "#198754",
          "600": "#146C43",
          "700": "#0F5132",
          "800": "#0A3622",
          "900": "#051B11",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
