"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { db } from "@/lib/firebase/firebase";

import { Message } from "@/typings";
import {
  ChatSchema,
  ChatSchemaType,
  FileSchema,
  FileSchemaType,
} from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { genkitResponse } from "@/actions/genkit";
import { uploadFile } from "@/actions/upload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModelSelection from "./modelselection";
import { Plus, SendIcon } from "lucide-react";
import toast from "react-hot-toast";
import { notFound } from "next/navigation";

type Props = {
  chatId: string;
};
const ChatInput = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<ChatSchemaType>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      prompt: "",
      model: "Gemini 1.5 Pro",
      file: undefined,
    },
  });
  if (!session) return notFound();

  const handleUpload = async (file: FileSchemaType) => {
    setLoading(true);
    const validatedFile = FileSchema.safeParse(file);
    if (validatedFile.error) {
      console.error(validatedFile.error.message);
      toast.error("Please ensure your file is less than 7MB");
      return null;
    }
    toast.loading("Uploading file...");

    const response = file ? await uploadFile(file) : undefined;
    if (response?.state === "ACTIVE") {
      toast.dismiss();
      toast.success("File uploaded successfully");
    } else {
      toast.error("Failed to upload file");
    }
    setLoading(false);
    return response;
  };

  const sendMessage = async (values: ChatSchemaType) => {
    try {
      setLoading(true);

      toast.loading("Sending message...");
      const { prompt, model, file } = values;
      console.log(values);

      // const response = file ? await uploadFile(file) : undefined;

      const input = prompt.trim();

      const message: Message = {
        text: input,
        createdAt: serverTimestamp(),
        role: "user",
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
          session?.user?.id!,
          "chats",
          chatId,
          "messages"
        ),
        message
      );

      const output = await genkitResponse(input, session, chatId, model, file);

      if (output) {
        toast.dismiss();
        toast.success("Message sent successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error} Failed to send message`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendMessage)}
        className="flex  w-full max-w-2xl mx-auto relative rounded-[16px] md:px-0 text-sm">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder={`Ask Gemini`}
                  disabled={!session}
                  {...field}
                  // onKeyDown={handleKeyDown}
                  className="px-8 mb-1.5 focus:outline-3 focus:outline-none focus:outline-blue-500 bg-muted text-base border-none placeholder:text-muted-foreground overflow-hidden rounded-2xl disabled:cursor-not-allowed disabled:text-gray-300"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem className="fixed translate-x-1/2 top-0 right-1/2 bg-slate-100  rounded-b-lg">
              <ModelSelection field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="rounded-full space-y-0 absolute top-0 left-0.5 h-fit">
              <FormControl>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={form.watch("model") === "Gemini 1.0 Pro"}>
                  <Plus size={14} />
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const uploadedResult = await handleUpload(
                          e.target.files[0]
                        );
                        field.onChange(uploadedResult);
                      }
                    }}
                    disabled={
                      !session ||
                      loading ||
                      form.watch("model") === "Gemini 1.0 Pro"
                    }
                    className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
                    tabIndex={-1}
                  />
                </Button>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"ghost"}
          size={"icon"}
          disabled={!session || loading}
          className="hover:opacity-50 font-bold p-1.5 absolute bottom-1 right-0  rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
          <SendIcon size={14} />
        </Button>
      </form>
    </Form>
  );
};

export default ChatInput;
