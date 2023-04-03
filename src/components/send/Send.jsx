import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
// import { useLoaderData } from "react-router-dom";
import { getCurrentlyPlaying } from "../../utils";

export default function Send() {
  //   const data = useLoaderData();
  const token = localStorage.getItem("accessToken");
  const [songPlaying, setSongPlaying] = React.useState();
  console.log(songPlaying);
  return (
    <div>
      {songPlaying ? (
        <Card sx={{ maxWidth: "300px" }}>
          <CardMedia
            component="img"
            alt="album cover"
            height="300"
            width="300"
            src={songPlaying.item.album.images[1].url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {songPlaying.item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {songPlaying.item.artists.map((artist) => artist.name).join(", ")}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button
              size="small"
              onClick={() =>
                getCurrentlyPlaying(token).then((songData) =>
                  songData ? setSongPlaying(songData) : setSongPlaying(null) 
                )
              }
            >
              Retry
            </Button>
            <Button size="small" onClick={() => console.log("sharing song!")}>Send</Button>
          </CardActions>
        </Card>
      ) : (
        <div>
        <Button
          variant="contained"
          onClick={() =>
            getCurrentlyPlaying(token).then((songData) =>
              setSongPlaying(songData)
            )
          }
        >
          Try again
        </Button>
        </div>
      )}
    </div>
  );
}
