/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      fontOne: ["Montserrat", "sans-serif"],
      fontTwo: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        navColor: "#E1D8BF",
        bgImgColor: "#484848",
        textColor: "#11100B",
        textColorSec: "#EAE3D1",
        textColorThree: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
