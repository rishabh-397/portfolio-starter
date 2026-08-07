import { getStatsWithPrefix } from "@/lib/messages";

export async function GET() {
  try {
    const stats = await getStatsWithPrefix("project_click_");
    return Response.json({ stats });
  } catch {
    return Response.json({ stats: [] });
  }
}