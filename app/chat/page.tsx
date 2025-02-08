import { auth } from "@/auth";
import Chat from "@/components/chat/chat";
import { notFound } from "next/navigation";

const ChatPage = async () => {
  const session = await auth();

  if (!session || !session.user) {  
    return notFound();
  }
  // console.log(session);
  return (
    <div className="flex flex-col overflow-hidden h-screen">
      {/* Chat */}
      <Chat />
    </div>
  );
};

export default ChatPage;
