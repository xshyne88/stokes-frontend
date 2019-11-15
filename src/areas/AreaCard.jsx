import React from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { orange } from "@material-ui/core/colors";
import dayJs from "dayjs";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Icon from "@material-ui/core/Icon";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
// import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";
// import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: { width: "100%" },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
    backgroundColor: orange[200],
    height: 35
  },
  active: {
    // backgroundColor: "palevioletred",
    marginRight: 10
  },
  inActive: {
    // backgroundColor: "lightGreen",
    marginRight: 10
  },
  activeChip: {
    backgroundColor: "#fff",
    textShadow: "0 0 20px #ff05b"
  }
}));

const ellipsify = (name, length = 10) => {
  if (name.length >= length) {
    return `${name.slice(0, length)}..`;
  } else {
    return name;
  }
};

export default props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { lastCompletedDuty } = props.land;

  return (
    <Card className={classes.card}>
      <CardHeader
        onClick={e => <Redirect to={`areas/${props.land.id}`} />}
        avatar={
          <div>
            <Avatar aria-label="name" className={classes.avatar}></Avatar>
          </div>
        }
        action={
          <IconButton aria-label="settings">
            <OpenInBrowserIcon />
          </IconButton>
        }
        title={
          <div>
            <Link to={`areas/${props.land.id}`}>{props.land.name}</Link>
            {lastCompletedDuty && (
              <div style={{ display: "flex" }}>
                <i>Last Completed Duty: </i>
                <div style={{ marginLeft: 10 }}>{lastCompletedDuty}</div>
              </div>
            )}
          </div>
        }
      />
      <CardContent>
        {props.land.landDuties.map(ld => (
          <Chip
            className={classes.activeChip}
            key={ld.id}
            avatar={<FiberManualRecordIcon style={{ fill: "green" }} />}
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
        <CardContent>
          <Typography>Notes go here</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
