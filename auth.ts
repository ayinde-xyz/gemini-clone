import NextAuth from "next-auth";
import authOptions from "./authConfig";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminDb } from "@/firebaseAdmin";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  events: {},
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async session({ session, user, token }) {
      // console.log("session", session, "user", user, "token", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        // session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  adapter: FirestoreAdapter(adminDb),
  ...authOptions,
});
