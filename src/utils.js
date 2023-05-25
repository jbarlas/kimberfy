import pkceChallenge from "pkce-challenge";


const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://kimberfy.web.app"
console.log(baseUrl)

export async function redirectToAuthCodeFlow(clientId) {
  const pkce = pkceChallenge(128);
  const verifier = pkce.code_verifier;
  const challenge = pkce.code_challenge;

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", baseUrl + "/redirect");
  params.append(
    "scope",
    "user-read-private user-read-email user-read-currently-playing user-read-playback-state user-modify-playback-state"
  ); 
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", baseUrl + "/redirect");
  params.append("code_verifier", verifier);

  return await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  })
    .then((response) => response.json())
    .then((data) => data.access_token)
    .catch((e) => console.log("error", e));
}

/**
 * Util function for gathering profile data from spotify api
 * @param {*} token Authorization Bearer token for spotify api
 * @returns profile object
 * see https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile for more information
 */
export async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function getDevices(token) {
  const result = await fetch("https://api.spotify.com/v1/me/player/devices", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function pausePlayback(token, device_id) {
  const params = new URLSearchParams();
  params.append("device_id", device_id);

  const result = await fetch("https://api.spotify.com/v1/me/player/pause?" + params, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });

  return result;
}

export async function playPlayback(token, device_id) {
  const params = new URLSearchParams();
  params.append("device_id", device_id);

  const result = await fetch("https://api.spotify.com/v1/me/player/play?" + params, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });

  return result;
}

export async function nextPlayback(token, device_id) {
  const params = new URLSearchParams();
  params.append("device_id", device_id);

  const result = await fetch("https://api.spotify.com/v1/me/player/next?" + params, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  return result;
}

export async function previousPlayback(token, device_id) {
  const params = new URLSearchParams();
  params.append("device_id", device_id);

  const result = await fetch("https://api.spotify.com/v1/me/player/previous?" + params, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  return result;
}

export async function getCurrentlyPlaying(token) {
  return await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .catch((e) => console.log("error", e));
}

export async function generateRecommendations(token, tracks) {
  const params = new URLSearchParams();
  params.append("seed_artists", "");
  params.append("seed_genres", "");
  params.append("seed_tracks", tracks.join());

  return await fetch("https://api.spotify.com/v1/recommendations?" + params, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .catch((e) => console.log("error", e));
}

// function generateCodeVerifier(length) {
//   let text = "";
//   let possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// async function generateCodeChallenge(codeVerifier) {
//   const data = new TextEncoder().encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest("SHA-256", data);
//   return Buffer.from(
//     String.fromCharCode.apply(null, [...new Uint8Array(digest)])
//   )
//     .toString("base64")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// }
