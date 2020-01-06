import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default ({ text, onClick, Icon = AddIcon }) => (
  <Fab variant="extended" aria-label="like" onClick={onClick}>
    <Icon />
    {text}
  </Fab>
);
