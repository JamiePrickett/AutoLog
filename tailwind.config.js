/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        GeologicaBlack: ["Geologica-Black", "sans-serif"],
        GeologicaBold: ["Geologica-Bold", "sans-serif"],
        GeologicaExtraBold: ["Geologica-ExtraBold", "sans-serif"],
        GeologicaExtraLight: ["Geologica-ExtraLight", "sans-serif"],
        GeologicaLight: ["Geologica-Light", "sans-serif"],
        Geologica: ["Geologica", "sans-serif"],
        GeologicaSemiBold: ["Geologica-SemiBold", "sans-serif"],
        GeologicaThin: ["Geologica-Thin", "sans-serif"],
      },
      colors: {
        bg: {
          100: "#060606",
          200: "#36281E",
        },
        dark: {
          100: "#000000",
          200: "#201913",
          300: "#302A24",
        },
        light: {
          100: "#F5F5F5",
          200: "#D9D9D9",
        },
        primary: {
          100: "#EF4336",
          150: "#A9423A",
          200: "#F4743A",
          250: "#AC603D",
          300: "#FBAF40",
          350: "#A57735",
        },
      },
    },
  },
  plugins: [],
};
