import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notifications from "./Notifications";
import Home from "./Home";

export default function AppendMode() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/notifications" Component={Notifications} />
      </Routes>
    </Router>
  );
}
