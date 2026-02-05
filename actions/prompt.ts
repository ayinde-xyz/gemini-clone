"use server";
import { genkit, z } from "genkit";
import {
  gemini10Pro,
  gemini15Flash,
  gemini15Flash8b,
  gemini15Pro,
  gemini20Flash,
  googleAI,
} from "@genkit-ai/googleai";
import { Message, MessageHistory } from "@/typings";
import admin from "firebase-admin";
import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { Session } from "@/lib/auth-client";
import { FileMetadataResponse } from "@google/generative-ai/server";
import { revalidatePath } from "next/cache";
import { ModelType } from "@/schemas";
import { createAgent, tool } from "langchain";
import * as z from "zod";

// const ai = genkit({
//   plugins: [googleAI()],
// });

const modelEngines = {
  "Gemini 1.0 Pro": gemini10Pro,
  "Gemini 1.5 Pro": gemini15Pro,
  "Gemini 1.5 Flash": gemini15Flash,
  "Gemini 1.5 Flash-8b": gemini15Flash8b,
  "Gemini 2.0 Flash-Experimental": gemini20Flash,
};

export const genkitResponse = async (
  prompt: string,
  session: Session,
  chatId: string,
  model: ModelType,
  response: FileMetadataResponse | undefined,
) => {
  
  const getWeather = tool((input) => `It's always sunny in ${input.city}!`, {
    name: "get_weather",
    description: "Get the weather for a given city",
    schema: z.object({
      city: z.string().describe("The city to get the weather for"),
    }),
  });

  const agent = createAgent({
    model: "claude-sonnet-4-5-20250929",
    tools: [getWeather],
  });

  console.log(
    await agent.invoke({
      messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
    }),
  );
};

// const messageHistory: MessageHistory[] = [];
// const messages = await getDocs(
//   query(
//     collection(db, "users", session?.user?.id!, "chats", chatId!, "messages"),
//     orderBy("createdAt", "asc"),
//     limitToLast(10),
//   ),
// );
// messages.forEach((doc) => {
//   messageHistory.push({
//     role: doc.data().role,
//     content: [{ text: doc.data().text }],
//   });
// });
// const promptFlow = ai.defineFlow(
//   {
//     name: "promptFlow",
//     inputSchema: z.string(),
//     outputSchema: z.string(),
//   },
//   async (request, streamingCallback) => {
//     const { text } = await ai.generate({
//       messages: messageHistory,
//       model: modelEngines[model],
//       streamingCallback,
//       prompt:
//         response !== undefined
//           ? [
//               {
//                 text: request,
//               },
//               {
//                 media: { contentType: response.mimeType, url: response.uri },
//               },
//             ]
//           : request,
//     });
//     return text;
//   },
// );
// const { output } = promptFlow.stream(prompt);
// const finalOutput = await output;
// const message: Message = {
//   text: finalOutput || "Chat GPT was unable to find an answer",
//   createdAt: admin.firestore.FieldValue.serverTimestamp(),
//   role: "model",
//   user: {
//     _id: model,
//     name: "Gemini",
//     avatar: "https://links.papareact.com/89k",
//   },
// };
// await adminDb
//   .collection("users")
//   .doc(session?.user?.id!)
//   .collection("chats")
//   .doc(chatId)
//   .collection("messages")
//   .add(message);
// revalidatePath(`/api/chats/${chatId}`);
// return { finalOutput };
