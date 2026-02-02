import { db } from "@/drizzle";
import { message } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const chatId = request.nextUrl.searchParams.get("chatId");

    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" });
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    const messages = await db
      .select()
      .from(message)
      .where(eq(message.chatId, chatId))
      .orderBy(desc(message.createdAt));

    return NextResponse.json(
      {
        messages,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Could not fetch messages." });
  }
}
