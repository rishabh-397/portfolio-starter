const GITHUB_USERNAME = "rishabh-397";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
      { next: { revalidate: 3600 } } // cache for 1 hour, shared across all visitors
    );

    if (!res.ok) {
      return Response.json({ error: "GitHub API error" }, { status: 502 });
    }

    const data = await res.json();
    const top = [...data]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        stargazers_count: r.stargazers_count,
      }));

    return Response.json({ repos: top });
  } catch (err) {
    return Response.json({ error: "Failed to fetch repos" }, { status: 500 });
  }
}