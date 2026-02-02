import { db } from "@/drizzle";
import { chat } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    const [created] = await db
      .insert(chat)
      .values({
        userId: session?.user.id || "",
        title: "New Chat",
        createdAt: new Date(),
      })
      .returning({ id: chat.id });

    return NextResponse.json({ id: created.id });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
