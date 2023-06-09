import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  isRouteErrorResponse,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./views/login/Login";
import Redirect from "./views/redirect/Redirect";
import Explore from "./views/explore/Explore";
import {
  fetchProfile,
  getCurrentlyPlaying,
  getDevices,
  redirectToAuthCodeFlow,
} from "./utils";
import Send from "./views/send/Send";
import { Button } from "@mui/material";
import Shared from "./views/shared/Shared";
import { getAllUsers } from "./firebase";

function RootBoundary() {
  const error = useRouteError();

  const style = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    color: "#FFFFF2",
  };

  const backToLogin = (
    <Button
      variant="contained"
      onClick={() => redirectToAuthCodeFlow("75498bd4f8ca4d408edb2798545d5840")}
    >
      Retry Login
    </Button>
  );

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div style={style}>
          <div>This page doesn't exist!</div>
          {backToLogin}
        </div>
      );
    }

    if (error.status === 400) {
      return (
        <div style={style}>
          <div>{error}</div>
          {backToLogin}
        </div>
      );
    }

    if (error.status === 503) {
      return (
        <div style={style}>
          <div>Looks like our API is down</div>
          {backToLogin}
        </div>
      );
    }

    if (error.status === 418) {
      return (
        <div style={style}>
          <div>🫖</div>
          {backToLogin}
        </div>
      );
    }
  }

  return (
    <div style={style}>
      <div>Oh no! Something went wrong /:</div>
      {backToLogin}
    </div>
  );
}

// In case offline
// const currentlyPlaying = {
//   item: {
//     album: { images: [{ url: "" }, { url: "" }] },
//     artists: [{ name: "test" }],
//   },
// };
// const devices = { devices: { dev1: { is_active: true } } };
// const profile = {};

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
          path: "explore",
          element: <Explore />,
          loader: async () => {
            const accessToken = localStorage.getItem("accessToken");
            const devices = await getDevices(accessToken).then(
              (device) => device
            );
            const profile = await fetchProfile(accessToken);
            return { devices, profile };
          },
        },
        {
          path: "send",
          element: <Send />,
          loader: async () => {
            const accessToken = localStorage.getItem("accessToken");
            const devices = await getDevices(accessToken).catch((err) => {
              console.log("error", err);
            });
            console.log(devices);
            const profile = await fetchProfile(accessToken).catch((err) => {
              console.log("error", err);
            });
            const currentlyPlaying = await getCurrentlyPlaying(
              accessToken
            ).catch((err) => {
              console.log("error", err);
            });
            const users = await getAllUsers();
            return { currentlyPlaying, devices, profile, users };
          },
        },
        {
          path: "shared",
          element: <Shared />,
          loader: async () => {
            const accessToken = localStorage.getItem("accessToken");
            const currentlyPlaying = await getCurrentlyPlaying(accessToken)
              .then((token) => token)
              .catch((err) => {
                console.log("error", err);
              });
            return { currentlyPlaying };
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
