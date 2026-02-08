import Message from "@/components/chat/message";
import ToggleButton from "@/components/chat/togglebutton";
import { EmptyChat } from "@/components/chat/emptychat";
import { cn } from "@/lib/utils";
import axios from "axios";
import useSWR from "swr";
import { Message as MessageType } from "@/drizzle/schema";
import { getMessagesByChatId } from "@/actions/newchat";

type Props = {
  chatId?: string;
};

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Chat = async ({ chatId }: Props) => {
  if (!chatId)
    return (
      <div className="flex-1 overflew-y-auto ">
        <ToggleButton />
        <EmptyChat />
      </div>
    );

  // const {
  //   data: messages,
  //   error,
  //   isLoading,
  // } = useSWR<MessageType[]>(
  //   `/api/chat/fetchMessages?chatId=${chatId}`,
  //   fetcher,
  // );

  const messages = await getMessagesByChatId(chatId);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <ToggleButton />
      {!messages?.length && <EmptyChat />}
      <div className={cn("flex flex-col", !messages?.length && "hidden")}>
        {messages &&
          messages.map((message: any) => (
            <Message key={message.id} message={message} />
          ))}
      </div>
    </div>
  );
};

export default Chat;
