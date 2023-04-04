import { Button, Typography } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Player from "../player/Player";
import { generateRecommendations, getCurrentlyPlaying } from "../../utils";

export default function Explore() {
  const {devices, profile} = useLoaderData();
  const token = localStorage.getItem("accessToken");
  const [songs, setSongs] = React.useState([]);
  const [recs, setRecs] = React.useState([]);

  console.log(devices, profile);
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "20px 10px", }}>
      <Typography variant="h4">Welcome, {profile.display_name}!</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px",
          gap: "5px",
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            generateRecommendations(
              token,
              songs.map((song) => song.item.id)
            ).then((resp) => (resp ? setRecs(resp.tracks) : null))
          }
        >
          Generate Recommendations
        </Button>
        <Button
          onClick={() =>
            getCurrentlyPlaying(token).then((song) => song ? setSongs([...songs, song]) : console.log("no song playing"))
          }
        >
          Add Currently Playing
        </Button>
        <Player song={recs ? recs[0] : null} devices={devices}/>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80vw",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          SEED
          {songs && songs.map((song) => {
            return <div key={song.item.id}>{song.item.name}</div>;
          })}
        </div>
        <div>
          Recommendations
          {recs && recs.map((song) => {
            return <div key={song.id}>{song.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
