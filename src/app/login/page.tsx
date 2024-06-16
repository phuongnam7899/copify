"use client";

import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, authProvider } from "@/libs/firebase";
import { useEffect } from "react";

export default function Main() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const signInResult = await signInWithPopup(auth, authProvider);
      const credential = GoogleAuthProvider.credentialFromResult(signInResult);
      const token = credential && credential.accessToken;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "phuongnam7899@gmail.com") {
        router.replace("/");
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <form
    // onSubmit={(e) => {
    //   e.preventDefault();
    //   document.cookie = `pw=${password}`;
    //   console.log("password set");
    //   router.replace("/");
    // }}
    >
      {/* <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      /> */}
      <button type="button" onClick={signInWithGoogle}>
        Login With Google
      </button>
    </form>
  );
}
