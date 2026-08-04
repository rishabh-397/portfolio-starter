import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { readMessages, getStat } from "@/lib/messages";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [messages, resumeDownloads] = await Promise.all([
    readMessages(),
    getStat("resume_downloads"),
  ]);

  return Response.json({ messages, resumeDownloads });
}