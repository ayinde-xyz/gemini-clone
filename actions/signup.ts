"use server";
import { auth, db } from "@/lib/firebase/firebase";
import { SignupSchema, SignupSchemaType } from "@/schemas";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const signup = async (values: SignupSchemaType) => {
  const validatedFields = SignupSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  try {
    const userExists = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );

    const userExistingEmail = userExists.docs.map((doc) => doc.data());

    if (userExistingEmail.length) {
      console.log("user already exists");
      return { error: "Email already in use" };
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: name,
    });
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email,
      name,
      emailVerified: null,
      image: null,
    });
    await sendEmailVerification(userCredential.user, {
      url: "http://localhost:3000/auth/login",
    });

    return { success: "Kindly check your email for verification" };
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return { error: "Email already in use" };
        default:
          return { error: "Something went wrong" };
      }
    }
  }
};
