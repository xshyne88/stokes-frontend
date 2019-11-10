import React from "react";
import ErrorSnack from "../components/ErrorSnack.jsx";
import Typography from "@material-ui/core/Typography";

export default () => (
  <>
    <Typography>Connection has failed</Typography>
    <ErrorSnack open />
  </>
);
