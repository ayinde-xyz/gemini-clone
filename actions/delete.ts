// "use server";
// import { db } from "@/lib/firebase/firebase";
// import { auth } from "@/lib/firebase/firebaseAdmin";
// import { deleteDoc, doc } from "firebase/firestore";

// export const deleteAccount = async (id: string) => {
//   try {
//     const userCredential = await auth.getUser(id);
//     console.log(userCredential);
//     if (userCredential) {
//       await auth.deleteUser(id);
//     }
//     await deleteDoc(doc(db, "users", id));
//     return { success: "Account deleted successfully" };
//   } catch (error) {
//     return { error: "Error deleting account" };
//   }
// };
