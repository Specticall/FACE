import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FaceCapture from "./pages/FaceCapture";
import Diagnosis from "./pages/Diagnosis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT } from "./lib/config";
import Dashboard from "./pages/Dashboard";
import ContextPool from "./pages/ContextPool";

const router = createBrowserRouter([
  {
    element: <ContextPool />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/face-capture",
            element: <FaceCapture />,
          },
          {
            path: "/diagnosis/:diagnosisId",
            element: <Diagnosis />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
