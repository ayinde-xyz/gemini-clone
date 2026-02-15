"use server";
import { Session } from "@/lib/auth-client";
import { FileMetadataResponse } from "@google/generative-ai/server";
import { revalidatePath } from "next/cache";
import { ModelType } from "@/schemas";
import * as z from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const ai = genkit({
//   plugins: [googleAI()],
// });

export const aiResponse = async (
  input: string,
  // session?: Session,
  model: string,
  // model?: ModelType,
  // response?: FileMetadataResponse | undefined,
) => {
  const modelRes = new ChatGoogleGenerativeAI({
    model,
    maxOutputTokens: 2048,
  });

  const response = await modelRes.invoke([["human", input]]);

  console.log("AI Response:", response.content);

  // const baseUrl =
  //   process.env.NEXT_PUBLIC_BASE_URL ||
  //   process.env.NEXTAUTH_URL ||
  //   `http://localhost:${process.env.PORT || 3000}`;

  // revalidatePath(`/api/chats/${chatId}`);
  return response.content;
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
