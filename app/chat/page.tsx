import { auth } from "@/lib/auth";
import Chat from "@/components/chat/chat";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const ChatPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return notFound();
  }
  // console.log(session);
  return (
    <div className="flex flex-col overflow-hidden w-full h-screen">
      {/* Chat */}
      <Chat />
    </div>
  );
};

export default ChatPage;
