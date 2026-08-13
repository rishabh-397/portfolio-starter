import { addSubscriber } from "@/lib/messages";
import { z } from "zod";

const emailSchema = z.string().trim().email();

export async function POST(req) {
  try {
    const { email } = await req.json();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }
    await addSubscriber(parsed.data);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}