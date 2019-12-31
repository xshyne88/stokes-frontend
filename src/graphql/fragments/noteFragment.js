import gql from "graphql-tag";

export default gql`
  fragment noteFragment on Note {
    id
    body
    createdAt
    createdBy {
      id
      name
    }
  }
`;
