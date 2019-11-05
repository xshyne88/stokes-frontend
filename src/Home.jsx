import React, { useState } from "react";
import Lands from "./Lands";

const Home = props => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      {toggle && <Lands />}
    </div>
  );
};

export default Home;
