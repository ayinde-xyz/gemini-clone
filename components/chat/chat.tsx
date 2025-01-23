"use client";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import Message from "@/components/chat/message";
import ToggleButton from "@/components/chat/togglebutton";
import { EmptyChat } from "@/components/chat/emptychat";

type Props = {
  chatId?: string;
};
const Chat = ({ chatId }: Props) => {
  const { data: session } = useSession();

  if (!chatId)
    return (
      <div className="flex-1 overflew-y-auto overflow-x-hidden">
        <EmptyChat />
      </div>
    );
  const [messages] = useCollection(
    query(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId!,
        "messages"
      ),
      orderBy("createdAt", "asc")
    )
  );

  return (
    <div className="flex-1 overflew-y-auto overflow-x-hidden">
      <ToggleButton />
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt below in to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
};

export default Chat;
