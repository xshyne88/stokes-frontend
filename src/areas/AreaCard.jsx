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
import { orange } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Chip } from "@material-ui/core";
import AreaCardExpandedContent from "./AreaCardExpandedContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten, withStyles } from "@material-ui/core/styles";

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
    height: 35
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

const AreaCardTitle = ({ landId, lastCompletedDuty, landName }) => (
  <div>
    <Link to={`areas/${landId}`}>{landName}</Link>
    {lastCompletedDuty && (
      <div style={{ display: "flex" }}>
        <i>Last Completed Duty: </i>
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
  const { lastCompletedDuty } = props.land;
  const { landDuties } = props.land;
  const percentageComplete = getPercentageOfDutiesCompleted(landDuties);

  return (
    <Card className={classes.card}>
      <CardHeader
        onClick={e => <Redirect to={`areas/${landId}`} />}
        avatar={
          <div>
            <Avatar aria-label="name" className={classes.avatar}></Avatar>
          </div>
        }
        action={
          <IconButton aria-label="settings">
            {/* <OpenInBrowserIcon /> */}
          </IconButton>
        }
        title={
          <AreaCardTitle
            landId={landId}
            landName={landName}
            lastCompletedDuty={lastCompletedDuty}
          />
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
