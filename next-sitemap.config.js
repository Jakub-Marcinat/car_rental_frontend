/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://pozicovnaaut.sk/",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/cart",
    "/api/*",
    "/prihlasenie",
    "/registracia",
    "/thank-you",
    "/dashboard/*",
    "/rezervacia",
  ],
  transform: async (config, path) => {
    // Customize priorities per path
    const priorityMap = {
      "/": 1.0,
      "/ponuka-vozidiel": 0.9,
      "/o-nas": 0.5,
      "/FAQ": 0.5,
      "/product/Audi%20RS6%20Combi": 0.8,
      "/product/Audi%20TT%20RS%20Coupé": 0.8,
      "/product/Audi%20S3%20Quattro": 0.8,
    };

    return {
      loc: path,
      changefreq: "weekly",
      priority: priorityMap[path] || 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
