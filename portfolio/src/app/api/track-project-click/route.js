import { incrementStat } from "@/lib/messages";

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export async function POST(req) {
  try {
    const { title } = await req.json();
    if (!title) return Response.json({ ok: false }, { status: 400 });
    await incrementStat(`project_click_${slugify(title)}`);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false });
  }
}