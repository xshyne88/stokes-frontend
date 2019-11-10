import React from "react";
import { useHistory } from "react-router-dom";
import { isAccessTokenValid } from "./helpers";
import { UserProvider } from "../UserProvider";

export const AuthProvider = ({ children }) => {
  const history = useHistory();

  const handleLogout = () => history.push("/login");
  return (
    <UserProvider
      onLogout={handleLogout}
      history={history}
      isAuthenticated={isAccessTokenValid()}
    >
      {children}
    </UserProvider>
  );
};
