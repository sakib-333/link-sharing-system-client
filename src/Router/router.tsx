import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AddPage from "../Pages/AddPage/AddPage";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import MyLinksPage from "../Pages/MyLinksPage/MyLinksPage";
import ImageDetailsPage from "../Pages/ImageDetailsPage/ImageDetailsPage";
import EditImagePage from "../Pages/EditImagePage/EditImagePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/add",
        element: (
          <PrivateRoute>
            <AddPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-links",
        element: (
          <PrivateRoute>
            <MyLinksPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRoute>
            <EditImagePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: <ImageDetailsPage />,
      },
    ],
  },
]);
