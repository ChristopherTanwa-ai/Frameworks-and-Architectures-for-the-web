/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      "gray-20": "#F000",
      "gray-50": "#EFE6E6",
      "gray-100": "#9b9ece",
      "gray-400" : "#9b9ece",
      "gray-500": "#9b9ece",
      "primary-100": "#fefae0",
      "primary-300": "#473bf0",
      "primary-500": "#6665dd",
      "secondary-400": "#9b9ece",
      "secondary-500": "#473bf0",
    },
    backgroundImage: (theme) => ({
      "gradient-yellowred": "linear-gradient(90deg, #acadbc 0%, #473bf0 100%)",
      "mobile-home": "url('./assets/HomePageGraphic.png')",
    }),
    fontFamily: {
      dmsans: ["DM Sans", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    content: {
      evolvetext: "url('./assets/EvolveText.png')",
      abstractwaves: "url('./assets/AbstractWaves.png')",
      sparkles: "url('./assets/Sparkles.png')",
      circles: "url('./assets/Circles.png')",
    },
  },
  screens: {
    xs: "480px",
    sm: "768px",
    md: "1060px",
  },
};
export const plugins = [];
