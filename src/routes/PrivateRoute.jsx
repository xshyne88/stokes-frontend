import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../UserProvider";
import Page from "../Page";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Page>
            <Component {...props} />
          </Page>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
