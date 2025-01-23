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
import { Message } from "@/typings";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";
import { Session } from "next-auth";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const ai = genkit({
  plugins: [googleAI()],
});

const fileManager = new GoogleAIFileManager(process.env.GOOGLE_GENAI_API_KEY!);
export const uploadFile = async (file: string) => {
  console.log("Uploading file", file);
  const uploadResult = await fileManager.uploadFile(file, {
    mimeType: "application/pdf",
    displayName: "A random file",
  });

  return uploadResult.file.uri;
};

const modelEngines = [
  gemini15Pro,
  gemini15Flash,
  gemini15Flash8b,
  gemini20FlashExp,
];

export const genkitResponse = async (
  prompt: string,
  session: Session | null,
  chatId: string,
  model: string
) => {
  const menuSuggestionFlow = ai.defineStreamingFlow(
    {
      name: "menuSuggestionFlow",
      inputSchema: z.string(),
      outputSchema: z.string(),
    },
    async (restaurantTheme, streamingCallback) => {
      const { text } = await ai.generate({
        model: modelEngines[Number(model)],
        streamingCallback,
        prompt: restaurantTheme,
      });
      return text;
    }
  );

  const { output, stream } = await menuSuggestionFlow(prompt);

  // for await (const chunk of stream) {
  //   console.log("Each of the answers", chunk);
  // }

  const finalOutput = await output;

  const message: Message = {
    text: finalOutput || "Chat GPT was unable to find an answer",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  return { finalOutput };
};
