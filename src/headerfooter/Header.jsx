import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../UserProvider";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollHider from "../components/ScrollHider";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";

import GoBack from "./GoBack";

const Header = props => {
  const { user } = useContext(UserContext);
  return user ? (
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
  ) : null;
};

const getNameFromRoute = props => {
  if (props.location.pathname.match(/\/areas\/.+/)) {
    return <GoBack history={props.history} />;
  }
  return `Todo List for ${dayjs().format("M-D-YY")}`;
};

export default withRouter(Header);
