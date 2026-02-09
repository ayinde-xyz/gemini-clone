"use client";
import { useSession } from "@/lib/auth-client";
import { useRef, useState } from "react";
import {
  ChatSchema,
  ChatSchemaType,
  FileSchema,
  FileSchemaType,
} from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiResponse } from "@/actions/prompt";
import { uploadFile } from "@/actions/upload";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperclipIcon, SendIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Field, FieldGroup, FieldSet } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import ModelSelection from "./modelselection";

type Props = {
  chatId: string;
};
const ChatInput = ({ chatId }: Props) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const form = useForm<ChatSchemaType>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      prompt: "",
      model: "Gemini 1.5 Pro",
      file: undefined,
    },
  });

  const handleUpload = async (file: FileSchemaType) => {
    setLoading(true);
    const validatedFile = FileSchema.safeParse(file);
    if (validatedFile.error) {
      console.error(validatedFile.error.message);
      toast.error("Please ensure your file is less than 6MB");
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

      await axios.post("/api/chat/addMessage", {
        chatId,
        prompt,
        role: "user",
      });

      const response = await aiResponse(prompt, chatId);

      await axios.post("/api/chat/addMessage", {
        chatId,
        prompt: response,
        role: "model",
      });

      router.refresh();

      // const input = prompt.trim();

      // const message: Message = {
      //   text: input,
      //   createdAt: serverTimestamp(),
      //   role: "user",
      //   user: {
      //     _id: session?.user?.email!,
      //     name: session?.user?.name!,
      //     avatar:
      //       session?.user?.image! ||
      //       `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      //   },
      // };

      // await addDoc(
      //   collection(
      //     db,
      //     "users",
      //     session?.user?.id!,
      //     "chats",
      //     chatId,
      //     "messages",
      //   ),
      //   message,
      // );

      // const output = await genkitResponse(input, session, chatId, model, file);

      // if (output) {
      //   toast.dismiss();
      //   toast.success("Message sent successfully");
      // }
    } catch (error) {
      console.error(error);
      toast.error(`${error} Failed to send message`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(sendMessage)}
      className="relative bg-transparent w-full max-w-2xl mx-auto  rounded-2xl  text-sm">
      <FieldGroup>
        <Controller
          control={form.control}
          name="prompt"
          render={({ field, fieldState }) => (
            <Field className=" max-w-2xl bg-slate-200 rounded-2xl p-3">
              <InputGroup className="h-auto ">
                <InputGroupTextarea
                  disabled={loading}
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="block-end-input"
                  placeholder="Ask Gemini"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length}/100 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="model"
          render={({ field, fieldState }) => (
            <FieldSet className="absolute bottom-1 right-18 w-6 rounded-b-lg">
              <ModelSelection field={field} fieldState={fieldState} />
            </FieldSet>
          )}
        />
        <Controller
          control={form.control}
          name="file"
          render={({ field }) => (
            <Field className="rounded-full space-y-0 absolute bottom-1 right-10 w-4 h-fit">
              <Button
                variant={"ghost"}
                size={"icon"}
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={form.watch("model") === "Gemini 1.0 Pro"}>
                <PaperclipIcon size={14} />
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const uploadedResult = await handleUpload(
                        e.target.files[0],
                      );
                      field.onChange(uploadedResult);
                    }
                  }}
                  disabled={loading || form.watch("model") === "Gemini 1.0 Pro"}
                  className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
                  tabIndex={-1}
                />
              </Button>
            </Field>
          )}
        />
        <Button
          type="submit"
          variant={"ghost"}
          size={"icon"}
          disabled={loading}
          className="hover:opacity-50 font-bold p-1.5 absolute bottom-1 right-0  rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
          <SendIcon size={14} />
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ChatInput;
