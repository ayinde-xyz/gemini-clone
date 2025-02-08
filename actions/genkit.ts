"use server";
import { genkit, z } from "genkit";
import {
  gemini10Pro,
  gemini15Flash,
  gemini15Flash8b,
  gemini15Pro,
  gemini20FlashExp,
  googleAI,
} from "@genkit-ai/googleai";
import { Message, MessageHistory } from "@/typings";
import admin from "firebase-admin";
import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { Session } from "next-auth";
import { FileMetadataResponse } from "@google/generative-ai/server";
import { revalidatePath } from "next/cache";
import {
  collection,
  getDocs,
  limitToLast,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { ModelType } from "@/schemas";

const ai = genkit({
  plugins: [googleAI()],
});

const modelEngines = {
  "Gemini 1.0 Pro": gemini10Pro,
  "Gemini 1.5 Pro": gemini15Pro,
  "Gemini 1.5 Flash": gemini15Flash,
  "Gemini 1.5 Flash-8b": gemini15Flash8b,
  "Gemini 2.0 Flash-Experimental": gemini20FlashExp,
};

export const genkitResponse = async (
  prompt: string,
  session: Session | null,
  chatId: string,
  model: ModelType,
  response: FileMetadataResponse | undefined
) => {
  const messageHistory: MessageHistory[] = [];
  const messages = await getDocs(
    query(
      collection(db, "users", session?.user?.id!, "chats", chatId!, "messages"),
      orderBy("createdAt", "asc"),
      limitToLast(10)
    )
  );

  messages.forEach((doc) => {
    messageHistory.push({
      role: doc.data().role,
      content: [{ text: doc.data().text }],
    });
  });
  const promptFlow = ai.defineFlow(
    {
      name: "promptFlow",
      inputSchema: z.string(),
      outputSchema: z.string(),
    },
    async (request, streamingCallback) => {
      const { text } = await ai.generate({
        messages: messageHistory,
        model: modelEngines[model],
        streamingCallback,
        prompt:
          response !== undefined
            ? [
                {
                  text: request,
                },
                {
                  media: { contentType: response.mimeType, url: response.uri },
                },
              ]
            : request,
      });
      return text;
    }
  );

  const { output } = promptFlow.stream(prompt);

  const finalOutput = await output;

  const message: Message = {
    text: finalOutput || "Chat GPT was unable to find an answer",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    role: "model",
    user: {
      _id: model,
      name: "Gemini",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.id!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  revalidatePath(`/api/chats/${chatId}`);

  return { finalOutput };
};
