import React from "react";
import { Button } from "@mui/material";
import "./App.css";
import { redirectToAuthCodeFlow } from "./utils";

function App() {
  const spotifyClientId = process.env.CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const [spotifyCode, setSpotifyCode] = React.useState(params.get("code"));
  const CLIENT_ID = "75498bd4f8ca4d408edb2798545d5840";
  const REDIRECT_URI = "localhost:3000/redirect";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  // React.useEffect(() => {
  //   const hash = window.location.hash;
  //   let token = window.localStorage.getItem("token");

  //   if (!token && hash) {
  //     token = hash
  //       .substring(1)
  //       .split("&")
  //       .find((elem) => elem.startsWith("access_token"))
  //       .split("=")[1];

  //     window.location.hash = "";
  //     window.localStorage.setItem("token", token);
  //   }

  //   setSpotifyCode(token);
  // }, []);

  const logout = () => {
    setSpotifyCode("");
    window.localStorage.removeItem("code");
  };
  return (
    <div className="App">
      <header className="App-header">
        Testing
        <Button
          variant="contained"
          onClick={() => redirectToAuthCodeFlow(CLIENT_ID)}
        >
          Spotify Login
        </Button>
        <Button onClick={() => console.log(spotifyCode)}>Check code</Button>
        <Button variant="contained" onClick={logout}>
          Spotify Logout
        </Button>
      </header>
    </div>
  );
}

export default App;
