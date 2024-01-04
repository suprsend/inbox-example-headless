import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FullScreenNotifications from "./FullScreenNotifications";
import PopUpNotifications from "./PopUpNotifications";

export default function AppendMode() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={PopUpNotifications} />
        <Route
          exact
          path="/notifications"
          Component={FullScreenNotifications}
        />
      </Routes>
    </Router>
  );
}
