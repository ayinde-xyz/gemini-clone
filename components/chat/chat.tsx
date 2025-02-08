import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Message from "@/components/chat/message";
import ToggleButton from "@/components/chat/togglebutton";
import { EmptyChat } from "@/components/chat/emptychat";

import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

type Props = {
  chatId?: string;
};
const Chat = async ({ chatId }: Props) => {
  // const { data: session } = useSession();
  const session = await auth();
  // console.log(session);

  if (!chatId)
    return (
      <div className="flex-1 overflew-y-auto overflow-x-hidden">
        <EmptyChat />
      </div>
    );
  const messages = await getDocs(
    query(
      collection(db, "users", session?.user?.id!, "chats", chatId!, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <ToggleButton />
      {messages?.empty && (
        <>
          <p className="mt-10 text-center">
            Type a prompt below in to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 animate-bounce" />
        </>
      )}
      <div className={cn("flex flex-col", messages?.empty && "hidden")}>
        {messages?.docs.map((message) => (
          <Message key={message.id} message={message.data()} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
