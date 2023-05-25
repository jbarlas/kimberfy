import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import {
  SkipNext,
  SkipPrevious,
  PlayArrow,
  QuestionMark,
} from "@mui/icons-material";
import { pausePlayback } from "../../utils";

export default function Player(props) {
  const token = localStorage.getItem("accessToken");
  const { song, devices } = props;

  return (
    <div>
      <Card sx={{ display: "flex", width: 350, height: 150 }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: 200 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h7">
              {song ? song.name : "No songs ):"}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {song ? song.artists.map((artist) => artist.name).join(", ") : ""}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              <SkipPrevious />
            </IconButton>
            <IconButton aria-label="play/pause" onClick={() => pausePlayback(token, Object.values(devices.devices).filter(device => device.is_active)[0].id)}>
              <PlayArrow sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              <SkipNext />
            </IconButton>
          </Box>
        </Box>
        {song ? (
          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={song ? song.album.images[1].url : null}
            alt="album cover"
          />
        ) : (
          <Paper
            sx={{
              width: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "grey",
            }}
          >
            <QuestionMark fontSize="large" />
          </Paper>
        )}
      </Card>
    </div>
  );
}
