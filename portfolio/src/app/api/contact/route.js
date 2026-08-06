import { addMessage } from "@/lib/messages";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.errors[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }
  const { name, email, message } = parsed.data;

  await addMessage({ name, email, message });

  if (resend && process.env.ADMIN_EMAIL) {
    try {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: `New portfolio message from ${name}`,
        text: `From: ${name} (${email})\n\n${message}`,
      });
    } catch (err) {
      console.error("Failed to send notification email:", err);
    }
  }

  return Response.json({ ok: true });
}