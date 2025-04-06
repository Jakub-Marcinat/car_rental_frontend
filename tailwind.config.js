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
        corklasYellow: "#FFFA00",
        corklasBackground: "#0b0a0b",
        corklasCard: "#151515",
        yellowText: "#fffa60",
      },
      backgroundImage: {
        "hero-pattern": "url('/Etron.png')",
      },
      fontFamily: {
        aeonik: ["Aeonik", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
