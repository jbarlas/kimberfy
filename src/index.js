import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, isRouteErrorResponse, RouterProvider, useRouteError } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/login/Login";
import Redirect from "./components/redirect/Redirect";
import Profile from "./components/profile/Profile";
import { fetchProfile } from "./utils";
import Send from "./components/send/Send";

function RootBoundary() {
  const error = useRouteError();

  const style = {display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw", color: "#FFFFF2"}

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div style={style}>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div style={style}>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div style={style}>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div style={style}>🫖</div>;
    }
  }

  return <div style={style}>Oh no! Something went wrong /:</div>;
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <RootBoundary />,
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
        {
          path: "send",
          element: <Send />
        }
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
