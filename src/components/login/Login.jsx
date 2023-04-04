import React from "react";
import { redirectToAuthCodeFlow } from "../../utils";
import { Button } from "@mui/material";

export default function Login() {
  // const spotifyClientId = process.env.CLIENT_ID;
//   const params = new URLSearchParams(window.location.search);
//   const [spotifyCode, setSpotifyCode] = React.useState(params.get("code"));
//   const [profileData, setProfileData] = React.useState();
  const CLIENT_ID = "75498bd4f8ca4d408edb2798545d5840";
  // const REDIRECT_URI = "https://kimberfy.web.app/";
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";



  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <Button variant="contained" onClick={() => redirectToAuthCodeFlow(CLIENT_ID)} color="success">
        Log in with Spotify
      </Button>
    </div>
  );
}
