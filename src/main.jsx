import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import AuthProvider from "./contexts/AuthContext/AuthProvider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingProvider } from "./contexts/LoadingContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="overflow-x-hidden">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LoadingProvider>
            <RouterProvider router={router} />
            <ToastContainer position="top-center" />
            <Toaster position="top-center" />
          </LoadingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
