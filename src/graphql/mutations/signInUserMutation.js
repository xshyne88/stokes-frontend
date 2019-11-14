import gql from "graphql-tag";

export default gql`
  mutation signInUserMutation($input: SignInUserInput!) {
    signInUser(input: $input) {
      accessToken
      refreshToken
      errors {
        message
      }
      user {
        isAdmin
        id
        email
      }
    }
  }
`;
