"use server";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/chat" });
    return { success: "Logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        case "AccessDenied":
          return { error: "Access Denied" };
        case "EmailSignInError":
          return {
            error: "There was an email sign in error, Please try again",
          };
        default:
          return {
            error: "Something went wrong, Please try again",
          };
      }
    }

    throw error;
  }
};
