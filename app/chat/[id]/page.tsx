import Chat from "@/components/chat/chat";
import ChatInput from "@/components/chat/chatinput";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const ChatPage = async ({ params }: Props) => {
  const { id } = await params;

  // console.log(session);
  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
};

export default ChatPage;
