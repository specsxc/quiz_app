import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import "@mantine/core/styles.css";
import { router } from "./router";
import { RouterProvider } from "react-router";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <AuthContextProvider>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#1e293b",
            padding: "16px",
            color: "#f1f5f9",
            border: "1px solid #334155",
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </MantineProvider>,
);
