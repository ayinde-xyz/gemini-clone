import { db } from "@/drizzle";
import { message } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    const body = await request.json();

    const { chatId, prompt, role } = body;

    await db
      .insert(message)
      .values({
        parts: prompt,
        chatId,
        attachments: [],
        role,
        createdAt: new Date(),
      })
      .returning({
        id: message.id,
      });

    //  console.log(response);

    revalidatePath("/chat/[id]", "layout");
    return NextResponse.json("Message sent successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Message not sent successfully" });
  }
}
