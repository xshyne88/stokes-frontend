import React from "react";
import { Loading } from "../components/Spinners";

const centeringIsImpossible = {
  display: "table",
  marginRight: "auto",
  marginLeft: "auto",
  verticalAlign: "middle",
  position: "relative",
  top: "35vh"
};

export default () => (
  <>
    <Loading style={centeringIsImpossible} />
  </>
);
