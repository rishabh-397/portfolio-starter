import { incrementStat } from "@/lib/messages";

export async function POST() {
  try {
    await incrementStat("resume_downloads");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false });
  }
}