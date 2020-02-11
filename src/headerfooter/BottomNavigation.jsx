import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AreasIcon from "@material-ui/icons/VerticalSplitSharp";
import MapIcon from "@material-ui/icons/CropOriginalSharp";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import { UserContext } from "../UserProvider";
import AssessmentIcon from "@material-ui/icons/Assessment";

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

export const capitalize = str => str.replace(/^\w/, c => c.toUpperCase());

const routes = [
  { route: "areas", icon: <AreasIcon /> },
  { route: "map", icon: <MapIcon /> },
  { route: "history", icon: <AssessmentIcon /> },
  { route: "users", icon: <PersonIcon /> }
];

const adminRoutes = (isAdmin, routes) => {
  if (isAdmin) return routes;
  return routes.filter(route => route.route !== "users");
};

const BottomNav = props => {
  const { user } = useContext(UserContext);
  const { isAdmin } = user;
  const classes = useStyles();
  const currentRoute = props.location.pathname.slice(1);
  const filteredRoutes = adminRoutes(isAdmin, routes);

  return (
    <BottomNavigation value={currentRoute} className={classes.root}>
      {filteredRoutes.map(({ route, icon }) => (
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
