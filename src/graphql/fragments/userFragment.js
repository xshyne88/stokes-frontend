import gql from "graphql-tag";

export default gql`
  fragment userFragment on User {
    email
    name
    isAdmin
  }
`;
