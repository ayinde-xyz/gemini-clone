import { openai } from "@/lib/chatgpt";
import { NextResponse } from "next/server";

export async function GET() {
  const models = await openai.models.list().then((res) => res.data);
  // console.log(models);

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  return NextResponse.json({ modelOptions }, { status: 200 });

  // return res.status(200).json({ modelOptions });
}
