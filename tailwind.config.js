/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00b894", // Medical Green
        secondary: "#0984e3", // Medical Blue
        bg: "#f5f6fa",
        surface: "#ffffff",
      },
    },
  },
  plugins: [],
}
