import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import SignIn from "./SignIn";
import { Redirect } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { Loading } from "./Spinners";

const SIGN_IN_USER = gql`
  mutation signInUserMutation($input: SignInUserInput!) {
    signInUser(input: $input) {
      accessToken
      refreshToken
      errors {
        message
      }
      user {
        id
        email
      }
    }
  }
`;

const setTokens = signInUser => {
  const { accessToken, refreshToken, user } = signInUser;
  if (accessToken && refreshToken && user) {
    localStorage.setItem("access-token", signInUser.accessToken);
    localStorage.setItem("refresh-token", signInUser.refreshToken);
    localStorage.setItem("user", JSON.stringify(signInUser.user));
  }
};

const Login = props => {
  const { user, setUser } = useContext(UserContext);
  const [login, { loading, error, data }] = useMutation(SIGN_IN_USER, {
    onCompleted({ signInUser }) {
      setTokens(signInUser);
      setUser(signInUser.user);
    }
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred{console.log(error)}</p>;
  if (data) return <Redirect to="/home" />;
  return user ? <Redirect to="/home" /> : <SignIn login={login} />;
};

export default Login;
