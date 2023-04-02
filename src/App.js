import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="App-header">
        Testing
        <Outlet />
      </header>
    </div>
  );
}

export default App;
