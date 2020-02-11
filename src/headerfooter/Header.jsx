import React from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollHider from "../components/ScrollHider";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import GoBack from "./GoBack";

const Header = props => {
  const history = useHistory();

  const handleLogout = () => history.push("/logout");

  return (
    <>
      <CssBaseline />
      <ScrollHider {...props}>
        <div style={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">{getNameFromRoute(props)} </Typography>
              <IconButton
                edge="end"
                style={{ marginLeft: "auto", color: "white" }}
                onClick={handleLogout}
              >
                Logout
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </ScrollHider>
    </>
  );
};

const getNameFromRoute = props => {
  if (props.location.pathname.match(/\/areas\/.+/)) {
    return <GoBack history={props.history} />;
  }
  return `Washington Park Cemetary Maintenance`;
};

export default withRouter(Header);

// const date = `Todays date: ${dayjs().format("M-D-YY HH:mm:ss")}`;
