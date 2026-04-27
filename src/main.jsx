import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import "@mantine/core/styles.css";
import { router } from "./router";
import { RouterProvider } from "react-router";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </MantineProvider>,
);
