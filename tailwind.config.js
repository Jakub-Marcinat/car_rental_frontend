module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        corklasRed: "#E63946",
      },
      backgroundImage: {
        "hero-pattern": "url('/sadsad.png')",
      },
    },
  },
  plugins: [],
};
