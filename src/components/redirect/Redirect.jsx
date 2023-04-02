import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils";

export default function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const CLIENT_ID = "75498bd4f8ca4d408edb2798545d5840";
    const code = params.get("code");
    console.log("running in useEffect")
    getAccessToken(CLIENT_ID, code)
      .then((token) => {
        console.log("token", token)
        localStorage.setItem("accessToken", token);
        navigate("/profile");
      })
      .catch((e) => console.log("error", e));
  }, [navigate]);

  return <div>REDIRECT PAGE</div>;
}
