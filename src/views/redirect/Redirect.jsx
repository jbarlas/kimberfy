import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile, getAccessToken } from "../../utils";
import { CircularProgress } from "@mui/material";
import { firebaseSignIn } from "../../firebase";

export default function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const CLIENT_ID = "75498bd4f8ca4d408edb2798545d5840";
    const code = params.get("code");
    getAccessToken(CLIENT_ID, code)
      .then(async (token) => {
        localStorage.setItem("accessToken", token);
        const profile = await fetchProfile(token);
        console.log(profile);
        await firebaseSignIn(profile).then((user) =>
          localStorage.setItem("firebaseUserID", user.uid)
        );
        navigate("/send");
      })
      .catch((e) => {
        throw new Response("Error signing in", { status: 400, error: e });
      });
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
}
