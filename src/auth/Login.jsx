import React, { useContext, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import SignIn from "./SignIn";
import { Redirect } from "react-router-dom";
import { UserContext } from "../UserProvider";
import { Loading } from "../components/Spinners";
import { isAccessTokenValid } from "./helpers";
import SIGN_IN_USER from "../graphql/mutations/signInUserMutation";

const setTokens = signInResponse => {
  const { accessToken, refreshToken, user } = signInResponse;
  if (accessToken && refreshToken && user) {
    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("refresh-token", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
  }
};

const getOldTokens = () => {
  const [at, rt, user] = [
    localStorage.getItem("access-token"),
    localStorage.getItem("refresh-token"),
    localStorage.getItem("user")
  ];
  if (nonNull(at) && nonNull(rt) && nonNull(user)) {
    return {
      accessToken: at,
      refreshToken: rt,
      user: user
    };
  }
};

const nonNull = val => javascriptSucks(val);
const javascriptSucks = val => val !== "null" && val !== "undefined" && val;

const Login = props => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const oldTokens = getOldTokens();
    if (oldTokens && isAccessTokenValid(oldTokens.accessToken)) {
      setUser(oldTokens.user);
    }
  }, [setUser]);

  const [login, { loading, error, data }] = useMutation(SIGN_IN_USER, {
    onCompleted({ signInUser }) {
      setTokens(signInUser);
      setUser(signInUser.user);
    }
  });

  if (user) return <Redirect to="/areas" />;
  if (loading) return <Loading />;
  if (error) return <p>An error occurred{console.error(error)}</p>;
  if (data) return <Redirect to="/areas" />;
  return <SignIn login={login} />;
};

export default Login;
