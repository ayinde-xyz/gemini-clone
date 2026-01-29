"use client";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useSession } from "@/lib/auth-client";
import { db } from "@/drizzle";
import { chat, message } from "@/drizzle/schema";
import { asc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  // const [messages] = useCollection(
  //   collection(db, "users", session?.user?.id!, "chats", id, "messages")
  // );

  // const [messages] = db
  //   .select()
  //   .from(message)
  //   .where(eq(message.chatId, id))
  //   .orderBy(asc(message.createdAt));

  // const active = pathname.includes(id);

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    // await deleteDoc(doc(db, "users", session?.user?.id!, "chats", id));
    // router.push("/chat");
    await db.delete(message).where(eq(message.chatId, id));
    await db.delete(chat).where(eq(chat.id, id));
    router.push("/chat");
  };
  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}>
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 inline-flex truncate">
        {/* {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"} */}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
};

export default ChatRow;
