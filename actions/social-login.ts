"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const onClick = async (provider: "google" | "github" | "facebook") => {
  try {
    await signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    console.log("error", error);
  }
};
