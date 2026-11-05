import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header";
import { Toaster } from "@/components/ui/sonner";
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import Mytrips from "./my-trips";

const router = createBrowserRouter([
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
    element: <Viewtrip />,
  },
  {
    path: "/my-trips",
    element: <Mytrips/> 
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Header />
      <RouterProvider router={router} />
      <Toaster position="top-right" />
  </StrictMode>
);