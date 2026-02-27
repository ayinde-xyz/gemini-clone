import { ArrowDownCircleIcon } from "lucide-react";

interface EmptyChatProps {
  message?: string;
}

export const EmptyChat = ({ message }: EmptyChatProps) => {
  return (
    <>
      {" "}
      <p className="mt-10 text-center text-sm md:text-lg">
        {message ? message : "No messages yet. "}
      </p>
      <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 animate-bounce" />
    </>
  );
};
