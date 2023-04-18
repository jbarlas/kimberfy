import { Typography } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import AlbumCard from "../albumCard/AlbumCard";

export default function Shared() {
  const { currentlyPlaying } = useLoaderData();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        paddingBottom: "100px",
      }}
    >
      <Typography variant="h6">My Shares</Typography>
      <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
        <AlbumCard songPlaying={currentlyPlaying} />
        <AlbumCard songPlaying={null} />
      </div>
      <Typography variant="h6">Your Shares</Typography>
      <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
        <AlbumCard songPlaying={currentlyPlaying} />
        <AlbumCard songPlaying={null} />
      </div>
      <Typography variant="h6">New Songs</Typography>
      <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
        <AlbumCard songPlaying={null} />
        <AlbumCard songPlaying={null} />
      </div>
    </div>
  );
}
