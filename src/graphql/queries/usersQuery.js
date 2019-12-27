import gql from "graphql-tag";
import userFragment from "../fragments/userFragment";

export default gql`
  query usersQuery {
    users {
      edges {
        node {
          ...userFragment
        }
      }
    }
  }
  ${userFragment}
`;
