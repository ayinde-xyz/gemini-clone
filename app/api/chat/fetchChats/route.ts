import { getChats } from "@/actions/newchat";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return notFound();
    }
    const chats = await getChats(session);
    console.log("API CHATs:", chats);
    return NextResponse.json(chats || []);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
