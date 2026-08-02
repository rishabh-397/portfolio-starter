import { addMessage } from "@/lib/messages";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

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