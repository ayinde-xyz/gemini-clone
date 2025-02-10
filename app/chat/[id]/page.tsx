import { auth } from "@/auth";
import Chat from "@/components/chat/chat";
import ChatInput from "@/components/chat/chatinput";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const ChatPage = async ({ params }: Props) => {
  const { id } = await params;
  const session = await auth();
  if (!session || !session.user) {
    return notFound();
  }

  return (
    <div className="flex flex-col">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
};

export default ChatPage;
