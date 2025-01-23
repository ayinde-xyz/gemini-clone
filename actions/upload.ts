"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function uploadFile(file: File) {
  // const file = formData.get("file") as File;
  const filename = file.name;

  if (!file) {
    return { error: "File is required" };
  }

  try {
    const { url } = await put(filename, file, { access: "public" });

    revalidatePath("/");
    return { url };
  } catch (error) {
    return { error: "Error uploading file" };
  }
}
