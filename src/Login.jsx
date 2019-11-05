import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoginForm from './LoginForm'

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
  const client = useApolloClient();
  const authenticated = props.isLoggedIn;
    console.log(authenticated)
  const [login, { loading, error }] = useMutation(
    SIGN_IN_USER,
    {
      onCompleted({ signInUser }) {
      localStorage.setItem('access-token', signInUser.accessToken);
      localStorage.setItem('refresh-token', signInUser.refreshToken);
      localStorage.setItem('isLoggdIn', signInUser && !!signInUser.accessToken);
      }
    }
  );
  if (loading) return <div>**LOADING**</div>;
  if (error) return <p>An error occurred{console.log(error)}</p>;

  return <LoginForm login={login} />;
}
