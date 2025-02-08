"use server";

import { auth } from "@/lib/firebase/firebase";
import { ResetSchemaType } from "@/schemas";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";

export const reset = async (values: ResetSchemaType) => {
  const { email } = values;
  try {
    await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/auth/login",
    });
    return { success: "Kindly check your email for password reset link" };
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          return { error: "User not found" };
        case "auth/invalid-email":
          return { error: "Invalid email" };
        default:
          return { error: "Something went wrong, Please try again" };
      }
    }
  }
};
