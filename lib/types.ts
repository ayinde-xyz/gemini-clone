import type { UIMessage } from "ai";
import { z } from "zod";

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

export type CustomUIDataTypes = {
  textDelta: string;
  imageDelta: string;
  sheetDelta: string;
  codeDelta: string;

  appendMessage: string;
  id: string;
  title: string;

  clear: null;
  finish: null;
  "chat-title": string;
};

export type ChatTools = {
  getWeather: (location: string) => Promise<string>;
  getNews: (topic: string) => Promise<string>;
  searchWeb: (query: string) => Promise<string>;
}

export type ChatMessage = UIMessage<CustomUIDataTypes, ChatTools>;
