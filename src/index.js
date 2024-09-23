import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot 사용

root.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>
);
