import { ReactNode } from "react";
import useAuth from "../../Hooks/useAuth/useAuth";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return <LoadingSpinner />;
  }
  if (user) {
    return children;
  }

  return <Navigate to={"/login"} />;
};

export default PrivateRoute;
