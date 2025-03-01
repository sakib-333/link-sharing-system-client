import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
