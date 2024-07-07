import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, database } from "./firebase";
import { ref, set } from "firebase/database";

export const doCreateUserWithEmailAndPassword = async (
  name,
  email,
  password,
  access,
  setErrorHandler
) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Add user to Firebase Realtime Database
    await set(ref(database, "users/" + user.uid), {
      name: name,
      email: email,
      access: access,
    });
    console.log("User created and data added to database successfully");
    return { success: true, user };
  } catch (error) {
    console.error("Error creating user and adding data to database:", error);
    setErrorHandler("User already exists. Please Log in.");
    return { success: false, message: error.message };
  }
};

export const doSignInWithEmailAndPassword = async (
  email,
  password,
  setErrorHandler
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return { success: true, user };
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    setErrorHandler("Invalid email or password. Please try again.");
    return { success: false, message: error.message };
  }
};

export const doSignOut = () => {
  return signOut(auth);
};
