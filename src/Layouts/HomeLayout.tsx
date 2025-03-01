import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const HomeLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
