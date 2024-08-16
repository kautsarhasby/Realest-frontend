/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Ubuntu: ["Ubuntu"],
        Urbanist: ["Urbanist"],
      },
    },
    backgroundImage: {
      mainbg: "url('/pic/Background.png')",
    },
  },
  plugins: [],
};
