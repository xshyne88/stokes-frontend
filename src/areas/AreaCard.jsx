import React from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Chip } from "@material-ui/core";
import AreaCardExpandedContent from "./AreaCardExpandedContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten, withStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(theme => ({
  card: { width: "100%" },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "white",
    height: 40
  },
  check: {
    color: "green"
  },
  notDone: {
    color: "red"
  },
  scootRight: {
    marginRight: 10
  },
  activeChip: {
    backgroundColor: "#fff",
    textShadow: "0 0 20px #ff05b"
  }
}));

const getProgressColor = percentage => {
  if (percentage < 25) return "#c94c4c";
  if (percentage < 50) return "#eea29a";
  if (percentage < 75) return "#86af49";
  return "#405d27";
};

const ellipsify = (name, length = 14) => {
  if (name.length >= length) {
    return `${name.slice(0, length)}..`;
  } else {
    return name;
  }
};

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#82b74b", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#82b74b"
  }
})(LinearProgress);

const AreaCardTitle = ({ land, lastCompletedDuty }) => (
  <div>
    <Link to={`areas/${land.id}`}>{land.name}</Link>
    {lastCompletedDuty && (
      <div style={{ display: "flex" }}>
        <i>Most Recent Activity: </i>
        <div style={{ marginLeft: 10 }}>{lastCompletedDuty}</div>
      </div>
    )}
  </div>
);

const getPercentageOfDutiesCompleted = landDuties => {
  const { length } = landDuties;
  const done = landDuties.reduce(
    (acc, ld) => (ld.activeCompletedDuty ? acc + 1 : acc),
    0
  );
  return (done / length) * 100;
};

export default props => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  const landId = props.land.id;
  const { land } = props;
  const { lastCompletedDuty } = land;
  const { landDuties } = land;
  const percentageComplete = getPercentageOfDutiesCompleted(landDuties);
  console.log(percentageComplete);
  const progressColor = getProgressColor(percentageComplete);

  return (
    <Card className={classes.card}>
      <CardHeader
        onClick={e => <Redirect to={`areas/${landId}`} />}
        avatar={
          <div>
            <Avatar aria-label="name" className={classes.avatar}>
              {percentageComplete === 100 ? (
                <CheckCircleOutlineIcon className={classes.check} />
              ) : (
                <ClearIcon className={classes.notDone} />
              )}
            </Avatar>
          </div>
        }
        action={<IconButton aria-label="settings" />}
        title={
          <AreaCardTitle land={land} lastCompletedDuty={lastCompletedDuty} />
        }
      />

      <BorderLinearProgress
        style={{
          color: progressColor,
          backgroundColor: lighten(progressColor, 0.5),
          marginLeft: 30,
          marginRight: 30,
          width: "75%"
        }}
        variant="determinate"
        value={percentageComplete}
      />
      <CardContent>
        {props.land.landDuties.map(ld => (
          <Chip
            className={classes.activeChip}
            key={ld.id}
            avatar={
              <FiberManualRecordIcon
                style={{ fill: ld.activeCompletedDuty ? "green" : "red" }}
              />
            }
            label={ellipsify(ld.duty.name)}
          />
        ))}
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <AreaCardExpandedContent land={props.land} />
      </Collapse>
    </Card>
  );
};
