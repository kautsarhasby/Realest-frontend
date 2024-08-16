import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import Room from "./pages/Room.jsx";
import Login from "./pages/Login.jsx";
import ToggleProvider from "./hooks/ToggleProvider.jsx";
import Error from "./pages/Error.jsx";
import LayoutChat from "./layouts/LayoutChat.jsx";
import Event from "./pages/Event.jsx";
import Learning from "./pages/Learning.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/chat",
    element: (
      <ToggleProvider>
        <LayoutChat />
      </ToggleProvider>
    ),
    errorElement: <Error />,
    children: [
      { path: "", element: <Chat /> },
      {
        path: "event",
        element: <Event />,
      },
      {
        path: "learning",
        element: <Learning />,
      },
    ],
  },
  {
    path: "/room",
    element: <Room />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
