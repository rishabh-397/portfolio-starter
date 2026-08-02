export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: "https://rishabh-portfolio.vercel.app/sitemap.xml", // update after you deploy
  };
}