"use client";

import React, { createContext, useEffect, useState } from "react";
import { auth } from "../store/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

type Props = {
  children: any;
};
type AuthContextType = {
  isSignin: boolean;
  setSignin: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Authcontext = createContext<AuthContextType | undefined>(
  undefined,
);

function AuthContextProvider({ children }: Props) {
  const [isSignin, setSignin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignin(true);
      } else {
        setSignin(false);
      }
    });
  }, []);
  return (
    <Authcontext.Provider value={{ isSignin, setSignin }}>
      {children}
    </Authcontext.Provider>
  );
}

export default AuthContextProvider;
