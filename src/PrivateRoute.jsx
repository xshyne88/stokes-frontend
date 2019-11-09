import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserProvider";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
