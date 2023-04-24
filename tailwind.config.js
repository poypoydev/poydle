/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#030206",
        border: "#666666",
      },
      width: {
        52: "52px",
      },
      height: {
        52: "52px",
      },
    },
  },
  plugins: [],
};
