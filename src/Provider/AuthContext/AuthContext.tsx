import { createContext } from "react";
import { UserCredential } from "firebase/auth";
import authInfoInterface from "../Interfaces/authInfoInterface";

const defaultAuth: authInfoInterface = {
  user: null,
  userLoading: true,
  setUserLoading: () => {},
  // handleSigninWithGoogle: async (): Promise<UserCredential> => {
  //   throw new Error("AuthContext not initialized");
  // },
  handleSigninWithGoogle: () => {},
  handleLogout: () => {},
  signinWithEmailPassword: async () => {
    return {} as UserCredential;
  },
  registerUserWithEmailPassword: async () => {
    throw new Error("Register method is not initialized");
  },
  updateUserProfile: () => {},
};

export const AuthContext = createContext<authInfoInterface>(defaultAuth);
