import { adminDb } from "@/lib/firebase/firebaseAdmin";

export const getUserById = async (id: string) => {
  try {
    const user = await adminDb.collection("users").doc(id).get();
    return user.data();
  } catch (error) {
    return null;
  }
};
