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
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { successAlert } from "../../Alerts/SuccessAlert/successAlert";
import { errorAlert } from "../../Alerts/ErrorAlert/errorAlert";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const axiosPublic = useAxiosPublic();
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
        successAlert("Success", "Signout successful.");
        setUser(null);
      })
      .catch(() => errorAlert())
      .finally(() => setUserLoading(false));
  };

  // Trace user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
        axiosPublic
          .post("/jwt", { email: currUser.email })
          .then((res) => {
            console.log(res.data);
          })
          .catch(() => console.log("Something went wrong"));
        setUserLoading(false);
      } else {
        axiosPublic
          .post("/logout")
          .then((res) => {
            console.log(res.data);
          })
          .catch(() => console.log("Something went wrong"));
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
