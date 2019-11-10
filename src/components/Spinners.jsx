import React from "react";
import { CircularProgress } from "@material-ui/core";

export const Loading = props => {
  return (
    <>
      <CircularProgress {...props} />
    </>
  );
};
