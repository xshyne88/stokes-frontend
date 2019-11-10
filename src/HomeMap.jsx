import React, { useState } from "react";
// import SplitPane from "react-split-pane";
import Map from "./Map";
import LandDetails from "./LandDetails";

const HomeMap = props => {
  const [activeId, setActiveLand] = useState(null);
  return (
    <div style={{ display: "flex" }}>
      <Map setActiveLand={setActiveLand} />
      <LandDetails landId={activeId} />
    </div>
  );
};

export default HomeMap;
