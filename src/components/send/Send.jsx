import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  getCurrentlyPlaying,
  getDevices,
  nextPlayback,
  pausePlayback,
  playPlayback,
  previousPlayback,
} from "../../utils";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { sendSong } from "../../firebase";

export default function Send() {
  const { currentlyPlaying, devices } = useLoaderData();
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("firebaseUserID");
  const [songPlaying, setSongPlaying] = React.useState(currentlyPlaying);
  const [device, setDevice] = React.useState(
    Object.values(devices.devices).filter((device) => device.is_active)[0]
  );
  const [songSent, setSongSent] = React.useState(false);
  const navigate = useNavigate();
  console.log(songPlaying, device);

  const pause = () => {
    pausePlayback(token, device.id).then(() =>
      getCurrentlyPlaying(token).then((newSong) => setSongPlaying(newSong))
    );
  };

  const play = () => {
    playPlayback(token, device.id).then(() => playSong());
  };

  const next = () => {
    nextPlayback(token, device.id).then(() => playSong());
  };

  const previous = () => {
    previousPlayback(token, device.id).then(() => playSong());
  };

  const playSong = () => {
    getCurrentlyPlaying(token).then((newSong) => setSongPlaying(newSong));
  };

  React.useEffect(() => {
    if (songPlaying) {
      if (songPlaying.is_playing) {
        setTimeout(() => {
          getCurrentlyPlaying(token).then((newSong) => setSongPlaying(newSong));
        }, songPlaying.item.duration_ms - songPlaying.progress_ms);
      }
    }
  }, [songPlaying, token]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "100px",
      }}
    >
      {songPlaying && device ? (
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
              onClick={() =>
                sendSong(userId, songPlaying.item)
                  .then((_) => setSongSent(true))
                  .catch((error) => console.log("error sending song", error))
              }
            >
              Send
            </Button>
          </CardActions>
        </Card>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">
            Oops! Looks like Spotify is closed /:
          </Typography>
          <Button
            variant="outlined"
            onClick={async () => {
              const devices = await getDevices(token);
              setDevice(
                Object.values(devices.devices).filter(
                  (device) => device.is_active
                )[0]
              );
              getCurrentlyPlaying(token)
                .then((songData) => {
                  setSongPlaying(songData);
                })
                .catch((err) => {
                  console.log("error", err);
                  localStorage.clear();
                  navigate("/");
                });
            }}
          >
            Try Again
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => window.open("https://play.spotify.com")}
          >
            Open Spotify
          </Button>
        </div>
      )}
      <Snackbar
        open={songSent}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setSongSent(false)}
        sx={{ marginBottom: 10 }}
      >
        <Alert
          onClose={() => setSongSent(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Song sent!
        </Alert>
      </Snackbar>
    </div>
  );
}
