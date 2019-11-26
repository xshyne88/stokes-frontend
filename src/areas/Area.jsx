import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    minHeight: 50,
    textAlign: "center"
  },
  title: {
    fontSize: 28,
    display: "inline-block"
  },
});

export default ({ area }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
        <Typography
          center
          textPrimary="Area"
          variant="h2"
        >
          {area.name}
        </Typography>
        <Divider />
    </Paper>
  );
};
