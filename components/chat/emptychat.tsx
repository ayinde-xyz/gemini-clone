import { ArrowDownCircleIcon } from "lucide-react";
import ToggleButton from "@/components/chat/togglebutton";

export const EmptyChat = () => {
  return (
    <>
      {" "}
      <ToggleButton />
      <>
        <p className="mt-10 text-center text-white">
          Type a prompt below in to get started!
        </p>
        <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
      </>
    </>
  );
};
