import { Link } from "react-router-dom";
import "./styles.css";
import React from "react";

function Home() {
  return (
    <div className="bg-yellow-100 justify-center min-h-screen items-center grid">
      <h1 className="text-7xl text-center">HOME</h1>
      <Link
        to="/coins"
        className="bg-yellow-700 rounded-full w-36 h-12 text-white text-xl grid place-items-center ml-8"
      >
        FIND COINS
      </Link>
    </div>
  );
}

export default Home;
