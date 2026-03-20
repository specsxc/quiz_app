import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Leaderboard from "./pages/Leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
