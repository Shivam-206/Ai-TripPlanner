import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CreateTrip from "./create-trip/index.jsx";
import RootLayout from "./components/custom/RootLayout";
import RequireAuth from "./components/custom/RequireAuth";
import { Toaster } from "@/components/ui/sonner";
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import Mytrips from "./my-trips";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/create-trip",
        element: <CreateTrip />,
      },
      {
        path: "/view-trip/:tripId",
        element: (
          <RequireAuth>
            <Viewtrip />
          </RequireAuth>
        ),
      },
      {
        path: "/my-trips",
        element: (
          <RequireAuth>
            <Mytrips />
          </RequireAuth>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </StrictMode>,
);
