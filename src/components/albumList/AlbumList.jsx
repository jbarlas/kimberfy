import React from "react";
import AlbumCard from "../albumCard/AlbumCard";

export default function AlbumList(props) {
  const { songsData } = props;
  return (
    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
      {songsData.map((song) => {
        <AlbumCard songPlaying={song} />;
      })}
    </div>
  );
}
