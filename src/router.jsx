import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Leaderboard from "./pages/Leaderboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/settings", element: <Settings /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
