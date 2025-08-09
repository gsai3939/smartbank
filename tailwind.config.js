/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        smartbank: {
          blue: "#1E40AF",
          lightBlue: "#3B82F6",
          green: "#10B981",
          red: "#EF4444",
          yellow: "#F59E0B",
        }
      }
    },
  },
  plugins: [],
}
