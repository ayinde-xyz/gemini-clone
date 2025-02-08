"use server";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const fileManager = new GoogleAIFileManager(process.env.GOOGLE_GENAI_API_KEY!);

export const uploadFile = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  const unit8Array = new Uint8Array(buffer);

  const tempFilePath = join(tmpdir(), file.name);
  writeFileSync(tempFilePath, unit8Array);
  const uploadResult = await fileManager.uploadFile(tempFilePath, {
    mimeType: file.type,
    displayName: file.name,
  });
  return uploadResult.file;
};
