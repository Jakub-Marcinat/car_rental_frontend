module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        corklasRed: "#D70006",
        corklasYellow: "#FAAC05",
        corklasBackground: "#0b0a0b",
      },
      backgroundImage: {
        "hero-pattern": "url('/sadsad.png')",
      },
    },
  },
  plugins: [],
};
