import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAccessTokenValid } from "./auth/helpers";

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAccessTokenValid() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;
