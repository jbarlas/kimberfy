import { Button } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { generateRecommendations, getCurrentlyPlaying } from "../../utils";

export default function Profile() {
  const data = useLoaderData();
  const token = localStorage.getItem("accessToken");
  const [songs, setSongs] = React.useState([]);
  const [recs, setRecs] = React.useState([]);

  console.log(recs);
  return (
    <div>
      <div>profile: {data.display_name}</div>
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
            getCurrentlyPlaying(token).then((songData) =>
              setSongs([songData, ...songs])
            )
          }
        >
          Add Currently Playing
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            generateRecommendations(
              token,
              songs.map((song) => song.item.id)
            ).then((resp) => resp ? setRecs(resp.tracks) : null)
          }
        >
          Generate Recommendations
        </Button>
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
          {songs.map((song) => {
            return <div key={song.item.id}>{song.item.name}</div>;
          })}
        </div>
        <div>
          Recommendations
          {recs.map((song) => {
            return <div key={song.id}>{song.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
