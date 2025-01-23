import { auth } from "@/auth";
import Chat from "@/components/chat/chat";

const ChatPage = async () => {
  const session = await auth();

  if (!session) {
    return null;
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
