import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import authInfoInterface from "../Interfaces/authInfoInterface";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const googleProvider = new GoogleAuthProvider();

  // Signin with google
  const handleSigninWithGoogle = () => {
    setUserLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setUserLoading(false));
  };

  // Logout
  const handleLogout = () => {
    setUserLoading(true);
    signOut(auth)
      .then(() => {
        console.log("Signout successful.");
        setUser(null);
      })
      .catch(() => console.log("Something went wrong."))
      .finally(() => setUserLoading(false));
  };

  // Trace user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
        setUserLoading(false);
      } else {
        setUserLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Signin with email and password
  const signinWithEmailPassword = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerUserWithEmailPassword = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user
  const updateUserProfile = (displayName: string, photoURL: string) => {
    setUserLoading(true);
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, { displayName, photoURL });
    }
  };

  const authInfo: authInfoInterface = {
    user,
    userLoading,
    setUserLoading,
    handleSigninWithGoogle,
    handleLogout,
    signinWithEmailPassword,
    registerUserWithEmailPassword,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
