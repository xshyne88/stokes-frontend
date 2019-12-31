import gql from "graphql-tag";
import userFragment from "../fragments/userFragment";

export default gql`
  mutation createUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        ...userFragment
      }
    }
  }
  ${userFragment}
`;
