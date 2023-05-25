import React from "react";
import { redirectToAuthCodeFlow } from "../../utils";
import { Button } from "@mui/material";

export default function Login() {
  const CLIENT_ID = "75498bd4f8ca4d408edb2798545d5840";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        variant="contained"
        onClick={() => redirectToAuthCodeFlow(CLIENT_ID)}
        color="success"
      >
        Log in with Spotify
      </Button>
    </div>
  );
}
