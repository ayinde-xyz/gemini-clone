import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID1!,
      clientSecret: process.env.GOOGLE_SECRET_KEY1!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (userCredential) {
            const user = {
              id: userCredential.user.uid,
              name: userCredential.user.displayName,
              email: userCredential.user.email,
            };

            console.log("User", user);
            return user;
          } else {
            return null;
          }
        }

        return null;
      },
    }),
    // ...add more providers here
  ],
} satisfies NextAuthConfig;
