import { ChevronRightIcon } from "lucide-react";
import ToggleButton from "./togglebutton";
import { Message } from "@/drizzle/schema";

interface ChatHeaderProps {
  messages?: Message[];
}

const ChatHeader = ({ messages }: ChatHeaderProps) => {
  return (
    <div className="w-full h-10 border-b space-x-2 border-gray-300 flex items-center">
      <ToggleButton />
      <ChevronRightIcon />
      <h1 className="text-slate-800">{messages ? messages[0]?.content : "New Chat"} </h1>
    </div>
  );
};

export default ChatHeader;
