/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",       // primary dark background
        paper: "#F7F5F0",     // light-mode background
        signal: "var(--accent)",
        circuit: "#5EC8B8",   // muted teal secondary accent
        line: "#1E293B",      // hairline borders on dark
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};