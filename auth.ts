import NextAuth from "next-auth";
import authOptions from "./authConfig";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminDb, auth as adminAuth } from "@/lib/firebase/firebaseAdmin";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  events: {
    async signIn({ user }) {
      await adminDb.collection("users").doc(user.id!).update({
        emailVerified: new Date(),
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      const userDoc = await adminAuth.getUserByEmail(user.email!);
      if (!user || !userDoc.emailVerified) {
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? "";
      }
      return session;
    },
    async jwt({ token }) {
      // if (user) {
      //   token.id = user.id;
      // }
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: FirestoreAdapter(adminDb),
  ...authOptions,
});
