import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AreasIcon from "@material-ui/icons/VerticalSplitSharp";
import MapIcon from "@material-ui/icons/CropOriginalSharp";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles({
  root: {
    width: "100%",
    bottom: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center"
  }
});

const capitalize = str => str.replace(/^\w/, c => c.toUpperCase());

const routes = [
  { route: "areas", icon: <AreasIcon /> },
  { route: "map", icon: <MapIcon /> },
  { route: "account", icon: <PersonIcon /> },
  { route: "admin", icon: <HistoryIcon /> }
];

const BottomNav = props => {
  const classes = useStyles();
  const currentRoute = props.location.pathname.slice(1);

  return (
    <BottomNavigation value={currentRoute} className={classes.root}>
      {routes.map(({ route, icon }) => (
        <BottomNavigationAction
          key={route}
          label={capitalize(route)}
          value={route}
          to={`/${route}`}
          icon={icon}
          component={Link}
        />
      ))}
    </BottomNavigation>
  );
};

export default withRouter(BottomNav);
