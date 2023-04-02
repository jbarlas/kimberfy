import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/login/Login";
import Redirect from "./components/redirect/Redirect";
import Profile from "./components/profile/Profile";
import { fetchProfile } from "./utils";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "redirect",
          element: <Redirect />,
        },
        {
          path: "profile",
          element: <Profile />,
          loader: async () => {
            const accessToken = localStorage.getItem("accessToken");
            return await fetchProfile(accessToken);
          },
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
