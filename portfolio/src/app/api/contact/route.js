import { addMessage } from "@/lib/messages";

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  addMessage({ name, email, message });

  return Response.json({ ok: true });
}