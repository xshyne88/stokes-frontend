import gql from "graphql-tag";

export default gql`
  mutation setPasswordMutation($input: SetPasswordInput!) {
    setPassword(input: $input) {
      user {
        isAdmin
        id
        email
      }
      errors {
        message
      }
    }
  }
`;
