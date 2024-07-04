import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import RegisterWithDiscord from "../pages/RegisterWithDiscord";
import RegisterWithTwitter from "../pages/RegisterWithTwitter";
import LoginWithDiscord from "../pages/LoginWithDiscord";
import LoginWithTwitter from "../pages/LoginWithTwitter";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/register/discord",
                element: <RegisterWithDiscord />
            },
            {
                path: "/register/twitter",
                element: <RegisterWithTwitter />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/login/discord",
                element: <LoginWithDiscord />
            },
            {
                path: "/login/twitter",
                element: <LoginWithTwitter />
            },
            {
                path: "/login/twitter",
                element: <LoginWithTwitter />
            },
            {
                path: "/forget-password",
                element: <ForgetPassword />
            },
            {
                path: "/reset-password/:token",
                element: <ResetPassword />
            },
        ],
    }
])

export default router