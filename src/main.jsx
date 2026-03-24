import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { router } from "./router";
import { RouterProvider } from "react-router";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
// import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
  // </StrictMode>,
);
