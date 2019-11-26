import React from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollHider from "../components/ScrollHider";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";

import GoBack from "./GoBack";

const Header = props => (
  <>
    <CssBaseline />
    <ScrollHider {...props}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">{getNameFromRoute(props)} </Typography>
        </Toolbar>
      </AppBar>
    </ScrollHider>
    <Toolbar />
  </>
);

const getNameFromRoute = props => {
  console.log(props);
  if (props.location.pathname.match(/\/areas\/.+/)) {
    return <GoBack history={props.history} />;
  }
  return `Todays date: ${dayjs().format("M-D-YY HH:mm:ss")}`;
};

export default withRouter(Header);
