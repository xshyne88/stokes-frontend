import React, { useState } from "react";
import AllLands from "./Lands";

const Home = props => {
  const [showLands, toggleButton] = useState(false);
  return (
    <div style={{ height: "50%", width: "50%" }}>
      <h1 style={{ color: "blue", fontSize: "48px" }}>Stokes Graveyard</h1>
      <button
        style={{ fontSize: "30px" }}
        onClick={e => toggleButton(!showLands)}
      >
        SHOW LANDS
      </button>
      {showLands ? <AllLands /> : <div>THERES NOTHING TO SEE HERE</div>}
    </div>
  );
};

// Buddy deploy

export default Home;
