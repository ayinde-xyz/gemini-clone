import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Facebook from "next-auth/providers/facebook";
import Spotify from "next-auth/providers/spotify";
import Linkedin from "next-auth/providers/linkedin";
import Instagram from "next-auth/providers/instagram";
import Tiktok from "next-auth/providers/tiktok";

export default {
  providers: [
    Google,
    Facebook,
    Spotify,
    Linkedin,
    Instagram,
    Tiktok,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        // console.log("Validated Fields", validatedFields);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          try {
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

              // console.log("User", user);
              return user;
            } else {
              return null;
            }
          } catch (error: any) {
            if (
              error.code === "auth/user-not-found" ||
              error.code === "auth/wrong-password"
            ) {
              return null;
            }
          }
        }

        return null;
      },
    }),
    // ...add more providers here
  ],
} satisfies NextAuthConfig;
