"use client";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { redirect } from "next/navigation";

// import { useSession } from "@/lib/auth-client";
import { db } from "@/drizzle";
import { Chat, chat, message } from "@/drizzle/schema";
import { asc, eq } from "drizzle-orm";
import { convertToUIMessages } from "@/lib/utils";
import axios from "axios";
// import { useEffect, useState } from "react";

type Props = {
  chat: Chat;
};

const ChatRow = ({ chat }: Props) => {
  // const pathname = usePathname();
  // const router = useRouter();
  // const { data: session } = useSession();
  // const [active, setActive] = useState(false);
  // const [messages] = useCollection(
  //   collection(db, "users", session?.user?.id!, "chats", id, "messages")
  // );

  // const messages = await db
  //   .select()
  //   .from(message)
  //   .where(eq(message.chatId, id))
  //   .orderBy(asc(message.createdAt));

  // const lastMessage = convertToUIMessages(messages);

  // const active = pathname.includes(id);

  // useEffect(() => {
  //   if (!pathname) return;
  //   setActive(pathname.includes(id));
  // }, [pathname]);

  const removeChat = async (chatId: string) => {
    await axios.delete(`/api/chat/deleteChat?chatId=${chatId}`);
    // redirect("/chat");
  };
  return (
    <Link
      href={`/chat/${chat.id}`}
      className={`chatRow justify-center ${"bg-gray-700/50"}`}>
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 inline-flex truncate">
        {/* {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"} */}
        {chat.title || "New Chat"}
      </p>
      <TrashIcon
        onClick={() => removeChat(chat.id)}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
};

export default ChatRow;
