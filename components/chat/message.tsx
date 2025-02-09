import { DocumentData } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CopyButton from "./copybutton";

type Props = {
  message: DocumentData;
};

const Message = ({ message }: Props) => {
  const isGemini = message.role === "model";

  return (
    <div className={`py-5 flex ${isGemini ? "justify-end" : "justify-start"}`}>
      <div className="flex space-x-5 md:px-10 px-4 max-w-2xl">
        <Avatar>
          <AvatarImage src={message.user.avatar} />
          <AvatarFallback>{message.user.name[0]}</AvatarFallback>
        </Avatar>
        <div
          className={`p-3 text-sm whitespace-pre-wrap rounded-2xl bg-slate-300 ${
            isGemini &&
            "order-first bg-linear-to-bl  from-sky-500 to-indigo-500"
          }`}>
          <p>{message.text}</p>
          {isGemini && <CopyButton text={message.text} />}
        </div>
      </div>
    </div>
  );
};

export default Message;
