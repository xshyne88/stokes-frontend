import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginTop: 8,
    fontSize: 10
  }
});

export default ({ area }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Area
        </Typography>
        <Typography variant="h3" component="h3">
          {area.name}
        </Typography>
        {/* <Typography className={classes.pos}>
            Last Mowed November 10, 2019 by Jacob Haug
            </Typography> */}
      </CardContent>
    </Card>
  );
};
