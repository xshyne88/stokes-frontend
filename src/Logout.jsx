import React, { useContext } from "react";
import { UserContext } from "./UserProvider";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  localStorage.setItem("access-token", undefined);
  localStorage.setItem("refresh-token", undefined);
  localStorage.setItem("user", undefined);
  setUser(null);
  return <Redirect to="/login" />;
};

export default Logout;
