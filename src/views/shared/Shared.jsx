import { Box, Fab, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { Message, People, Person } from "@mui/icons-material";

export default function Shared() {
  const { currentlyPlaying } = useLoaderData();
  const [activeTab, setActiveTab] = React.useState("Sent");
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: 15,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginTop: 10,
    //     paddingBottom: "100px",
    //   }}
    // >
    //   <Typography variant="h6">My Shares</Typography>
    //   <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
    //     <AlbumCard songPlaying={currentlyPlaying} />
    //     <AlbumCard songPlaying={null} />
    //   </div>
    //   <Typography variant="h6">Your Shares</Typography>
    //   <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
    //     <AlbumCard songPlaying={currentlyPlaying} />
    //     <AlbumCard songPlaying={null} />
    //   </div>
    //   <Typography variant="h6">New Songs</Typography>
    //   <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
    //     <AlbumCard songPlaying={null} />
    //     <AlbumCard songPlaying={null} />
    //   </div>
    // </div>
    <>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            variant="fullWidth"
            sx={{ backgroundColor: "#D4C2FC" }}
          >
            <Tab label="Sent" value="Sent" />
            <Tab label="Received" value="Received" />
            <Tab label="Generated" value="Generated" />
          </Tabs>
          <TabPanel value="Sent">Item One</TabPanel>
          <TabPanel value="Received">Item Two</TabPanel>
          <TabPanel value="Generated">Item Three</TabPanel>
        </Box>
      </TabContext>
      <Fab sx={{ position: "absolute", right: "30px", bottom: "88px" }}>
        <People />
      </Fab>
    </>
  );
}
