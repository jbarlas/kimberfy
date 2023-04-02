import React from "react";
import { getAccessToken, redirectToAuthCodeFlow } from "../../utils";
import { Button } from "@mui/material";

export default function Login() {
  // const spotifyClientId = process.env.CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const [spotifyCode, setSpotifyCode] = React.useState(params.get("code"));
//   const [profileData, setProfileData] = React.useState();
  const CLIENT_ID = "75498bd4f8ca4d408edb2798545d5840";
  // const REDIRECT_URI = "https://kimberfy.web.app/";
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

  const login = () => {
    redirectToAuthCodeFlow(CLIENT_ID);
  };

  const logout = () => {
    setSpotifyCode("");
    window.localStorage.removeItem("code");
  };
  return (
    <div>
      <Button variant="contained" onClick={login}>
        Spotify Login
      </Button>
      <Button onClick={() => console.log(spotifyCode)}>Check code</Button>
      <Button
        onClick={() =>
          getAccessToken(CLIENT_ID, spotifyCode).then((accessToken) =>
            localStorage.setItem("accessToken", accessToken)
          )
        }
      >
        Get Access Token
      </Button>
      <Button variant="contained" onClick={logout}>
        Spotify Logout
      </Button>
    </div>
  );
}
