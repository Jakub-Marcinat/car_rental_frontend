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
        corklasYellow: "#F8CD02",
        corklasBackground: "#0b0a0b",
        corklasCard: "#151515",
        yellowText: "#F8CD02",
      },
      backgroundImage: {
        "hero-pattern": "url('/CORKLAS LOGO WHITE ON BLACK.png')",
      },
      fontFamily: {
        aeonik: ["Aeonik", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
