import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const file = req.body || "";

  const fileName = req.headers.get("file-name");
  const contentType = req.headers.get("content-type") || "text/plain";

  const fileType = `.${contentType.split("/")[1]}`;
  const finalName = fileName?.includes(fileType)
    ? fileName
    : `${fileName}.${fileType}`;

  console.log(finalName);

  const blob = await put(finalName, file, { contentType, access: "public" });

  return NextResponse.json(blob);
}
