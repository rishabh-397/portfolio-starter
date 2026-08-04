export default function manifest() {
  return {
    name: "Rishabh Chaturvedi — Software Engineer",
    short_name: "Rishabh Chaturvedi",
    description: "Portfolio, projects, and resume of Rishabh Chaturvedi.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1220",
    theme_color: "#E8A33D",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}