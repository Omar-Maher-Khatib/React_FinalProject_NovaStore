import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./assets/home/Home";
import Login from "./assets/login/Login";
import Register from "./assets/register/Register";
import SendCode from "./assets/sendcode/SendCode";
import ResetPassword from "./assets/resetpassword/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <Home />
        },
    ]
  },
  {
    element: <AuthLayout />,
    children: [
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/sendcode",
            element: <SendCode />
        },
        {
            path: "/resetpassword",
            element: <ResetPassword />
        },
    ]
  }
]);

export default router;