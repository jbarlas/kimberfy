import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  getCurrentlyPlaying,
  nextPlayback,
  pausePlayback,
  playPlayback,
  previousPlayback,
} from "../../utils";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";

export default function Send() {
  const { currentlyPlaying, devices } = useLoaderData();
  const token = localStorage.getItem("accessToken");
  const [songPlaying, setSongPlaying] = React.useState(currentlyPlaying);
  // const [currentDevices, setCurrentDevices] = React.useState(devices);
  const navigate = useNavigate();

  console.log(songPlaying);

  const pause = () => {
    pausePlayback(
      token,
      Object.values(devices.devices).filter((device) => device.is_active)[0].id
    ).then(() => setSongPlaying({ ...songPlaying, is_playing: false }));
  };

  const play = () => {
    playPlayback(
      token,
      Object.values(devices.devices).filter((device) => device.is_active)[0].id
    ).then(() => setSongPlaying({ ...songPlaying, is_playing: true }));
  };

  const next = () => {
    nextPlayback(
      token,
      Object.values(devices.devices).filter((device) => device.is_active)[0].id
    ).then(() =>
      getCurrentlyPlaying(token).then((newSong) => setSongPlaying(newSong))
    );
  };

  const previous = () => {
    previousPlayback(
      token,
      Object.values(devices.devices).filter((device) => device.is_active)[0].id
    ).then(() =>
      getCurrentlyPlaying(token).then((newSong) => setSongPlaying(newSong))
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <IconButton aria-label="previous" onClick={() => previous()}>
              <SkipPrevious />
            </IconButton>
            <IconButton
              aria-label="play/pause"
              onClick={() => (songPlaying.is_playing ? pause() : play())}
            >
              {songPlaying.is_playing ? (
                <Pause sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrow sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton aria-label="next" onClick={() => next()}>
              <SkipNext />
            </IconButton>
          </Box>
          <CardActions
            sx={{ margin: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => console.log("sharing song!")}
            >
              Send
            </Button>
          </CardActions>
        </Card>
      ) : (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20, textAlign: "center"}}>
            <Typography variant="h4">Oops! Looks like Spotify is closed /:</Typography>
          <Button
            variant="contained"
            onClick={() =>
              getCurrentlyPlaying(token)
                .then((songData) => setSongPlaying(songData))
                .catch((err) => {
                  console.log("error", err);
                  localStorage.clear();
                  navigate("/");
                })
            }
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}