import { Route, Routes } from "react-router-dom";
import Coins from "./coins.js";
import Home from "./home.tsx";
import Details from "./Details.js";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/coins/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
