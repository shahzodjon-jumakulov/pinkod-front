import { _aspectRatio } from "#tailwind-config/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1280px",
    },
    extend: {
      colors: {
        "dark-green": {
          100: "#01566D0A",
          200: "#01566D14",
          300: "#01566D29",
          400: "#01566D66",
          500: "#01566D99",
          600: "#01566DE0",
          main: "#01566D",
        },
        green: {
          100: "#019EAE0F",
          200: "#019EAE14",
          300: "#019EAE29",
          400: "#019EAE66",
          500: "#019EAE99",
          600: "#019EAEE0",
          main: "#019EAE",
        },
        black: {
          100: "#0000000A",
          200: "#00000014",
          300: "#0000001F",
          400: "#00000066",
          500: "#00000099",
          600: "#000000E0",
          main: "#000000",
        },
        white: {
          100: "#FFFFFF0F",
          200: "#FFFFFF1F",
          300: "#FFFFFF2E",
          400: "#FFFFFF66",
          500: "#FFFFFFA3",
          600: "#FFFFFFE0",
          main: "#FFFFFF",
        },
      },
      lineHeight: {
        normal: "normal",
        140: "1.4",
      },
      fontFamily: {},
      aspectRatio: {
        video: "16/9",
        square: "1/1",
      },
    },
  },
  plugins: [],
};
