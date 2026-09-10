// Navy, ivory and brass: shared tokens keep every service page on brand.
const primary = {
  50: "#F1F5F6", 100: "#E4ECEF", 200: "#C7D5DA", 300: "#98B0BA",
  400: "#628391", 500: "#345B6C", DEFAULT: "#345B6C", 600: "#294B5C",
  700: "#213F50", 800: "#1B3545", 900: "#142D3B", 950: "#0C1E29",
};
const secondary = {
  50: "#FBF7EE", 100: "#F2E8D5", 200: "#E6D7B4", 300: "#CFB77F",
  400: "#B18C50", 500: "#8F632C", DEFAULT: "#8F632C", 600: "#775020",
  700: "#5E401E", 800: "#48331C", 900: "#352719", 950: "#231A10",
};
const accent = {
  50: "#F0F6F3", 100: "#DFEEE6", 200: "#BCD8C9", 300: "#8FBCA7",
  400: "#548E77", 500: "#286B5A", DEFAULT: "#286B5A", 600: "#205748",
  700: "#194637", 800: "#163A30", 900: "#123027", 950: "#0B201A",
};
const neutral = {
  50: "#FAF8F4", 100: "#F1EEE7", 200: "#E5E2D9", 300: "#C9C8C0",
  400: "#949B9C", 500: "#647278", 600: "#4B5C64", 700: "#374D58",
  800: "#233C49", 900: "#142D3B", 950: "#0C1E29",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { serif: ["Merriweather", "serif"] },
      colors: {
        primary, secondary, accent, neutral,
        // Legacy utilities share the palette; semantic error red stays red.
        sky: primary, blue: primary, indigo: primary,
        lime: accent, green: accent, emerald: accent, teal: accent,
        yellow: secondary, orange: secondary, amber: secondary,
        slate: neutral, gray: neutral, zinc: neutral, stone: neutral,
        accent2: accent.DEFAULT, card: "#ffffff",
      },
      boxShadow: { soft: "0 8px 30px rgba(20,45,59,0.06)" },
    },
  },
  plugins: [],
};
