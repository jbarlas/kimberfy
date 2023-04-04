import React from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { LibraryMusic, Send, Group } from "@mui/icons-material";

function App() {
  const [activeRoute, setActiveRoute] = React.useState(
    window.location.pathname
  );
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  return (
    <div>
        <Outlet />
        {accessToken && (
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={activeRoute}
              onChange={(event, newValue) => {
                setActiveRoute(newValue);
                navigate(newValue);
              }}
              sx={{ bgcolor: "#D4C2FC"}}
            >
              <BottomNavigationAction
                label="Explore"
                value="explore"
                icon={<Group />}
              />
              <BottomNavigationAction
                label="Send"
                value="send"
                icon={<Send />}
              />
              <BottomNavigationAction label="Shared" value="shared" icon={<LibraryMusic />} />
            </BottomNavigation>
          </Paper>
        )}
    </div>
  );
}

export default App;
