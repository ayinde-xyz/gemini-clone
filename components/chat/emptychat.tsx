import { ArrowDownCircleIcon } from "lucide-react";

export const EmptyChat = () => {
  return (
    <>
      {" "}
      <p className="mt-10 text-center text-sm md:text-lg">
        Type a prompt below in to get started!
      </p>
      <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 animate-bounce" />
    </>
  );
};
