"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { db } from "@/firebase";
import useSWR from "swr";
import { Message } from "@/typings";
import { useForm } from "react-hook-form";
import { ChatSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { genkitResponse, uploadFile } from "@/actions/genkit";

import Chat from "./chat";
import ModelSelection from "./modelselection";
import { UploadIcon } from "lucide-react";
import { PutBlobResult } from "@vercel/blob";
// import { suggestionFlow } from "@/actions/genkit";

type Props = {
  chatId: string;
};
const ChatInput = ({ chatId }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  // console.log(session);
  // useSWR to get model
  // const model = "text-davinci-003"
  // const { data: model } = useSWR("model", {
  //   fallbackData: "text-davinci-003",
  // });

  const form = useForm<z.infer<typeof ChatSchema>>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      prompt: "",
      model: "",
    },
  });

  const sendMessage = async (values: z.infer<typeof ChatSchema>) => {
    try {
      setLoading(true);

      const { prompt, model, file } = values;
      console.log(file);

      const result = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "content-type": file[0].type || "application/octet-stream",
          "file-name": file[0].name || "file",
        },
        body: file[0],
      }).then(async (res) => {
        if (res.status === 200) {
          const { url } = (await res.json()) as PutBlobResult;

          return url;
        }
      });

      if (result) {
        const uploadedFile = await uploadFile(result);
        console.log("Uploaded file", uploadedFile);
      }

      // console.log("File result from blob", uri);

      const input = prompt.trim();

      const message: Message = {
        text: input,
        createdAt: serverTimestamp(),
        user: {
          _id: session?.user?.email!,
          name: session?.user?.name!,
          avatar:
            session?.user?.image! ||
            `https://ui-avatars.com/api/?name=${session?.user?.name}`,
        },
      };

      await addDoc(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        message
      );

      const { finalOutput } = await genkitResponse(
        prompt,
        session,
        chatId,
        model
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendMessage)}
          className="p-5 space-x-5 flex">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Type your message here"
                    // disabled={!session}
                    {...field}
                    className="focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <ModelSelection field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Upload a file"
                    // {...field}
                    onChange={(event) => {
                      field.onChange(event.target.files);
                    }}
                    // disabled={!session}
                    className="focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!session || loading}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
          </Button>
        </form>
      </Form>
      {/* <div className='md:hidden'>
            Modal Selection
            <ModelSelection/>
        </div> */}
    </div>
  );
};

export default ChatInput;
