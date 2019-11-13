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
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";

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
    backgroundColor: "palevioletred",
    marginRight: 10
  },
  inActive: {
    backgroundColor: "lightGreen",
    marginRight: 10
  }
}));

export default props => {
  // const name = (props && props.land && props.land.name) || "A";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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
        title={<Link to={`areas/${props.land.id}`}>{props.land.name}</Link>}
        subheader={dayJs().format("MMMM D, YYYY")}
      />
      <CardContent>
        <RestoreFromTrashIcon className={classes.active} />
        <AccessTimeIcon className={classes.inActive} />
        <NaturePeopleIcon className={classes.active} />
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
