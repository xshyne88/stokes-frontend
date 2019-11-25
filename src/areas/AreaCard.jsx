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
    backgroundColor: lighten("#ff6c5c", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#ff6c5c"
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
  const landName = props.land.name;
  const { land } = props;
  const { lastCompletedDuty } = land;
  const { landDuties } = land;
  const percentageComplete = getPercentageOfDutiesCompleted(landDuties);

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
        style={{ marginLeft: 30, marginRight: 30, width: "75%" }}
        variant="determinate"
        color="secondary"
        value={percentageComplete}
      />
      <CardContent>
        {props.land.landDuties.map(ld => (
          <Chip
            className={classes.activeChip}
            key={ld.id}
            avatar={
              <FiberManualRecordIcon
                style={{ fill: !!ld.activeCompletedDuty ? "green" : "red" }}
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
