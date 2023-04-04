import { QuestionMark } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

export default function AlbumCard(props) {
  const { songPlaying } = props;
  console.log(props)
  return (
    <div>
      <Card sx={{ maxWidth: "150px" }}>
        {songPlaying ? (
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150 }}
            image={songPlaying ? songPlaying.item.album.images[1].url : null}
            alt="album cover"
          />
        ) : (
          <Paper
            sx={{
              width: 150,
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "grey",
            }}
          >
            <QuestionMark fontSize="large" />
          </Paper>
        )}
        <CardContent sx={{ margin: "-5px 0 -10px 0" }}>
          <Typography gutterBottom variant="h8" component="div">
            {songPlaying ? songPlaying.item.name : "No song yet!"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {songPlaying
              ? songPlaying.item.artists.map((artist) => artist.name).join(", ")
              : "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
