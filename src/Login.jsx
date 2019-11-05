import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import SignIn from "./SignIn";

const SIGN_IN_USER = gql`
  mutation signInUserMutation($input: SignInUserInput!) {
    signInUser(input: $input) {
      accessToken
      refreshToken
      errors {
        message
      }
    }
  }
`;

export default function Login(props) {
  const [login, { loading, error }] = useMutation(SIGN_IN_USER, {
    onCompleted({ signInUser }) {
      localStorage.setItem("access-token", signInUser.accessToken);
      localStorage.setItem("refresh-token", signInUser.refreshToken);
    }
  });
  if (loading) return <div>**LOADING**</div>;
  if (error) return <p>An error occurred{console.log(error)}</p>;

  return <SignIn login={login} />;
}
