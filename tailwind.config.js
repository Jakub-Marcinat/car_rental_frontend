module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        corklasRed: "#FF0007",
        corklasYellow: "#FFD200",
        corklasBackground: "#0b0a0b",
        corklasCard: "#151515",
        yellowText: "#fdd724",
      },
      backgroundImage: {
        "hero-pattern": "url('/Logo Corklas karbon.webp')",
        "background-image": "url('/CORKLAS_ABSTRACT 1.webp')",
      },
      fontFamily: {
        aeonik: ["Aeonik", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
