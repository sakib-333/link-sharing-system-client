import { User, UserCredential } from "firebase/auth";

interface authInfoInterface {
  user: User | null;
  userLoading: boolean;
  setUserLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // handleSigninWithGoogle: () => Promise<UserCredential>;
  handleSigninWithGoogle: () => void;
  handleLogout: () => void;
  signinWithEmailPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;

  registerUserWithEmailPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  updateUserProfile: any;
}

export default authInfoInterface;
