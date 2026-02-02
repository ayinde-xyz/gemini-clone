import "server-only";
import { db } from "@/drizzle";
import { type Chat, chat } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { Session } from "@/lib/auth-client";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createNewChat = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signup");
  }

  const [created] = await db
    .insert(chat)
    .values({
      userId: session.user.id || "",
      title: "New Chat",
      createdAt: new Date(),
    })
    .returning({ id: chat.id });

  return created.id;
};

export const getChats = async (session: Session) => {
  return db
    .select()
    .from(chat)
    .where(eq(chat.userId, session.user?.id || ""));
};
