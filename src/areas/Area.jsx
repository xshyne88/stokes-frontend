import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    minHeight: 25,
    textAlign: "center"
  }
});

export default ({ area }) => {
  const classes = useStyles();
  const { name: areaName } = area;
  return (
    <>
      <Paper className={classes.card}>
        <Typography variant="h3" component="h3">
          {areaName}
        </Typography>
      </Paper>
      <Divider />
    </>
  );
};
