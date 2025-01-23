import { NextRequest, NextResponse } from "next/server";
import { genkit, z } from "genkit";
import { gemini15Flash, googleAI } from "@genkit-ai/googleai";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { prompt } = body;
  console.log(prompt);

  //   const ai = genkit({
  //     plugins: [googleAI()],
  //   });

  //   const menuSuggestionFlow = ai.defineFlow(
  //     {
  //       name: "menuSuggestionFlow",
  //       inputSchema: z.string(),
  //       outputSchema: z.string(),
  //     },
  //     async (restaurantTheme) => {
  //       const { text } = await ai.generate({
  //         model: gemini15Flash,

  //         prompt: restaurantTheme,
  //       });
  //       return text;
  //     }
  //   );

  //   const encoder = new TextEncoder();
  //   const streamResponse = new ReadableStream({
  //     async start(controller) {
  //       for (const chunk of response) {
  //         // @ts-ignore
  //         const text = chunk.text();
  //         controller.enqueue(encoder.encode(text));
  //       }
  //       controller.close();
  //     },
  //     cancel() {
  //       console.log("Stream cancelled by the client");
  //     },
  //   });

  //   console.log("Responding from api endpoint", response);

  //   return NextResponse.json(streamResponse, {
  //     headers: {
  //       "Content-Type": "text/plain",
  //       "Cache-Control": "no-cache",
  //       Connection: "keep-alive",
  //     },
  //   });
}
