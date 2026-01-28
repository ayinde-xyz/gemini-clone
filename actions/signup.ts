"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { SignupSchema } from "@/schemas";
import { APIError } from "better-auth";
import z from "zod";

export async function signupEmailAction(
  data: z.infer<typeof SignupSchema>,
) {
  console.log(data)
  const { name, email, password } = data;
  
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true
    });

    console.log(response.status)

    return { success: "Sign Up successful" };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again." };
        default:
          return { error: err.message };
      }
    }

    return { error: "Internal Server Error" };
  }
}
