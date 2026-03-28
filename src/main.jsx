import { createRoot } from "react-dom/client";
// import { StrictMode } from 'react';
import "./index.css";
import "./App.css";
import { router } from "./router";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
