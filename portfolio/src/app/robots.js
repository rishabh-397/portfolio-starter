export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: "https://portfolio-website-ruddy-six-25.vercel.app/sitemap.xml",
  };
}