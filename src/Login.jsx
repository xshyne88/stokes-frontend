import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoginForm from './LoginForm'
const SIGN_IN_USER = gql`
  mutation signInUserMutation($input: SignInUserInput!) {
    signInUser(email: $email) {
      accessToken
      refreshToken
      errors {
        messages
      }
    }
  }
`;

export default function Login() {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation(
    SIGN_IN_USER,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login);
        client.writeData({ data: { isLoggedIn: true } });
        console.log(login)
      }
    }
  );
  if (loading) return <div>**LOADING**</div>;
  if (error) return <p>An error occurred{console.log(error)}</p>;

  return <LoginForm login={login} />;
}