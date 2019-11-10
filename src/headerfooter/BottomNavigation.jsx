import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AreasIcon from "@material-ui/icons/VerticalSplitSharp";
import MapIcon from "@material-ui/icons/CropOriginalSharp";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import { UserContext } from "../UserProvider";

const useStyles = makeStyles({
  root: {
    width: "100%",
    bottom: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center"
  },
  childButtons: {}
});

export default props => {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { user } = useContext(UserContext);
  if (user) {
    return (
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Areas"
          value="areas"
          to="/areas"
          icon={<AreasIcon />}
          className={classes.childButtons}
          component={Link}
        />
        <BottomNavigationAction
          label="Map"
          value="map"
          to="/map"
          icon={<MapIcon />}
          className={classes.childButtons}
          component={Link}
        />
        <BottomNavigationAction
          label="Account"
          value="account"
          to="/account"
          icon={<PersonIcon />}
          className={classes.childButtons}
          component={Link}
        />
      </BottomNavigation>
    );
  } else return null;
};
