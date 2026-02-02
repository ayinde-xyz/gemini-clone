import { Message } from "@/drizzle/schema";
import { UIMessagePart } from "ai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatISO } from "date-fns";
import { ChatMessage } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToUIMessages(messages: Message[]) {
  return messages.map((message) => ({
    id: message.id,
    role: message.role as "user" | "assistant" | "system",
    parts: message.parts as string,
    metadata: {
      createdAt: formatISO(message.createdAt),
    },
  }));
}
