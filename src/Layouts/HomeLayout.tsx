import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import useAuth from "../Hooks/useAuth/useAuth";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const HomeLayout = () => {
  const { userLoading } = useAuth();
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar />
      <div className="min-h-screen container mx-auto px-4 py-2">
        {userLoading ? <LoadingSpinner /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
