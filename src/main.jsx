import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/router";
import { ClerkProvider } from "@clerk/react";
import { ApiAuthProvider } from "./components/providers/api-auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import routes from "./router/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider signInUrl={routes.login}>
        <ApiAuthProvider />
        <RouterProvider router={router} />
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>,
);
